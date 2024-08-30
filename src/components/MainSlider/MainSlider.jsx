import Slider from "react-slick";
import mainSlider from "../../assets/slider-image-3.jpeg";
import mainSlider2 from "../../assets/slider-2.jpeg";
import mainSlider3 from "../../assets/grocery-banner-2.jpeg";
import Slide1 from "../../assets/slider-image-2.jpeg";
import Slide2 from "../../assets/slider-image-1.jpeg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    loop: true,
    arrows: false,
    autoplay: true,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4">
      <div className="lg:w-3/4 w-full">
        <Slider {...settings}>
          <img src={mainSlider} className="w-full h-60 lg:h-96 object-cover" alt="Main Slide 1" />
          <img src={mainSlider2} className="w-full h-60 lg:h-96 object-cover" alt="Main Slide 2" />
          <img src={mainSlider3} className="w-full h-60 lg:h-96 object-cover" alt="Main Slide 3" />
        </Slider>
      </div>
      <div className="lg:w-1/4 w-full flex flex-col gap-4">
        <img src={Slide1} className="w-full h-28 lg:h-48 object-cover" alt="Side Slide 1" />
        <img src={Slide2} className="w-full h-28 lg:h-48 object-cover" alt="Side Slide 2" />
      </div>
    </div>
  );
}
