package PTTKHT_BackEnd.Form.LoaiSanPham;

import lombok.Data;
import org.springframework.lang.NonNull;
@Data
public class LoaiSanPhamDTO {

    @NonNull
    private int maLoaiSanPham;

    @NonNull
    private String tenLoaiSanPham;

    public LoaiSanPhamDTO(){}
}
