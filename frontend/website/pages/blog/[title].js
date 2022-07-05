import { Component } from "react"
import hljs from "highlight.js"
import moment from "moment"
import {GoPrimitiveDot} from "react-icons/go"

import "../../node_modules/highlight.js/styles/atom-one-dark.css"

import Footer from "../../components/footer.js"
import Header from "../../components/header.js"
import HeadMetadata from "../../components/headMetadata.js"

import getBlogPostByUrlTitle from "../../api/getBlogPostByUrlTitle.js"


export default class extends Component {
  componentDidMount() {
    hljs.highlightAll()
  }

  static async getInitialProps ({ query }) {
    const apiResult = await getBlogPostByUrlTitle(query.title)

    return {
      post: apiResult && apiResult.post,
      getDataError: apiResult && apiResult.getDataError,
      notFoundError: apiResult && apiResult.notFoundError
    }
  }

  

  render () {
    const wordCount = this.props.post.markdownContent.split(' ').length
    const readingTime = parseInt(wordCount / 238);
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title={this.props.post ? this.props.post.seoTitleTag : "Blog Post | Samiun's Blog"}
          metaDescription={this.props.post && this.props.post.seoMetaDescription}
          imageURL={this.props.thumbnailImageUrl && this.props.post.thumbnailImageUrl}
        />
        <div className="blog-post-container">
          { this.props.post && !this.props.getDataError && !this.props.notFoundError ? <div>
            <Header /> 
            <div className="blog-post-top-section">
              <h1>{this.props.post.title}</h1>
              <div className="blog-post-top-meta">
                <div className="blog-post-time">
                  SB {moment.unix(this.props.post.dateTimestamp).format("YYYY-MM-DD")} 
                  <GoPrimitiveDot></GoPrimitiveDot> {readingTime} minute</div>
                <div className="blog-post-tags">
                  {
                    this.props.post.tags.map((tag, index) => {
                      return (
                        <a className="blog-post-top-tag-btn" key={index} href={`/blog/tags/${tag}`}>
                             <span>#{tag}</span>
                        </a>
                      )
                    })
                  }
                </div> 
              </div>
              <div className="blog-post-cover-image-container">
                <img className="blog-post-cover-image" src={this.props.post.thumbnailImageUrl}/>
                <p className="blog-post-cover-image-caption">{this.props.post.thumbnailImageCaption}</p>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: this.props.post.markdownContent}} className="blog-post-body-content">
      
            </div>
          </div> : 
           <div className="blog-post-get-data-error-msg">
              {
                this.props.notFoundError ?
                <span>Blog post not found.</span> :
                <span>An error occurred.</span>
              }
            </div>
          }
        </div>
        <Footer />
      </div>
    )
  }
}