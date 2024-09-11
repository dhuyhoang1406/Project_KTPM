package PTTKHT_BackEnd.Service.NhaCungCap;

import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Form.NhaCungCap.NhaCungCapCreateAndUpdateForm;
import PTTKHT_BackEnd.Form.NhaCungCap.NhaCungCapDTO;
import PTTKHT_BackEnd.Repository.INhaCungCapRepository;
import PTTKHT_BackEnd.Repository.IPhieuNhapKhoRepository;
import PTTKHT_BackEnd.Specification.NhaCungCap.NhaCungCapSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class NhaCungCapServices implements INhaCungCapServices{

    @Autowired
    private INhaCungCapRepository repository;

    @Autowired
    private IPhieuNhapKhoRepository phieuNhapKhoRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Optional<NhaCungCap> getNhaCungCap(Integer maNCC) {
        return repository.findById(maNCC);
    }

    @Override
    public Page<NhaCungCap> getAllNhaCungCap(Pageable pageable, String search) {
        Specification<NhaCungCap> where = NhaCungCapSpecification.buildWhere(search);
        return repository.findAll(where, pageable);
    }

    @Override
    public NhaCungCap getNhaCungCapByID(Integer maNCC) {
        return repository.findById(maNCC).get();
    }

    @Override
    public boolean isTenNCCExists(String tenNCC) {
        return repository.existsByTenNCC(tenNCC);
    }

    @Override
    public NhaCungCap getNhaCungCapByTenNCC(String tenNCC) {
        return repository.findByTenNCC(tenNCC);
    }

    @Override
    @Transactional
    public void createNhaCungCap(NhaCungCapCreateAndUpdateForm form) throws Exception{

        if ( !isTenNCCExists(form.getTenNCC()) ){
            NhaCungCap nhaCungCap = modelMapper.map(form, NhaCungCap.class);
            repository.save(nhaCungCap);
        }else{
            throw new Exception("Tên nhà cung cấp đã tồn tại !! Vui lòng tìm tên mới");
        }


    }

    @Override
    @Transactional
    public void updateNhaCungCap(Integer maNCC, NhaCungCapCreateAndUpdateForm form) throws Exception{

        if ( getNhaCungCapByTenNCC(form.getTenNCC()).getMaNCC() == maNCC ){
            NhaCungCap nhaCungCapMoi = modelMapper.map(form, NhaCungCap.class);
            nhaCungCapMoi.setMaNCC(maNCC);
            repository.save(nhaCungCapMoi);
        }else{
            throw new Exception("Tên nhà cung cấp đã tồn tại !! Vui lòng tìm tên mới");
        }

    }

    @Override
    @Transactional
    public void deleteNhaCungCap(Integer maNCC){

        List< PhieuNhapKho> listPhieuNhapKho = phieuNhapKhoRepository.findAllByNhaCungCap_MaNCC(maNCC);

        for (PhieuNhapKho phieu: listPhieuNhapKho) {
            phieu.setNhaCungCap(repository.findById(1).get());
            phieuNhapKhoRepository.save(phieu);
        }

        repository.deleteById(maNCC);
    }
}
