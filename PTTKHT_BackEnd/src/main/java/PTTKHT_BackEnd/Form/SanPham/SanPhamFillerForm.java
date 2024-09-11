package PTTKHT_BackEnd.Form.SanPham;

import lombok.Data;

@Data
public class SanPhamFillerForm {

    private Short minTheTich;

    private Short maxTheTich;

    private Float minNongDoCon;

    private Float maxNongDoCon;

    private Integer minGia;

    private Integer maxGia;

    private String tenLoaiSanPham;

    private Boolean trangThai;

}
