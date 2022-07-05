import { useCallback, useState } from "react"
import moment from "moment"

import Footer from "../components/footer.js"
import HeadMetadata from "../components/headMetadata.js"

import getAllBlogPosts from "../api/getAllBlogPosts"
import apiBaseUrl from "../utils/apiBaseUrl.js"
import axios from "axios"

function Index ({posts}) {
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
          title="Samiun's Blog"
          metaDescription="Samiun's blog about tech, productivity and learning tips"
          imageURL="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

        />
        <div className="homepage-container">
          <div className="homepage-introduction">
            <h1>SB</h1>
            <p>Hi, I'm Samiun Black!</p>
            <br></br>
            <p>I am a high school student and software developer.</p>
            <p>This is my place on the web to share my thoughts, tips,
              and techniques on technology, productivity, and learning.
            </p>
            <br></br>
            <p>If you have any questions or just want to say hi,
              you can contact me by my email at <a href="mailto: samiunblack@gmail.com" style={{ color: 'inherit' }}>samiunblack@gmail.com</a>
            </p>
          </div>
          <div className="homepage-latest-blog-posts">
            <h2>
              writings
              {/* <a className="homepage-latest-blog-posts-view-all" href="/blog">View all</a> */}
            </h2>
            <div class="homepage-search">
              <span className="search-icon-box">

                <img alt="" src="/search.svg" decoding="async" data-nimg="intrinsic" srcset="/search.svg 1x, /search.svg 2x"/>
                <noscript></noscript>
              </span>
              <label for="test" className="homepage-search-label">Search</label>
              <div style={{ position: "relative", display: "flex" }}>
                <input id="test" role="combobox" aria-autocomplete="list" aria-expanded="false" autoComplete="off" onChange={handleChange}/>
              </div>
            </div>
            
            <div className="homepage-latest-blog-posts-list">
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