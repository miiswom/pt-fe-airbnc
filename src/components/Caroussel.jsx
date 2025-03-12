import { useEffect, useRef } from 'react'

// import { moveDots, moveLeft, moveRight } from '../utils/caroussel';

export default function Caroussel({images}) {
  const divRef = useRef(null)
  const document = divRef.current
  // console.log("divRef.current", divRef.current.querySelector(".carousel__track"))

  useEffect(()=>{
    activateCaroussel()
  }, [])


  console.log("Caroussel images", images)
  return (
    <div className="carousel" ref={divRef}>
      <button
        onClick={activateCaroussel.moveLeft}
        className="carousel__button carousel__button--left is-hidden">
        <img src="../../styles/assets/chevron-left.svg" alt="" />
      </button>
      <div className="carousel__track-container">
        <ul className="carousel__track">

          {images.map((img, i) => {
            return (<>
              <li key={i} className="carousel__slide current-slide">
                <img className="carousel__image" style={{ maxWidth: "100%", marginBottom: "20px" }} src={img} alt="" />
              </li>
              <li key={img} className="carousel__slide">
                <img className="carousel__image" src={img} alt="" />
              </li>
            </>

            )
          })
          }
        </ul>

      </div>
      <button
        onClick={activateCaroussel.moveRight}
        className="carousel__button carousel__button--right">
        <img src="../../styles/assets/chevron-right.svg" alt="" />
      </button>
      <div className="carousel__nav">
        {images.map((img, i) => {
          return <button
            onClick={activateCaroussel.moveDots}
            className="carousel__indicator current-slide"></button>
        })}
      </div>
    </div>
  )
}

function activateCaroussel() {
  const track = document.querySelector(".carousel__track");
  const slides = Array.from(track.children);
  // const slides = images;
  console.log("slides", slides)
  const previousButton = document.querySelector(".carousel__button--left");
  const nextButton = document.querySelector(".carousel__button--right");
  const dotsNav = document.querySelector('.carousel__nav');
  const dots = Array.from(dotsNav.children)

  console.log(track);
  // console.log(dots)


  // getBoundingClientRect() returns the size: 
  // left, top, right, bottom, x, y width, height of an element
  const slideWidth = slides[0].getBoundingClientRect().width;

  console.log(slideWidth)
  // arrange the slides next to one another

  // slides[0].style.left = slideWidth * 0 + 'px';
  // slides[1].style.left = slideWidth * 1 + 'px';
  // slides[2].style.left = slideWidth * 2 + 'px';
  // slides[3].style.left = slideWidth * 3 + 'px';
  // slides[4].style.left = slideWidth * 4 + 'px';
  // slides[5].style.left = slideWidth * 5 + 'px';
  // slides[6].style.left = slideWidth * 6 + 'px';
  // slides[7].style.left = slideWidth * 7 + 'px';

  function setSlidePosition(slide, index) {
    slide.style.left = slideWidth * index + 'px';

  }

  slides.forEach(setSlidePosition);

  // function that takes 3 parameters:
  // 1 --- the track that we need to look into,
  // 2 --- the currentSlide
  // 3 --- the slide that we want to move to
  // and then moves (left or right) inside the track from currentSlide to targetSlide
  function moveToSlide(track, currentSlide, targetSlide) {
    // moves to the next slide accross the track on the cross axis Y
    // *targetSlide.style.left* is the number stored inside left property of targetSlide 

    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    //update the classList
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  }
  function updateDots(currentDot, targetDot) {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  }

  // hide the arrows
  function hideShowArrows(targetIndex, slides, previousButton, nextButton) {
    if (targetIndex === 0) {
      previousButton.classList.add('is-hidden');
      nextButton.classList.remove('is-hidden')
    } else if (targetIndex === slides.length - 1) {
      previousButton.classList.remove('is-hidden');
      nextButton.classList.add('is-hidden');
    } else {
      previousButton.classList.remove('is-hidden');
      nextButton.classList.remove('is-hidden');
    }
  }


  // when I click left, move to the left
  previousButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const previousSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const previousDot = currentDot.previousElementSibling;
    const previousIndex = slides.findIndex(e => e === previousSlide);

    moveToSlide(track, currentSlide, previousSlide);
    updateDots(currentDot, previousDot);
    hideShowArrows(previousIndex, slides, previousButton, nextButton)

  });

  function moveLeft() {
    const currentSlide = track.querySelector('.current-slide');
    const previousSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const previousDot = currentDot.previousElementSibling;
    const previousIndex = slides.findIndex(e => e === previousSlide);

    moveToSlide(track, currentSlide, previousSlide);
    updateDots(currentDot, previousDot);
    hideShowArrows(previousIndex, slides, previousButton, nextButton)
  }

  // when I click right, move to the right
  nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(e => e === nextSlide)

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(nextIndex, slides, previousButton, nextButton)
  });

  function moveRight() {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(e => e === nextSlide)

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(nextIndex, slides, previousButton, nextButton)
  }

  // when I click the nav indicators. move to that slide
  dotsNav.addEventListener('click', e => {
    // e is the target/ element that was clicked

    // going up the dom tree, finds the closest element named 'button'
    const targetDot = e.target.closest('button');
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    // returns the number index of the first truthy element
    const targetIndex = dots.findIndex(e => e === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentDot, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(targetIndex, slides, previousButton, nextButton)

    console.log(targetIndex);

  });

  function moveDots() {
    // e is the target/ element that was clicked

    // going up the dom tree, finds the closest element named 'button'
    const targetDot = e.target.closest('button');
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    // returns the number index of the first truthy element
    const targetIndex = dots.findIndex(e => e === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentDot, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(targetIndex, slides, previousButton, nextButton)

    console.log(targetIndex);
return {moveLeft, moveDots, moveRight}
  }
}