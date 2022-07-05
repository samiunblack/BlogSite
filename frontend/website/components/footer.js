import { Component } from "react"

export default class extends Component {
  render () {
    return (
      <footer className="footer-wrapper">
        <div>Copyright 2022 SB</div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/blog">Writing</a>
          <a href="mailto: samiunblack@gmail.com">Contact</a>
        </div>
      </footer>
    )
  }
}
