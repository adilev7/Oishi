import styles from './ImageTextColumns.module.scss'

const ImageTextColumns = (props) => {
  const darkStyle = props.dark ? styles.dark : '';
  return (
    <div className={`${styles["image-text-columns"]} ${darkStyle}`}>
      {props.children}
    </div>
  );
};

export default ImageTextColumns;
