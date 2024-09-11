package PTTKHT_BackEnd.Repository;

import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ITaiKhoanRepository extends JpaRepository<TaiKhoan, Integer>, JpaSpecificationExecutor<TaiKhoan> {
    TaiKhoan findByEmail(String email);

    boolean existsByEmail(String email);

}
