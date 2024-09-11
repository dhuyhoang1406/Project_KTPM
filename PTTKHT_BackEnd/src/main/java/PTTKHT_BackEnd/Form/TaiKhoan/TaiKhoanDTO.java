package PTTKHT_BackEnd.Form.TaiKhoan;

import PTTKHT_BackEnd.Entity.TaiKhoan.GioiTinh;
import PTTKHT_BackEnd.Entity.TaiKhoan.VaiTro;
import lombok.Data;
import lombok.NonNull;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
/***
 * NOTE!!!
 * - Các DTO có thể không chứa tất cả trường của Entity gốc nhưng các trường ở 2 bên phải cùng tên
 *      -> Model Mapper sẽ không thể chuyển từ TaiKhoan sang TaiKhoanDTO
 */
public class TaiKhoanDTO {

    @NonNull
    private Integer maTK;

    @NonNull
    private String hoTen;

    @NonNull
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngaySinh;

    @NonNull
    private String diaChi;

    @NonNull
    private GioiTinh gioiTinh;

    @NonNull
    private String soDienThoai;

    @NonNull
    private String email;

    @NonNull
    private VaiTro vaiTro;

    @NonNull
    private Boolean trangThai;

    @NonNull
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime ngayTao;

    public TaiKhoanDTO(){}


}
