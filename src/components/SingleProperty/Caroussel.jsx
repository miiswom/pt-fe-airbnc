import { useEffect, useRef, useState } from "react";

export default function Caroussel({ images }) {
  const divRef = useRef(null);
  const [carouselInstance, setCarouselInstance] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 👈 Store window width

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // 👈 Update state on resize
    };

    window.addEventListener("resize", handleResize);
    const instance = activateCaroussel();
    setCarouselInstance(instance);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]); // 👈 Re-run effect when `windowWidth` changes

  return (
    <div className="carousel" ref={divRef}>
      <button
        onClick={() => carouselInstance?.moveLeft()}
        className="carousel__button carousel__button--left is-hidden"
      >
        <img src="../../styles/assets/chevron-left.svg" alt="" />
      </button>

      <div className="carousel__track-container">
        <ul className="carousel__track">
          {images.map((img, i) => (
            <li
              key={i}
              className={`carousel__slide ${i === 0 ? "current-slide" : ""}`}
            >
                <img
                  className="carousel__image"
                  style={{ maxWidth: "100%", marginBottom: "20px" }}
                  src={img}
                  alt=""
                />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => carouselInstance?.moveRight()}
        className="carousel__button carousel__button--right"
      >
        <img src="../../styles/assets/chevron-right.svg" alt="" />
      </button>

      <div className="carousel__nav">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => carouselInstance?.jumpToSlide(i)}
            className="carousel__indicator"
          ></button>
        ))}
      </div>
    </div>
  );
}

function activateCaroussel() {
  const track = document.querySelector(".carousel__track");
  if (!track) return;
  const slides = Array.from(track.children);
  const previousButton = document.querySelector(".carousel__button--left");
  const nextButton = document.querySelector(".carousel__button--right");
  const dotsNav = document.querySelector(".carousel__nav");
  const dots = Array.from(dotsNav.children);

  let slideWidth = slides[0]?.getBoundingClientRect().width || 0;
  let currentIndex = 0; 

  function updateSlideWidth() {
    slideWidth = slides[0]?.getBoundingClientRect().width || 0;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function setSlidePosition() {
    slides.forEach((slide, index) => {
      slide.style.left = `${index * slideWidth}px`;
    });
  }

  function moveToSlide(targetIndex) {
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    track.style.transition = "transform 0.3s ease-in-out";
    track.style.transform = `translateX(-${targetIndex * slideWidth}px)`;
    
    slides[currentIndex].classList.remove("current-slide");
    slides[targetIndex].classList.add("current-slide");

    dots[currentIndex]?.classList.remove("current-slide");
    dots[targetIndex]?.classList.add("current-slide");

    currentIndex = targetIndex;
    hideShowArrows();
  }

  function hideShowArrows() {
    previousButton.classList.toggle("is-hidden", currentIndex === 0);
    nextButton.classList.toggle("is-hidden", currentIndex === slides.length - 1);
  }

  function moveLeft() {
    moveToSlide(currentIndex - 1);
  }

  function moveRight() {
    moveToSlide(currentIndex + 1);
  }

  function jumpToSlide(index) {
    moveToSlide(index);
  }

  setSlidePosition();
  hideShowArrows();

  return { moveLeft, moveRight, jumpToSlide, updateSlideWidth };
}
