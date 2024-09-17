package PTTKHT_BackEnd.Entity.CTDH;

import PTTKHT_BackEnd.Entity.DonHang.DonHang;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "CTDH")
@Data
public class CTDH implements Serializable {

    @EmbeddedId
    private CTDHPK id;

    @Column(name = "DonGia", nullable = false)
    private Float donGia;

    @Column(name = "SoLuong", nullable = false)
    private Integer soLuong;

    @Column(name = "ThanhTien", nullable = false)
    private Integer thanhTien;

    @ManyToOne
    @MapsId("maDH")
    @JoinColumn(name = "MaDH", referencedColumnName = "MaDH")
    private DonHang donHang;

    @ManyToOne
    @MapsId("maSP")
    @JoinColumn(name = "MaSP", referencedColumnName = "MaSP")
    private SanPham sanPham;

    @Data
    @Embeddable
    public static class CTDHPK{

        @Column(name = "MaDH")
        private Integer maDH;

        @Column(name = "MaSP")
        private Integer maSP;

    }

}
