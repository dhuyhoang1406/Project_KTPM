package PTTKHT_BackEnd.Form.LoaiSanPham;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoaiSanPhamCreateAndUpdateForm {

    @NotBlank(message = "Không được để trống tên sản phẩm !!")
    private String tenLoaiSanPham;
}
