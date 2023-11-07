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
      title: "Rencontre avec nos deux présidents",
      description:
        "Après un an et demi à la tête du club, Christine FONTEYRAUD et Laurent DEPUSSAY se livrent au jeu des questions/réponses !",
      link: "#link1",
    },
    {
      image: home2,
      title: "Coupe de France féminine : Large victoire et qualification",
      description:
        "Nos féminines seront au prochain tour de la coupe de France !",
      link: "#link2",
    },
    {
      image: home3,
      title: "D3 – J6 : Grenoble / Arlac en live !",
      description:
        "Suivez le live de notre équipe fanion féminine en déplacement à Grenoble pour le compte de la 6ème journée du championnat.",
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
    beforeChange: (current, next) => {
      setProgress(0); // Réinitialisez la progression avant le changement de diapositive
    },
    afterChange: (current) => {
      setCurrentSlide(current); // Mettez à jour currentSlide après la transition
    },
  };
  const effectiveAutoplaySpeed = settings.autoplaySpeed - settings.speed;
  // Effet pour mettre à jour la barre de progression du diaporama
  useEffect(() => {
    if (progress < 100 && settings.autoplay) {
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
        <div
          style={{ backgroundImage: `url(${slide.image})` }}
          className="background-image"
        ></div>
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
        <div className="progress-title">
          <span className="slide-number">{index + 1}</span>
          <span className="slide-title">{slide.title}</span>
        </div>
        <div
          className={`progress-bar ${currentSlide === index ? "active" : ""}`}
          style={{ width: currentSlide === index ? `${progress}%` : "0%" }}
        ></div>
      </div>
    ));

  const NewContainer = () => {
    return (
      <div className="new-container">
        <h2>Mon Nouveau Conteneur</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          pharetra hendrerit velit et vestibulum. Maecenas ultricies mi id
          libero feugiat lobortis. Vestibulum iaculis purus quis est ultricies,
          vel varius purus porttitor. Nullam leo diam, consequat et nisi non,
          sodales sollicitudin orci. Vivamus eget porttitor nunc, ac rhoncus
          quam. Praesent eget mollis odio. Nullam at accumsan ipsum. Vestibulum
          at justo ut mauris ultricies fringilla pulvinar non lorem. Mauris sit
          amet est vitae elit hendrerit porttitor facilisis eu libero. Aliquam
          tristique enim lectus, id suscipit ante consequat ut. Nulla facilisi.
          Mauris ut tristique lectus. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam eu mi metus. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Curabitur varius
          tellus ex, ultricies interdum leo pretium sed. Nam mollis interdum
          feugiat. Aliquam vitae enim non lectus convallis tempor. Proin leo
          metus, varius ac finibus ac, porttitor non elit. Nam non hendrerit
          erat, sit amet faucibus metus. Aliquam vel finibus lacus, non
          tincidunt odio. Nam sit amet arcu ac lectus vehicula porttitor.
          Praesent vestibulum risus et tincidunt maximus.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Pellentesque pharetra hendrerit
          velit et vestibulum. Maecenas ultricies mi id libero feugiat lobortis.
          Vestibulum iaculis purus quis est ultricies, vel varius purus
          porttitor. Nullam leo diam, consequat et nisi non, sodales
          sollicitudin orci. Vivamus eget porttitor nunc, ac rhoncus quam.
          Praesent eget mollis odio. Nullam at accumsan ipsum. Vestibulum at
          justo ut mauris ultricies fringilla pulvinar non lorem. Mauris sit
          amet est vitae elit hendrerit porttitor facilisis eu libero. Aliquam
          tristique enim lectus, id suscipit ante consequat ut. Nulla facilisi.
          Mauris ut tristique lectus. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam eu mi metus. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Curabitur varius
          tellus ex, ultricies interdum leo pretium sed. Nam mollis interdum
          feugiat. Aliquam vitae enim non lectus convallis tempor. Proin leo
          metus, varius ac finibus ac, porttitor non elit. Nam non hendrerit
          erat, sit amet faucibus metus. Aliquam vel finibus lacus, non
          tincidunt odio. Nam sit amet arcu ac lectus vehicula porttitor.
          Praesent vestibulum risus et tincidunt maximus.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Pellentesque pharetra hendrerit
          velit et vestibulum. Maecenas ultricies mi id libero feugiat lobortis.
          Vestibulum iaculis purus quis est ultricies, vel varius purus
          porttitor. Nullam leo diam, consequat et nisi non, sodales
          sollicitudin orci. Vivamus eget porttitor nunc, ac rhoncus quam.
          Praesent eget mollis odio. Nullam at accumsan ipsum. Vestibulum at
          justo ut mauris ultricies fringilla pulvinar non lorem. Mauris sit
          amet est vitae elit hendrerit porttitor facilisis eu libero. Aliquam
          tristique enim lectus, id suscipit ante consequat ut. Nulla facilisi.
          Mauris ut tristique lectus. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam eu mi metus. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Curabitur varius
          tellus ex, ultricies interdum leo pretium sed. Nam mollis interdum
          feugiat. Aliquam vitae enim non lectus convallis tempor. Proin leo
          metus, varius ac finibus ac, porttitor non elit. Nam non hendrerit
          erat, sit amet faucibus metus. Aliquam vel finibus lacus, non
          tincidunt odio. Nam sit amet arcu ac lectus vehicula porttitor.
          Praesent vestibulum risus et tincidunt maximus.
        </p>
      </div>
    );
  };

  return (
    <div className="test">
      <div className="home-container">
        <Slider {...settings}>{renderSlides()}</Slider>
        <div className="progress-container">{renderProgressBars()}</div>
      </div>
      <NewContainer /> {/* Ajoutez cette ligne */}
    </div>
  );
};

export default Home;
