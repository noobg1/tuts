import React from 'react'
import VideoThumbnail from './VideoThumbnail.jsx'

export default class VideoListView extends React.Component {

  render() {
    let that = this
    let videoList = this.props.videoList.map(function(video, index) {
      return <li key={index}>
               <VideoThumbnail imageUrl={video.snippet.thumbnails.default.url} playVideo={that.props.playVideo} videoId={video.id.videoId}/>
            </li>
    })
    return (
      <div >
        {videoList}
      </div>
    )
  }
}