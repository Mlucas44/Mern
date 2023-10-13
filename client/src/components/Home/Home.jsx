import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import home1 from "./home1.jpg";
import home2 from "./home2.jpg";
import home3 from "./home3.jpg";

// Composant de flèche gauche pour le carousel
function ArrowLeft(props) {
  return <FontAwesomeIcon icon={faChevronLeft} {...props} />;
}

// Composant de flèche droite pour le carousel
function ArrowRight(props) {
  return <FontAwesomeIcon icon={faChevronRight} {...props} />;
}

const Home = () => {
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: home1,
      title: "Titre 1 - Résumer du match",
      description: "Je suis la Description numéro 1",
      link: "#link1",
    },
    {
      image: home2,
      title: "Titre 2 - Gambardella 2ème tour",
      description: "Je suis la Description numéro 2",
      link: "#link2",
    },
    {
      image: home3,
      title: "Titre 3 - Coupe de france",
      description: "Je suis la Description numéro 3",
      link: "#link3",
    },
  ];
  // Paramètres pour le composant Slider (react-slick)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    initialSlide: 0,
    arrows: true,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
    beforeChange: (next) => {
      setCurrentSlide(next);
      setProgress(0);
    },
  };
  const effectiveAutoplaySpeed = settings.autoplaySpeed - settings.speed;
  // Effet pour mettre à jour la barre de progression du diaporama
  useEffect(() => {
    if (progress < 100 && settings.autoplay) {
      console.log("Progress:", progress);
      const timer = setTimeout(() => {
        setProgress(progress + 100 / (effectiveAutoplaySpeed / 100));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, settings.autoplay, effectiveAutoplaySpeed]);
  // Fonction pour afficher les slides
  const renderSlides = () =>
    slides.map((slide, index) => (
      <div key={index} className="slide-content">
        <img
          src={slide.image}
          alt={`Slide ${index + 1}`}
          className="background-image"
        />
        <div className="slide-info">
          <h2>{slide.title}</h2>
          <p>{slide.description}</p>
          <a href={slide.link} className="learn-more-btn">
            En savoir plus
          </a>
        </div>
      </div>
    ));
  // Fonction pour afficher les barres de progression
  const renderProgressBars = () =>
    slides.map((slide, index) => (
      <div key={index} className="progress-section">
        <div className="progress-title">{slide.title}</div>
        <div
          className={`progress-bar ${currentSlide === index ? "active" : ""}`}
          style={{ width: currentSlide === index ? `${progress}%` : "0%" }}
        ></div>
      </div>
    ));

  return (
    <div className="home-container">
      <Slider {...settings}>{renderSlides()}</Slider>
      <div className="progress-container">{renderProgressBars()}</div>
    </div>
  );
};

export default Home;
