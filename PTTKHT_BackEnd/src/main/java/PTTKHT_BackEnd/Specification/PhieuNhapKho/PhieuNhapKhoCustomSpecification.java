package PTTKHT_BackEnd.Specification.PhieuNhapKho;

import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

@Data
public class PhieuNhapKhoCustomSpecification implements Specification<PhieuNhapKho> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(Root<PhieuNhapKho> root,
                                 CriteriaQuery<?> query,
                                 CriteriaBuilder criteriaBuilder) {
        Specification<PhieuNhapKho> where = null;

        if (field.equalsIgnoreCase("year")){
            return criteriaBuilder.equal(
                criteriaBuilder.function("YEAR", Integer.class, root.get("ngayNhapKho")), value);
        }

        if (field.equalsIgnoreCase("month")){
            return criteriaBuilder.equal(
                criteriaBuilder.function("MONTH", Integer.class, root.get("ngayNhapKho")), value);
        }

        return null;
    }
}
