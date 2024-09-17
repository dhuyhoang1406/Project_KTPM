package PTTKHT_BackEnd.Service.CTPNK;

import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Form.CTPNK.CTPNKCreateForm;
import PTTKHT_BackEnd.Repository.ICTPNKRepository;
import PTTKHT_BackEnd.Repository.IPhieuNhapKhoRepository;
import PTTKHT_BackEnd.Repository.ISanPhamRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CTPNKServices implements ICTPNKServices{

    @Autowired
    private ICTPNKRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IPhieuNhapKhoRepository phieuNhapKhoRepository;

    @Autowired
    private ISanPhamRepository sanPhamRepository;

    @Override
    public Page<CTPNK> getAllCTPNK(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Page<CTPNK> getAllCTPNKByMaPhieu(Integer maPhieu, Pageable pageable) {
        return repository.findAllByPhieuNhapKho_MaPhieu(maPhieu, pageable);
    }

    @Override
    @Transactional
    public void createCTPNK(CTPNKCreateForm form) {
        // Tạo đối tượng CTPNK và thiết lập Composite Key
        CTPNK ctpnk = new CTPNK();
        CTPNK.CTPNKPK pk = new CTPNK.CTPNKPK();
        pk.setMaSP(form.getMaSP());
        pk.setMaPhieu(form.getMaPhieu());
        ctpnk.setId(pk);

        // Thiết lập các thuộc tính khác của CTPNK
        ctpnk.setDonGiaNhap(form.getDonGiaNhap());
        ctpnk.setSoLuong(form.getSoLuong());
        ctpnk.setThanhTien(form.getThanhTien());

        // Tìm sản phẩm theo mã sản phẩm
        Optional<SanPham> optionalSanPham = sanPhamRepository.findById(form.getMaSP());
        if (optionalSanPham.isPresent()) {
            SanPham sanPham = optionalSanPham.get();

            // Nếu số lượng còn lại của sản phẩm bằng 0
            if (sanPham.getSoLuongConLai() == 0) {
                // Tìm phiếu nhập kho theo mã phiếu
                Optional<PhieuNhapKho> optionalPhieuNhapKho = phieuNhapKhoRepository.findById(form.getMaPhieu());
                if (optionalPhieuNhapKho.isPresent()) {
                    PhieuNhapKho pnk = optionalPhieuNhapKho.get();

                    // Cập nhật số lượng tồn kho và giá của sản phẩm
                    sanPham.setSoLuongConLai(sanPham.getSoLuongConLai() + form.getSoLuong());
                    sanPham.setGia(form.getDonGiaNhap() * pnk.getLoiNhuan());

                    // Thiết lập trạng thái cho CTPNK và lưu sản phẩm
                    ctpnk.setTrangThai(1);
                    sanPhamRepository.save(sanPham);
                }
            }
        }

        // Lưu CTPNK
        repository.save(ctpnk);
    }

}
