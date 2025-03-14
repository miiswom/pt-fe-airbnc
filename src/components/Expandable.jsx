import {useState} from 'react'

export default function Expandable({children, text}) {
  // console.log(children)
  const [showContent, setShowContent] = useState(false);

  function handleClick() {
    return setShowContent((current) => {
      return !current
    })
  }
  return (
    <>
    <button className='expandable' onClick={handleClick}>{showContent ? `Close ${text}`: `Open ${text}` }</button>
    {showContent ? children : null}
    </>
    
  )
}