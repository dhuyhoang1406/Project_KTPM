package PTTKHT_BackEnd.Service.TaiKhoan;

import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Form.Login.CustomUserDetailsService;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanCreateForm;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanFillerForm;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanUpdateForm;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanUpdatePassForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ITaiKhoanServices {

    Page<TaiKhoan> getAllTaiKhoan(Pageable pageable, String search, TaiKhoanFillerForm form);

    Boolean isTaiKhoanExists(String email);

    TaiKhoan getTaiKhoanByEmail(String email);

    TaiKhoan getTaiKhoanByID(Integer id);

    void createTaiKhoan(TaiKhoanCreateForm form) throws Exception;

    void updateTaiKhoan(Integer maTK, TaiKhoanUpdateForm form);

    void updateMatKhauTaiKhoan(Integer maTK, TaiKhoanUpdatePassForm form);

    void unbanTaiKhoan(Integer maTK);

    void banTaiKhoan(Integer maTK);
}
