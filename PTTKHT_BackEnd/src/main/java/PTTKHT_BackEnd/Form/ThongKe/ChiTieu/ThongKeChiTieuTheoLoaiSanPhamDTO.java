package PTTKHT_BackEnd.Form.ThongKe.ChiTieu;

import lombok.Data;

@Data
public class ThongKeChiTieuTheoLoaiSanPhamDTO {
    private String tenLoaiSanPham;

    private Integer soLuongNhap;

    private Integer tongChiTieuTheoLoai;

    public ThongKeChiTieuTheoLoaiSanPhamDTO(){}
}
