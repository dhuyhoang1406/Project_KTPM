package PTTKHT_BackEnd.Specification.NhaCungCap;

import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import com.mysql.cj.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

public class NhaCungCapSpecification {

    public static Specification<NhaCungCap> buildWhere(String search){
        Specification<NhaCungCap> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            NhaCungCapCustomSpecification tenNCC = new NhaCungCapCustomSpecification("tenNCC", search);
            where = Specification.where(tenNCC);
        }

        return where;
    }
}
