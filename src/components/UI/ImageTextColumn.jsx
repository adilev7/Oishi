const ImageTextColumn = (props) => {
  return (
    <div>
      <img src={props.src} alt={props.alt || props.title} />
      <h2>{props.title || "IMAGE TEXT COLUMN"}</h2>
      <p>
        {props.text ||
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptatibus enim et voluptates? Corporis culpa itaque inventore temporibus voluptates beatae."}
      </p>
    </div>
  );
};

export default ImageTextColumn;
