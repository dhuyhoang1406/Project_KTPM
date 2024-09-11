package PTTKHT_BackEnd.Form.DonHang;

import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DonHangUpdateForm {

    @NotNull(message = "Bạn không thể để trống trạng thái !!")
    private TrangThai trangThai;


}
