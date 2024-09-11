package PTTKHT_BackEnd.Form.CTPNK;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CTPNKCreateForm {

    @NotNull(message = "Bạn không được để trống mã phiếu !!")
    private Integer maPhieu;

    @NotNull(message = "Bạn không được để trống mã sản phẩm !!")
    private Integer maSP;

    @NotNull(message = "Bạn không được để trống số lượng !!")
    private Integer soLuong;

    @NotNull(message = "Bạn không được để trống giá nhập !!")
    private Integer donGiaNhap;

    @NotNull(message = "Bạn không nên để trống thành tiền !!")
    private Integer thanhTien;

}
