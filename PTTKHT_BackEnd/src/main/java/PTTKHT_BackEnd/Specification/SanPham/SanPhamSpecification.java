package PTTKHT_BackEnd.Specification.SanPham;

import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Form.SanPham.SanPhamFillerForm;
import PTTKHT_BackEnd.Specification.TaiKhoan.TaiKhoanCustomSpecification;
import com.mysql.cj.util.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class SanPhamSpecification {
    public static Specification<SanPham> buildWhere(String search, SanPhamFillerForm form){

        Specification<SanPham> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            SanPhamCustomSpecification tenSP = new SanPhamCustomSpecification("tenSP", search);
            where = Specification.where(tenSP);
        }

        if (form != null && form.getTrangThai() != null){
            SanPhamCustomSpecification trangThai = new SanPhamCustomSpecification("trangThai", form.getTrangThai());

            if (where == null){
                where = Specification.where(trangThai);

            }else{
                where = where.and(trangThai);
            }
        }

        if (form != null && form.getMinTheTich() != null){
            SanPhamCustomSpecification minTheTich = new SanPhamCustomSpecification("minTheTich", form.getMinTheTich());

            if (where == null){
                where = Specification.where(minTheTich);
            }
            else{
                where = where.and(minTheTich);
            }
        }

        if (form != null && form.getMaxTheTich() != null){
            SanPhamCustomSpecification maxTheTich = new SanPhamCustomSpecification("maxTheTich", form.getMaxTheTich());
            if (where == null){
                where = Specification.where(maxTheTich);
            }
            else{
                where = where.and(maxTheTich);
            }
        }

        if (form != null && form.getMinNongDoCon() != null){
            SanPhamCustomSpecification minNongDoCon = new SanPhamCustomSpecification("minNongDoCon", form.getMinNongDoCon());
            if (where == null){
                where = Specification.where(minNongDoCon);
            }else {
                where = where.and(minNongDoCon);
            }
        }

        if (form != null && form.getMaxNongDoCon() != null){
            SanPhamCustomSpecification maxNongDoCon = new SanPhamCustomSpecification("maxNongDoCon", form.getMaxNongDoCon());
            if (where == null){
                where = Specification.where(maxNongDoCon);
            }else {
                where = where.and(maxNongDoCon);
            }
        }

        if (form != null && form.getMinGia() != null){
            SanPhamCustomSpecification minGia = new SanPhamCustomSpecification("minGia", form.getMinGia());
            if (where == null){
                where = Specification.where(minGia);
            }else {
                where = where.and(minGia);
            }

        }

        if (form != null && form.getMaxGia() != null){
            SanPhamCustomSpecification maxGia = new SanPhamCustomSpecification("maxGia", form.getMaxGia());
            if (where == null){
                where = Specification.where(maxGia);
            }else {
                where = where.and(maxGia);
            }
        }


        if (form != null && form.getTenLoaiSanPham() != null){
            SanPhamCustomSpecification tenLoaiSanPham = new SanPhamCustomSpecification("tenLoaiSanPham", form.getTenLoaiSanPham());
            if (where == null){
                where = Specification.where(tenLoaiSanPham);
            }else {
                where = where.and(tenLoaiSanPham);
            }
        }



            return where;

    }

}
