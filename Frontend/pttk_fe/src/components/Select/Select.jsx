import { useEffect, useState } from "react"
import styles from "./Select.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useDebounce from "../../hooks/useDebounce"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
function Select({api,placeholder,category,setCategory}){
    const [content,setContent] = useState([])
    const debouncedValue = useDebounce(category,500) 
    const [isCollapsed,setIsCollapsed] = useState(false)
    useEffect(()=>{
        if(typeof(debouncedValue) === "string"){
            api({search:debouncedValue,size:10,page:1}).then((res)=>{
                setContent(res.data.content)
            })
        }
    },[debouncedValue])
    return (
        <div className={styles.wrapper}>
            <div onClick={()=>setIsCollapsed(!isCollapsed)} className={styles.selectWrapper}>
                <input onChange={(event)=>setCategory(event.target.value)} value={category.tenLoaiSanPham} placeholder={placeholder} className={styles.input}/>
                {
                    isCollapsed ? <FontAwesomeIcon className={styles.icon} icon={faChevronUp}/> : <FontAwesomeIcon className={styles.icon} icon={faChevronDown}/>
                }
            </div>
            {
                isCollapsed ? 
                <div className={styles.collapse}>
                    {
                        content.map((item,index)=>{
                            return <div key={index} onClick={()=>(setCategory(item),setIsCollapsed(false))} className={styles.item} style={{padding:"0.5rem",width:"30rem"}}>
                                <p>{item.tenLoaiSanPham}</p>
                            </div>
                        })
                    }
                </div>
                :
                <>

                </>
            }
        </div>
        
    )
}
export default Select