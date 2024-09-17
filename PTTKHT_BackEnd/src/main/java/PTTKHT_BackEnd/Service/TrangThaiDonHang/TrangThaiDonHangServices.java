package PTTKHT_BackEnd.Service.TrangThaiDonHang;

import PTTKHT_BackEnd.Configuration.Exception.NotEnoughInventory;
import PTTKHT_BackEnd.Entity.CTDH.CTDH;
import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThaiDonHang;
import PTTKHT_BackEnd.Form.TrangThaiDonHang.TrangThaiDonHangCreateForm;
import PTTKHT_BackEnd.Repository.*;
import PTTKHT_BackEnd.Service.CTDH.ICTDHServices;
import PTTKHT_BackEnd.Service.SanPham.ISanPhamServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TrangThaiDonHangServices implements  ITrangThaiDonHangServices{

    @Autowired
    private ITrangThaiDonHangRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IDonHangRepository donHangRepository;

    @Autowired
    private ICTDHServices ictdhServices;

    @Autowired
    private ISanPhamServices sanPhamServices;

    @Autowired
    private ISanPhamRepository sanPhamRepository;

    @Autowired
    private ICTPNKRepository chiTietPhieuNhapKhoRepository;

    @Autowired
    private IPhieuNhapKhoRepository phieuNhapKhoRepository;

    @Override
    public Page<TrangThaiDonHang> getAllTrangThaiDonHang(Integer maDH, Pageable pageable) {

        return repository.findAllByDonHang_MaDH(maDH, pageable);
    }

    @Override
    public TrangThaiDonHang trangThaiDonHangMoiNhat(Integer maDH) {
        return repository.findFirstByDonHangMaDHOrderByNgayCapNhatDesc(maDH).orElse(null);
    }

    @Override
    @Transactional
    public void createTrangThaiDonHang(TrangThaiDonHangCreateForm form) throws NotEnoughInventory {
        TrangThaiDonHang trangThaiDonHang = modelMapper.map(form, TrangThaiDonHang.class);
        TrangThaiDonHang.TrangThaiDonHangPK pk = new TrangThaiDonHang.TrangThaiDonHangPK();

        pk.setMaDH(form.getMaDH());
        pk.setTrangThai(form.getTrangThai());
        trangThaiDonHang.setId(pk);
        trangThaiDonHang.setNgayCapNhat(LocalDateTime.now());

        // Kiểm tra xem đã tồn tại trạng thái đơn hàng cũ chưa
        TrangThaiDonHang trangThaiDonHangCu = trangThaiDonHangMoiNhat(form.getMaDH());
        if (trangThaiDonHangCu != null) {
            // Nếu trạng thái mới là "Hủy", bỏ qua kiểm tra số lượng và chỉ set trạng thái
            if (form.getTrangThai().equals(TrangThai.Huy)) {
                // Kiểm tra nếu trạng thái trước đó là "Đã Duyệt" thì hoàn lại số lượng
                if (trangThaiDonHangCu.getId().getTrangThai().equals(TrangThai.DaDuyet)) {
                    List<CTDH> chiTietDonHang = ictdhServices.getAllCTDHByMaDH(form.getMaDH(), null).getContent();
                    for (CTDH ctdh : chiTietDonHang) {
                        SanPham sanPham = sanPhamServices.getSanPhamById(ctdh.getSanPham().getMaSP());
                        sanPham.setSoLuongConLai(sanPham.getSoLuongConLai() + ctdh.getSoLuong());
                        sanPhamRepository.save(sanPham);
                    }
                }
            }
            // Trạng thái là "Đã Duyệt" thì giảm số lượng sản phẩm
            else if (form.getTrangThai().equals(TrangThai.DaDuyet)) {
                List<CTDH> chiTietDonHang = ictdhServices.getAllCTDHByMaDH(form.getMaDH(), null).getContent();
                for (CTDH ctdh : chiTietDonHang) {
                    SanPham sanPham = sanPhamServices.getSanPhamById(ctdh.getSanPham().getMaSP());
                    if (sanPham.getSoLuongConLai() - ctdh.getSoLuong() >= 0) {
                        sanPham.setSoLuongConLai(sanPham.getSoLuongConLai() - ctdh.getSoLuong());

                        if (sanPham.getSoLuongConLai() == 0) {
                            Optional<CTPNK> optionalChiTietPhieuNhapKho = chiTietPhieuNhapKhoRepository.findFirstById_MaSPAndTrangThai(ctdh.getSanPham().getMaSP(), 0);

                            if (optionalChiTietPhieuNhapKho.isPresent()) {
                                CTPNK chiTietPhieuNhapKho = optionalChiTietPhieuNhapKho.get();

                                Optional<PhieuNhapKho> optionalPnk = phieuNhapKhoRepository.findById(chiTietPhieuNhapKho.getId().getMaPhieu());

                                if (optionalPnk.isPresent()) {
                                    PhieuNhapKho pnk = optionalPnk.get();

                                    sanPham.setSoLuongConLai(sanPham.getSoLuongConLai() + chiTietPhieuNhapKho.getSoLuong());
                                    sanPham.setGia(chiTietPhieuNhapKho.getDonGiaNhap() * pnk.getLoiNhuan());

                                    chiTietPhieuNhapKho.setTrangThai(1);
                                    chiTietPhieuNhapKhoRepository.save(chiTietPhieuNhapKho);
                                    sanPhamRepository.save(sanPham);
                                } else {
                                    System.out.println("Không tìm thấy phiếu nhập kho cho mã phiếu: " + chiTietPhieuNhapKho.getId().getMaPhieu());
                                }
                            } else {
                                System.out.println("Không tìm thấy chi tiết phiếu nhập kho cho sản phẩm với trạng thái 0.");
                            }
                        }

                            sanPhamRepository.save(sanPham);
                    } else {
                        String message = "Không đủ số lượng " + sanPham.getTenSP();
                        throw new NotEnoughInventory(message);
                    }
                }
            }
        }

        repository.save(trangThaiDonHang);
    }




}
