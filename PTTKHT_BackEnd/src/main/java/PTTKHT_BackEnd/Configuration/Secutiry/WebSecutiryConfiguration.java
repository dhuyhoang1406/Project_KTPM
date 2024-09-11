package PTTKHT_BackEnd.Configuration.Secutiry;

import PTTKHT_BackEnd.Configuration.Exception.AuthExceptionHandler;
import PTTKHT_BackEnd.Service.Login.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;



@Configuration
@EnableWebSecurity
public class WebSecutiryConfiguration {

    @Autowired
    @Lazy
    private AuthExceptionHandler authExceptionHandler;

    @Autowired
    public UserDetailsService myUserDetailService(){
        return new MyUserDetailsService();
    };

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
            //Loại bỏ bảo vệ CSRF
            .csrf(AbstractHttpConfigurer::disable)

            //Configure các luồng truy cập
            .authorizeHttpRequests((auth) -> auth


                .requestMatchers("/api/v1/TaiKhoan").permitAll()
                .requestMatchers("/api/v1/TaiKhoan/{maTK}").permitAll()
                .requestMatchers("/api/v1/TaiKhoan/newPass/{maTK}").permitAll()
                .requestMatchers("/api/v1/TaiKhoan/unban/{maTK}").permitAll()
                .requestMatchers("/api/v1/TaiKhoan/globalBan/{maTK}").permitAll()


                .requestMatchers("/api/v1/LoaiSanPham").permitAll()
                .requestMatchers("/api/v1/LoaiSanPham/{maLoaiSanPham}").permitAll()


                .requestMatchers("/api/v1/DonHang").permitAll()
                .requestMatchers("/api/v1/DonHang/{maDH}").permitAll()
                .requestMatchers("/api/v1/DonHang/donHangCuaToi/{maKH}").permitAll()


                .requestMatchers("/api/v1/PhieuNhapKho").permitAll()
                .requestMatchers("/api/v1/PhieuNhapKho/{maPhieu}").permitAll()


                .requestMatchers("/api/v1/TrangThaiDonHang/{maDH}").permitAll()


                .requestMatchers("/api/v1/NhaCungCap").permitAll()
                .requestMatchers("/api/v1/NhaCungCap/{maNCC}").permitAll()


                .requestMatchers("/api/v1/CTDH").permitAll()
                .requestMatchers("/api/v1/CTDH/{maDH}").permitAll()


                .requestMatchers("/api/v1/CTPNK").permitAll()
                .requestMatchers("/api/v1/CTPNK/{maPhieu}").permitAll()


                .requestMatchers("/api/v1/SanPham").permitAll()
                .requestMatchers("/api/v1/SanPham/{maSP}").permitAll()
                .requestMatchers("/api/v1/SanPham/business=true/{maSP}").permitAll()
                .requestMatchers("/api/v1/SanPham/business=false/{maSP}").permitAll()


                .requestMatchers("/api/v1/ThongKe/DonHang").permitAll()
                .requestMatchers("/api/v1/ThongKe/DoanhThu").permitAll()
                .requestMatchers("/api/v1/ThongKe/DoanhThu/chiTiet/{maLoaiSanPham}").permitAll()
                .requestMatchers("/api/v1/ThongKe/ChiTieu").permitAll()
                .requestMatchers("/api/v1/ThongKe/ChiTieu/chiTiet/{maLoaiSanPham}").permitAll()

                // Xác thực tất cả các request
                .anyRequest()
                .authenticated()
            ).httpBasic(Customizer.withDefaults())

            .exceptionHandling((exceptionHandling) ->
                exceptionHandling

                    // Cấu hình xử lý ngoại lệ cho trường hợp không xác thực (Login sai ^^)
                    .authenticationEntryPoint(authExceptionHandler)

                    // Cấu hình xử lý ngoại lệ cho trường hợp truy cập bị từ chối (Không đủ quyền)
                    .accessDeniedHandler(authExceptionHandler)

            );
        return http.build();
    }

}
