package PTTKHT_BackEnd.Specification.DonHang;

    import PTTKHT_BackEnd.Entity.DonHang.DonHang;
    import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThaiDonHang;
    import jakarta.persistence.criteria.*;
    import lombok.NonNull;
    import lombok.RequiredArgsConstructor;
    import org.springframework.cglib.core.Local;
    import org.springframework.data.jpa.domain.Specification;

    import java.time.LocalDate;
    import java.util.Date;

@RequiredArgsConstructor
public class DonHangCustomSpecification implements Specification<DonHang> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<DonHang> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("minDate")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("ngayDat").as(java.sql.Date.class) , (Date) value);
        }

        if (field.equalsIgnoreCase("maxDate")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("ngayDat").as(java.sql.Date.class) , (Date) value);
        }

//        if (field.equalsIgnoreCase("trangThai")) {
//
//            // Tạo subquery để lấy ra ngày cập nhật mới nhất của mỗi đơn hàng
//            Subquery<Date> subquery = query.subquery(Date.class);
//            Root<TrangThaiDonHang> subRoot = subquery.from(TrangThaiDonHang.class);
//
//            // Tìm ngày cập nhật mới nhất của trạng thái đơn hàng với mã đơn hàng tương ứng
//            subquery.select(criteriaBuilder.greatest(subRoot.get("ngayCapNhat")))
//                .where(criteriaBuilder.equal(subRoot.get("maDH"), root.get("maDH")));
//
//            // Tạo một Predicate để so sánh ngày cập nhật của Trạng Thái Đơn hàng với ngày mới nhất của đơn hàng
//            Predicate ngayCapNhatPredicate = criteriaBuilder.equal(root.get("ngayCapNhat"), subquery);
//
//            // Tạo một Predicate để so sánh trạng thái của Trạng Thái Đơn hàng với giá trị cần tìm kiếm
//            Predicate trangThaiPredicate = criteriaBuilder.equal(root.get("danhSachTrangThai").get("trangThai"), value);
//
//            // Kết hợp các Predicate với nhau bằng AND
//            Predicate finalPredicate = criteriaBuilder.and(ngayCapNhatPredicate, trangThaiPredicate);
//
//            return finalPredicate;
//        }







        return null;
    }
}
