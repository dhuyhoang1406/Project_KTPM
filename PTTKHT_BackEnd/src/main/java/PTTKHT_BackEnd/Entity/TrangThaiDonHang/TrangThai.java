package PTTKHT_BackEnd.Entity.TrangThaiDonHang;

public enum TrangThai {
    ChoDuyet,
    DaDuyet,
    Huy,
    GiaoThanhCong;

    public static TrangThai convertFromString(String value) {
        switch (value) {
            case "ChoDuyet":
                return TrangThai.ChoDuyet;
            case "DaDuyet":
                return TrangThai.DaDuyet;
            case "Huy":
                return TrangThai.Huy;
            case "GiaoThanhCong":
                return TrangThai.GiaoThanhCong;
            default:
                throw new IllegalArgumentException("Không tồn tại trạng thái: " + value);
        }
    }
}
