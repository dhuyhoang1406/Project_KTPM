package PTTKHT_BackEnd.Entity.SanPham;

import PTTKHT_BackEnd.Entity.CTDH.CTDH;
import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import PTTKHT_BackEnd.Entity.LoaiSanPham.LoaiSanPham;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "SanPham")
@Data
public class SanPham implements Serializable {

    @Column(name = "MaSP")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maSP;

    @Column(name = "TenSP", nullable = false, unique = true)
    private String tenSP;

    @Column(name = "XuatXu", nullable = false)
    private String xuatXu;

    @Column(name = "ThuongHieu", nullable = false)
    private String thuongHieu;

    @Column(name = "TheTich", nullable = false)
    private Short theTich;

    @Column(name = "NongDoCon", nullable = false)
    private Float nongDoCon;

    @Column(name = "Gia", nullable = false)
    private Integer gia;

    @Column(name = "SoLuongConLai")
    private Integer soLuongConLai;

    @Column(name = "AnhMinhHoa")
    @Lob
    private String anhMinhHoa;

    @Column(name = "TrangThai")
    private Boolean trangThai;

    @ManyToOne
    @JoinColumn(name = "MaLoaiSanPham")
    private LoaiSanPham loaiSanPham;

    @OneToMany(mappedBy = "sanPham")
    private List<CTPNK> danhSachCTPNK;

    @OneToMany(mappedBy = "sanPham")
    private List<CTDH> danhSachCTDH;

    @PrePersist
    void prePersists(){
        if (soLuongConLai == null){
            setSoLuongConLai(0);
        }

        if (trangThai == null){
            setTrangThai(true);
        }
    }

}
