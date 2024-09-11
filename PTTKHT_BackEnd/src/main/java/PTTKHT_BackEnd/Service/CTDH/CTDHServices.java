package PTTKHT_BackEnd.Service.CTDH;

import PTTKHT_BackEnd.Entity.CTDH.CTDH;
import PTTKHT_BackEnd.Entity.SanPham.SanPham;
import PTTKHT_BackEnd.Form.CTDH.CTDHCreateForm;
import PTTKHT_BackEnd.Repository.ICTDHRepository;
import PTTKHT_BackEnd.Repository.IDonHangRepository;
import PTTKHT_BackEnd.Repository.ISanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CTDHServices implements ICTDHServices{

    @Autowired
    private ICTDHRepository repository;

    @Autowired
    private ISanPhamRepository sanPhamRepository;

    @Autowired
    private IDonHangRepository donHangRepository;


    @Override
    public Page<CTDH> getAllCTDH(Pageable pageable) {
        return repository.findAll(pageable);
    }


    @Override
    public Page<CTDH> getAllCTDHByMaDH(Integer maDH, Pageable pageable) {
        return repository.findAllByDonHang_MaDH(maDH, pageable);
    }

    @Override
    @Transactional
    public void createCTDH(CTDHCreateForm form) {
        CTDH ctdh = new CTDH();

        CTDH.CTDHPK pk = new CTDH.CTDHPK();
        pk.setMaSP(form.getMaSP());
        pk.setMaDH(form.getMaDH());
        ctdh.setId(pk);

        ctdh.setSoLuong(form.getSoLuong());
        ctdh.setThanhTien(form.getThanhGia());

        SanPham sanPham = sanPhamRepository.findById(form.getMaSP()).get();

        ctdh.setDonGia(sanPham.getGia());
        ctdh.setSanPham(sanPham);
        ctdh.setDonHang(donHangRepository.findById(form.getMaDH()).get());

        repository.save(ctdh);

    }

}
