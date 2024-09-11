package PTTKHT_BackEnd.Specification.NhaCungCap;

import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
@RequiredArgsConstructor
public class NhaCungCapCustomSpecification implements Specification<NhaCungCap> {

    @NonNull
    private String field;
    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<NhaCungCap> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {
        if (field.equalsIgnoreCase("tenNCC")){
            return criteriaBuilder.like(root.get("tenNCC") ,"%" + value  + "%");
        }

        return null;
    }
}
