package PTTKHT_BackEnd.Repository;

import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ISanPhamRepository extends JpaRepository<SanPham, Integer>, JpaSpecificationExecutor<SanPham> {
    List<SanPham> findAllByLoaiSanPham_MaLoaiSanPham(Integer maLoaiSanPham);

    boolean existsByTenSP(String tenSP);

    SanPham findSanPhamByTenSP(String tenSP);
}
