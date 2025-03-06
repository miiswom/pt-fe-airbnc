import {useState} from 'react'

export default function Expandable({children}) {
  const [showContent, setShowContent] = useState(false);

  function handleClick() {
    return setShowContent((current) => {
      return !current
    })
  }
  return(
    <>
    <button className='expandable' onClick={handleClick}>{showContent ? "Hide ":"View " }Reviews</button>
    {showContent ? children : null}
    </>
    
  )
}