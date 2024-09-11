package PTTKHT_BackEnd.Form.Login;

import PTTKHT_BackEnd.Entity.TaiKhoan.VaiTro;
import lombok.Data;

@Data
public class LoginTaiKhoanDTO {

    public Integer maTK;
    public String email;
    public VaiTro vaiTro;

}
