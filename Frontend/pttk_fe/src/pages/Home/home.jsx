import React from "react";
import styles from "./home.module.scss";
import Button from "../../components/Button";
import image2 from '../../assets/images/ruou.webp';

const Home = () => {
  return (
    <div className={styles.mainHome}>
      <div className={styles.introduceAboutWebSite}>
        <div className={styles.wrapperTextintroduce}>
          <div className={styles.introduceText}>
            <span className={styles.hashtagText}>#perfect design</span>
            <span className={styles.textDetails}>
              Why Japanese Whisky Is Worth The Price
            </span>
            <Button to="/product" large>Buy now</Button>
          </div>
        </div>
        <div className={styles.introduceImage}>
          <img src={image2} alt="ruou" />
        </div>
      </div>
      <div className={styles.introduceProduct}>
      </div>
      <div className={styles.hotEvent}>{/* những tấm poster */}</div>
    </div>
  );
};

export default Home;
