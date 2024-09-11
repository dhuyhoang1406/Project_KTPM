package PTTKHT_BackEnd.Service.LoaiSanPham;

import PTTKHT_BackEnd.Entity.LoaiSanPham.LoaiSanPham;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Form.LoaiSanPham.LoaiSanPhamCreateAndUpdateForm;
import PTTKHT_BackEnd.Form.LoaiSanPham.LoaiSanPhamDTO;
import PTTKHT_BackEnd.Repository.ILoaiSanPhamRepository;
import PTTKHT_BackEnd.Repository.ISanPhamRepository;
import PTTKHT_BackEnd.Specification.LoaiSanPham.LoaiSanPhamSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LoaiSanPhamServices implements ILoaiSanPhamServices{
    @Autowired
    private ILoaiSanPhamRepository repository;
    @Autowired
    private ISanPhamRepository sanPhamRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<LoaiSanPham> getAllLoaiSanPham() {
        return repository.findAll();
    }

    public Page<LoaiSanPham> getAllLoaiSanPham(Pageable pageable, String search){
        Specification<LoaiSanPham> where = LoaiSanPhamSpecification.buildWhere(search);
        return repository.findAll(where, pageable);
    }

    @Override
    public LoaiSanPham getLoaiSanPhamByID(Integer maLoaiSanPham) {
        return repository.findById(maLoaiSanPham).get();
    }

    @Override
    public boolean isTenLoaiSanPhamExists(String tenLoaiSanPham) {
        return repository.existsByTenLoaiSanPham(tenLoaiSanPham);
    }

    @Override
    @Transactional
    public void createLoaiSanPham(LoaiSanPhamCreateAndUpdateForm form) throws Exception{
        if (!isTenLoaiSanPhamExists(form.getTenLoaiSanPham())){
            LoaiSanPham loaiSanPham = modelMapper.map(form, LoaiSanPham.class);
            repository.save(loaiSanPham);
        }else{
            throw new Exception("Tên loại sản phẩm đã tồn tại !!");
        }

    }

    @Override
    @Transactional
    public void updateLoaiSanPham(Integer maLoaiSanPham, LoaiSanPhamCreateAndUpdateForm form)  throws Exception{
        if (!isTenLoaiSanPhamExists(form.getTenLoaiSanPham())){

            LoaiSanPham loaiSanPham = modelMapper.map(form, LoaiSanPham.class);
            loaiSanPham.setMaLoaiSanPham(maLoaiSanPham);
            repository.save(loaiSanPham);

        }else{
            throw new Exception("Tên loại sản phẩm đã tồn tại !!");
        }
    }

    @Override
    @Transactional
    public void deleteLoaiSanPham(Integer maLoaiSanPham) {

        List<SanPham> listSanPham = sanPhamRepository.findAllByLoaiSanPham_MaLoaiSanPham(maLoaiSanPham);
        for (SanPham sanPham: listSanPham) {
            sanPham.setLoaiSanPham(repository.findById(1).get());
            sanPhamRepository.save(sanPham);
        }

        repository.deleteById(maLoaiSanPham);
    }
}
