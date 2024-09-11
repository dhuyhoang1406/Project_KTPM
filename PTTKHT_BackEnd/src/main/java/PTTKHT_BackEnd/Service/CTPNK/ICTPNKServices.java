package PTTKHT_BackEnd.Service.CTPNK;

import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import PTTKHT_BackEnd.Form.CTPNK.CTPNKCreateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICTPNKServices {
    Page<CTPNK> getAllCTPNK(Pageable pageable);

    Page<CTPNK> getAllCTPNKByMaPhieu(Integer maPhieu, Pageable pageable);

    void createCTPNK(CTPNKCreateForm form);

}
