package PTTKHT_BackEnd.Repository;

import PTTKHT_BackEnd.Entity.DonHang.DonHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IDonHangRepository extends JpaRepository<DonHang, Integer>, JpaSpecificationExecutor<DonHang> {
    @Query("SELECT d FROM DonHang d WHERE d.khachHang.maTK = :maKH") // Dùng JPQL
    Page<DonHang> findAllByMaKH(@Param("maKH") Integer maKH,  Pageable pageable);


    /*******************
     *  Ý tưởng:
     *  1. Tìm đơn hàng trong range Date đầu vào
     *  2. JOIN với `TrangThaiDonHang` nhưng chỉ lấy trạng thái mới nhất đưa vào
     *  3. Group by theo ngayCapNhat, TrangThai
     *  4. Đếm số lượng đơn hàng theo từng ngày, từng trạng thái.
     *******************/
    @Query(value = "SELECT DATE(dh.NgayDat) AS ngayLapDon, tdh.TrangThai AS trangThai, COUNT(*) AS soLuongDon " +
        "FROM TrangThaiDonHang tdh " +
        "INNER JOIN DonHang dh ON tdh.MaDH = dh.MaDH " +
        "WHERE DATE(dh.NgayDat) BETWEEN COALESCE(:minDate, '2010-01-01') AND COALESCE(:maxDate, CURRENT_DATE() ) " +
        "AND tdh.NgayCapNhat = ( " +
        "SELECT MAX(tdh2.NgayCapNhat) " +
        "FROM TrangThaiDonHang tdh2 " +
        "WHERE tdh2.MaDH = tdh.MaDH " +
        ") " +
        "GROUP BY DATE(dh.NgayDat), tdh.TrangThai " +
        "ORDER BY DATE(dh.NgayDat)", nativeQuery = true)
    List<Object[]> thongKeDonHangTheoNgayVaTrangThai(
        @Param("minDate") String minDate,
        @Param("maxDate") String maxDate);


    /***
     *  Ý tưởng: Tìm tổng doanh thu của các đơn hàng trong range(minDate, maxDate)
     *      B1. Join DonHang và TrangThaiDonHang
     *      B2. Tìm DonHang có trạng thái MỚI NHẤT là "GiaoThanhCong"
     *      B3. Sau khi lọc xong thì ta sẽ cộng tongGiaTri của từng đơn lại
     */
    @Query(value = "SELECT DATE(dh.ngayDat), SUM(ct.SoLuong) AS SoLuongDaBan, SUM(ct.ThanhTien) AS DoanhThu " +
        "FROM DonHang dh " +
        "JOIN TrangThaiDonHang tt ON dh.MaDH = tt.MaDH " +
        "JOIN CTDH ct ON dh.MaDH = ct.MaDH " +
        "WHERE tt.ngayCapNhat = (" +
        "    SELECT MAX(tdh2.ngayCapNhat) " +
        "    FROM TrangThaiDonHang tdh2 " +
        "    WHERE tdh2.maDH = tt.maDH" +
        ") " +
        "AND tt.TrangThai = 'GiaoThanhCong' " +
        "AND DATE(dh.NgayDat) BETWEEN COALESCE(:minDate, '2010-01-01') AND COALESCE(:maxDate, CURRENT_DATE() ) " +
        "GROUP BY DATE(dh.ngayDat) " +
        "ORDER BY DATE(dh.ngayDat) ",
        nativeQuery = true)
    List<Object[] > tongDoanhThu(@Param("minDate") String minDate,
                                 @Param("maxDate") String maxDate);

/**********
 *  Ý tưởng: Thống kê doanh thu theo loại sản phẩm
 *      B1. Join tất cả các bản liên quan với nhau DonHang, TrangThaiDonHang, CTDH, SanPham, LoaiSanPham
 *      B2. Lọc đơn hàng theo trạng thái mới nhất là giao thành công
 *      B3. Lọc đơn hàng trong range(minDate, maxDate)
 *      B4. Đưa maLoaiSanPham bạn muốn tìm vào
 *      B5. Group By theo tenLoaiSanPham hoặc maLoaiSanPham
 *      -> Sum (Số lượng từ chi tiết đơn hàng)
 *      -> Sum (Thành tiền từ chi tiết đơn hàng)
 *********/

    @Query(nativeQuery = true, value =
    "SELECT DATE(dh.ngayDat) AS ngay, ls.tenLoaiSanPham AS tenLoaiSanPham, " +
        "SUM(ct.SoLuong) AS SoLuongDaBan, SUM(ct.ThanhTien) AS DoanhThu " +
        "FROM DonHang dh " +
        "JOIN TrangThaiDonHang tt ON dh.MaDH = tt.MaDH " +
        "JOIN CTDH ct ON dh.MaDH = ct.MaDH " +
        "JOIN SanPham sp ON ct.MaSP = sp.MaSP " +
        "JOIN LoaiSanPham ls ON ls.maLoaiSanPham = sp.MaLoaiSanPham " +
        "WHERE tt.ngayCapNhat = ( " +
        "   SELECT MAX(tdh2.ngayCapNhat) " +
        "   FROM TrangThaiDonHang tdh2 " +
        "   WHERE tdh2.maDH = tt.maDH " +
        ") AND tt.TrangThai = 'GiaoThanhCong' " +
        "AND DATE(dh.ngayDat) BETWEEN COALESCE(:minDate, '2010-01-01') AND COALESCE(:maxDate, CURRENT_DATE() ) " +
        "AND ls.maLoaiSanPham IN (:maLoaiSanPhams) " +
        "GROUP BY DATE(dh.ngayDat), ls.tenLoaiSanPham " +
        "ORDER BY DATE(dh.ngayDat)")
    List<Object[]> thongKeDoanhThuByLoaiSanPham(@Param("maLoaiSanPhams") List<Integer> maLoaiSanPhams,
                                                @Param("minDate") String minDate,
                                                @Param("maxDate") String maxDate);
    @Query(value = "SELECT sp.tenSP, SUM(ct.soLuong), SUM(ct.thanhTien) " +
        "FROM DonHang dh " +
        "JOIN CTDH ct ON dh.maDH = ct.maDH " +
        "JOIN SanPham sp ON sp.maSP = ct.maSP " +
        "JOIN TrangThaiDonHang tt ON dh.maDH = tt.maDh " +
        "WHERE tt.ngayCapNhat = ( " +
        "    SELECT MAX(tdh2.ngayCapNhat) " +
        "    FROM TrangThaiDonHang tdh2 " +
        "    WHERE tdh2.maDH = tt.maDH " +
        ") AND tt.TrangThai = 'GiaoThanhCong' " +
        "AND sp.maLoaiSanPham = :maLoaiSanPham " +
        "AND DATE(dh.ngayDat) BETWEEN COALESCE(:minDate, '2010-01-01') AND COALESCE(:maxDate, CURRENT_DATE() ) " +
        "GROUP BY sp.tenSP " +
        "ORDER BY sp.maSP", nativeQuery = true)
    List<Object[]> getDoanhThuChiTietTheoLoaiSanPham(@Param("maLoaiSanPham") Integer maLoaiSanPham,
                                                         @Param("minDate") String minDate,
                                                         @Param("maxDate") String maxDate);

}
