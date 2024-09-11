import React from 'react'
import styles from './Footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faFacebook, faGoogle, faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className={styles.mainFooter}>
        <div className={styles.socialNetwork}>
          <a href='https://www.facebook.com/' className={styles.circleIcon}>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href='https://www.instagram.com/' className={styles.circleIcon}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href='https://www.tiktok.com/' className={styles.circleIcon}>
            <FontAwesomeIcon icon={faTiktok} />
          </a>
          <a href='https://www.twitter.com/' className={styles.circleIcon}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href='https://www.google.com/' className={styles.circleIcon}>
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a href='https://www.youtube.com/' className={styles.circleIcon}>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href='https://www.discord.com/' className={styles.circleIcon}>
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </div>
        <span className={styles.copyRight}>Design by NTD & LTT Copyright 2024 Dekanta © All Rights Reserved</span>
    </footer>
  )
}

export default Footer