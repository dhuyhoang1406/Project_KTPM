import React from 'react'
import styles from "./Sidebar.module.scss"
import MenuItem from './MenuItemSidebar/MenuItemSidebar'

const Sidebar = ({ role }) => {
  if(role === "manager"){
    const menuItem = [
      {title:"Sản Phẩm",isActive:"products",onClick:()=>{},to:"/system/manager/products"},
      {title:"Loại Sản Phẩm",isActive:"categories",onClick:()=>{},to:"/system/manager/categories"},
      {title:"Nhà Cung Cấp",isActive:"supplier",onClick:()=>{},to:"/system/manager/supplier"},
      {title:"Phiếu Nhập Kho",isActive:"inventory",onClick:()=>{},to:"/system/manager/inventory"},
      {title:"Thống Kê",isActive:"analyst",onClick:()=>{},to:"/system/manager/analyst"},
      
    ]
    return (
      <div className={styles.sideBar}>
        {
          menuItem.map((item)=>{
            return <MenuItem title={item.title} isActive={item.isActive} onClick={item.onClick} to={item.to}/>
          })
        }
      </div>
    )
  }else if(role === "seller"){
    const menuItem = [
      {title:"Khách Hàng",isActive:"customers",onClick:()=>{},to:"/system/seller/customers"},
      {title:"Đơn Đặt Hàng",isActive:"orders",onClick:()=>{},to:"/system/seller/orders"},
      {title:"Thống Kê",isActive:"analyst",onClick:()=>{},to:"/system/seller/analyst"},
    ]
    return (
      <div className={styles.sideBar}>
        {
          menuItem.map((item)=>{
            return <MenuItem title={item.title} isActive={item.isActive} onClick={item.onClick} to={item.to}/>
          })
        }
      </div>
    )
  }else if(role === "ceo"){
    const menuItem = [
      {title:"Sản Phẩm",isActive:"products",onClick:()=>{},to:"/system/ceo/products"},
      {title:"Phiếu Nhập Kho",isActive:"inventory",onClick:()=>{},to:"/system/ceo/inventory"},
      {title:"Loại Sản Phẩm",isActive:"categories",onClick:()=>{},to:"/system/ceo/categories"},
      {title:"Nhà Cung Cấp",isActive:"supplier",onClick:()=>{},to:"/system/ceo/supplier"},
      {title:"Khách Hàng",isActive:"customers",onClick:()=>{},to:"/system/ceo/customers"},
      {title:"Đơn Đặt Hàng",isActive:"orders",onClick:()=>{},to:"/system/ceo/orders"},
      {title:"Doanh Thu",isActive:"sale",onClick:()=>{},to:"/system/ceo/sale"},
      {title:"Chi Tiêu",isActive:"spend",onClick:()=>{},to:"/system/ceo/spend"},
      {title:"Thống Kê Đơn Hàng",isActive:"analystorder",onClick:()=>{},to:"/system/ceo/analystorder"},
    ]
    return (
      <div className={styles.sideBar}>
        {
          menuItem.map((item)=>{
            return <MenuItem title={item.title} isActive={item.isActive} onClick={item.onClick} to={item.to}/>
          })
        }
      </div>
    )
  }
}

export default Sidebar