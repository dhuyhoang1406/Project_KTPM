package PTTKHT_BackEnd.Controller;

import PTTKHT_BackEnd.Configuration.Exception.NotEnoughInventory;
import PTTKHT_BackEnd.Entity.DonHang.DonHang;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThaiDonHang;
import PTTKHT_BackEnd.Form.DonHang.DonHangCreateForm;
import PTTKHT_BackEnd.Form.DonHang.DonHangDTO;
import PTTKHT_BackEnd.Form.DonHang.DonHangFillerForm;
import PTTKHT_BackEnd.Form.DonHang.DonHangUpdateForm;
import PTTKHT_BackEnd.Form.SanPham.SanPhamDTO;
import PTTKHT_BackEnd.Form.TaiKhoan.TaiKhoanDTO;
import PTTKHT_BackEnd.Service.DonHang.IDonHangServices;
import PTTKHT_BackEnd.Service.TrangThaiDonHang.ITrangThaiDonHangServices;
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
@CrossOrigin(origins = "*")
@RequestMapping(value = "api/v1/DonHang")
public class DonHangController {

    @Autowired
    private IDonHangServices services;

    @Autowired
    private ITrangThaiDonHangServices trangThaiDonHangServices;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<DonHangDTO> getAllDonHang(Pageable pageable,
                                          DonHangFillerForm form){

        Page<DonHang> entites = services.getAllDonHang(pageable, form);
        List<DonHangDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<DonHangDTO>>() {}.getType());

        for(DonHangDTO donHang: dtos){
            TrangThaiDonHang trangThaiDonHangMoiNhat = trangThaiDonHangServices.trangThaiDonHangMoiNhat(donHang.getMaDH());
            donHang.setTrangThaiMoiNhat(trangThaiDonHangMoiNhat.getId().getTrangThai());
        }

        Page<DonHangDTO> dtosPages = new PageImpl<>(dtos, pageable, entites.getTotalElements());

        return dtosPages;
    }

    @GetMapping("/{maDH}")
    public DonHangDTO getDonHangByID(@PathVariable Integer maDH){

        DonHang entites = services.getDonHangByID(maDH);

        TrangThaiDonHang trangThaiDonHangMoiNhat = trangThaiDonHangServices.trangThaiDonHangMoiNhat(maDH);

        DonHangDTO dtos = modelMapper.map(entites, DonHangDTO.class);
        dtos.setTrangThaiMoiNhat(trangThaiDonHangMoiNhat.getId().getTrangThai());

        return dtos;
    }

    @GetMapping("/donHangCuaToi/{maKH}")
    public Page<DonHangDTO> getAllDonHangByMaKH(@PathVariable Integer maKH,
                                            Pageable pageable){

        Page<DonHang> entites = services.getAllDonHangByMaKH(maKH, pageable);
        List<DonHangDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<DonHangDTO>>() {}.getType());

        for(DonHangDTO donHang: dtos){
            TrangThaiDonHang trangThaiDonHangMoiNhat = trangThaiDonHangServices.trangThaiDonHangMoiNhat(donHang.getMaDH());
            donHang.setTrangThaiMoiNhat(trangThaiDonHangMoiNhat.getId().getTrangThai());
        }

        Page<DonHangDTO> dtosPages = new PageImpl<>(dtos, pageable, entites.getTotalElements());

        return dtosPages;
    }

    @PostMapping()
    public void createDonHang(@RequestBody @Valid DonHangCreateForm form) throws NotEnoughInventory {
        services.createDonHang(form);
    }

    @PutMapping("/{maDH}")
    public void updateDonHang(@PathVariable Integer maDH,
                              @RequestBody @Valid DonHangUpdateForm form) throws NotEnoughInventory{
        services.updateDonHang(maDH, form);
    }

}
