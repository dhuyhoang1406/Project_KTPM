package PTTKHT_BackEnd.Controller;

import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Form.TaiKhoan.*;
import PTTKHT_BackEnd.Service.TaiKhoan.ITaiKhoanServices;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/TaiKhoan")
@CrossOrigin(origins = "*")
public class TaiKhoanController {
    @Autowired
    private ITaiKhoanServices service;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<TaiKhoanDTO> getAllTaiKhoan(Pageable pageable,
                                            @RequestParam(value = "search", required = false) String search,
                                            TaiKhoanFillerForm form){
        Page<TaiKhoan> entites = service.getAllTaiKhoan(pageable, search, form);
        List<TaiKhoanDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<TaiKhoanDTO>>() {}.getType());

        Page<TaiKhoanDTO> dtosPages = new PageImpl<>(dtos, pageable, entites.getTotalElements());

        return dtosPages;
    }

    @GetMapping("{maTK}")
    public TaiKhoanDTO getTaiKhoanByID(@PathVariable Integer maTK){
        TaiKhoan taiKhoan = service.getTaiKhoanByID(maTK);
        TaiKhoanDTO dto = modelMapper.map(taiKhoan, TaiKhoanDTO.class);
        return dto;
    }

    @PostMapping()
    public void createTaiKhoan(@RequestBody @Valid TaiKhoanCreateForm form) throws Exception{
        service.createTaiKhoan(form);
    }

    @PutMapping("/{maTK}")
    public void updateTaiKhoan(@PathVariable(value = "maTK") Integer maTK,
                               @RequestBody @Valid TaiKhoanUpdateForm form) throws Exception{
        service.updateTaiKhoan(maTK, form);
    }

    @PutMapping("/newPass/{maTK}")
    public void updateMatKhauTaiKhoan(@PathVariable(value = "maTK") Integer maTK,
                                      @RequestBody @Valid TaiKhoanUpdatePassForm form){
        service.updateMatKhauTaiKhoan(maTK, form);
    }

    @PutMapping("/unban/{maTK}")
    public void unbanTaiKhoan(@PathVariable(value = "maTK") Integer maTK){
        service.unbanTaiKhoan(maTK);
    }

    @PutMapping("/globalBan/{maTK}")
    public void globalBanTaiKhoan(@PathVariable(value = "maTK") Integer maTK){
        service.banTaiKhoan(maTK);
    }
}
