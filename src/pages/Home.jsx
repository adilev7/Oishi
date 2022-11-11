import Banner from "../components/UI/Banner";
import fastDelivery from "../fast-delivery.png";
import foodService from "../food-service.png";
import restaurant from "../restaurant.png";
import RichText from "../components/UI/RichText";
import ImageWithText from "../components/UI/ImageWithText";
import ImageTextColumns from "../components/UI/ImageTextColumns";
import ImageTextColumn from "../components/UI/ImageTextColumn";

const Home = () => {
  return (
    <>
      <Banner
        image='https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg'
        title='UNAGI'
        height='100vh'
      />
      <div className='page-content'>
        <RichText title='EXTRAORDINARY FLAVOURS' />

        <ImageWithText
          title='SUSHI'
          btnText='View in menu'
          btnLink='/menu#sushi'
          position='left'
          dark={true}
        />
        <ImageWithText
          title='WOK'
          btnText='View in menu'
          btnLink='/menu#wok'
          position='right'
        />
        <ImageWithText
          title='RAMEN'
          btnText='View in menu'
          btnLink='/menu#ramen'
          position='left'
          dark={true}
        />

        <ImageTextColumns>
          <ImageTextColumn
            src={fastDelivery}
            title='Fast delivery'
            alt='fast-delivery'
          />
          <ImageTextColumn src={foodService} title='Order via app' />
          <ImageTextColumn src={restaurant} title='Best reviews' />
        </ImageTextColumns>
      </div>
    </>
  );
};

export default Home;
