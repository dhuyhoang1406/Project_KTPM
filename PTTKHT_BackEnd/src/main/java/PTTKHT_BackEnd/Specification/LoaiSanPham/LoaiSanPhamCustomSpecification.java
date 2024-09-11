package PTTKHT_BackEnd.Specification.LoaiSanPham;

import PTTKHT_BackEnd.Entity.LoaiSanPham.LoaiSanPham;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

@Data
public class LoaiSanPhamCustomSpecification implements Specification<LoaiSanPham> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<LoaiSanPham> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("tenLoaiSanPham")){
            return criteriaBuilder.like(root.get("tenLoaiSanPham") ,"%" + value  + "%");
        }

        return null;
    }
}
