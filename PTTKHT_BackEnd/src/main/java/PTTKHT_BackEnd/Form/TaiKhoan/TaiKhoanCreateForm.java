package PTTKHT_BackEnd.Form.TaiKhoan;

import PTTKHT_BackEnd.Entity.TaiKhoan.GioiTinh;
import PTTKHT_BackEnd.Entity.TaiKhoan.VaiTro;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class TaiKhoanCreateForm {
    @NotBlank(message = "Bạn không thể để trống họ tên !!")
    private String hoTen;

    @NotNull(message = "Bạn không thể để trống ngày sinh !!")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngaySinh;

    @NotBlank(message = "Bạn không thể để trống địa chỉ !!")
    private String diaChi;

    @NotNull(message = "Bạn không thể để trống giới tính !!")
    private GioiTinh gioiTinh;

    @NotBlank(message = "Bạn không thể để trống số điện thoại !!")
    private String soDienThoai;

    @NotBlank(message = "Bạn không thể để trống email !!")
    @Email(message = "Email phải đúng định dạng !!")
    private String email;

    @NotNull(message = "Bạn không thể để trống vai trò !!")
    private VaiTro vaiTro;

    @NotBlank(message = "Bạn không được để trống mật khẩu")
    private String matKhau;
}

