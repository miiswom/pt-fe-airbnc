import TwitterIcon from "../../../styles/assets/twitter.svg"
import GithubIcon from "../../../styles/assets/github.svg"
import LikedinIcon from "../../../styles/assets/linkedin.svg"

export default function Footer() {
  
  return (
    <footer className="footer-main">
      <nav className="footer-nav">
        <ul>
          <li>Home</li>
          <li>Sign In</li>
          <li>Sign up</li>
        </ul>
      </nav>
      <nav className="footer-nav">
      <ul className="icons-list">
          <li><a href=""><img src={TwitterIcon} alt="twitter icon" /></a></li>
          <li><a href=""><img src={GithubIcon} alt="github icon" /></a></li>
          <li><a href=""><img src={LikedinIcon} alt="linkedin icon"/></a></li>
        </ul>
      </nav>
      <p>Copyright © 2025 <a href="">miiswom</a></p>
    </footer>
  )
}