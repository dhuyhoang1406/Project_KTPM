package PTTKHT_BackEnd.Repository;

import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPhieuNhapKhoRepository extends JpaRepository<PhieuNhapKho, Integer>, JpaSpecificationExecutor<PhieuNhapKho> {
    @Query(value = "SELECT DATE(pnk.ngayNhapKho) AS ngayNhap, " +
        "ls.tenLoaiSanPham AS tenLoaiSanPham, " +
        "SUM(ct.SoLuong) AS SoLuongNhap, " +
        "SUM(ct.ThanhTien) AS TongChi " +
        "FROM PhieuNhapKho pnk " +
        "JOIN CTPNK ct ON pnk.MaPhieu = ct.MaPhieu " +
        "JOIN SanPham sp ON ct.MaSP = sp.MaSP " +
        "JOIN LoaiSanPham ls ON ls.maLoaiSanPham = sp.MaLoaiSanPham " +
        "AND DATE(pnk.ngayNhapKho) BETWEEN COALESCE(:minDate, '2010-01-01') AND COALESCE(:maxDate, CURRENT_DATE()) " +
        "AND ls.maLoaiSanPham IN (:maLoaiSanPhams) " +
        "GROUP BY DATE(pnk.ngayNhapKho), ls.tenLoaiSanPham " +
        "ORDER BY DATE(pnk.ngayNhapKho)",
        nativeQuery = true)
    List<Object[]> thongKeChiTieu(@Param("minDate") String minDate,
                                  @Param("maxDate") String maxDate,
                                  @Param("maLoaiSanPhams") List<Integer> maLoaiSanPhams);


    @Query(value = "SELECT DATE(pnk.ngayNhapKho), " +
        "SUM(ct.SoLuong) AS SoLuongDaNhap, " +
        "SUM(ct.ThanhTien) AS ChiTieu " +
        "FROM PhieuNhapKho pnk " +
        "JOIN CTPNK ct ON pnk.MaPhieu = ct.MaPhieu " +
        "AND DATE(pnk.ngayNhapKho) BETWEEN COALESCE(:minDate, '2010-01-01') AND COALESCE(:maxDate, NOW()) " +
        "GROUP BY DATE(pnk.ngayNhapKho) " +
        "ORDER BY DATE(pnk.ngayNhapKho)",
        nativeQuery = true)
    List<Object[]> thongKeTongChiTieu(@Param("minDate") String minDate,
                                        @Param("maxDate") String maxDate);

    @Query(value = "SELECT sp.tenSP, SUM(ct.SoLuong) AS SoLuongDaNhap, SUM(ct.ThanhTien) AS ChiTieu " +
        "FROM PhieuNhapKho pnk " +
        "JOIN CTPNK ct ON pnk.maPhieu = ct.maPhieu " +
        "JOIN SanPham sp ON sp.maSP = ct.maSP " +
        "WHERE sp.maLoaiSanPham = :maLoaiSanPham " +
        "AND DATE(pnk.ngayNhapKho) BETWEEN COALESCE(:minDate, '2010-01-01') AND COALESCE(:maxDate, CURRENT_DATE()) " +
        "GROUP BY sp.tenSP " +
        "ORDER BY sp.maSP",
        nativeQuery = true)
    List<Object[]> thongKeChiTieuTheoLoaiSanPham(@Param("minDate") String minDate, @Param("maxDate") String maxDate, @Param("maLoaiSanPham") Integer maLoaiSanPham);

    List<PhieuNhapKho> findAllByNhaCungCap_MaNCC(Integer maNCC);

}
