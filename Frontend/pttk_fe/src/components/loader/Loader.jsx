import React from "react";
import styles from "./Loader.module.scss"
function Loader(){
    return (
        <div className={styles.loader_Lay}>
            <div className={styles.cup}>
                <div className={styles.water}></div>
            </div>
        </div>
    )
}
export default Loader;