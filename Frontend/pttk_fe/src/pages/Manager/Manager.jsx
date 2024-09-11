import React from "react";
import Sidebar from "../../layouts/components/Sidebar/Sidebar";
import styles from "./Manager.module.scss"
import { useParams } from "react-router-dom";
import Products from "./Products/Products";
import Suppliers from "./Suppliers/Suppliers";
import GoodsReceipt from "./GoodsReceipt/GoodsReceipt";
import ProductsAdjust from "./Products/ProductsAdjust/ProductsAdjust";
import Analyst from "./Analyst/Analyst";
import SuppliersAdjust from "./Suppliers/SuppliersAdjust/SuppliersAdjust";
import GoodsReceiptAdjust from "./GoodsReceipt/GoodsReceiptAdjust/GoodsReceiptAdjust";
import Categories from "./Categories/Categories";
import CategoriesAdjust from "./Categories/CategoriesAdjust/CategoriesAdjust";
const Manager = ()=>{
    const {feature,adjust} = useParams()
    const handleManagerPage = ()=>{
        if(feature === "products"){
            if(adjust === "add" || adjust === "update"){
                return (
                    <ProductsAdjust/>
                )
            }else{
                return (
                    <Products/>
                )
            }
        }else if(feature === "categories"){
            if(adjust === "add" || adjust === "update"){
                return (
                    <CategoriesAdjust/>
                )
            }
            return (
                <Categories/>
            )
        }else if(feature === "supplier"){
            if(adjust === "add" || adjust === "update"){
                return (
                    <SuppliersAdjust/>
                )
            }
            return (
                <Suppliers/>
            )
        }else if(feature === "inventory"){
            if(adjust === "add" || adjust === "details"){
                return (
                    <GoodsReceiptAdjust/>
                )
            }
            return (
                <GoodsReceipt/>
            )
        }else if(feature === "analyst"){
            return (
                <Analyst/>
            )
        }
    };
    return (
        <div className={styles.wrapper}>
            <Sidebar role="manager"/>
            <div style={{paddingLeft:"25rem",width:"100%",paddingRight:"2rem"}}>
                {handleManagerPage()}
            </div>
        </div>
    )
}
export default Manager