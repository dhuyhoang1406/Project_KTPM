import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation,faWineBottle, faWineGlass } from '@fortawesome/free-solid-svg-icons'
import InputNumberComponent from '../../components/InputComponent/InputNumberComponent'
import Button from '../../components/Button/Button'
import { addOrderProduct,resetOrder } from '../../redux/slides/orderSlide'
import {MinusOutlined, PlusOutlined} from '@ant-design/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { useDispatch, useSelector } from 'react-redux'
import * as message from '../../components/Message/Message'

const ProductDetails = () => {

    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    console.log(user)

  const [productDetail, setProductDetail] = useState([])

  const {id} = useParams()

  const fetchApiDetailProduct = async () => {
     try {
      const res = await ProductService.getDetailsProduct(id)
      setProductDetail(res?.data)
     } catch (error) {
      console.log(error)
     }
  }

  useEffect(()=> {
    fetchApiDetailProduct()
  },[id])
  

  const [count, setCount] = useState(1);

  const handleIncreaseCount = () => {
    if(count < productDetail?.soLuongConLai) {
      setCount(Number(count)+1);
    }
  };

  const handleDecreaseCount = () => {
    if (count > 1) {
      setCount(Number(count)-1);
    }
  };

  const handleInputChange = (e) => {
    console.log(213)
    if(e.target.value > productDetail?.soLuongConLai){
      setCount(productDetail?.soLuongConLai)
    }else {
      setCount(e.target.value);
    }
  };


  const handleAddOrderProduct = () => {
    if(!user?.maTK) {
      //đăng nhập xong là quay lại trang trước
        navigate('/sign-in', {state: location?.pathname})
    }else if(productDetail?.soLuongConLai === 0){
      message.error('Sản phẩm này đã hết hàng!')
    }else {
      message.success('Đã thêm vào giỏ hàng')

      dispatch(addOrderProduct({
        orderItem: {
            name: productDetail?.tenSP,
            amount: count,
            image: productDetail?.anhMinhHoa,
            price: productDetail?.gia,
            product: productDetail?.maSP,
            countInstock: productDetail?.soLuongConLai
        }
    }))
    }
}

  return (
    <div className={styles.wrapperDetail}>
      <h3 style={{position:'absolute', top:'7rem',left:'1rem'}}><span className={styles.nav} onClick={() => {navigate('/product')}}>Quay lại</span> - Chi tiết sản phẩm</h3>
        <div className={styles.content}>
          <div className={styles.imgProduct}>
            <img src={productDetail?.anhMinhHoa} alt="ảnh" />
          </div>
          <div className={styles.detailProduct}>
              <h1 className={styles.textProduct}>{productDetail?.tenSP}</h1>
              <div className={styles.separate}></div>
              <div className={styles.productParameters}>
                <div className={styles.Capacity}>
                  <FontAwesomeIcon icon={faWineBottle} />
                  <div className={styles.textCapacity}>
                  <span>Dung tích</span>
                  <span>{productDetail?.theTich} ml</span>
                  </div>
                </div>
                <div className={styles.Alcohol}>
                  <FontAwesomeIcon icon={faWineGlass} />
                  <div className={styles.textAlcohol}>
                    <span>Nồng độ cồn</span>
                    <span>{productDetail?.nongDoCon}% ABV</span>
                  </div>
                </div>
              </div>
              <div className={styles.priceProduct}>
              <span>{productDetail?.gia}đ</span>
              </div>
          
              <span className={styles.amountInStock}>Only {productDetail?.soLuongConLai} left in stock</span>
              <div className={styles.inputAmount}>
              <button onClick={handleDecreaseCount} style={{cursor:'pointer'}}><MinusOutlined/></button>
                    <InputNumberComponent style={{width:'100%',textOverflow:'ellipsis'}} value={count} onChange={handleInputChange}/>
                    <button onClick={handleIncreaseCount} style={{cursor:'pointer'}}><PlusOutlined/></button>
              </div>
              <div className={styles.buttonBuyProduct}>
                <Button onClick={()=>{
                  if(user.maTK!== ''){
                    handleAddOrderProduct()
                  }else {
                    navigate('/sign-in')
                  }
                }} primary children={"Add to cart"} className={styles.textCart}/>
                <Button onClick={() => {
                    if(user.maTK !== ''){
                      handleAddOrderProduct(); 
                    productDetail.soLuongConLai !== 0 && navigate('/order')
                    }else {
                      navigate('/sign-in')
                    }
                  }} primary children={"Buy Now"} className={styles.textCart}/>
              </div>
              {productDetail?.soLuongConLai === 0 && <div style={{color: 'red'}}>Sản phẩm hết hàng</div>}
              <div className={styles.information}>
                <span className={styles.textInfor}>Brand:{productDetail?.thuongHieu}</span>
                <span className={styles.textInfor}>Categories: {productDetail?.tenLoaiSanPham}</span>
                <span className={styles.textInfor}>Tags: Cyber Monday 2023, Cyber Monday 2023-2</span>
              </div>
          </div>
        </div>
    </div>
  )
}

export default ProductDetails