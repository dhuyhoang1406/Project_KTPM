package PTTKHT_BackEnd.Form.TrangThaiDonHang;

import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NonNull;

import java.time.LocalDateTime;


@Data
public class TrangThaiDonHangDTO {

    @NonNull
    private Integer maDonHang;

    @NonNull
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime ngayCapNhat;

    @NonNull
    private TrangThai idTrangThai;

    public TrangThaiDonHangDTO(){}

}
