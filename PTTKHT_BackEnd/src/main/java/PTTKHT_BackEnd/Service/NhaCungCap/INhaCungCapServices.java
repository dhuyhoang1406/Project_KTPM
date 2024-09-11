package PTTKHT_BackEnd.Service.NhaCungCap;

import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import PTTKHT_BackEnd.Form.NhaCungCap.NhaCungCapCreateAndUpdateForm;
import PTTKHT_BackEnd.Form.NhaCungCap.NhaCungCapDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface INhaCungCapServices {
    Optional<NhaCungCap> getNhaCungCap(Integer maNCC);
    Page<NhaCungCap> getAllNhaCungCap(Pageable pageable, String search);

    NhaCungCap getNhaCungCapByID(Integer maNCC);

    NhaCungCap getNhaCungCapByTenNCC(String tenNCC);


    boolean isTenNCCExists(String tenNCC);

    void createNhaCungCap(NhaCungCapCreateAndUpdateForm form)throws  Exception;

    void updateNhaCungCap(Integer maNCC, NhaCungCapCreateAndUpdateForm form) throws  Exception;

    void deleteNhaCungCap(Integer maNCC);

}
