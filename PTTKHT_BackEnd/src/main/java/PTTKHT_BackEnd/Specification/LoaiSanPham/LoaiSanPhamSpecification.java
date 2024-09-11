package PTTKHT_BackEnd.Specification.LoaiSanPham;

import PTTKHT_BackEnd.Entity.LoaiSanPham.LoaiSanPham;
import com.mysql.cj.util.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class LoaiSanPhamSpecification {
    public static Specification<LoaiSanPham> buildWhere(String search){
        Specification<LoaiSanPham> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            LoaiSanPhamCustomSpecification tenLoaiSanPham = new LoaiSanPhamCustomSpecification("tenLoaiSanPham", search);
            where = Specification.where(tenLoaiSanPham);
        }

        return where;

    }
}
