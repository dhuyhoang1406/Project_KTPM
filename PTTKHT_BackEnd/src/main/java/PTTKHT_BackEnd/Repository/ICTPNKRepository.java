package PTTKHT_BackEnd.Repository;

import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ICTPNKRepository extends JpaRepository<CTPNK, CTPNK.CTPNKPK>, JpaSpecificationExecutor<CTPNK> {
    Page<CTPNK> findAllByPhieuNhapKho_MaPhieu(Integer maPhieu, Pageable pageable);
    Optional<CTPNK> findFirstById_MaSPAndTrangThai(int maSP, int trangThai);


}
