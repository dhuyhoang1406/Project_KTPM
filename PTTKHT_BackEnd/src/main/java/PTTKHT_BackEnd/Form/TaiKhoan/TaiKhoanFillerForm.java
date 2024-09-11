package PTTKHT_BackEnd.Form.TaiKhoan;

import PTTKHT_BackEnd.Entity.TaiKhoan.VaiTro;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
public class TaiKhoanFillerForm {

    private VaiTro vaiTro;

    private Boolean trangThai;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date minNgayTao;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date maxNgayTao;

}
