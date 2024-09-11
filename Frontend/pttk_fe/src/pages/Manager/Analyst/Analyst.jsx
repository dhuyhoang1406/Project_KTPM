import React, { useEffect, useState } from "react";
import styles from "./Analyst.module.scss"
import { Chart as ChartJS, LineElement, LinearScale, PointElement, Title, CategoryScale } from "chart.js";
import { Chart } from 'react-chartjs-2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { getSpendAnalyst } from "../../../services/AnalystService";
import { convertPrice, convertPriceWithoutVND, formatDate } from "../../../services/FeatureService";
ChartJS.register(CategoryScale,LinearScale,LineElement,PointElement,Title);

const Analyst = ()=>{
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")
  const [content,setContent] = useState(null)
  const convertDataSpend = (rawData) => {
    let analyst = {
        totalPrice:0,
        totalAmount:0,
        data:{
            labels:[],
            datasets:[
                {
                    label: 'SoLuong',
                    data: [],
                    fill: false,
                    borderColor: '#e91e63',
                    additionalData:[]
                },
            ],
        }
    }
    for(let i = 0 ; i < rawData.length ;i++){
        const raw = rawData[i]
        analyst.data.labels.push(raw.ngayThongKe)
        analyst.data.datasets[0].data.push(raw.tongChiTieu.tongChiTieu)
        analyst.totalPrice += raw.tongChiTieu.tongChiTieu
        analyst.totalAmount += raw.tongChiTieu.soLuongNhap
    }
    return analyst
}
function isStartDateBeforeEndDate(startDate, endDate) {
  if(!startDate||!endDate){
    return true
  }
  // Chuyển đổi ngày bắt đầu và ngày kết thúc thành đối tượng Date
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Kiểm tra xem ngày bắt đầu có nhỏ hơn ngày kết thúc ít nhất 1 ngày hay không
  const oneDay = 24 * 60 * 60 * 1000; // Một ngày tính bằng milliseconds
  if (end.getTime() - start.getTime() >= oneDay) {
      return true; // Ngày bắt đầu nhỏ hơn ngày kết thúc ít nhất 1 ngày
  } else {
      return false; // Ngày bắt đầu không nhỏ hơn ngày kết thúc ít nhất 1 ngày
  }
}
useEffect(()=>{
    if(isStartDateBeforeEndDate(startDate,endDate)){
      getSpendAnalyst(formatDate(startDate),formatDate(endDate)).then((res)=>{
        setContent(convertDataSpend(res.data))
      })
    }else{
      alert('Ngày bắt đầu phải bé hơn ngày kết thúc ít nhất 1 ngày')
    }
},[startDate,endDate])
    return (
        <div className={styles.wrapper}>
            <div style={{display:"flex",paddingTop:"1rem",paddingBottom:"1rem"}}>
                <h2>Thống Kê</h2>
            </div>
            <div className={styles.boxFeature}>
                <span className={styles.text}>Ngày Bắt Đầu</span>
                <input type="date" onChange={(event)=>setStartDate(event.target.value)} style={{height:"3rem",padding:"0.3rem"}}/>
                <span className={styles.text}>Ngày Kết Thúc</span>
                <input type="date" onChange={(event)=>setEndDate(event.target.value)} style={{height:"3rem",padding:"0.3rem"}}/>
                <p style={{fontSize:"1.3rem",marginLeft:"auto",color:"rgb(100,100,100)",fontWeight:"700"}}>Mặc định được thống kê từ ngày 1/1/2010</p>
            </div>
            <div className={styles.boxTable}>
            <div style={{display:'flex',gap:'1.5rem'}}>
                    <div style={{display:'flex',alignItems:'center',gap:"1rem",backgroundColor:"#e91e63",width:"62rem",padding:"1rem"}}>
                      <FontAwesomeIcon style={{width:"5rem",height:"5rem",color:"white"}} icon={faReceipt}/>
                      <div>
                        <p style={{color:'white',fontWeight:'700'}}>Tổng Chi Tiêu</p>
                        <p style={{color:'white',fontWeight:'700',fontSize:"2.5rem"}}>{convertPrice(content?.totalPrice)}</p>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:"1rem",backgroundColor:"#00bcd4",width:"62rem",padding:"1rem"}}>
                      <FontAwesomeIcon style={{width:"5rem",height:"5rem",color:"white"}} icon={faBookBookmark}/>
                      <div>
                        <p style={{color:'white',fontWeight:'700'}}>Tổng Số Sản Phẩm</p>
                        <p style={{color:'white',fontWeight:'700',fontSize:"2.5rem"}}>{convertPriceWithoutVND(content?.totalAmount)}</p>
                      </div>
                    </div>
                </div>
                <div style={{height:"37rem"}}>
                {
                  content
                  ?
                    <Chart type="line" data={content.data} style={{width:"100%"}}/>
                  :
                  <></>
                }
                </div>
            </div>
        </div>
    )
}
export default Analyst