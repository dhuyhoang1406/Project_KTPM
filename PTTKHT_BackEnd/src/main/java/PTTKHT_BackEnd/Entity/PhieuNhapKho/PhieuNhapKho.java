package PTTKHT_BackEnd.Entity.PhieuNhapKho;

import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "PhieuNhapKho")
@NoArgsConstructor
public class PhieuNhapKho implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaPhieu")
    private Integer maPhieu;

    @Column(name = "NgayNhapKho", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime ngayNhapKho;

    @Column(name = "TongGiaTri", nullable = false)
    private Integer tongGiaTri;

    @Column(name = "LoiNhuan", nullable = false)
    private Float loiNhuan;

    @ManyToOne
    @JoinColumn(name = "MaNCC", nullable = false)
    private NhaCungCap nhaCungCap;

    @ManyToOne
    @JoinColumn(name = "MaQuanLy",  nullable = false)
    private TaiKhoan quanLy;

    @OneToMany(mappedBy = "phieuNhapKho")
    private List<CTPNK> danhSachCTPNK;

    @PrePersist
    public void prePersist(){
        if (ngayNhapKho == null){
            ngayNhapKho = LocalDateTime.now();
        }
    }
}
