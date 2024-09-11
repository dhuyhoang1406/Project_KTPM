package PTTKHT_BackEnd.Controller;

import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import PTTKHT_BackEnd.Form.CTPNK.CTPNKCreateForm;
import PTTKHT_BackEnd.Form.CTPNK.CTPNKDTO;
import PTTKHT_BackEnd.Service.CTPNK.ICTPNKServices;
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
@RequestMapping(value = "api/v1/CTPNK")
public class CTPNKController {

    @Autowired
    private ICTPNKServices services;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping("/{maPhieu}")
    public Page<CTPNKDTO> getAllCTPNKByMaPhieu(@PathVariable Integer maPhieu,
                                               Pageable pageable){
        Page<CTPNK> entites = services.getAllCTPNKByMaPhieu(maPhieu, pageable);
        List<CTPNKDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<CTPNKDTO>>() {}.getType());

        Page<CTPNKDTO> dtosPages = new PageImpl<>(dtos, pageable, entites.getTotalElements());

        return dtosPages;
    }

}
