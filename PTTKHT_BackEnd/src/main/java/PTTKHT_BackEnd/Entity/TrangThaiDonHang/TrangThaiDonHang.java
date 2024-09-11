package PTTKHT_BackEnd.Entity.TrangThaiDonHang;

import PTTKHT_BackEnd.Entity.DonHang.DonHang;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Table(name = "TrangThaiDonHang")
@Entity
@Data
public class TrangThaiDonHang {

    @EmbeddedId
    private TrangThaiDonHangPK id;

    @ManyToOne
    @MapsId("MaDH")
    @JoinColumn(name = "MaDH", referencedColumnName = "MaDH")
    private DonHang donHang;

    @Column(name = "NgayCapNhat")
    private LocalDateTime ngayCapNhat;



    @PrePersist
    public void prePersist(){
        if (id.getTrangThai() == null){
            id.setTrangThai(TrangThai.ChoDuyet);
        }
    }

    @Embeddable
    @Data
    public static class TrangThaiDonHangPK implements Serializable {

        @Column(name = "TrangThai")
        @Enumerated(EnumType.STRING)
        private TrangThai trangThai;

        @Column(name = "MaDH")
        private Integer maDH;

        public TrangThaiDonHangPK(){}

    }

}
