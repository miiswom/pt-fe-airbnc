export default function Button({children, color="white", background="#BD003F", textDecoration="none"}) {
  const styling = {
    color: color,
    background: background,
    textDecoration: textDecoration  
  }

  return ( <button className="btn" style={{...styling}}>  
      {children}
    </button>
  )
}