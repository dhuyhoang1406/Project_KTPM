package PTTKHT_BackEnd.Entity.CTPNH;

import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;



@Entity
@Table(name = "CTPNK")
@Data
@NoArgsConstructor
public class CTPNK implements Serializable{

    @EmbeddedId
    private CTPNKPK id;

    @ManyToOne
    @MapsId("MaSP")
    @JoinColumn(name = "MaSP", referencedColumnName = "MaSP")
    private SanPham sanPham;

    @ManyToOne
    @MapsId("MaPhieu")
    @JoinColumn(name = "MaPhieu", referencedColumnName = "MaPhieu")
    private PhieuNhapKho phieuNhapKho;

    @Column(name = "SoLuong", nullable = false)
    private Integer soLuong;

    @Column(name = "DonGiaNhap", nullable = false)
    private Integer donGiaNhap;

    @Column(name = "ThanhTien", nullable = false)
    private Integer thanhTien;

    @Column(name = "TrangThaiNhap", nullable = false)
    private Integer trangThai;
    @Embeddable
    @Data
    public static class CTPNKPK implements Serializable {
        @Column(name = "MaPhieu", nullable = false)
        private Integer maPhieu;

        @Column(name = "MaSP", nullable = false)
        private Integer maSP;

        public CTPNKPK() {
        }

    }
}


