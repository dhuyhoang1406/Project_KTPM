package PTTKHT_BackEnd.Service.DonHang;

import PTTKHT_BackEnd.Configuration.Exception.NotEnoughInventory;
import PTTKHT_BackEnd.Entity.DonHang.DonHang;
import PTTKHT_BackEnd.Form.DonHang.DonHangCreateForm;
import PTTKHT_BackEnd.Form.DonHang.DonHangDTO;
import PTTKHT_BackEnd.Form.DonHang.DonHangFillerForm;
import PTTKHT_BackEnd.Form.DonHang.DonHangUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;

public interface IDonHangServices {
    Page<DonHang> getAllDonHang(Pageable pageable, DonHangFillerForm form);
    DonHang getDonHangByID(Integer maDH);

    Page<DonHang> getAllDonHangByMaKH(Integer maKH, Pageable pageable);

    void createDonHang(DonHangCreateForm form) throws NotEnoughInventory;

    void updateDonHang(Integer id, DonHangUpdateForm form) throws NotEnoughInventory;

}
