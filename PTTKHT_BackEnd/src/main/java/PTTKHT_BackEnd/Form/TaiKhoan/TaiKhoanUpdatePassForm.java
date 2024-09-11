package PTTKHT_BackEnd.Form.TaiKhoan;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class TaiKhoanUpdatePassForm {

    @NotBlank(message = "Bạn không được để trống mật khẩu")
    private String matKhau;

}
