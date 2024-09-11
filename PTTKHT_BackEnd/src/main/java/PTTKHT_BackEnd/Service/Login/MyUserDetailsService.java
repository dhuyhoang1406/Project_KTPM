package PTTKHT_BackEnd.Service.Login;

import PTTKHT_BackEnd.Configuration.Exception.GlobalBanException;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Entity.TaiKhoan.VaiTro;
import PTTKHT_BackEnd.Form.Login.CustomUserDetailsService;
import PTTKHT_BackEnd.Form.Login.UserDetailsRequest;
import PTTKHT_BackEnd.Repository.ITaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
//public class MyUserDetailsService implements UserDetailsService {
public class MyUserDetailsService implements CustomUserDetailsService {

    @Autowired
    private ITaiKhoanRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        TaiKhoan taiKhoan = repository.findByEmail(email);

        if (taiKhoan == null) {
            throw new UsernameNotFoundException(email);
        }


        //Quá trình kiểm tra mật khẩu diễn ra ở đây nếu sai pass thì lỗi throw ra ngay tại đây còn không sẽ cho phép chạy tiếp API login
        return new User(
            taiKhoan.getEmail(),
            taiKhoan.getMatKhau(),
            AuthorityUtils.createAuthorityList(taiKhoan.getVaiTro().toString())
        );
    }

    @Override
    public UserDetails loadUserByUsername(UserDetailsRequest request) throws UsernameNotFoundException, AccessDeniedException {
        String email = request.getUsername();
        TaiKhoan taiKhoan = repository.findByEmail(email);

        if (taiKhoan == null) {
            throw new UsernameNotFoundException(email);
        }

        switch (request.getMaVaiTro()) {
            case 1: // User
                if (!taiKhoan.getVaiTro().equals(VaiTro.User)) {
                    throw new AccessDeniedException("Đăng nhập thất bại !! (2)");
                }
                break;

            case 2: // Seller
                if (!taiKhoan.getVaiTro().equals(VaiTro.Seller)) {
                    throw new AccessDeniedException("Đăng nhập thất bại !! (2)");
                }
                break;

            case 3: // Manager
                if (!taiKhoan.getVaiTro().equals(VaiTro.Manager)) {
                    throw new AccessDeniedException("Đăng nhập thất bại !! (2)");
                }
                break;

            case 4: // Admin
                if (!taiKhoan.getVaiTro().equals(VaiTro.Admin)) {
                    throw new AccessDeniedException("Đăng nhập thất bại !! (2)");
                }
                break;

            case 5: // CEO
                if (!taiKhoan.getVaiTro().equals(VaiTro.CEO)) {
                    throw new AccessDeniedException("Đăng nhập thất bại !! (2)");
                }
                break;

            default:
                throw new IllegalArgumentException("MaVaiTro không hợp lệ: " + request.getMaVaiTro());
        }

        return new User(
            taiKhoan.getEmail(),
            taiKhoan.getMatKhau(),
            AuthorityUtils.createAuthorityList(taiKhoan.getVaiTro().toString())
        );
    }
}
