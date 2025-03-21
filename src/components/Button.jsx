export default function Button({children, color="white", background="#BD003F"}) {
  const styling = {
    color: color,
    background: background
  }
  return (
    <button className="btn" style={{...styling}}>  
      {children}
    </button>
  )
}