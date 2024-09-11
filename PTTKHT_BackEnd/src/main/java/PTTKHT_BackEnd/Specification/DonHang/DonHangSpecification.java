package PTTKHT_BackEnd.Specification.DonHang;

import PTTKHT_BackEnd.Entity.DonHang.DonHang;
import PTTKHT_BackEnd.Form.DonHang.DonHangFillerForm;
import org.springframework.data.jpa.domain.Specification;

public class DonHangSpecification {
    public static Specification<DonHang> buildWhere(DonHangFillerForm form){
        Specification<DonHang> where = null;

        if (form != null && form.getMinDate() != null){
            Specification<DonHang> minDate = new DonHangCustomSpecification("minDate", form.getMinDate());
            if (where == null){
                where = Specification.where(minDate);
            }else{
                where.and(minDate);
            }
        }

        if (form != null && form.getMaxDate() != null){
            Specification<DonHang> maxDate = new DonHangCustomSpecification("maxDate", form.getMaxDate());
            if (where == null){
                where = Specification.where(maxDate);
            }else{
                where.and(maxDate);
            }
        }

//        if (form != null && form.getTrangThai() != null){
//            Specification<DonHang> trangThai = new DonHangCustomSpecification("trangThai", form.getTrangThai());
//            if (where == null){
//                where = Specification.where(trangThai);
//            }else{
//                where.and(trangThai);
//            }
//        }

        return where;
    }
}
