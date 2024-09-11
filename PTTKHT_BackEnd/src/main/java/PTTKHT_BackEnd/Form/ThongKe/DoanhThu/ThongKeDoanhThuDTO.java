package PTTKHT_BackEnd.Form.ThongKe.DoanhThu;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ThongKeDoanhThuDTO {

    private LocalDate ngayThongKe;

    private ThongKeTongDoanhThuTheoNgayDTO TongDoanhThu;

    private List<ThongKeDoanhThuLoaiSanPhamDTO> listLoaiSanPham;

    public ThongKeDoanhThuDTO(){}

}
