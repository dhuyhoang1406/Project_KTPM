package PTTKHT_BackEnd.Service.TrangThaiDonHang;

import PTTKHT_BackEnd.Configuration.Exception.NotEnoughInventory;
import PTTKHT_BackEnd.Entity.CTDH.CTDH;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThaiDonHang;
import PTTKHT_BackEnd.Form.TrangThaiDonHang.TrangThaiDonHangCreateForm;
import PTTKHT_BackEnd.Repository.IDonHangRepository;
import PTTKHT_BackEnd.Repository.ITrangThaiDonHangRepository;
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
    public void createTrangThaiDonHang(TrangThaiDonHangCreateForm form) throws NotEnoughInventory{
        TrangThaiDonHang trangThaiDonHang = modelMapper.map(form, TrangThaiDonHang.class);
        TrangThaiDonHang.TrangThaiDonHangPK pk = new TrangThaiDonHang.TrangThaiDonHangPK();

        pk.setMaDH(form.getMaDH());
        pk.setTrangThai(form.getTrangThai());
        trangThaiDonHang.setId(pk);
        trangThaiDonHang.setNgayCapNhat(LocalDateTime.now());


        /**
         *  Có 2 tình huống có thể xảy ra
         *  1. Khởi tạo trạng thái lần đầu
         *      + Kiếm thử xem đơn hàng này đã có trạng thái gì trước đó chưa ?
         *      + Nếu chưa thì khởi tạo và bỏ qua phần kiểm trạng thái bên dưới và khởi tạo trạng thái mới.
         *      + Nếu đã có thì tới trường hợp thứ 2.
         *
         *  2. Chuyển trạng thái.
         *      + Nếu đơn hàng từ ChoDuyet thành DaDuyet -> Giảm số lượng toàn bộ Sản Phẩm có trong đơn hàng
         *      + Nếu đơn hàng từ ChoDuyet thành Huy -> Không làm gì cả
         *      + Nếu đơn hàng từ DaDuyet thành Huy -> Check để refund lại số lượng đã mua
         */

        //Kiểm tra xem đã tồn tai trạng thái đơn hàng cu chưa ?
        TrangThaiDonHang trangThaiDonHangCu = trangThaiDonHangMoiNhat(form.getMaDH());
        if ( trangThaiDonHangCu != null) {
            //Duyệt sẽ giảm số lượng
            if (form.getTrangThai().equals(TrangThai.DaDuyet)) {
                List<CTDH> chiTietDonHang = ictdhServices.getAllCTDHByMaDH(form.getMaDH(), null).getContent();
                for (CTDH ctdh : chiTietDonHang) {
                    SanPham sanPham = sanPhamServices.getSanPhamById(ctdh.getSanPham().getMaSP());

                    if (sanPham.getSoLuongConLai() - ctdh.getSoLuong() >= 0){
                        sanPham.setSoLuongConLai(sanPham.getSoLuongConLai() - ctdh.getSoLuong());
                    }else{
                        String message = "Không đủ số lượng " + sanPham.getTenSP();
                        throw new NotEnoughInventory(message);
                    }

                }
            }

            //Refund lại số lượng khi hủy 1 đơn hàng đã được duyệt
            else if (form.getTrangThai().equals(TrangThai.Huy) && trangThaiDonHangCu.getId().getTrangThai().equals(TrangThai.DaDuyet)) {
                List<CTDH> chiTietDonHang = ictdhServices.getAllCTDHByMaDH(form.getMaDH(), null).getContent();
                for (CTDH ctdh : chiTietDonHang) {
                    SanPham sanPham = sanPhamServices.getSanPhamById(ctdh.getSanPham().getMaSP());
                    sanPham.setSoLuongConLai(sanPham.getSoLuongConLai() + ctdh.getSoLuong());
                }
            }
        }


        repository.save(trangThaiDonHang);
    }


}
