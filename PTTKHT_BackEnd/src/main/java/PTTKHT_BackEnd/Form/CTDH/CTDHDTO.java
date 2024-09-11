package PTTKHT_BackEnd.Form.CTDH;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NonNull;

@Data
public class CTDHDTO {

    @NonNull
    private String tenSanPham;

    @NonNull
    private Integer donGia;

    @NonNull
    private Integer soLuong;

    @NonNull
    private Integer thanhTien;

    @NonNull
    @JsonProperty("anhMinhHoa")
    private String sanPhamAnhMinhHoa;
    public CTDHDTO(){}
}
