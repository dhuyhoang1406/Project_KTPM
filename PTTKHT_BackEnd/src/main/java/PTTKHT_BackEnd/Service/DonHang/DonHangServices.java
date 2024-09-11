package PTTKHT_BackEnd.Service.DonHang;

import PTTKHT_BackEnd.Configuration.Exception.NotEnoughInventory;
import PTTKHT_BackEnd.Entity.CTDH.CTDH;
import PTTKHT_BackEnd.Entity.DonHang.DonHang;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThai;
import PTTKHT_BackEnd.Entity.TrangThaiDonHang.TrangThaiDonHang;
import PTTKHT_BackEnd.Form.CTDH.CTDHCreateForm;
import PTTKHT_BackEnd.Form.CTDH.CTDHDTO;
import PTTKHT_BackEnd.Form.DonHang.DonHangCreateForm;
import PTTKHT_BackEnd.Form.DonHang.DonHangFillerForm;
import PTTKHT_BackEnd.Form.DonHang.DonHangUpdateForm;
import PTTKHT_BackEnd.Form.TrangThaiDonHang.TrangThaiDonHangCreateForm;
import PTTKHT_BackEnd.Repository.IDonHangRepository;
import PTTKHT_BackEnd.Repository.ITaiKhoanRepository;
import PTTKHT_BackEnd.Repository.ITrangThaiDonHangRepository;
import PTTKHT_BackEnd.Service.CTDH.ICTDHServices;
import PTTKHT_BackEnd.Service.TrangThaiDonHang.ITrangThaiDonHangServices;
import PTTKHT_BackEnd.Specification.DonHang.DonHangSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DonHangServices implements IDonHangServices{

    @Autowired
    private IDonHangRepository repository;

    @Autowired
    private ITrangThaiDonHangRepository trangThaiDonHangRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ITaiKhoanRepository taiKhoanRepository;

    @Autowired
    private ICTDHServices ictdhServices;

    @Autowired
    private ITrangThaiDonHangServices trangThaiDonHangServices;



    public Page<DonHang> getAllDonHang(Pageable pageable, DonHangFillerForm form){
        Specification<DonHang> buildWhere = DonHangSpecification.buildWhere(form);

        Page<DonHang> ds = repository.findAll(buildWhere, pageable);

        if (form.getTrangThai() != null){
            List<DonHang> kq = new ArrayList<>();
            for (DonHang dh : ds.getContent()){

                TrangThaiDonHang tt = trangThaiDonHangServices.trangThaiDonHangMoiNhat(dh.getMaDH());
                if (tt.getId().getTrangThai().equals(form.getTrangThai())){
                    kq.add(dh);
                }


            }

            Page<DonHang> page = new PageImpl<>(kq, pageable, kq.size());

            return page;
        }




        return ds;
    }

    @Override
    public DonHang getDonHangByID(Integer maDH) {
        return repository.findById(maDH).get();
    }

    @Override
    public Page<DonHang> getAllDonHangByMaKH(Integer maKH, Pageable pageable) {
        return repository.findAllByMaKH(maKH, pageable);
    }

    @Override
    @Transactional
    public void createDonHang(DonHangCreateForm form) throws NotEnoughInventory {
        DonHang donHang = modelMapper.map(form, DonHang.class);
        donHang.setKhachHang(taiKhoanRepository.findById(form.getMaKhachHang()).get());
        DonHang newDonHang = repository.save(donHang);

        for(CTDHCreateForm ctdh: form.getDanhSachCTDH()){
            ctdh.setMaDH(newDonHang.getMaDH());
            ictdhServices.createCTDH(ctdh);
        }

        TrangThaiDonHangCreateForm trangThaiDonHangCreateForm = new TrangThaiDonHangCreateForm();
        trangThaiDonHangCreateForm.setMaDH(newDonHang.getMaDH());
        trangThaiDonHangCreateForm.setTrangThai(TrangThai.ChoDuyet);
        trangThaiDonHangServices.createTrangThaiDonHang(trangThaiDonHangCreateForm);

    }

    @Override
    public void updateDonHang(Integer id, DonHangUpdateForm form) throws NotEnoughInventory  {
        TrangThaiDonHangCreateForm capNhatDonHang = new TrangThaiDonHangCreateForm();
        capNhatDonHang.setMaDH(id);
        capNhatDonHang.setTrangThai(form.getTrangThai());
        trangThaiDonHangServices.createTrangThaiDonHang(capNhatDonHang);
    }

}
