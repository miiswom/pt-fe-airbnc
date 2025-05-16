
import '../../../styles/App.css'
import { Link } from 'react-router'

export default function SkeletonGrid() {
  const skeletonArr = Array(20).fill(0)
  return (
    <ul className="grid-container ">
      {skeletonArr.map((item) => {
        return <li className="property-card" style={{width: "300px", color: "none"}}>
          <div className="property-card-img skeleton-grid" style={{height: "200px"}}>&nbsp;</div>
          <h2 className="skeleton-grid" style={{width: "130px", margin: "8px 0", fontSize: "1.2em"}}>&nbsp;</h2>
          <p className="skeleton-grid" style={{width: "100px"}}>&nbsp;</p>
        </li>
      })}
    </ul>
  )
}