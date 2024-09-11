package PTTKHT_BackEnd.Service.ThongKe;

import PTTKHT_BackEnd.Form.DonHang.DonHangFillerForm;
import PTTKHT_BackEnd.Repository.IDonHangRepository;
import PTTKHT_BackEnd.Repository.IPhieuNhapKhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ThongKeServices implements IThongKeServices {

    @Autowired
    private IDonHangRepository repository;

    @Autowired
    private IPhieuNhapKhoRepository phieuNhapKhoRepository;


    @Override
    public List<Object[]> thongKeDonHang(DonHangFillerForm form) {
        return repository.thongKeDonHangTheoNgayVaTrangThai(
            convertDateToString(form.getMinDate()),
            convertDateToString(form.getMaxDate()));
    }

    @Override
    public List<Object[]> thongKeTongDoanhThu(DonHangFillerForm form) {
        return repository.tongDoanhThu(convertDateToString(form.getMinDate()),
                                        convertDateToString(form.getMaxDate()));
    }

    @Override
    public List<Object[]> thongKeDoanhThuTheoLoaiSanPham(DonHangFillerForm form, List<Integer> maLoaiSanPham) {
        return repository.thongKeDoanhThuByLoaiSanPham(maLoaiSanPham,
                                                        convertDateToString(form.getMinDate()),
                                                        convertDateToString(form.getMaxDate()));
    }

    @Override
    public List<Object[]> thongKeDoanhThuChiTietTheoLoaiSanPham(DonHangFillerForm form, Integer maLoaiSanPham) {
        return repository.getDoanhThuChiTietTheoLoaiSanPham(maLoaiSanPham, convertDateToString(form.getMinDate()), convertDateToString(form.getMaxDate()));
    }



    @Override
    public List<Object[]> thongKeChiTieu(DonHangFillerForm form, List<Integer> maLoaiSanPham) {
        return phieuNhapKhoRepository.thongKeChiTieu(
            convertDateToString(form.getMinDate()),
            convertDateToString(form.getMaxDate()),
            maLoaiSanPham);
    }

    @Override
    public List<Object[]> thongKeTongChiTieu(DonHangFillerForm form) {
        return phieuNhapKhoRepository.thongKeTongChiTieu(
            convertDateToString(form.getMinDate()),
            convertDateToString(form.getMaxDate())
        );
    }

    @Override
    public List<Object[]> thongKeChiTieuChiTietTheoLoaiSanPham(DonHangFillerForm form, Integer maLoaiSanPham) {
        return phieuNhapKhoRepository.thongKeChiTieuTheoLoaiSanPham(
            convertDateToString(form.getMinDate()),
            convertDateToString(form.getMaxDate()),
            maLoaiSanPham
        );
    }

    private String convertDateToString(Date date){
        if (date != null){
            // Định dạng ngày theo yyyy-MM-dd
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            return sdf.format(date);
        }
        return null;
    }


}
