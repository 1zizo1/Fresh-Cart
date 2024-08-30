import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
  let { productId, category } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentProductId, setcurrentProductId] = useState(0);

  let { addProductToCart } = useContext(CartContext);

  function getProduct(productId) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getRelatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function addProduct(productId) {
    setcurrentProductId(productId);
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response.data.status === "success") {
      setLoading(false);
      toast.success(response.data.message, {
        duration: 2000,
        position: "bottom-left",
      });
    } else {
      setLoading(false);
      toast.error(response.data.message, {
        duration: 2000,
        position: "bottom-left",
      });
    }
    console.log(response);
  }
  useEffect(() => {
    getProduct(productId);
    getRelatedProduct(category);
  }, [productId, category]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const relatedSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/4 p-4">
          {productDetails?.images.length > 1 ? (
            <Slider {...sliderSettings}>
              {productDetails.images.map((image, index) => (
                <div
                  key={index}
                  className="p-2"
                  onClick={() => openModal(image)}
                >
                  <img
                    className="w-full h-auto rounded-lg cursor-pointer"
                    src={image}
                    alt={`Product Image ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              className="w-full h-auto rounded-lg cursor-pointer"
              src={productDetails?.imageCover}
              alt={productDetails?.title}
              onClick={() => openModal(productDetails?.imageCover)}
            />
          )}
        </div>
        <div className="w-full md:w-3/4 p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {productDetails?.title}
          </h1>
          <p className="text-gray-600 mb-4">{productDetails?.description}</p>
          <div className="flex justify-between mb-4">
            <span className="text-xl font-semibold text-gray-800">
              {productDetails?.price} EGP
            </span>
            <span className="flex items-center text-yellow-500">
              {productDetails?.ratingsAverage}{" "}
              <i className="fas fa-star ml-1"></i>
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Brand:</span>{" "}
            {productDetails?.brand?.name}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Category:</span>{" "}
            {productDetails?.category?.name}
          </div>
          <div className="w-1/4">
          <button
            className="btn"
            onClick={() => {
              addProduct(productDetails?.id);
            }}
          >
            {loading && currentProductId === productDetails?.id ? (
              <i className="fa fa-spinner"></i>
            ) : (
              "add to cart"
            )}
          </button>

          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-screen-md w-full h-auto bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-gray-300 p-2 rounded-full text-gray-800 hover:bg-gray-400"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              className="w-full h-auto"
              src={modalImage}
              alt="Enlarged view"
            />
          </div>
        </div>
      )}

      <div className="py-6">
        <h3 className="font-semibold text-xl text-green-600">
          Related Products
        </h3>
        <Slider {...relatedSliderSettings}>
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 flex flex-col items-center product mb-1 "
            >
              <Link
                to={`/productDetails/${product.id}/${product.title}/${product.category.name}`}
                className="block w-full "
              >
                <img
                  className="w-full object-cover rounded-lg mb-2 "
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className="block text-sm font-light text-green-600 mb-1">
                  {product.category.name}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{product.price} EGP</span>
                  <span className="flex items-center">
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-500 ml-1"></i>
                  </span>
                </div>
              </Link>
              <button
                className="btn"
                onClick={() => {
                  addProduct(product.id);
                }}
              >
                {loading && currentProductId === product.id ? (
                  <i className="fa fa-spinner"></i>
                ) : (
                  "add to cart"
                )}
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
