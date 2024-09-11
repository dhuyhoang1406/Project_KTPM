package PTTKHT_BackEnd.Entity.NhaCungCap;

import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "NhaCungCap")
@Data
public class NhaCungCap implements Serializable {

    @Column(name = "maNCC")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maNCC;

    @Column(name = "tenNCC", nullable = false, unique = true)
    private String tenNCC;

    @Column(name = "soDienThoai", length = 20, nullable = false)
    private String soDienThoai;

    @Column(name = "email", nullable = false)
    private String email;

    @OneToMany(mappedBy = "nhaCungCap")
    private List<PhieuNhapKho> listPhieuNhapKho;

}
