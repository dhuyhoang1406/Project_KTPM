package PTTKHT_BackEnd.Service.TrangThaiDonHang;

import PTTKHT_BackEnd.Configuration.Exception.NotEnoughInventory;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThaiDonHang;
import PTTKHT_BackEnd.Form.TrangThaiDonHang.TrangThaiDonHangCreateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface ITrangThaiDonHangServices {

    Page<TrangThaiDonHang> getAllTrangThaiDonHang(Integer maDH, Pageable pageable);

    TrangThaiDonHang trangThaiDonHangMoiNhat(Integer maDH);

    void createTrangThaiDonHang(TrangThaiDonHangCreateForm form) throws NotEnoughInventory;
}
