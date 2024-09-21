package PTTKHT_BackEnd.Form.SanPham;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SanPhamUpdateForm {

        @NotBlank(message = "Không được để trống tên sản phẩm !!")
        private String tenSP;

        @NotBlank(message = "Không được để trống xuất xứ !!")
        private String xuatXu;

        @NotBlank(message = "Không được để trống thương hiệu!!")
        private String thuongHieu;

        @NotNull(message = "Không được để trống xuất xứ !!")
        @Positive(message = "Thể tích phải lớn hơn 0 !!")
        private Short theTich;

        @NotNull(message = "Không được để trống nồng độ cồn !!")
        @DecimalMin(value = "0.0", message = "Nồng độ cồn phải lớn hơn hoặc bằng 0 !!")
        @DecimalMax(value = "100.0", message = "Nồng độ cồn phải nhỏ hơn hoặc bằng 100 !!")
        private Float nongDoCon;

        // @Positive(message = "Giá phải là số dương !!")
        // @NotNull(message = "Không được để trống giá bán !!")
        // private Float gia;

        @NotNull
        private String anhMinhHoa;

        @NotNull(message = "Không được để trống mã loại sản phẩm !!")
        private Integer maLoaiSanPham;

        public SanPhamUpdateForm() {}
    }

