package PTTKHT_BackEnd.Controller;

import PTTKHT_BackEnd.Entity.LoaiSanPham.LoaiSanPham;
import PTTKHT_BackEnd.Form.LoaiSanPham.LoaiSanPhamCreateAndUpdateForm;
import PTTKHT_BackEnd.Form.LoaiSanPham.LoaiSanPhamDTO;
import PTTKHT_BackEnd.Service.LoaiSanPham.ILoaiSanPhamServices;
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
@RequestMapping(value = "api/v1/LoaiSanPham")
@CrossOrigin(origins = "*")
public class LoaiSanPhamController {
    @Autowired
    private ILoaiSanPhamServices services;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<LoaiSanPhamDTO> getAllLoaiSanPham(Pageable pageable,
                                               @RequestParam(value = "search", required = false) String search){

        Page<LoaiSanPham> entites = services.getAllLoaiSanPham(pageable, search);
        List<LoaiSanPhamDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<LoaiSanPhamDTO>>() {}.getType());

        return  new PageImpl<>(dtos, pageable, entites.getTotalElements());
    }

    @GetMapping("/noPage")
    public List<LoaiSanPhamDTO> getAllLoaiSanPham(){

        List<LoaiSanPham> entites = services.getAllLoaiSanPham();
        List<LoaiSanPhamDTO> dtos = modelMapper.map(entites, new TypeToken<List<LoaiSanPhamDTO>>() {}.getType());

        return dtos;
    }

    @GetMapping("/{maLoaiSanPham}")
    public LoaiSanPhamDTO getLoaiSanPhamByID(@PathVariable Integer maLoaiSanPham){
        LoaiSanPham entites = services.getLoaiSanPhamByID(maLoaiSanPham);
        return modelMapper.map(entites, LoaiSanPhamDTO.class);
    }

    @PostMapping()
    public void createLoaiSanPham(@RequestBody @Valid LoaiSanPhamCreateAndUpdateForm form) throws Exception{
        services.createLoaiSanPham(form);
    }

    @PutMapping("/{maLoaiSanPham}")
    public void updateLoaiSanPham(@PathVariable(name = "maLoaiSanPham") Integer maLoaiSanPham,
                                 @RequestBody @Valid LoaiSanPhamCreateAndUpdateForm form) throws Exception{
        services.updateLoaiSanPham( maLoaiSanPham, form);

    }

    @DeleteMapping("/{maLoaiSanPham}")
    public void deleteLoaiSanPham(@PathVariable(name = "maLoaiSanPham") Integer maLoaiSanPham){
        services.deleteLoaiSanPham( maLoaiSanPham);
    }
}
