package PTTKHT_BackEnd.Controller;

import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import PTTKHT_BackEnd.Form.NhaCungCap.NhaCungCapCreateAndUpdateForm;
import PTTKHT_BackEnd.Form.NhaCungCap.NhaCungCapDTO;
import PTTKHT_BackEnd.Service.NhaCungCap.INhaCungCapServices;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping(value = "api/v1/NhaCungCap")
@CrossOrigin(origins = "*")
public class NhaCungCapController {

    @Autowired
    private INhaCungCapServices services;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping()
    public Page<NhaCungCapDTO> getAllNhaCungCap(Pageable pageable,
                                                @RequestParam(value = "search", required = false) String search){

        Page<NhaCungCap> entities = services.getAllNhaCungCap(pageable, search);
        List<NhaCungCapDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<NhaCungCapDTO>>() {}.getType());

        return  new PageImpl<>(dtos, pageable, entities.getTotalElements());
    }

    @GetMapping("/{maNCC}")
    public NhaCungCapDTO getNhaCungCapByID(@PathVariable Integer maNCC){
        NhaCungCap entities = services.getNhaCungCapByID(maNCC);
        return modelMapper.map(entities, NhaCungCapDTO.class);
    }

    @PostMapping()
    public void createNhaCungCap(@RequestBody @Valid NhaCungCapCreateAndUpdateForm form) throws Exception{
        services.createNhaCungCap(form);
    }

    @PutMapping("/{maNCC}")
    public void updateNhaCungCap(@PathVariable(name = "maNCC") Integer maNCC,
                                 @RequestBody @Valid NhaCungCapCreateAndUpdateForm form) throws Exception{
        services.updateNhaCungCap(maNCC, form);

    }

    @DeleteMapping("/{maNCC}")
    public void deleteNhaCungCap(@PathVariable(name = "maNCC") Integer maNCC){

        services.deleteNhaCungCap(maNCC);
    }
}
