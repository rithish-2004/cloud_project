import React from 'react';
import Slider from 'react-slick';
import './login.css';

const images = [
  'https://i.pinimg.com/originals/75/e7/ef/75e7ef7aa27009befb076509382b86b8.gif',
  'https://www.bing.com/th/id/OGC.169c11293f5c08a325ee1bbc8a0d4cb8?pid=1.7&rurl=https%3a%2f%2fcdn.dribbble.com%2fusers%2f1138853%2fscreenshots%2f4834993%2f06_08_gif.gif&ehk=T2vCEtbrYOEadOdzxFWoq%2b2o7pkNph2CZ7nrzUYA6LM%3d',
  'https://media3.giphy.com/media/MGdfeiKtEiEPS/giphy.gif'
];

const ImageCarousel = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
  
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="carousel-item">
              <img src={src} alt={`Slide ${index}`} />
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default ImageCarousel;