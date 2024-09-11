package PTTKHT_BackEnd.Entity.DonHang;


import PTTKHT_BackEnd.Entity.CTDH.CTDH;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThaiDonHang;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "DonHang")
@Data
public class DonHang implements Serializable {

    @Column(name = "MaDH")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maDH;

    @Column(name = "ngayDat", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime ngayDat;

    @Column(name = "TongGiaTri", nullable = false)
    private Integer tongGiaTri;

    @Column(name = "PhuongThucThanhToan", nullable = false)
    @Enumerated(EnumType.STRING)
    private PhuongThucThanhToan phuongThucThanhToan;

    @Column(name = "PhuongThucVanChuyen", nullable = false)
    @Enumerated(EnumType.STRING)
    private PhuongThucVanChuyen phuongThucVanChuyen;

    @Column(name = "DiaChiGiaoHang", nullable = false)
    private String diaChiGiaoHang;

    @ManyToOne
    @JoinColumn(name = "MaKH", nullable = false)
    private TaiKhoan khachHang;

    @OneToMany(mappedBy = "donHang")
    private List<TrangThaiDonHang> danhSachTrangThai;

    @OneToMany(mappedBy = "donHang")
    private List<CTDH> danhSachCTDH;

    @PrePersist
    public void prePersist(){
        if (ngayDat == null){
            ngayDat = LocalDateTime.now();
        }
    }

}
