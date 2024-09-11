package PTTKHT_BackEnd.Form.TrangThaiDonHang;

import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
public class TrangThaiDonHangCreateForm {

    @NotNull(message = "Bạn không được để trống ID đơn hàng !!")
    private Integer maDH;

    @NotNull(message = "Bạn không thể để trống trạng thái !!")
    private TrangThai trangThai;

}
