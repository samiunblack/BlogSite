import { Component } from "react"
import moment from "moment"

import Header from "../../../components/header.js"
import Footer from "../../../components/footer.js"
import HeadMetadata from "../../../components/headMetadata.js"

import getBlogPostsByTag from "../../../api/getBlogPostsByTag.js"
import GoogleAnalytics from "../../../components/googleAnalytics"

export default class extends Component {
  static async getInitialProps ({ query }) {
    const apiResult = await getBlogPostsByTag(query.tag)

    return {
      posts: apiResult && apiResult.posts,
      tag: query.tag
    }
  }

  render () {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title={`Blog posts tagged as "${this.props.tag}" | Coding Blog`}
          metaDescription={`All blog posts tagged as "${this.props.tag}".`}
        />
        <GoogleAnalytics />
        <div className="blog-posts-container">
          <Header />
          <h1 style={{marginBottom: '10px'}}>Blog posts tagged as <u>{this.props.tag}</u></h1>
          <div className="blog-posts-list">
            {
              this.props.posts ?
              this.props.posts.map((post, index) => {
                return (
                  <a key={index} href={`/blog/${post.urlTitle}`}>
                        <div className="homepage-latest-blog-post">
                          <div className="homepage-latest-thumbnail">
                            <p>{moment.unix(post.dateTimestamp).format("YYYY-MM-DD")}</p>
                          </div>
                          <div className="homepage-latest-blog-post-title">
                            <h3>{post.title}</h3>
                          </div>
                        </div>
                  </a>
                )
              }) : null
            }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}