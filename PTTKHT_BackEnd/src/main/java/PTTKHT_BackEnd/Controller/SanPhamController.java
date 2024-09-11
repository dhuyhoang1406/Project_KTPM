package PTTKHT_BackEnd.Controller;

import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Form.SanPham.SanPhamCreateForm;
import PTTKHT_BackEnd.Form.SanPham.SanPhamDTO;
import PTTKHT_BackEnd.Form.SanPham.SanPhamFillerForm;
import PTTKHT_BackEnd.Form.SanPham.SanPhamUpdateForm;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanDTO;
import PTTKHT_BackEnd.Service.SanPham.ISanPhamServices;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "api/v1/SanPham")
@CrossOrigin(origins = "*")
public class SanPhamController {

    @Autowired
    private ISanPhamServices services;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<SanPhamDTO> getAllSanPham(Pageable pageable,
                                          @RequestParam(name = "search", required = false) String search,
                                          SanPhamFillerForm form){

        Page<SanPham> entities = services.getAllSanPham(pageable, search, form);
        List<SanPhamDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<SanPhamDTO>>() {}.getType());
        Page<SanPhamDTO> dtosPages = new PageImpl<>(dtos, pageable, entities.getTotalElements());
        return dtosPages;
    }

    @GetMapping("/{maSP}")
    public SanPhamDTO getSanPhamByID(@PathVariable Integer maSP){

        SanPham entites = services.getSanPhamById(maSP);
        SanPhamDTO dtos = modelMapper.map(entites, SanPhamDTO.class);
        return dtos;
    }

    @PostMapping()
    public String createSanPham(@RequestBody @Valid SanPhamCreateForm form) throws Exception {
        try{
            services.createSanPham(form);
            return "Tạo sản phẩm thành công !!";
        }
        catch (IOException e){
            return "Lỗi trong việc cài đặc ảnh !!\n" +
                "Cụ thể: " + e.getMessage();
        }
    }

    @PutMapping("/{maSP}")
    public void updateSanPham(@PathVariable int maSP,
                              @RequestBody @Valid SanPhamUpdateForm form) throws Exception {
        services.updateSanPham(maSP, form);
    }

    @PutMapping("/business=true/{maSP}")
    public void forSaleSanPham(@PathVariable int maSP){
        services.forSaleSanPham(maSP);
    }

    @PutMapping("/business=false/{maSP}")
    public void notForSaleSanPham(@PathVariable int maSP){
        services.notForSaleSanPham(maSP);
    }

}
