DROP DATABASE `PTTKHT_Database`;
CREATE DATABASE IF NOT EXISTS `PTTKHT_Database`;
USE `PTTKHT_Database`;

DROP TABLE IF EXISTS `TaiKhoan`;
CREATE TABLE IF NOT EXISTS `TaiKhoan` (
    `MaTK`  		INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `HoTen` 		NVARCHAR(255) 			NOT NULL,
    `NgaySinh`		DATE 					NOT NULL,
    `DiaChi` 		NVARCHAR(255) 			NOT NULL,
    `GioiTinh`  	ENUM('Male', 'Female')  NOT NULL,
    `SoDienThoai` 	NVARCHAR(20) 			NOT NULL,
    `Email` 		NVARCHAR(255) 			NOT NULL 	UNIQUE,
    `VaiTro` 		ENUM('User', 'Seller', 'Manager', 'CEO', 'Admin') 	NOT NULL,
    `MatKhau` 		NVARCHAR(255) 			NOT NULL,
    `TrangThai`     BOOLEAN                 NOT NULL    DEFAULT true,
    `NgayTao`		DATETIME                NOT NULL 	DEFAULT NOW()
);

DROP TABLE IF EXISTS `LoaiSanPham`;
CREATE TABLE IF NOT EXISTS `LoaiSanPham` (
    `MaLoaiSanPham` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `TenLoaiSanPham` NVARCHAR(255) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS `SanPham`;
CREATE TABLE IF NOT EXISTS `SanPham` (
    `MaSP` 				INT  UNSIGNED 			PRIMARY KEY AUTO_INCREMENT,
    `TenSP` 			NVARCHAR(255) 			NOT NULL 	UNIQUE,
    `XuatXu` 			NVARCHAR(255) 			NOT NULL,
	`ThuongHieu` 		NVARCHAR(255) 			NOT NULL,
    `TheTich` 			SMALLINT UNSIGNED 		NOT NULL,
    `NongDoCon` 		FLOAT UNSIGNED			NOT NULL,
    `Gia` 				INT UNSIGNED 			NOT NULL,
    `SoLuongConLai` 	INT UNSIGNED 			NOT NULL 	DEFAULT 0,
    `AnhMinhHoa` 		LONGTEXT,
	`TrangThai` 		BOOLEAN NOT NULL		DEFAULT true,
    `MaLoaiSanPham` 	INT UNSIGNED 			NOT NULL,
    FOREIGN KEY (`MaLoaiSanPHam`) REFERENCES `LoaiSanPham`(`MaLoaiSanPham`)
);



DROP TABLE IF EXISTS `DonHang`;
CREATE TABLE IF NOT EXISTS `DonHang`(
	`MaDH`  			INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `NgayDat` 			DATETIME NOT NULL, 
    `TongGiaTri` 		INT UNSIGNED NOT NULL,
	`DiaChiGiaoHang` 	NVARCHAR(255)  NOT NULL,

    `MaKH` INT UNSIGNED NOT NULL,
    `PhuongThucThanhToan` ENUM("TienMat","ChuyenKhoan"),
	`PhuongThucVanChuyen` ENUM("ChuyenPhatNhanh", "GiaoHangTietKiem"),

	FOREIGN KEY (`MaKH`) REFERENCES `TaiKhoan`(`MaTK`)
);

DROP TABLE IF EXISTS `TrangThaiDonHang`;
CREATE TABLE IF NOT EXISTS `TrangThaiDonHang`(
    `TrangThai` ENUM ("ChoDuyet", "DaDuyet", "Huy", "GiaoThanhCong") NOT NULL,
    `NgayCapNhat` DATETIME DEFAULT NOW(), -- Ngày này sẽ được cập nhật dựa theo sự thay đổi của TrangThai
	`MaDH`  INT UNSIGNED,
	FOREIGN KEY (`MaDH`) REFERENCES `DonHang`(`MaDH`),
    PRIMARY KEY(`MaDH`, `TrangThai`)
);


DROP TABLE IF EXISTS `CTDH`;
CREATE TABLE IF NOT EXISTS  `CTDH` (
	`SoLuong` INT UNSIGNED NOT NULL,
    `ThanhTien` INT UNSIGNED NOT NULL,
    `DonGia` INT UNSIGNED NOT NULL,
    `MaDH` INT UNSIGNED NOT NULL,
    `MaSP` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`MaDH`) REFERENCES `DonHang`(`MaDH`),
	FOREIGN KEY (`MaSP`) REFERENCES `SanPham`(`MaSP`),
    PRIMARY KEY (`MaDH`, `MaSP`)
);


DROP TABLE IF EXISTS `NhaCungCap`;
CREATE TABLE IF NOT EXISTS  `NhaCungCap` (
    `MaNCC` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `TenNCC` NVARCHAR(255) NOT NULL UNIQUE,
    `SoDienThoai` NVARCHAR(20) NOT NULL,
    `Email` NVARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS `PhieuNhapKho`;
CREATE TABLE IF NOT EXISTS  `PhieuNhapKho` (
    `MaPhieu` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `NgayNhapKho` DATETIME NOT NULL,
    `TongGiaTri` INT UNSIGNED NOT NULL,
    `MaNCC` INT UNSIGNED,
    `MaQuanLy` INT UNSIGNED,
    FOREIGN KEY (`MaNCC`) REFERENCES `NhaCungCap`(`MaNCC`),
	FOREIGN KEY (`MaQuanLy`) REFERENCES `TaiKhoan`(`MaTK`)
);

DROP TABLE IF EXISTS `CTPNK`;
CREATE TABLE IF NOT EXISTS  `CTPNK` (
	`SoLuong` INT UNSIGNED  NOT NULL,
    `DonGiaNhap` INT UNSIGNED NOT NULL,
	`ThanhTien` INT UNSIGNED NOT NULL,
    `MaPhieu` INT UNSIGNED,
    `MaSP` INT UNSIGNED,
    FOREIGN KEY (`MaPhieu`) REFERENCES `PhieuNhapKho`(`MaPhieu`),
	FOREIGN KEY (`MaSP`) REFERENCES `SanPham`(`MaSP`),
    PRIMARY KEY (`MaPhieu`, `MaSP`)
);

INSERT INTO `TaiKhoan`	 	(`MaTK`, 	`HoTen`, 					`NgaySinh`, 	`DiaChi`,					 `GioiTinh`, 	`SoDienThoai`, `Email`, 							`VaiTro`,			`NgayTao`		  ,`TrangThai`,			 `MatKhau`)
VALUES 						(1, 		'Ngô Tuấn Hưng', 			'2004-04-02', 	'Đại học Sài Gòn DKP1221', 	'Male',  		 '0123456789', 	'hungnt.020404@gmail.com', 			'CEO',			 '2018-01-20 10:00:00',	true	        ,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(2, 		'Lai Tấn Tài', 				'2004-10-12', 	'Đại học Sài Gòn DCT1223', 	'Male',  		 '0123456789', 	'tantai204.10@gmail.com', 			'Admin', 		 '2018-01-20 10:00:00',	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(3,  		'Trương Hữu Nghĩa', 		'2004-01-02', 	'Đại học Sài Gòn DCT1223', 	'Male',  		 '0123456789', 	'truonghuunghia0201@gmail.com', 	'Manager',       '2018-01-20 10:00:00',	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(4, 		'Nguyễn Thanh Điền', 		'2004-07-21', 	'Đại học Sài Gòn DKP1222', 	'Male',  		 '0123456789', 	'nguyenthanhdien910@gmail.com', 	'Seller',        '2018-01-20 10:00:00',	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(5, 		'Lê Nguyễn Hoàng Phát', 	'2004-06-04', 	'Đại học Sài Gòn DKP1221', 	'Male',  		 '0123456789', 	'phatlenguyen166@gmail.com', 		'User',       	 '2018-01-20 10:00:00',	true	 		,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
                            
                            (6, 		'Khách hàng 1', 			'2004-04-02', 	'Đại học Sài Gòn DKP1221', 	'Male',  		 '0123456789', 	'khachhang1@gmail.com', 			'User',			 '2020-01-20 00:00:00',	true	        ,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(7, 		'Khách hàng 2', 			'2004-10-12', 	'Đại học Sài Gòn DCT1223', 	'Male',  		 '0123456789', 	'khachhang2@gmail.com', 			'User', 		 '2020-01-20 00:00:00',	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(8,  		'Khách hàng 3', 		    '2004-01-02', 	'Đại học Sài Gòn DCT1223', 	'Male',  		 '0123456789', 	'khachhang3@gmail.com', 	        'User',          '2020-01-20 00:00:00',	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(9, 		'Khách hàng 4', 		    '2004-07-21', 	'Đại học Sài Gòn DKP1222', 	'Male',  		 '0123456789', 	'khachhang4@gmail.com', 	        'User',          '2020-01-20 00:00:00',	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(10, 		'Khách hàng 5', 	        '2004-06-04', 	'Đại học Sài Gòn DKP1221', 	'Male',  		 '0123456789', 	'khachhang5@gmail.com', 		    'User',       	 '2020-01-20 00:00:00',	false	 		,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
                            
                            (11, 		'Khách hàng 6', 			'2004-04-02', 	'Đại học Sài Gòn DKP1221', 	'Male',  		 '0123456789', 	'khachhang6@gmail.com', 			'User',			 '2023-01-20 00:00:00',	true	        ,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(12, 		'Khách hàng 7', 			'2004-10-12', 	'Đại học Sài Gòn DCT1223', 	'Male',  		 '0123456789', 	'khachhang7@gmail.com', 			'User', 		 '2023-01-20 00:00:00',	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(13,  		'Khách hàng 8', 		    '2004-01-02', 	'Đại học Sài Gòn DCT1223', 	'Male',  		 '0123456789', 	'khachhang8@gmail.com', 	        'User',          '2023-01-20 00:00:00',	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(14, 		'Khách hàng 9', 		    '2004-07-21', 	'Đại học Sài Gòn DKP1222', 	'Male',  		 '0123456789', 	'khachhang9@gmail.com', 	        'User',          '2023-01-20 00:00:00',	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(15, 		'Khách hàng 10', 	        '2004-06-04', 	'Đại học Sài Gòn DKP1221', 	'Male',  		 '0123456789', 	'khachhang10@gmail.com', 		    'User',       	 '2023-01-20 00:00:00',	false	 		,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
                        
                            (16, 		'Khách hàng 11', 			'2004-04-02', 	'Đại học Sài Gòn DKP1221', 	'Male',  		 '0123456789', 	'khachhang11@gmail.com', 			'User',			 NOW()                ,	true	        ,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(17, 		'Khách hàng 12', 			'2004-10-12', 	'Đại học Sài Gòn DCT1223', 	'Male',  		 '0123456789', 	'khachhang12@gmail.com', 			'User', 		 NOW()                ,	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(18,  		'Khách hàng 13', 		    '2004-01-02', 	'Đại học Sài Gòn DCT1223', 	'Male',  		 '0123456789', 	'khachhang13@gmail.com', 	        'User',          NOW()                ,	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(19, 		'Khách hàng 14', 		    '2004-07-21', 	'Đại học Sài Gòn DKP1222', 	'Male',  		 '0123456789', 	'khachhang14@gmail.com', 	        'User',          NOW()                ,	true			,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'),
							(20, 		'Khách hàng 15', 	        '2004-06-04', 	'Đại học Sài Gòn DKP1221', 	'Male',  		 '0123456789', 	'khachhang15@gmail.com', 		    'User',       	 NOW()                ,	false	 		,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi');

INSERT INTO `LoaiSanPham` 	(`MaLoaiSanPham`, `TenLoaiSanPham`) 
VALUES 						(1,                 'Các loại sản phẩm khác'),	
                            (2,                 'Tequila'),
                            (3,                 'Wishkey'),
                            (4,                 'Vodka');






INSERT INTO `NhaCungCap`    (`MaNCC`,   `TenNCC`,                                               `SoDienThoai`,           `Email`)
VALUES                      (1,         'Các nhà cung cấp khác ',             					'024.3826.7824',         'others@haprogroup.vn'),
							(2,         'Sabeco (Sài Gòn Beer Alcohol Beverage Corporation ',   '(+84) 24 39 745 877',   'sabeco@sabeco.com.vn'),
                            (3,         'Hapro (Hanoi Liquor Joint Stock Company)',             '024.3826.7984',         'doingoai@haprogroup.vn'),
                            (4,         'Vinaconex Wine',                                       '(84 24) 62849208',      'info@vinaconex.com.vn');



