package PTTKHT_BackEnd.Controller;

import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import PTTKHT_BackEnd.Form.PhieuNhapKho.PhieuNhapKhoCreateForm;
import PTTKHT_BackEnd.Form.PhieuNhapKho.PhieuNhapKhoDTO;
import PTTKHT_BackEnd.Form.PhieuNhapKho.PhieuNhapKhoFillerForm;
import PTTKHT_BackEnd.Service.PhieuNhapKho.IPhieuNhapKhoServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/PhieuNhapKho")
@CrossOrigin(origins = "*")
public class PhieuNhapKhoController {

    @Autowired
    private IPhieuNhapKhoServices services;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<PhieuNhapKhoDTO> getAllPhieuNhapKho(PhieuNhapKhoFillerForm form,
                                                 Pageable pageable){

        Page<PhieuNhapKho> entites = services.getAllPhieuNhapKho(pageable, form);

        List<PhieuNhapKhoDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<PhieuNhapKhoDTO>>() {}.getType());

        Page<PhieuNhapKhoDTO> dtosPage = new PageImpl<>(dtos, pageable, entites.getTotalPages());

        return dtosPage;

    }

    @GetMapping("/{maPhieu}")
    public PhieuNhapKhoDTO getPhieuNhapKhoByID(@PathVariable Integer maPhieu){

        PhieuNhapKho entites = services.getPhieuNhapKhoByID(maPhieu);

        return modelMapper.map(entites, PhieuNhapKhoDTO.class);

    }

    @PostMapping()
    public void createPhieuNhapKho(@RequestBody PhieuNhapKhoCreateForm form){
        services.createPhieuNhapKho(form);
    }

}
