package PTTKHT_BackEnd.Controller;


import PTTKHT_BackEnd.Configuration.Exception.GlobalBanException;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Form.Login.CustomUserDetailsService;
import PTTKHT_BackEnd.Form.Login.LoginTaiKhoanDTO;
import PTTKHT_BackEnd.Form.Login.UserDetailsRequest;
import PTTKHT_BackEnd.Service.TaiKhoan.ITaiKhoanServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.security.Principal;

@RestController
@RequestMapping(value = "api/v1/auth")
@CrossOrigin(origins = "*")
public class LoginController implements Serializable {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserDetailsService services;

    @Autowired
    private CustomUserDetailsService CustomeServices;

    @Autowired
    private ITaiKhoanServices taiKhoanServices;

    @GetMapping("/login/{maVaiTro}")
    public LoginTaiKhoanDTO login(@PathVariable Integer maVaiTro, Principal principal) {


        UserDetailsRequest userDetailsRequest = new UserDetailsRequest();
        userDetailsRequest.setUsername(principal.getName());
        userDetailsRequest.setMaVaiTro(maVaiTro);
        CustomeServices.loadUserByUsername(userDetailsRequest);


        String email = principal.getName();
        TaiKhoan entity = taiKhoanServices.getTaiKhoanByEmail(email);

        if (!entity.getTrangThai()){
            throw new GlobalBanException("Tài khoản của bị đã bị khóa !!");
        }

        LoginTaiKhoanDTO dto = modelMapper.map(entity, LoginTaiKhoanDTO.class);

        return dto;
    }

}
