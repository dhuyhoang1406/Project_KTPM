package PTTKHT_BackEnd.Service.TaiKhoan;

import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Entity.TaiKhoan.VaiTro;
import PTTKHT_BackEnd.Form.Login.UserDetailsRequest;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanCreateForm;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanFillerForm;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanUpdateForm;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanUpdatePassForm;
import PTTKHT_BackEnd.Repository.ITaiKhoanRepository;
import PTTKHT_BackEnd.Specification.TaiKhoan.TaiKhoanSpecification;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service

public class TaiKhoanServices implements ITaiKhoanServices{

    @Autowired
    private ITaiKhoanRepository repository;

    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Page<TaiKhoan> getAllTaiKhoan(Pageable pageable, String search, TaiKhoanFillerForm form) {

        Specification<TaiKhoan> where = TaiKhoanSpecification.buildWhere(search, form);
        return repository.findAll(where, pageable);
    }

    @Override
    public Boolean isTaiKhoanExists(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    public TaiKhoan getTaiKhoanByEmail(String email) {

        return repository.findByEmail(email);
    }



    @Override
    public TaiKhoan getTaiKhoanByID(Integer id){
        return repository.findById(id).get();
    }

    @Override
    @Transactional
    public void createTaiKhoan(TaiKhoanCreateForm form) throws Exception{

        if (!isTaiKhoanExists(form.getEmail())){
            TaiKhoan taiKhoan = modelMapper.map(form, TaiKhoan.class);
            taiKhoan.setMatKhau(passwordEncoder.encode(form.getMatKhau()));
            repository.save(taiKhoan);
        }else{
            throw new Exception("Email này đã có người dùng !!");
        }

    }

    @Override
    @Transactional
    public void updateTaiKhoan(Integer maTK, TaiKhoanUpdateForm form){
            TaiKhoan taiKhoan = modelMapper.map(form, TaiKhoan.class);
            TaiKhoan temp = repository.findById(maTK).get();
            taiKhoan.setMaTK(maTK);
            taiKhoan.setTrangThai(temp.getTrangThai());
            taiKhoan.setMatKhau(temp.getMatKhau());
            taiKhoan.setNgayTao(temp.getNgayTao());
            taiKhoan.setEmail(temp.getEmail());
            repository.save(taiKhoan);
    }

    @Override
    @Transactional
    public void updateMatKhauTaiKhoan(Integer maTK, TaiKhoanUpdatePassForm form) {
        Optional<TaiKhoan> optionalTaiKhoan = repository.findById(maTK);
        if (optionalTaiKhoan.isPresent()) {
            TaiKhoan taiKhoan = optionalTaiKhoan.get();
            if (passwordEncoder.matches(form.getMatKhauCu(), taiKhoan.getMatKhau())) {
                taiKhoan.setMatKhau(passwordEncoder.encode(form.getMatKhau()));
                repository.save(taiKhoan);  
            } else {
                throw new IllegalArgumentException("Mật khẩu cũ không đúng .");
            }
        } else {
            throw new NoSuchElementException("Tài khoản với id: " + maTK + " không tìm thấy.");
        }
    }


    @Override
    @Transactional
    public void unbanTaiKhoan(Integer maTK) {
        TaiKhoan taiKhoan = repository.findById(maTK).get();
        taiKhoan.setTrangThai(true);
        repository.save(taiKhoan);
    }


    @Override
    @Transactional
    public void banTaiKhoan(Integer maTK) {

        TaiKhoan taiKhoan = repository.findById(maTK).get();

        taiKhoan.setTrangThai(false);

        repository.save(taiKhoan);
    }



}
