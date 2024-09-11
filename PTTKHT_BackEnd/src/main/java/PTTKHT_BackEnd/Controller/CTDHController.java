package PTTKHT_BackEnd.Controller;


import PTTKHT_BackEnd.Entity.CTDH.CTDH;
import PTTKHT_BackEnd.Form.CTDH.CTDHDTO;
import PTTKHT_BackEnd.Form.CTPNK.CTPNKDTO;
import PTTKHT_BackEnd.Service.CTDH.ICTDHServices;
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
@RequestMapping(value = "api/v1/CTDH")
public class CTDHController {
    @Autowired
    private ICTDHServices services;

    @Autowired
    private ModelMapper modelMapper;

//    @GetMapping()
//    public Page<CTDHDTO> getALLCTDH(Pageable pageable){
//        Page<CTDH> entites = services.getAllCTDH(pageable);
//
//        List<CTDHDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<CTDHDTO>>() {}.getType());
//
//        Page<CTDHDTO> dtosPages = new PageImpl<>(dtos, pageable, entites.getTotalElements());
//
//        return dtosPages;
//    }

    @GetMapping("/{maDH}")
    public Page<CTDHDTO> getALLCTDHByMaDH(@PathVariable Integer maDH, Pageable pageable){
        Page<CTDH> entites = services.getAllCTDHByMaDH(maDH, pageable);
        List<CTDHDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<CTDHDTO>>() {}.getType());

        Page<CTDHDTO> dtosPages = new PageImpl<>(dtos, pageable, entites.getTotalElements());

        return dtosPages;
    }
}
