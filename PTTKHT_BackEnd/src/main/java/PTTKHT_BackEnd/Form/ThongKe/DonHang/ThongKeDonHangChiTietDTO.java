package PTTKHT_BackEnd.Form.ThongKe.DonHang;

import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import lombok.Data;

@Data
public class ThongKeDonHangChiTietDTO {

    private TrangThai trangThai;

    private Integer soLuong;

    public ThongKeDonHangChiTietDTO(){}
}
