import styles from "./ImageWithText.module.scss";

const ImageWithText = (props) => {
  const darkStyle = props.dark ? styles.dark : '';
  const title = props.title || "IMAGE WITH TEXT";
  const image = (
    <img
      src={
        props.src ||
        "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
      }
      alt={title}
    />
  );
  return (
    <div className={`${styles["image-with-text"]} ${darkStyle}`}>
      {props.position === 'left' && image}
      <div className={styles.text}>
        <h1>{title}</h1>
        <p>
          {props.text ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dignissimos, explicabo quidem architecto distinctio molestiae reiciendis consequuntur cupiditate placeat necessitatibus neque totam ipsa facilis eius odio fugit quisquam? Quod, debitis. Nulla adipisci itaque quisquam voluptatem architecto fugit praesentium fuga temporibus quibusdam deleniti non, obcaecati iusto est, vitae sequi totam exercitationem nobis voluptatum rem inventore ratione vero! Quam inventore nemo quibusdam."}
        </p>
      </div>
      {props.position === 'right' && image}
    </div>
  );
};

export default ImageWithText;
