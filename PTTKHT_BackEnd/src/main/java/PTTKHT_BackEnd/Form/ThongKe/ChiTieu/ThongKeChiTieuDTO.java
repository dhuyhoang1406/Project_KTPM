package PTTKHT_BackEnd.Form.ThongKe.ChiTieu;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ThongKeChiTieuDTO {
    private LocalDate ngayThongKe;

    private ThongKeTongChiTieuTheoNgayDTO TongChiTieu;

    private List<ThongKeChiTieuTheoLoaiSanPhamDTO> listLoaiSanPham;

    public ThongKeChiTieuDTO(){}
}
