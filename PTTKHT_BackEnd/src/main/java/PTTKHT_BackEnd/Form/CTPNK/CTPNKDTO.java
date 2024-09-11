package PTTKHT_BackEnd.Form.CTPNK;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
public class CTPNKDTO {

    @NonNull
    private String tenSanPham;

    @NonNull
    private Integer soLuong;

    @NonNull
    private Integer donGiaNhap;

    @NonNull
    private Integer thanhTien;

    @NonNull
    @JsonProperty("anhMinhHoa")
    private String sanPhamAnhMinhHoa;
    public CTPNKDTO(){}

}
