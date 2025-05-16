export default function SkeletonProperty() {
  
    return (
    <>
      <div className=' property'>
        <div className="skeleton-grid" style={{maxWidth: "600px", fontSize: "2em", margin: "10px auto"}}>&nbsp;</div>
        <div className='skeleton-grid' style={{maxWidth: "40px", height:"30px", margin: "20px auto"}}>&nbsp;</div>
        <div className="skeleton-grid" style={{ margin: "10px auto", maxWidth: "800px", minHeight:"70vmin", alignItems: "center", justifyContent: "space-between", gap: "70%" }}></div>
        <div className="skeleton-grid" style={{maxWidth: "500px", fontSize: "2em", margin: "13px auto"}}>&nbsp;</div>
        <div className="skeleton-grid" style={{maxWidth: "500px", fontSize: "2em", margin: "13px auto"}}>&nbsp;</div>
      </div>
    </>)
}