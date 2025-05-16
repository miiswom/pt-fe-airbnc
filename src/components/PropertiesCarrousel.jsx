import { useState, useEffect } from "react"
import { fetchPropertyById } from "../utils/fetch";
import updateOptions from "../utils/updateOptions";


export default function PropertiesCarrousel({ properties }) {
  const [slides, setSlides] = useState([].flat());
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    handleFetchPropertiesImg()
  }, [])

  const prevSlide = () => setCurr(curr => curr === 0 ? slides.length - 1 : curr - 1)
  const nextSlide = () => setCurr(curr => curr === slides.length - 1 ? 0 : curr + 1)

  const handleFetchPropertiesImg = async () => {
    const promises = properties.map(property => {
      return fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property.property_id}`)
        .then(res => res.json().then(data => {
          return data.property.images
        }))
    })

    Promise.all(promises).then(urls => {
      const returnedUrls = urls.map(url => url).slice(0, 5)
      setSlides(returnedUrls)
    })
  }


  return (
    <div style={{borderRadius: "10px", margin: "0 auto", maxWidth: "800px", overflow: "hidden", position: "relative" }}>
      <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((slide, i) => {
          return <img src={slide} alt="" />
        })}
      </div>
      
      <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "70%" }}>
        <button
          onClick={prevSlide}
          style={{ borderRadius: "50%", background: "white" }}>
          <img src="../../styles/assets/chevron-left.svg" alt="" />
        </button>
        <button
          onClick={nextSlide}
          style={{ borderRadius: "50%", background: "white" }}>
          <img src="../../styles/assets/chevron-right.svg" alt="" />
        </button>
      </div>
      {/* button for showing current slide*/}
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2" >
          {slides.map((_, i) => {
            return <div style={{ padding: `${curr === i ? "8px" : "4px"}`, opacity: `${curr === i ? "100%" : "50%"}` }} className={`transition-all w-3 h-3 bg-white rounded-full`} />
          })}
        </div>
      </div>

    </div>
  )
}