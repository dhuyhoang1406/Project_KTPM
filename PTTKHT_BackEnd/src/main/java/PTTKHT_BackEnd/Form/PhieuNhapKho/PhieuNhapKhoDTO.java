package PTTKHT_BackEnd.Form.PhieuNhapKho;

import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Form.CTPNK.CTPNKDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PhieuNhapKhoDTO {

    @NonNull
    private Integer maPhieu;

    @NonNull
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime ngayNhapKho;

    @NonNull
    private Integer tongGiaTri;

    @NonNull
    private String tenNhaCungCap;

    @NonNull
    private String hoTenQuanLy;

    @NonNull
    private List<CTPNKDTO> danhSachCTPNK;

    public PhieuNhapKhoDTO(){}
}
