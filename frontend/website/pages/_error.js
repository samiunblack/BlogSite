import { Component } from "react"
import GoogleAnalytics from "../components/googleAnalytics.js"

import HeadMetadata from "../components/headMetadata.js"

export default class extends Component {
  static getInitialProps({ req, res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null

    return {
      statusCode: statusCode
    }
  }

  render () {
    return (
      <div className="layout-wrapper"> 
        <HeadMetadata
          title="Error | Samiun's Blog"
        />
        <GoogleAnalytics />
        <div className="error-container">
          {
            this.props.statusCode === 404 ?
            <>
              <h1>:( 404 Page Not Found</h1>
              <p>We can't seem to find the page you're looking for.</p>
            </> :
            <>
              <h1>An Error Occurred</h1>
              <p>An error occurred when trying to fulfill your request. Please try reloading the page or going back to the homepage.</p>
            </>
          }
        </div> 
      </div>
    )
  }
}