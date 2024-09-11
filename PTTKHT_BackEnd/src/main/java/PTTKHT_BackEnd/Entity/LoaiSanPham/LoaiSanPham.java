package PTTKHT_BackEnd.Entity.LoaiSanPham;

import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "LoaiSanPham")
@Data
public class LoaiSanPham implements Serializable {

    @Column(name = "MaLoaiSanPham")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maLoaiSanPham;

    @Column(name = "TenLoaiSanPham", nullable = false, unique = true)
    private String tenLoaiSanPham;

    @OneToMany(mappedBy = "loaiSanPham")
    private List<SanPham> danhSachSanPham;

}
