package PTTKHT_BackEnd.Form.NhaCungCap;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NhaCungCapCreateAndUpdateForm {

    @NotBlank(message = "Không được để trống tên nhà cung cấp !!")
    private String tenNCC;

    @NotBlank(message = "Không được để trống số điện thoại nhà cung cấp !!")
    private String soDienThoai;

    @NotBlank(message = "Không được để trống email nhà cung cấp !!")
    @Email(message = "Email phải đúng định dạng chuẩn !!")
    private String email;

}
