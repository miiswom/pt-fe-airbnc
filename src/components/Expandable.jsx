import {useState} from 'react'

export default function Expandable({children}) {
  console.log(children)
  const [showContent, setShowContent] = useState(false);

  function handleClick() {
    return setShowContent((current) => {
      return !current
    })
  }
  return (
    <>
    <button className='expandable' onClick={handleClick}>{showContent ? "Close ":"Open " }</button>
    {showContent ? children : null}
    </>
    
  )
}