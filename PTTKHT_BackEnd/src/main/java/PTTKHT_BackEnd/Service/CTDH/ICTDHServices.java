package PTTKHT_BackEnd.Service.CTDH;

import PTTKHT_BackEnd.Entity.CTDH.CTDH;
import PTTKHT_BackEnd.Form.CTDH.CTDHCreateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICTDHServices {

    Page<CTDH> getAllCTDH(Pageable pageable);

    Page<CTDH> getAllCTDHByMaDH(Integer maDH, Pageable pageable);

    void createCTDH(CTDHCreateForm form);
}
