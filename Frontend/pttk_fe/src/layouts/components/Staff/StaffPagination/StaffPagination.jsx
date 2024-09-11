import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./StaffPagination.module.scss"
import React, { useEffect, useState } from "react";
const StaffPagination = ({itemsPerPage,onChange,amount})=>{
    const [currentPage,setcurrentPage] = useState(1)
    // tổng số trang 
    const totalPages = Math.ceil(amount / itemsPerPage);
    const increasePage = ()=>{
        if(currentPage<totalPages){
            setcurrentPage(currentPage+1)
        }
    }
    const decreasePage = ()=>{
        if(currentPage>1){
            setcurrentPage(currentPage-1)
        }
    }
    useEffect(()=>{
        onChange(currentPage)
    },[currentPage])
    const renderPage = ()=>{
        let paginate = []
        if(totalPages === 1){
            return;
        }
        if(totalPages <= 10){
            paginate.push(<button key={"chervonLeft"} className={styles.button} onClick={()=>decreasePage()}><FontAwesomeIcon icon={faChevronLeft} /></button>)
            paginate.push(Array.from({ length: totalPages }, (_, index) => (
                currentPage === index+1
                ?
                <button className={styles.chooseButton} key={index} onClick={()=>setcurrentPage(index+1)} >
                  {index + 1}
                </button>
                :
                <button className={styles.button} key={index} onClick={()=>setcurrentPage(index+1)}>
                  {index + 1}
                </button>
            )))
            paginate.push(<button key={"chervonRight"} className={styles.button} onClick={()=>increasePage()}><FontAwesomeIcon icon={faChevronRight} /></button>)
            return paginate
        }else{
            paginate.push(<button key={"chervonLeft"} className={styles.button} onClick={()=>decreasePage()}><FontAwesomeIcon icon={faChevronLeft} /></button>)
            let buttons = []
            if(currentPage>=1&&currentPage<5){
                buttons = [1,2,3,4,5,"...",totalPages]
            }else if(currentPage>=5&&currentPage<totalPages-3){
                buttons = [1,"...",currentPage-1,currentPage,currentPage+1,"...",totalPages]
            }else{
                buttons = [1,"...",totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages]
            }
            paginate.push(buttons.map((button,index)=>{
                if(button === "..."){
                    return <span className={styles.spaceDot} key={index}>{button}</span>
                }else{
                    if(currentPage===button){
                        return <button key={index}  onClick={()=>setcurrentPage(button)} className={styles.chooseButton}>{button}</button>
                    }else{
                        return <button key={index}  onClick={()=>setcurrentPage(button)} className={styles.button}>{button}</button>
                    }
                }
            }))
            paginate.push(<button key={"chervonRight"} className={styles.button} onClick={()=>increasePage()}><FontAwesomeIcon icon={faChevronRight}/></button>)
            return paginate
        }
    }
    return (
        <div className={styles.pagination}>
            {renderPage()}
        </div>
    )
}
export default StaffPagination