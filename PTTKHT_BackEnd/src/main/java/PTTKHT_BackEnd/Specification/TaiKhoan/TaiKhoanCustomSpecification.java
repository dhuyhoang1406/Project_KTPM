package PTTKHT_BackEnd.Specification.TaiKhoan;

import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

@RequiredArgsConstructor

public class TaiKhoanCustomSpecification implements Specification<TaiKhoan>{

    @NonNull
    private String field;

    @NonNull
    private Object value;


    @Override
    public Predicate toPredicate(@NonNull Root<TaiKhoan> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {
        if (field.equalsIgnoreCase("hoTen")){
            return criteriaBuilder.like(root.get("hoTen"), "%" + value + "%");
        }

        if (field.equalsIgnoreCase("email")){
            return criteriaBuilder.like( root.get("email") , "%" + value+ "%");
        }

        if (field.equalsIgnoreCase("trangThai")){
            return criteriaBuilder.equal( root.get("trangThai"), value);
        }

        if (field.equalsIgnoreCase("vaiTro")){
            return criteriaBuilder.equal(root.get("vaiTro"), value);
        }

        if (field.equalsIgnoreCase("minNgayTao")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("ngayTao").as(java.sql.Date.class),  (Date) value);
        }

        if (field.equalsIgnoreCase("maxNgayTao")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("ngayTao").as(java.sql.Date.class),  (Date) value);

        }

        return null;
    }
}
