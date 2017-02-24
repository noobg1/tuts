import React from 'react'

export default class VideoThumbnail extends React.Component {
  selectVideo (videoId) {
    this.props.playVideo(videoId)
  }
  render() {
    return (
      <div >
        {/*{console.log(this.props.imageUrl, this.props.videoId)}*/}
        <img src={this.props.imageUrl} ref={this.props.imageUrl} onClick={this.selectVideo.bind(this, this.props.videoId)} />
      </div>
    )
  }
}

