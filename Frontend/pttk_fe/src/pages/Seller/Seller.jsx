import React from "react";
import Sidebar from "../../layouts/components/Sidebar/Sidebar";
import styles from "./Seller.module.scss"
import { useParams } from "react-router-dom";
import Customers from "./Customers/Customers";
import Orders from "./Orders/Orders";
import Analyst from "./Analyst/Analyst";
import OrdersAdjust from "./Orders/OrdersAdjust/OrdersAdjust";
const Seller = ()=>{
    const {feature,adjust} = useParams()
    const handleSellerPage = ()=>{
        if(feature === "customers"){
            return (
                <Customers/>
            )
        }else if(feature === "orders"){
            if(adjust === "details"){
                return <OrdersAdjust/>
            }
            return (
                <Orders/>
            )
        }else if(feature === "analyst"){
            return (
                <Analyst/>
            )
        }
    };
    return(
        <div className={styles.wrapper}>
            <Sidebar role="seller"/>
            <div style={{paddingLeft:"25rem",width:"100%",paddingRight:"2rem"}}>
                {handleSellerPage()}
            </div>
        </div>
    )
}
export default Seller