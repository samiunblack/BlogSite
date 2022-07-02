import Link from "next/link"
import { Component } from "react"
import { FaLongArrowAltLeft } from 'react-icons/fa'

export default class extends Component {
  render () {
    return (
      <header className="header-wrapper">
        <Link  href="/"> 
          <div className="blog-post-backlink">
            <FaLongArrowAltLeft />
            <p>Home</p>  
          </div>  
        </Link>  
      </header>
    )
  }
}