import styles from "./Banner.module.scss";

const Banner = (props) => {
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${props.image})`,
        height: `calc(${props.height} - 66px)`,
      }}>
      <h1 className={styles.title}>{props.title}</h1>
    </div>
  );
};

export default Banner;
