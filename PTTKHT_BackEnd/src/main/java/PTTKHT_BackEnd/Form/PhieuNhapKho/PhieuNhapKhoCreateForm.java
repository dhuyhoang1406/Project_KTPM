package PTTKHT_BackEnd.Form.PhieuNhapKho;

import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Form.CTPNK.CTPNKCreateForm;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class PhieuNhapKhoCreateForm {

    @NotNull(message = "Không được để trống tổng giá trị phiếu !!")
    private Integer tongGiaTri;

    @NotNull(message = "Không được để trống mã nhà cung cấp !!")
    private Integer maNhaCungCap;

    @NotNull(message = "Không được để trống mã quản l !!")
    private Integer maQuanLy;

    @NotNull(message = "Không được để trống chi tiết phiếu nhập kho !!")
    private List<CTPNKCreateForm> danhSachCTPNK;
}
