import React from 'react'
import SearchBox from './SearchBox.jsx'
import YTSearch from 'youtube-api-search'
import VideoListView from './VideoListView.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoList: [],
      currentVideo: {id: 'fd2Cayhez58'}
    }
  }
  getSearch (searchText) {
    YTSearch({ key:'AIzaSyC0eRJFeskvSYN75bmvY3PAxo2V9OUQp1k', term: searchText }, (videos) => {
      this.setState({videoList: videos})
    })
  }
  playVideo(videoId) {
    this.setState({currentVideo: {id: videoId}})
  }

  render() {
    return (
      <div className="container">
        <div className="search">
          <SearchBox search={this.getSearch.bind(this)}/>
        </div>
        <div className="mainVideoShowView">
          <iframe src={"https://www.youtube.com/embed/"+this.state.currentVideo.id} /> 
        </div>
        <div className="videoListView">
          <VideoListView videoList={this.state.videoList} playVideo={this.playVideo.bind(this)}/>
        </div>
      </div>
    )
  }
}