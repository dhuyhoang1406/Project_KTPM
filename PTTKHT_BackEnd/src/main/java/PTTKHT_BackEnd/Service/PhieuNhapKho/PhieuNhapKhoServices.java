package PTTKHT_BackEnd.Service.PhieuNhapKho;

import PTTKHT_BackEnd.Entity.NhaCungCap.NhaCungCap;
import PTTKHT_BackEnd.Entity.PhieuNhapKho.PhieuNhapKho;
import PTTKHT_BackEnd.Entity.TaiKhoan.TaiKhoan;
import PTTKHT_BackEnd.Form.CTPNK.CTPNKCreateForm;
import PTTKHT_BackEnd.Form.PhieuNhapKho.PhieuNhapKhoCreateForm;
import PTTKHT_BackEnd.Form.PhieuNhapKho.PhieuNhapKhoFillerForm;
import PTTKHT_BackEnd.Repository.ICTPNKRepository;
import PTTKHT_BackEnd.Repository.INhaCungCapRepository;
import PTTKHT_BackEnd.Repository.IPhieuNhapKhoRepository;
import PTTKHT_BackEnd.Repository.ITaiKhoanRepository;
import PTTKHT_BackEnd.Service.CTPNK.CTPNKServices;
import PTTKHT_BackEnd.Specification.PhieuNhapKho.PhieuNhapKhoSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PhieuNhapKhoServices implements IPhieuNhapKhoServices{

    @Autowired
    private IPhieuNhapKhoRepository repository;

    @Autowired
    private INhaCungCapRepository nhaCungCapRepository;

    @Autowired
    private ITaiKhoanRepository taiKhoanRepository;

    @Autowired
    private CTPNKServices ctpnkServices;

    @Override
    public Optional<PhieuNhapKho> getPhieuNhapKho(Integer maPhieu) {
        return repository.findById(maPhieu);
    }

    public Page<PhieuNhapKho> getAllPhieuNhapKho(Pageable pageable, PhieuNhapKhoFillerForm form){
        Specification<PhieuNhapKho> buildWhere = PhieuNhapKhoSpecification.buildWhere(form);
        return repository.findAll(buildWhere, pageable);
    }

    @Override
    public PhieuNhapKho getPhieuNhapKhoByID(Integer maPhieu) {
        return repository.findById(maPhieu).get();
    }

    @Transactional
    @Override
    public void createPhieuNhapKho(PhieuNhapKhoCreateForm form){
        PhieuNhapKho phieuNhapKho = new PhieuNhapKho();
        phieuNhapKho.setTongGiaTri(form.getTongGiaTri());
        phieuNhapKho.setLoiNhuan((100+ form.getLoiNhuan())/100);
       
        //Tìm nhà cung cấp đưa vào
        NhaCungCap nhaCungCap = nhaCungCapRepository.findById(form.getMaNhaCungCap()).get();
        phieuNhapKho.setNhaCungCap(nhaCungCap);

        //Tìm tài khoản Quản lý đưa vào
        TaiKhoan taiKhoan = taiKhoanRepository.findById(form.getMaQuanLy()).get();
        phieuNhapKho.setQuanLy(taiKhoan);

        //Phải lấy phiếu ra lại 1 lần nữa (Sau khi save thì phiếu mới được tạo ID)
        // repository.save(phieuNhapKho) trả về đối tượng PhieuNhapKho
        PhieuNhapKho newPhieuNhapKho = repository.save(phieuNhapKho);

        //Tạo các Chi tiết Phiếu Nhập Kho đi kèm
        for (CTPNKCreateForm form1: form.getDanhSachCTPNK()){
            form1.setMaPhieu(newPhieuNhapKho.getMaPhieu());
            System.err.println(form1.getThanhTien());
            ctpnkServices.createCTPNK(form1);
        }

    }

}
