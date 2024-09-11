package PTTKHT_BackEnd.Controller;

import PTTKHT_BackEnd.Configuration.Exception.NotEnoughInventory;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThaiDonHang;
import PTTKHT_BackEnd.Form.SanPham.SanPhamDTO;
import PTTKHT_BackEnd.Form.TrangThaiDonHang.TrangThaiDonHangCreateForm;
import PTTKHT_BackEnd.Form.TrangThaiDonHang.TrangThaiDonHangDTO;
import PTTKHT_BackEnd.Service.TrangThaiDonHang.ITrangThaiDonHangServices;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/TrangThaiDonHang")
public class TrangThaiDonHangController {

    @Autowired
    private ITrangThaiDonHangServices services;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/{maDH}")
    public Page<TrangThaiDonHangDTO> getAllTrangThaiDonHang(@PathVariable Integer maDH,
                                                                Pageable pageable) {
        Page<TrangThaiDonHang> entites = services.getAllTrangThaiDonHang(maDH, pageable);
        List<TrangThaiDonHangDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<TrangThaiDonHangDTO>>() {}.getType());

        Page<TrangThaiDonHangDTO> dtosPages = new PageImpl<>(dtos, pageable, entites.getTotalElements());

        return dtosPages;
    }

    @PostMapping
    public void createTrangThaiDonHang(@RequestBody @Valid TrangThaiDonHangCreateForm form) throws NotEnoughInventory {

        services.createTrangThaiDonHang(form);
    }
}

