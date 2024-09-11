package PTTKHT_BackEnd.Specification.SanPham;

import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

@RequiredArgsConstructor
public class SanPhamCustomSpecification implements Specification<SanPham> {

    @NonNull
    private String field;

    @NonNull
    private Object value;


    @Override
    public Predicate toPredicate(Root<SanPham> root,
                                 CriteriaQuery<?> query,
                                 CriteriaBuilder criteriaBuilder) {

        Specification<SanPham> where = null;

        if (field.equalsIgnoreCase("tenSP")){
            return criteriaBuilder.like(root.get("tenSP"),"%" + value + "%");
        }

        if (field.equalsIgnoreCase("minTheTich")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("theTich"), value.toString());
        }

        if (field.equalsIgnoreCase("maxTheTich")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("theTich"), value.toString());
        }

        if (field.equalsIgnoreCase("minNongDoCon")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("nongDoCon"), value.toString());
        }

        if (field.equalsIgnoreCase("maxNongDoCon")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("nongDoCon"), value.toString());
        }

        if (field.equalsIgnoreCase("minGia")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("gia"), value.toString());
        }

        if (field.equalsIgnoreCase("maxGia")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("gia"), value.toString());
        }

        if (field.equalsIgnoreCase("tenLoaiSanPham")){
            return criteriaBuilder.equal(root.get("loaiSanPham").get("tenLoaiSanPham"), value.toString());
        }

        if (field.equalsIgnoreCase("trangThai")){
            return criteriaBuilder.equal(root.get("trangThai"), value);
        }

        return null;
    }
}
