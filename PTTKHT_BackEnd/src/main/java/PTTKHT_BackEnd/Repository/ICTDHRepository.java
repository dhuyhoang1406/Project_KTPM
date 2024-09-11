package PTTKHT_BackEnd.Repository;

import PTTKHT_BackEnd.Entity.CTDH.CTDH;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICTDHRepository extends JpaRepository<CTDH, CTDH.CTDHPK> {
    Page<CTDH> findAllByDonHang_MaDH(Integer maDH, Pageable pageable);
}
