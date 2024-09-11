package PTTKHT_BackEnd.Specification.PhieuNhapKho;

import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import PTTKHT_BackEnd.Form.PhieuNhapKho.PhieuNhapKhoFillerForm;
import org.springframework.data.jpa.domain.Specification;

public class PhieuNhapKhoSpecification {

    public static Specification<PhieuNhapKho> buildWhere(PhieuNhapKhoFillerForm form){
        Specification<PhieuNhapKho> buildWhere = null;

        if (form != null) {
            if (form.getYear() != null) {
                Specification<PhieuNhapKho> year = new PhieuNhapKhoCustomSpecification("year", form.getYear());
                buildWhere = (buildWhere == null) ? Specification.where(year) : buildWhere.and(year);
            }

            if (form.getMonth() != null) {
                Specification<PhieuNhapKho> month = new PhieuNhapKhoCustomSpecification("month", form.getMonth());
                buildWhere = (buildWhere == null) ? Specification.where(month) : buildWhere.and(month);
            }
        }

        return buildWhere;
    }
}
