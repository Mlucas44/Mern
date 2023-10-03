import React, { useEffect, useRef } from 'react';
import Home1 from './home1.jpg';
import Home2 from './home2.jpg';
import Home3 from './home3.jpg';
import './Home.scss';
import Slider from 'react-slick';

const ProgressBar = ({ duration, reset }) => {
    const progressRef = useRef(null);

    useEffect(() => {
        progressRef.current.style.width = '0%';

        const interval = setInterval(() => {
            if (progressRef.current) {
                const currentWidth = progressRef.current.style.width || "0%";
                const increment = 100 / (duration / 100);
                const newWidth = Math.min(100, parseFloat(currentWidth) + increment) + "%";
                progressRef.current.style.width = newWidth;
            }
        }, 100);

        return () => clearInterval(interval);
    }, [duration, reset]);

    return <div className="progress-container">
        <div className="progress" ref={progressRef}></div>
    </div>;
};

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        afterChange: () => { if (document.querySelector(".progress")) document.querySelector(".progress").style.width = "0%"; }, // Reset progress bar after slide change
        beforeChange: () => setResetFlag(prev => !prev) 
    };
    const [resetFlag, setResetFlag] = React.useState(false);
    const slideDisplayDuration = settings.autoplaySpeed;

    return (
        <div>
            <div className="carousel-fixed-container">
                <div className="carousel-container">
                    <Slider {...settings}>
                        <div className="slide-container">
                            <h2>Title 1</h2>
                            <img src={Home1} alt="Description 1" />
                            <ProgressBar duration={slideDisplayDuration} reset={resetFlag} />
                        </div>
                        <div className="slide-container">
                            <h2>Title 2</h2>
                            <img src={Home2} alt="Description 2" />
                            <ProgressBar duration={slideDisplayDuration} reset={resetFlag} />
                        </div>
                        <div className="slide-container">
                            <h2>Title 3</h2>
                            <img src={Home3} alt="Description 3" />
                            <ProgressBar duration={slideDisplayDuration} reset={resetFlag} />
                        </div>
                    </Slider>
                </div>
            </div>
            
        </div>
    );
}

export default Home;