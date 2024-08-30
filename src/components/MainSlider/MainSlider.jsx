import Style from "./MainSlider.module.css";
import mainSlider from "../../assets/slider-image-3.jpeg"
import mainSlider2 from "../../assets/slider-2.jpeg"
import mainSlider3 from "../../assets/grocery-banner-2.jpeg"
import Slide1 from "../../assets/slider-image-2.jpeg"
import Slide2 from "../../assets/slider-image-1.jpeg"
import Slider from "react-slick";
export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    loop:true,
    arrows:false,
    autoplay:true, 
  };
  return (
    <>
      <div className="row">
    <div className="w-3/4 ">

<Slider {...settings}>
<img src={mainSlider} className="w-full h-[400px]" alt="" />
<img src={mainSlider2} className="w-full h-[400px]" alt="" />
<img src={mainSlider3} className="w-full h-[400px]" alt="" />

</Slider>
    </div>
<div className="w-1/4">
<img src={Slide1} className="w-full h-[200px]" alt="" />
<img src={Slide2} className="w-full h-[200px]" alt="" />

</div>

      </div>
    </>
  );
}
