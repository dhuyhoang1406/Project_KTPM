package PTTKHT_BackEnd.Service.PhieuNhapKho;


import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import PTTKHT_BackEnd.Form.PhieuNhapKho.PhieuNhapKhoCreateForm;
import PTTKHT_BackEnd.Form.PhieuNhapKho.PhieuNhapKhoFillerForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IPhieuNhapKhoServices {
    Optional<PhieuNhapKho> getPhieuNhapKho(Integer maPhieu);
    Page<PhieuNhapKho> getAllPhieuNhapKho(Pageable pageable, PhieuNhapKhoFillerForm form);

    PhieuNhapKho getPhieuNhapKhoByID(Integer maPhieu);

    void createPhieuNhapKho(PhieuNhapKhoCreateForm form);

}
