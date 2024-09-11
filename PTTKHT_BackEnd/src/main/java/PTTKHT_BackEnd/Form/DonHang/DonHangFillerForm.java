package PTTKHT_BackEnd.Form.DonHang;

import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
public class DonHangFillerForm {

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date minDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date maxDate;

    private TrangThai trangThai;

}
