package PTTKHT_BackEnd.Repository;

import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThaiDonHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ITrangThaiDonHangRepository extends JpaRepository<TrangThaiDonHang, TrangThaiDonHang.TrangThaiDonHangPK>, JpaSpecificationExecutor<TrangThaiDonHang> {
    Page<TrangThaiDonHang> findAllByDonHang_MaDH(Integer maDH, Pageable pageable);

    Optional<TrangThaiDonHang> findFirstByDonHangMaDHOrderByNgayCapNhatDesc(Integer maDH);

//    @Query("SELECT t FROM TrangThaiDonHang t WHERE t.donHang.maDH = :maDH ORDER BY t.id.ngayCapNhat DESC")
//    Optional<TrangThaiDonHang> findLatestTrangThaiByMaDH(@Param("maDH") Integer maDH);

}
