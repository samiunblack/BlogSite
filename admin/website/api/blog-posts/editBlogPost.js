import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl.js"

export default function(id, title, urlTitle, dateTimestamp, tags, thumbnailImageUrl, thumbnailImageCaption, markdownContent, seoTitleTag, seoMetaDescription, callback) {
  axios.put(`${apiBaseUrl}/blog-posts/edit`, {
    id: id,
    title: title,
    urlTitle: urlTitle,
    dateTimestamp: dateTimestamp,
    tags: tags,
    thumbnailImageUrl: thumbnailImageUrl,
    thumbnailImageCaption: thumbnailImageCaption,
    markdownContent: markdownContent,
    seoTitleTag: seoTitleTag,
    seoMetaDescription: seoMetaDescription
  }, {
    withCredentials: true
  })
  .then(function(response) {
    callback(response.data)
  })
  .catch(function(error) {
    callback({submitError: true})
  })
}