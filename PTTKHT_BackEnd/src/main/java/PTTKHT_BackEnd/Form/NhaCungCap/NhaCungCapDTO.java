package PTTKHT_BackEnd.Form.NhaCungCap;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NonNull;


@Data
public class NhaCungCapDTO {

    @NonNull
    private Integer maNCC;

    @NonNull
    private String tenNCC;

    @NonNull
    private String soDienThoai;

    @NonNull
    private String email;
    public NhaCungCapDTO(){

    }
}
