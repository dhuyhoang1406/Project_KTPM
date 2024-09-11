# PTTKHTT_Project
## List Member
### Ngô Tuấn Hưng - 3122560028
### Lai Tấn Tài - 3122410366
### Trương Hữu Nghĩa - 3122410263 
### Nguyễn Thanh Điền - 3122560013

## Web Design 
### v1.0 : Initial Design


# Frontend 
### v1.0 : Initial Project 
# Ý tưởng thiết kế giao diện LaiTanTai ( admin , seller , manager , ceo)
# Thực hiện giao diện 
## Lai Tấn Tài ( Các phần chức năng đã thực hiện )
### Các chức năng quan trọng :
### `User` : `Sản Phẩm` ( Giao diện chưa gắn API ) Hoàn thành bởi `Lai Tấn Tài`

### `Admin` : `Tài Khoản` ( Bảng Tài Khoản , Tạo tài Khoản , Xóa Tài Khoản , Cập Nhật Tài Khoản , Tìm kiếm tài khoản) Hoàn thành bởi `Lai Tấn Tài`

### `Manager` : `Sản Phẩm` ( Bảng Sản Phẩm , Tạo Sản Phẩm , Xóa Sản Phẩm , Cập Nhật Sản Phẩm , Tìm kiếm Sản Phẩm , Lọc Sản Phẩm (theo nồng độ , dung tích , mức giá)) Hoàn thành bởi `Lai Tấn Tài`
### `Manager` : `Nhà Cung Cấp` ( Bảng Nhà Cung Cấp , Tạo Nhà Cung Cấp , Xóa Nhà Cung Cấp, Cập Nhật Nhà Cung Cấp , Tìm kiếm nhà cung cấp theo tên ) Hoàn thành bởi `Lai Tấn Tài`
### `Manager` : `Nhập Kho` ( Bảng Phiếu Nhập Kho , Tạo Phiếu Nhập Kho , Xuất Phiếu Nhập Kho, Trang thêm sản phẩm vào phiếu nhập kho ( thêm sản phẩm , tìm kiếm sản phẩm nhập vào kho ) ) Hoàn thành bởi `Lai Tấn Tài`
### `Manager` : `Thống kê` ( Biểu Đồ Thống kê , Thông tin thống kê ( theo thời gian )) Hoàn thành bởi `Lai Tấn Tài`
### `Manager` : `Loại Sản Phẩm` (Bảng Loại Sản Phẩm , Thêm Loại Sản Phẩm , Xóa Loại Sản Phẩm , Cập Nhật Loại Sản Phẩm ) Hoàn thành bởi `Lai Tấn Tài`

### `Seller` : `Khách Hàng` (Bảng Khách Hàng , Thêm Khách Hàng , Xóa Khách Hàng , Cập Nhật Khách Hàng , Tìm kiếm khách hàng ) Hoàn thành bởi `Lai Tấn Tài`
### `Seller` : `Đơn Hàng` ( Bảng Đơn Hàng , Duyệt và Hủy Đơn Hàng , Xem chi tiết đơn hàng , tìm kiếm và lọc đơn hàng theo thời gian ) Hoàn thành bởi `Lai Tấn Tài`
### `Seller` : `Thống kê` ( Biều đồ thống kê , thông tin thống kê theo thời gian ) Hoàn thành bởi `Lai Tấn Tài`,

### `CEO` : `Thống kê` ( Biểu đồ thống kê bán hàng , các thông tin bán hàng và sản phẩm kho ... ) Hoàn thành bởi `Lai Tấn Tài`

### Các chức năng quan trọng hỗ trợ khác :
### `Pagination` : (phân trang kết hợp giữa backend và frontend được áp dụng với tất cả ) Hoàn thành bởi `Lai Tấn Tài`
### `Sign out` : đăng xuất ( admin , seller , ceo , manager ) Hoàn thành bởi `Lai Tấn Tài`

## Backend 
### v1.0 : Initial Project 
#### Setup Environment - Has been completed in 20/1/2024 by THug24

#### GET, POST, PUT, DELETE `TaiKhoan` - Has been completed in 22/1/2024 by THug24
#### FILLER `hoTen`, `vaiTro` - Has been completed in 22/1/2024 by THug24

#### GET, POST, PUT, DELETE `Nhà cung cấp` - Has been completed in 24/1/2024 by THug24
#### FILLER `tenNCC` - Has been completed in 24/1/2024 by THug24

#### GET, POST, PUT, DELETE `Loại sản phẩm` - Has been completed in 25/1/2024 by THug24
#### FILLER `tenLoaiSanPham` - Has been completed in 25/1/2024 by THug24

#### GET `Sản phẩm` - Has been completed in 31/1/2024 by THug24
#### FILLER `tenSanPham`, min max `Thể tích`, min max `Nồng Độ Cồn`, min max `Giá`, `Tên loại sản phẩm` - Has been completed in 31/1/2024 by THug24

### GET, POST `Đơn Hàng` - Has been completed in 1/2/2024 by THug24
### GET  `Trạng Thái Đơn Hàng` - Has been completed in 1/2/2024 by THug24
### FILLER `MaDH`- Has been completed in 1/2/2024 by THug24

### GET By MaKH (MaTK) `Đơn Hàng` - Has been completed in 2/2/2024 by THug24
### FILLER Min Date, Max Date `Đơn Hàng` - Has been completed in 2/2/2024 by THug24

### GET, POST`Phiếu nhập kho` - Has been completed in 2/2/2024 by THug24
### FILLER Month, Year `Phiếu nhập kho` - Has been completed in 2/2/2024 by THug24

### Configure `Error Response` - Has been completed in 2/2/2024 by THug24
### GET, POST, GET `CTPNK` by `MaPhieu` - Has been completed in 2/2/2024 by THug24

### POST, PUT, DELETE ` Sản phẩm`  - Has been completed in 3/2/2024 by THug24
### Chức năng `nhập kho` - Has been completed in 3/2/2024 by THug24

### POST ` Trạng Thái Đơn Hàng`- Has been completed in 3/2/2024 by THug24

### GET, GET `CTDH` by `MaDH`, POST `CTDH ` - Has been completed in 3/2/2024 by THug24
### Chức năng `mua hàng` - Has been completed in 3/2/2024 by THug24

### Chỉnh sửa API GET ` Đơn hàng` - Has been completed in 10/2/2024 by THug24
### Chức năng duyệt đơn hàng - Has been completed in 10/2/2024 by THug24

### Điều chỉnh ` CTPNKDTO`, `CTDHDTO` và các thay đổi liên quan tới sự thay đổi của Database - Has been completed in 12/2/2024 by THug24
### Bổ sung ` trạng thái` cho `Sản phẩm` - Has been completed in 12/2/2024 by THug24
### Update ` Handle Exception` - Has been completed in 12/2/2024 by THug24

### Basic Security - Has been completed in 12/2/2024 by THug24
### Chức năng Login - Has been completed in 13/2/2024 by THug24
### Chức năng Login theo Vai trò - Has been completed in 14/2/2024 by THug24

### Thống kê theo đơn hàng - Has been completed in 15/2/2024 by THug24
### Thống kê theo doanh thu (Tổng doanh thu, từng loại sản phẩm) - Has been completed in 20/2/2024 by THug24
### Thêm hình ảnh cho Sản phẩm (Base 64) - Has been completed in 23/2/2024 by THug24

### Tổng test đợt 1 (LoaiSanPham, NhaCungCap, TaiKhoan, SanPham)  - Has been completed in 23/2/2024 by THug24


## SQL Design :
### v1.0 : Initial Design 
#### ERD - Has been completed in 17/1/2024 by THug24
#### ERD - Has been modified in 20/1/2024 by THug24
#### MySQL Script - Has been completed in 21/1/2024 by THug24
#### ERD - Has been modified in 25/1/2024 by THug24 (Add Table `LoaiSanPham`)
#### ERD - Has been modified in 31/1/2024 by THug24 (Add Table `TrangThaiDonHang`)
#### ERD - Has been modified in 31/1/2024 by THug24 (Update Table `TrangThaiDonHang`)
#### ERD Thêm ` Đơn giá `, ` Thành tiền` vào `CTDH`, `CTPNK` - Has been completed in 12/2/2024 by THug24
#### ERD Thêm ` Trạng thái `vào `Tài khoản` - Has been completed in 12/2/2024 by THug24


## Essay :
### v1.0 : Initial Design 
#### I Introduction - has been completed in 24/1/2024
