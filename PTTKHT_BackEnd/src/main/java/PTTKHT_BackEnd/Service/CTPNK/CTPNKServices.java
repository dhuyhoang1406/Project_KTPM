package PTTKHT_BackEnd.Service.CTPNK;

import PTTKHT_BackEnd.Entity.CTPNH.CTPNK;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Form.CTPNK.CTPNKCreateForm;
import PTTKHT_BackEnd.Repository.ICTPNKRepository;
import PTTKHT_BackEnd.Repository.IPhieuNhapKhoRepository;
import PTTKHT_BackEnd.Repository.ISanPhamRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CTPNKServices implements ICTPNKServices{

    @Autowired
    private ICTPNKRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IPhieuNhapKhoRepository phieuNhapKhoRepository;

    @Autowired
    private ISanPhamRepository sanPhamRepository;

    @Override
    public Page<CTPNK> getAllCTPNK(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Page<CTPNK> getAllCTPNKByMaPhieu(Integer maPhieu, Pageable pageable) {
        return repository.findAllByPhieuNhapKho_MaPhieu(maPhieu, pageable);
    }

    @Override
    @Transactional
    public void createCTPNK(CTPNKCreateForm form) {
        CTPNK ctpnk = new CTPNK();

        //Tạo Composite Key cho CTPNK
        CTPNK.CTPNKPK pk = new CTPNK.CTPNKPK();
        pk.setMaSP(form.getMaSP());
        pk.setMaPhieu(form.getMaPhieu());
        ctpnk.setId(pk);

        ctpnk.setDonGiaNhap(form.getDonGiaNhap());
        ctpnk.setSoLuong(form.getSoLuong());
        ctpnk.setThanhTien(form.getThanhTien());

        // Tăng số lượng sản phẩm lên sau khi tạo ra Chi Tiết Phiếu Nhập Kho
        SanPham sanPham = sanPhamRepository.findById(form.getMaSP()).get();
        sanPham.setSoLuongConLai( sanPham.getSoLuongConLai() + form.getSoLuong());

        //Lưu lại
        sanPhamRepository.save(sanPham);
        repository.save(ctpnk);
    }
}
