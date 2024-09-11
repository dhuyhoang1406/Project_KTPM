package PTTKHT_BackEnd.Entity.TaiKhoan;

import PTTKHT_BackEnd.Entity.DonHang.DonHang;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Table (name = "TaiKhoan")
@Data
@Entity
public class TaiKhoan implements Serializable {
    @Column(name = "MaTK")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maTK;

    @Column(name = "HoTen", nullable = false)
    private String hoTen;

    @Temporal(TemporalType.DATE)
    @Column(name = "NgaySinh", nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")

    //NOTE !! Không nên dùng Date vì Date không được hỗ trợ chuyển múi giờ
    private LocalDate ngaySinh;

    @Column(name = "DiaChi",  nullable = false)
    private String diaChi;

    @Column(name = "GioiTinh", nullable = false)
    @Enumerated(EnumType.STRING)
    private GioiTinh gioiTinh;

    @Column(name = "SoDienThoai", length = 20, nullable = false)
    private String soDienThoai;

    @Column(name = "Email",  nullable = false, unique = true)
    private String email;

    @Column(name = "VaiTro")
    @Enumerated(EnumType.STRING)
    private VaiTro vaiTro;

    @Column(name = "MatKhau",  nullable = false)
    private String matKhau;

    @Column(name = "TrangThai", nullable = false)
    private Boolean trangThai;

    @Column(name = "NgayTao", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime ngayTao;

    @OneToMany(mappedBy = "khachHang")
    private List<DonHang> danhSachDonHang;

    @PrePersist
    public void prePersist(){
        if (vaiTro == null){
            vaiTro = VaiTro.User;
        }

        if (ngayTao == null){
            ngayTao = LocalDateTime.now();
        }

        if (trangThai == null){
            trangThai = true;
        }


    }

}
