package PTTKHT_BackEnd.Form.CTDH;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CTDHCreateForm {
    @NotNull(message = "Bạn không được để trống mã phiếu !!")
    private Integer maDH;

    @NotNull(message = "Bạn không được để trống mã sản phẩm !!")
    private Integer maSP;

    @NotNull(message = "Bạn không được để trống số lượng !!")
    private Integer soLuong;

    @NotNull(message = "Bạn không được để trống giá !!")
    private Integer thanhGia;

}
