import React from 'react'

export default class VideoThumbnail extends React.Component {
  selectVideo (videoId) {
    this.props.playVideo(videoId)
  }
  render() {
    return (
      <div >
        <img src={this.props.imageUrl} onClick={this.selectVideo.bind(this, this.props.videoId)} />
      </div>
    )
  }
}