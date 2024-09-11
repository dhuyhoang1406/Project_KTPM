package PTTKHT_BackEnd.Form.DonHang;

import PTTKHT_BackEnd.Entity.DonHang.PhuongThucThanhToan;
import PTTKHT_BackEnd.Entity.DonHang.PhuongThucVanChuyen;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import PTTKHT_BackEnd.Form.CTDH.CTDHDTO;
import PTTKHT_BackEnd.Form.TrangThaiDonHang.TrangThaiDonHangDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class DonHangDTO {

    @NonNull
    private Integer maDH;

    @NonNull
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime ngayDat;

    @NonNull
    private Integer tongGiaTri;

    @NonNull
    private PhuongThucThanhToan phuongThucThanhToan;

    @NonNull
    private PhuongThucVanChuyen phuongThucVanChuyen;

    @NonNull
    private String diaChiGiaoHang;

    @NonNull
    private String hoTenKhachHang;

    @NonNull
    private String emailKhachHang;

    @NonNull
    private TrangThai trangThaiMoiNhat;

    @NonNull
    private List<CTDHDTO> danhSachCTDH;

    public DonHangDTO(){}
}
