package PTTKHT_BackEnd.Service.LoaiSanPham;

import PTTKHT_BackEnd.Entity.LoaiSanPham.LoaiSanPham;
import PTTKHT_BackEnd.Form.LoaiSanPham.LoaiSanPhamCreateAndUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ILoaiSanPhamServices {

    List<LoaiSanPham> getAllLoaiSanPham();

    Page<LoaiSanPham> getAllLoaiSanPham(Pageable pageable, String search);

    LoaiSanPham getLoaiSanPhamByID(Integer maLoaiSanPham);

    boolean isTenLoaiSanPhamExists(String tenLoaiSanPham);

    void createLoaiSanPham(LoaiSanPhamCreateAndUpdateForm form) throws Exception;

    void updateLoaiSanPham(Integer maLoaiSanPham, LoaiSanPhamCreateAndUpdateForm form)  throws Exception;

    void deleteLoaiSanPham(Integer maLoaiSanPham);
}
