package PTTKHT_BackEnd.Form.ThongKe.DonHang;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ThongKeDonHangDTO {

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngayDatDon;

    private List<ThongKeDonHangChiTietDTO> danhSachTrangThaiVaSoLuong;


    public ThongKeDonHangDTO(){

    }

}
