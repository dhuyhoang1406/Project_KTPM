package PTTKHT_BackEnd.Service.ThongKe;

import PTTKHT_BackEnd.Form.DonHang.DonHangFillerForm;

import java.util.List;

public interface IThongKeServices {
    List<Object[]> thongKeDonHang(DonHangFillerForm form);

    List<Object[]> thongKeTongDoanhThu(DonHangFillerForm form);

    List<Object[]> thongKeDoanhThuTheoLoaiSanPham(DonHangFillerForm form, List<Integer> maLoaiSanPham);

    List<Object[]> thongKeDoanhThuChiTietTheoLoaiSanPham(DonHangFillerForm form, Integer maLoaiSanPham);

    List<Object[]> thongKeChiTieu(DonHangFillerForm form,  List<Integer> maLoaiSanPham);

    List<Object[]> thongKeTongChiTieu(DonHangFillerForm form);

    List<Object[]> thongKeChiTieuChiTietTheoLoaiSanPham(DonHangFillerForm form, Integer maLoaiSanPham);



}
