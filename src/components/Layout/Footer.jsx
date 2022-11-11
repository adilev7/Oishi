import styles from "./Footer.module.scss";
import MainNav from "./MainNav";
import UserNav from "./UserNav";

const Footer = (props) => {
  const darkStyle = props.dark ? styles.dark : '';
  return ( 
    <footer className={darkStyle}>
      <MainNav className={styles["main-nav"]} />
      <UserNav className={styles["user-nav"]} />
      <div className={styles.copyright}>Dev by Adi Lev</div>
    </footer> 
  );
}
 
export default Footer;