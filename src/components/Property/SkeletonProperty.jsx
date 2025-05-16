export default function SkeletonProperty() {
  
    return (
    <>
      <div className='container property'>
        <h2 className="skeleton-grid" style={{width: "50%", fontSize: "2em", margin: "10px auto"}}>&nbsp;</h2>
        <div className='skeleton-grid' style={{width: "40px", height:"30px", margin: "20px auto"}}>&nbsp;</div>
        <div className='skeleton-grid' style={{maxWidth: "60%", height: "500px", margin: "10px auto"}}></div>
        <div className="skeleton-grid" style={{width: "50%", fontSize: "2em", margin: "10px auto"}}>&nbsp;</div>
        <div className="skeleton-grid" style={{width: "50%", fontSize: "2em", margin: "10px auto"}}>&nbsp;</div>
      </div>
    </>)
}