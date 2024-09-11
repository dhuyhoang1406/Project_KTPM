package PTTKHT_BackEnd.Controller;

import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import PTTKHT_BackEnd.Form.DonHang.DonHangFillerForm;
import PTTKHT_BackEnd.Form.ThongKe.ChiTietTheoLoaiSanPham.ThongKeChiTieuChiTietTheoLoaiSanPhamDTO;
import PTTKHT_BackEnd.Form.ThongKe.ChiTietTheoLoaiSanPham.ThongKeDoanhThuChiTietTheoLoaiSanPhamDTO;
import PTTKHT_BackEnd.Form.ThongKe.ChiTieu.ThongKeChiTieuDTO;
import PTTKHT_BackEnd.Form.ThongKe.ChiTieu.ThongKeChiTieuTheoLoaiSanPhamDTO;
import PTTKHT_BackEnd.Form.ThongKe.ChiTieu.ThongKeTongChiTieuTheoNgayDTO;
import PTTKHT_BackEnd.Form.ThongKe.DoanhThu.ThongKeDoanhThuDTO;
import PTTKHT_BackEnd.Form.ThongKe.DoanhThu.ThongKeDoanhThuLoaiSanPhamDTO;
import PTTKHT_BackEnd.Form.ThongKe.DoanhThu.ThongKeTongDoanhThuTheoNgayDTO;
import PTTKHT_BackEnd.Form.ThongKe.DonHang.ThongKeDonHangDTO;
import PTTKHT_BackEnd.Form.ThongKe.DonHang.ThongKeDonHangChiTietDTO;
import PTTKHT_BackEnd.Service.DonHang.IDonHangServices;
import PTTKHT_BackEnd.Service.ThongKe.IThongKeServices;
import PTTKHT_BackEnd.Service.TrangThaiDonHang.ITrangThaiDonHangServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/v1/ThongKe")
@CrossOrigin(origins = "*")
public class ThongKeController {

    @Autowired
    private IDonHangServices donHangServices;

    @Autowired
    @Lazy
    private ITrangThaiDonHangServices trangThaiDonHangServices;

    @Autowired
    private IThongKeServices thongKeServices;


    @GetMapping("/DonHang")
    public List<ThongKeDonHangDTO> getThongKeDonHang(DonHangFillerForm form) {

        /*****
         * resultSQL: Là bảng kết quả trả về từ SQL. Các phần tử là các Object[]
         *          Object[0]: Ngày tháng năm (java.sql.Date)
         *          Object[1]: Trạng thái (String)
         *          Object[2]: Số lượng (Long)
         *
         */


        List<Object[]> resultSQL = thongKeServices.thongKeDonHang(form);

        List<ThongKeDonHangDTO> result = new ArrayList<>();


        Set<LocalDate> setDate = new LinkedHashSet<>();


        /*****
         *  Ý tưởng: #THug24
         *      1. Lấy tất cả các ngày có trong Table được trả ra thêm vào 1 tập hợp set
         *          -> Lúc này lợi dụng tính chất của Set nó sẽ tự loại bỏ những ngày trùng nhau
         *      2. Lúc này những ngày trong set sẽ là độc nhất vì thế lúc này ta bắt đầu tạo list ThongKeDonHangDTO
         *      3. Sau đó duyet lại Table trả ra và so sánh với ngày với từng phần tử trong  list ThongKeDonHangDTO
         *          -> Cái nào phù hợp thì nhét vào
         *
         *
         */


        // 1. Set sẽ gom lại các giá trị ngày duy nhất
        for (Object[] i : resultSQL) {
            // java.sql.Date -> java.time.LocalDate, nhưng chúng không thể được chuyển đổi trực tiếp với nhau vì vậy phải chuyển gián tiếp.
            java.sql.Date sqlDate = (java.sql.Date) i[0];
            setDate.add(sqlDate.toLocalDate());
        }


        // 2. Tạo trước ThongKeDonHangDTO để thêm giá trị vào
        for (LocalDate i : setDate) {
            ThongKeDonHangDTO dto = new ThongKeDonHangDTO();
            dto.setNgayDatDon(i);
            dto.setDanhSachTrangThaiVaSoLuong(new ArrayList<>());
            result.add(dto);
        }

        //Lúc này sẽ bắt đầu gom lại
        origin:
        for (Object[] i : resultSQL) {
            for (ThongKeDonHangDTO dto : result) {
                java.sql.Date sqlDate = (java.sql.Date) i[0];
                if (dto.getNgayDatDon().equals(sqlDate.toLocalDate())) {

                    ThongKeDonHangChiTietDTO chiTiet = new ThongKeDonHangChiTietDTO();

                    TrangThai trangThai = TrangThai.convertFromString(i[1].toString());
                    chiTiet.setTrangThai(trangThai);

                    chiTiet.setSoLuong(Integer.parseInt(i[2].toString()));

                    dto.getDanhSachTrangThaiVaSoLuong().add(chiTiet);
                    continue origin;
                }
            }
        }

        return result;

    }

    @GetMapping("/DoanhThu")
    public List<ThongKeDoanhThuDTO> getThongKeDoanhThu(DonHangFillerForm form,
                                                       @RequestParam(name = "type", required = false) List<Integer> danhSachLoai) {
        List<Object[]> tongDoanhThuTheoNgay = thongKeServices.thongKeTongDoanhThu(form);
        List<Object[]> tongDoanhThuTheoNgayTheoLoaiSanPham = thongKeServices.thongKeDoanhThuTheoLoaiSanPham(form, danhSachLoai);

        Set<LocalDate> setDate = new LinkedHashSet<>();
        for(Object[] i: tongDoanhThuTheoNgay){
            // java.sql.Date -> java.time.LocalDate, nhưng chúng không thể được chuyển đổi trực tiếp với nhau vì vậy phải chuyển gián tiếp.
            java.sql.Date sqlDate = (java.sql.Date) i[0];
            setDate.add(sqlDate.toLocalDate());
        }

        List<ThongKeDoanhThuDTO> listDoanhThuTheoNgayDTO = new ArrayList<>();

        // Khởi tạo từng phần tử cho listDoanhThuTheoNgayDTO (Set luôn Tong doanh thu cho từng phần tử)
        for (LocalDate i : setDate) {
            //1. Tạo ngày thống kê
            ThongKeDoanhThuDTO dto = new ThongKeDoanhThuDTO();
            dto.setNgayThongKe(i);

            //2. Tạo tổng doanh thu của ngày hôm đó
            ThongKeTongDoanhThuTheoNgayDTO thongKeDoanhThuTheoNgayDatDTO = new ThongKeTongDoanhThuTheoNgayDTO();
            dto.setTongDoanhThu(thongKeDoanhThuTheoNgayDatDTO);

            for (Object[] j : tongDoanhThuTheoNgay) {
                java.sql.Date sqlDate = (java.sql.Date) j[0];
                if (i.equals(sqlDate.toLocalDate())) {
                    dto.getTongDoanhThu().setSoLuongBanDuoc(Integer.parseInt(j[1].toString()));
                    dto.getTongDoanhThu().setTongDoanhThu(Integer.parseInt(j[2].toString()));
                    break;
                }
            }

            //3. Tạo list các loại sản phm thống kê
            dto.setListLoaiSanPham(new ArrayList<>());
            for (Object[] j : tongDoanhThuTheoNgayTheoLoaiSanPham) {
                java.sql.Date sqlDate = (java.sql.Date) j[0];

                if (dto.getNgayThongKe().equals(sqlDate.toLocalDate())) {
                    ThongKeDoanhThuLoaiSanPhamDTO newThongKe = new ThongKeDoanhThuLoaiSanPhamDTO();

                    newThongKe.setTenLoaiSanPham(j[1].toString());
                    newThongKe.setSoLuongBanDuoc(Integer.parseInt(j[2].toString()));
                    newThongKe.setTongDoanhThuTheoLoai(Integer.parseInt(j[3].toString()));

                    dto.getListLoaiSanPham().add(newThongKe);
                }

            }
            listDoanhThuTheoNgayDTO.add(dto);
        }

        return listDoanhThuTheoNgayDTO;
    }

    @GetMapping("/DoanhThu/chiTiet/{maLoaiSanPham}")
    public List<ThongKeDoanhThuChiTietTheoLoaiSanPhamDTO> getThongKeDoanhThuChiTiet(
        DonHangFillerForm form,
        @PathVariable Integer maLoaiSanPham) {
        List<Object []> sqlResult = thongKeServices.thongKeDoanhThuChiTietTheoLoaiSanPham(form, maLoaiSanPham);

        List<ThongKeDoanhThuChiTietTheoLoaiSanPhamDTO> finalResult = new ArrayList<>();

        for (Object[] dto: sqlResult){
            ThongKeDoanhThuChiTietTheoLoaiSanPhamDTO temp = new ThongKeDoanhThuChiTietTheoLoaiSanPhamDTO();
            temp.setTenSP(dto[0].toString());
            temp.setSoLuong( Integer.parseInt( dto[1].toString() ) );
            temp.setDoanhThu( Integer.parseInt( dto[2].toString() ) );
            finalResult.add(temp);
        }

        return finalResult;
    }


    @GetMapping("/ChiTieu")
    public List<ThongKeChiTieuDTO> getThongKeChiTIeu(DonHangFillerForm form,
                                                      @RequestParam(name = "type", required = false) List<Integer> danhSachLoai) {
        List<Object[]> tongChiTieuTheoNgay = thongKeServices.thongKeTongChiTieu(form);
        List<Object[]> tongChiTieuTheoNgayTheoLoaiSanPham = thongKeServices.thongKeChiTieu(form, danhSachLoai);

        Set<LocalDate> setDate = new LinkedHashSet<>();
        for(Object[] i: tongChiTieuTheoNgay){
            // java.sql.Date -> java.time.LocalDate, nhưng chúng không thể được chuyển đổi trực tiếp với nhau vì vậy phải chuyển gián tiếp.
            java.sql.Date sqlDate = (java.sql.Date) i[0];
            setDate.add(sqlDate.toLocalDate());
        }

        List<ThongKeChiTieuDTO> listChiTieuTheoNgayDTO = new ArrayList<>();

        // Khởi tạo từng phần tử cho listDoanhThuTheoNgayDTO (Set luôn Tong doanh thu cho từng phần tử)
        for (LocalDate i : setDate) {
            //1. Tạo ngày thống kê
            ThongKeChiTieuDTO dto = new ThongKeChiTieuDTO();
            dto.setNgayThongKe(i);

            //2. Tạo tổng doanh thu của ngày hôm đó
            ThongKeTongChiTieuTheoNgayDTO thongKeTongChiTieuTheoNgayDTO = new ThongKeTongChiTieuTheoNgayDTO();
            dto.setTongChiTieu(thongKeTongChiTieuTheoNgayDTO);

            for (Object[] j : tongChiTieuTheoNgay) {
                java.sql.Date sqlDate = (java.sql.Date) j[0];
                if (i.equals(sqlDate.toLocalDate())) {
                    dto.getTongChiTieu().setSoLuongNhap(Integer.parseInt(j[1].toString()));
                    dto.getTongChiTieu().setTongChiTieu(Integer.parseInt(j[2].toString()));
                    break;
                }
            }

            //3. Tạo list các loại sản phm thống kê
            dto.setListLoaiSanPham(new ArrayList<>());
            for (Object[] j : tongChiTieuTheoNgayTheoLoaiSanPham) {
                java.sql.Date sqlDate = (java.sql.Date) j[0];

                if (dto.getNgayThongKe().equals(sqlDate.toLocalDate())) {
                    ThongKeChiTieuTheoLoaiSanPhamDTO newThongKe = new ThongKeChiTieuTheoLoaiSanPhamDTO();

                    newThongKe.setTenLoaiSanPham(j[1].toString());
                    newThongKe.setSoLuongNhap(Integer.parseInt(j[2].toString()));
                    newThongKe.setTongChiTieuTheoLoai(Integer.parseInt(j[3].toString()));

                    dto.getListLoaiSanPham().add(newThongKe);
                }

            }
            listChiTieuTheoNgayDTO.add(dto);
        }

        return listChiTieuTheoNgayDTO;
    }

    @GetMapping("/ChiTieu/chiTiet/{maLoaiSanPham}")
    public List<ThongKeChiTieuChiTietTheoLoaiSanPhamDTO> getThongKeChiTieuChiTiet(
        DonHangFillerForm form,
        @PathVariable Integer maLoaiSanPham) {
        List<Object []> sqlResult = thongKeServices.thongKeChiTieuChiTietTheoLoaiSanPham(form, maLoaiSanPham);

        List<ThongKeChiTieuChiTietTheoLoaiSanPhamDTO> finalResult = new ArrayList<>();

        for (Object[] dto: sqlResult){
            ThongKeChiTieuChiTietTheoLoaiSanPhamDTO temp = new ThongKeChiTieuChiTietTheoLoaiSanPhamDTO();
            temp.setTenSP(dto[0].toString());
            temp.setSoLuong( Integer.parseInt( dto[1].toString() ) );
            temp.setChiTieu( Integer.parseInt( dto[2].toString() ) );
            finalResult.add(temp);
        }

        return finalResult;
    }

}