package PTTKHT_BackEnd.Specification.TaiKhoan;

import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanFillerForm;
import com.mysql.cj.util.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class TaiKhoanSpecification {
    public static Specification<TaiKhoan> buildWhere(String search, TaiKhoanFillerForm form) {
        Specification<TaiKhoan> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            TaiKhoanCustomSpecification hoTen = new TaiKhoanCustomSpecification("hoTen", search);
            TaiKhoanCustomSpecification email = new TaiKhoanCustomSpecification("email", search);

            where = Specification.where(hoTen).or(email);

        }

        if (form != null && form.getVaiTro() != null){
            TaiKhoanCustomSpecification vaiTro = new TaiKhoanCustomSpecification("vaiTro", form.getVaiTro());
            if (where == null){
                where = Specification.where(vaiTro);
            }else{
                where = where.and(vaiTro);
            }
        }

        if (form != null && form.getTrangThai() != null){
            TaiKhoanCustomSpecification trangThai = new TaiKhoanCustomSpecification("trangThai", form.getTrangThai());
            if (where == null){
                where = Specification.where(trangThai);
            }else{
                where = where.and(trangThai);
            }
        }

        if (form != null && form.getMinNgayTao() != null){
            TaiKhoanCustomSpecification minNgayTao = new TaiKhoanCustomSpecification("minNgayTao", form.getMinNgayTao());
            if (where == null){
                where = Specification.where(minNgayTao);
            }else{
                where = where.and(minNgayTao);
            }
        }


        if (form != null && form.getMaxNgayTao() != null){
            TaiKhoanCustomSpecification maxNgayTao = new TaiKhoanCustomSpecification("maxNgayTao", form.getMaxNgayTao());
            if (where == null){
                where = Specification.where(maxNgayTao);
            }else{
                where = where.and(maxNgayTao);
            }
        }

        return where;
    }
}

