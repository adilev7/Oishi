import styles from './RichText.module.scss'

const RichText = (props) => {
  const darkStyle = props.dark ? styles.dark : '';
  return (
    <div className={`${styles["rich-text"]} ${darkStyle}`}>
      <h1>{props.title || "Rich Text"}</h1>
      <p>
        {props.text ||
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aspernatur, dignissimos ab nostrum quia, possimus est itaque  dolores, expedita harum molestias. Officiis, deserunt. Praesentium sint deleniti ex ab tenetur quo cupiditate voluptatum minima optio.  Expedita, harum excepturi ab aliquam, ratione aliquid mollitia similique natus ipsam quis voluptatum vero impedit eaque debitis! Tempore quos  illo labore, odio ipsam est aperiam culpa?"}
      </p>
    </div>
  );
};

export default RichText;
