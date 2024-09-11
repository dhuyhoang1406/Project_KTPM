package PTTKHT_BackEnd.Repository;

import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface INhaCungCapRepository extends JpaRepository<NhaCungCap, Integer>, JpaSpecificationExecutor<NhaCungCap> {
    boolean existsByTenNCC(String tenNCC);

    NhaCungCap findByTenNCC(String tenNCC);

}
