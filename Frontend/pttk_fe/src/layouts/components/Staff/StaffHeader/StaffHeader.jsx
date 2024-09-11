import React from "react";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import styles from "./StaffHeader.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "../../../../services/UserService";
const StaffHeader = ()=>{
    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Dekanta</p>
            <button className={styles.signOut} onClick={()=>signOut()}><FontAwesomeIcon style={{width:"2rem",height:"2rem",color:"white"}} icon={faSignOut}/></button>
        </div>
    )
}
export default StaffHeader