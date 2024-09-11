import React, { lazy } from "react";
import Sidebar from "../../layouts/components/Sidebar/Sidebar";
import styles from "./Ceo.module.scss"
import { useParams } from "react-router-dom";
import AnalystSale from "./AnalystSale/AnalystSale";
import AnalystSpend from "./AnalystSpend/AnalystSpend";
import ProductsAdjust from "../Manager/Products/ProductsAdjust/ProductsAdjust"
import Products from "../Manager/Products/Products";
import CategoriesAdjust from "../Manager/Categories/CategoriesAdjust/CategoriesAdjust"
import Categories from "../Manager/Categories/Categories"
import Suppliers from "../Manager/Suppliers/Suppliers"
import SuppliersAdjust from "../Manager/Suppliers/SuppliersAdjust/SuppliersAdjust"
import GoodsReceiptAdjust from "../Manager/GoodsReceipt/GoodsReceiptAdjust/GoodsReceiptAdjust";
import GoodsReceipt from "../Manager/GoodsReceipt/GoodsReceipt";
import Customers from "../Seller/Customers/Customers";
import OrdersAdjust from "../Seller/Orders/OrdersAdjust/OrdersAdjust";
import Orders from "../Seller/Orders/Orders";
import Analyst from "../Seller/Analyst/Analyst"
const Ceo = ()=>{
    const {feature,adjust} = useParams()
    const handleManagerPage = ()=>{
        if(feature === "sale"){
            return (
                <AnalystSale/>
            )
        }else if(feature === "spend"){
            return (
                <AnalystSpend/>
            )
        }else if(feature === "analystorder"){
            return (
                <Analyst/>
            )
        }else if(feature === "products"){
            if(adjust === "add" || adjust === "update"){
                return (
                    <ProductsAdjust isCEO="CEO"/>
                )
            }else{
                return (
                    <Products isCEO="CEO"/>
                )
            }
        }else if(feature === "categories"){
            if(adjust === "add" || adjust === "update"){
                return (
                    <CategoriesAdjust isCEO="CEO"/>
                )
            }
            return (
                <Categories isCEO="CEO"/>
            )
        }else if(feature === "supplier"){
            if(adjust === "add" || adjust === "update"){
                return (
                    <SuppliersAdjust isCEO="CEO"/>
                )
            }
            return (
                <Suppliers isCEO="CEO"/>
            )
        }else if(feature === "inventory"){
            if(adjust === "add" || adjust === "details"){
                return (
                    <GoodsReceiptAdjust isCEO="CEO"/>
                )
            }
            return (
                <GoodsReceipt isCEO="CEO"/>
            )
        }else if(feature === "customers"){
            return (
                <Customers/>
            )
        }else if(feature === "orders"){
            if(adjust === "details"){
                return <OrdersAdjust isCEO="CEO"/>
            }
            return (
                <Orders isCEO="CEO"/>
            )
        }
    };
    return (
        <div className={styles.wrapper}>
            <Sidebar role="ceo"/>
            <div style={{paddingLeft:"25rem",width:"100%",paddingRight:"2rem"}}>
                {handleManagerPage()}
            </div>
        </div>
    )
}
export default Ceo