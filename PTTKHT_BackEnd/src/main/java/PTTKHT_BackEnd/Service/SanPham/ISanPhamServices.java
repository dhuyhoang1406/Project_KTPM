package PTTKHT_BackEnd.Service.SanPham;

import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Form.SanPham.SanPhamCreateForm;
import PTTKHT_BackEnd.Form.SanPham.SanPhamFillerForm;
import PTTKHT_BackEnd.Form.SanPham.SanPhamUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;

public interface ISanPhamServices {

    SanPham getSanPhamByTenSP(String tenSP);

    boolean isTenSPExists(String tenSP);

    SanPham getSanPhamById(Integer id);

    Page<SanPham> getAllSanPham(Pageable pageable, String search, SanPhamFillerForm form);

    void createSanPham(SanPhamCreateForm form) throws Exception;

    void updateSanPham(int maSP, SanPhamUpdateForm form) throws Exception;

    void forSaleSanPham(int maSP);

    void notForSaleSanPham(int maSP);
}
