package PTTKHT_BackEnd.Form.SanPham;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NonNull;

@Data
public class SanPhamDTO {

    @NonNull
    private Integer maSP;

    @NonNull
    private String tenSP;

    @NonNull
    private String xuatXu;

    @NonNull
    private String thuongHieu;

    @NonNull
    private Short theTich;

    @NonNull
    private Float nongDoCon;

    @NonNull
    private Integer gia;

    @NonNull
    private Integer soLuongConLai;

    @NonNull
    private Boolean trangThai;
    @NonNull
    private String maLoaiSanPham;
    @NonNull
    private String tenLoaiSanPham;

    @NonNull
    private String anhMinhHoa;



    public SanPhamDTO(){}


}
