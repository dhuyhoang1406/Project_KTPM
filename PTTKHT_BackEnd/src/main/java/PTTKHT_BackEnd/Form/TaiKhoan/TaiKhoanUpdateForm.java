package PTTKHT_BackEnd.Form.TaiKhoan;

import PTTKHT_BackEnd.Entity.TaiKhoan.GioiTinh;
import PTTKHT_BackEnd.Entity.TaiKhoan.VaiTro;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class TaiKhoanUpdateForm {

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

    @NotNull(message = "Bạn không thể để trống vai trò !!")
    private VaiTro vaiTro;

}
