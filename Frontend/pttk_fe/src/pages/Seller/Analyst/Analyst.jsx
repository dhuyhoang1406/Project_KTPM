import React, { useEffect, useState } from "react";
import styles from "./Analyst.module.scss"
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement, Title } from 'chart.js'
import { Chart } from 'react-chartjs-2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark, faCircleXmark, faClock, faMoneyBill, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { getOrdersAnalyst } from "../../../services/AnalystService";
import { convertDataOrdersAnalyst, formatDate } from "../../../services/FeatureService";
ChartJS.register(CategoryScale,LinearScale,LineElement,PointElement,Title);

const Analyst = ()=>{
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")
  const [content,setContent] = useState(null)
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
        getOrdersAnalyst(formatDate(startDate),formatDate(endDate)).then((res)=>{
          setContent(convertDataOrdersAnalyst(res.data))
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
                    <div style={{display:'flex',alignItems:'center',gap:"1rem",backgroundColor:"#e91e63",width:"25rem",padding:"1rem"}}>
                      <FontAwesomeIcon style={{width:"5rem",height:"5rem",color:"white"}} icon={faCircleXmark}/>
                      <div>
                        <p style={{color:'white',fontWeight:'700',fontSize:"1.5rem"}}>Tổng Đơn Đã Hủy</p>
                        <p style={{color:'white',fontWeight:'700',fontSize:"2.5rem"}}>{content?.totalDeny}</p>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:"1rem",backgroundColor:"#00bcd4",width:"25rem",padding:"1rem"}}>
                      <FontAwesomeIcon style={{width:"5rem",height:"5rem",color:"white"}} icon={faBookBookmark}/>
                      <div>
                        <p style={{color:'white',fontWeight:'700',fontSize:"1.5rem"}}>Tổng Đơn Đã Duyệt</p>
                        <p style={{color:'white',fontWeight:'700',fontSize:"2.5rem"}}>{content?.totalConfirm}</p>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:"1rem",backgroundColor:"#8bc34a",width:"25rem",padding:"1rem"}}>
                      <FontAwesomeIcon style={{width:"5rem",height:"5rem",color:"white"}} icon={faMoneyBill}/>
                      <div>
                        <p style={{color:'white',fontWeight:'700',fontSize:"1.5rem"}}>Tổng Đơn Đã Giao</p>
                        <p style={{color:'white',fontWeight:'700',fontSize:"2.5rem"}}>{content?.totalSuccess}</p>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:"1rem",backgroundColor:"rgb(174 0 203)",width:"25rem",padding:"1rem"}}>
                      <FontAwesomeIcon style={{width:"5rem",height:"5rem",color:"white"}} icon={faClock}/>
                      <div>
                        <p style={{color:'white',fontWeight:'700',fontSize:"1.5rem"}}>Tổng Đơn Chờ Duyệt</p>
                        <p style={{color:'white',fontWeight:'700',fontSize:"2.5rem"}}>{content?.totalPending}</p>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:"1rem",backgroundColor:"#ff9800",width:"25rem",padding:"1rem"}}>
                      <FontAwesomeIcon style={{width:"5rem",height:"5rem",color:"white"}} icon={faWarehouse}/>
                      <div>
                        <p style={{color:'white',fontWeight:'700',fontSize:"1.5rem"}}>Tổng Số Đơn</p>
                        <p style={{color:'white',fontWeight:'700',fontSize:"2.5rem"}}>{content?.total}</p>
                      </div>
                    </div>
                </div>
                <div style={{height:"37rem"}}>
                {
                  content
                  ?
                  <Chart type='line' data={content.data}/>
                  :
                  <></>
                }
                </div>
            </div>
        </div>
    )
}
export default Analyst