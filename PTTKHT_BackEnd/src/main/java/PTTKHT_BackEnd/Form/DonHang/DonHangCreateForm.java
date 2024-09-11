package PTTKHT_BackEnd.Form.DonHang;

import PTTKHT_BackEnd.Entity.DonHang.PhuongThucThanhToan;
import PTTKHT_BackEnd.Entity.DonHang.PhuongThucVanChuyen;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Form.CTDH.CTDHCreateForm;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.util.List;

@Data
public class DonHangCreateForm {

        @NotNull(message = "Bạn không được để trống tổng giá trị !!")
        @PositiveOrZero(message = "Tổng giá trị phải là số lớn hơn 0")
        private Integer tongGiaTri;

        @NotNull(message = "Bạn không được để trống phương thức thanh toán !!")
        private PhuongThucThanhToan phuongThucThanhToan;

        @NotNull(message = "Bạn không được để trống phương thức vận chuyển !!")
        private PhuongThucVanChuyen phuongThucVanChuyen;

        @NotNull(message = "Bạn không được để trống địa chỉ giao hàng !!")
        private String diaChiGiaoHang;

        @NotNull(message = "Bạn không được để trống mã khách hàng !!")
        private Integer maKhachHang;

        @NotNull(message = "Không thể tạo 1 đơn hàng rỗng !!")
        private List<CTDHCreateForm> danhSachCTDH;

}
