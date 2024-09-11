package PTTKHT_BackEnd.Service.SanPham;

import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Form.SanPham.SanPhamCreateForm;
import PTTKHT_BackEnd.Form.SanPham.SanPhamFillerForm;
import PTTKHT_BackEnd.Form.SanPham.SanPhamUpdateForm;
import PTTKHT_BackEnd.Repository.ILoaiSanPhamRepository;
import PTTKHT_BackEnd.Repository.ISanPhamRepository;
import PTTKHT_BackEnd.Specification.SanPham.SanPhamSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.io.IOException;


@Service
public class SanPhamServices implements ISanPhamServices{

    @Autowired
    private ISanPhamRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ILoaiSanPhamRepository loaiSanPhamRepository;


    @Override
    public SanPham getSanPhamById(Integer id) {
        return repository.findById(id).get();
    }

    @Override
    public Page<SanPham> getAllSanPham(Pageable pageable,
                                       String search, SanPhamFillerForm form) {
        Specification<SanPham> buildWhere = SanPhamSpecification.buildWhere(search, form);
        return repository.findAll(buildWhere, pageable);
    }

    @Override
    public SanPham getSanPhamByTenSP(String tenSP) {
        return repository.findSanPhamByTenSP(tenSP);
    }

    @Override
    public boolean isTenSPExists(String tenSP) {
        return repository.existsByTenSP(tenSP);
    }

    @Override
    public void createSanPham(SanPhamCreateForm form) throws Exception {


        if (!isTenSPExists(form.getTenSP())){
            SanPham sanPham = new SanPham();
            sanPham.setTenSP(form.getTenSP());
            sanPham.setTheTich(form.getTheTich());
            sanPham.setNongDoCon(form.getNongDoCon());
            sanPham.setXuatXu(form.getXuatXu());
            sanPham.setThuongHieu(form.getThuongHieu());
            sanPham.setGia(form.getGia());
            sanPham.setAnhMinhHoa(form.getAnhMinhHoa());

            sanPham.setLoaiSanPham(loaiSanPhamRepository.findById(form.getMaLoaiSanPham()).get());
            repository.save(sanPham);
        }else{
            throw new Exception(form.getTenSP() + " đã tồn tại !! Hãy chọn tên mới !!");
        }

    }



    @Override
    public void updateSanPham(int maSP, SanPhamUpdateForm form) throws Exception {

        if (getSanPhamByTenSP(form.getTenSP()).getMaSP() == maSP){

            SanPham sanPhamCu = repository.findById(maSP).get();
            SanPham sanPham = new SanPham();
            sanPham.setMaSP(maSP);
            sanPham.setTenSP(form.getTenSP());
            sanPham.setTheTich(form.getTheTich());
            sanPham.setNongDoCon(form.getNongDoCon());
            sanPham.setXuatXu(form.getXuatXu());
            sanPham.setThuongHieu(form.getThuongHieu());
            sanPham.setGia(form.getGia());
            sanPham.setAnhMinhHoa(form.getAnhMinhHoa());
            sanPham.setLoaiSanPham(loaiSanPhamRepository.findById(form.getMaLoaiSanPham()).get());
            sanPham.setTrangThai(sanPhamCu.getTrangThai());

            SanPham oldSanPham = repository.findById(maSP).get();
            sanPham.setSoLuongConLai(oldSanPham.getSoLuongConLai());
            repository.save(sanPham);
        }else{
            throw new Exception(form.getTenSP() + " đã tồn tại !! Hãy chọn tên mới !!");
        }
    }

    @Override
    public void forSaleSanPham(int maSP) {
        SanPham sanPham = repository.findById(maSP).get();
        sanPham.setTrangThai(true);
        repository.save(sanPham);
    }

    @Override
    public void notForSaleSanPham(int maSP) {
        SanPham sanPham = repository.findById(maSP).get();
        sanPham.setTrangThai(false);
        repository.save(sanPham);
    }

}
