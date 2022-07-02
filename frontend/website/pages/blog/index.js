import { useCallback, useState } from "react"

import Header from "../../components/header.js"
import Footer from "../../components/footer.js"
import HeadMetadata from "../../components/headMetadata.js"
import axios from "axios";
import getAllBlogPosts from "../../api/getAllBlogPosts.js";
import apiBaseUrl from "../../utils/apiBaseUrl.js";
import moment from "moment";

function Index({posts}) {
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([])

    const handleChange = useCallback(async (e) => {
      const query = e.target.value
      setQuery(query);

      try {
        const response = await axios(`${apiBaseUrl}/posts/get-blog-posts-by-tag?tag=${query}`)
        if(response.data.posts != [])
        {
          setSearchResult(response.data.posts)
        }
        else {
          setSearchResult([])
        }
        
      } catch(error) {
        return {getDataError: true}
      }  
      
    }, [])
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="Blog Posts | Samiun's Blog"
          metaDescription="List of all blog posts published on the Samiun Black blog."
        />
        <div className="blog-posts-container">
          <Header />
          <h1>writings</h1>
          <div class="homepage-search blog-posts-search">
              <span className="search-icon-box">

                <img alt="" src="/search.svg" decoding="async" data-nimg="intrinsic" srcset="/search.svg 1x, /search.svg 2x"/>
                <noscript></noscript>
              </span>
              <label for="test" className="homepage-search-label">Search</label>
              <div style={{ position: "relative", display: "flex" }}>
                <input id="test" role="combobox" aria-autocomplete="list" aria-expanded="false" autoComplete="off" onChange={handleChange}/>
              </div>
            </div> 
          <div className="blog-posts-list">
            {(posts && searchResult.length == 0) ?
                
                  posts.map((post, index) => {
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
                  })
                  :(searchResult.length == 0) && 
                  <div className="blog-posts-get-data-error-msg">
                    <span>An error occurred.</span>
                  </div>
              }
              {
                query != "" && searchResult.length != 0 && 
                    searchResult.map((post, index) => {
                      return(
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
                    })
              }
          </div>
        </div>
        <Footer />
      </div>
    )
}

Index.getInitialProps = async () => {
  const apiResult = await getAllBlogPosts()
  return {
    posts: apiResult && apiResult.posts,
    getDataError: apiResult && apiResult.getDataError
  }
}

export default Index