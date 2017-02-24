import React from 'react'
import { findDOMNode } from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import expect from 'expect'
import VideoListView from '../components/VideoListView.jsx'
import VideoThumbnail from '../components/VideoThumbnail.jsx'
import YTSearch from 'youtube-api-search'



describe('VideoListView', function () {
    it('should return length of list items', function (done) {
    
    
    YTSearch({ key:'AIzaSyC0eRJFeskvSYN75bmvY3PAxo2V9OUQp1k', term: 'reactjs' }, (videos) => {
        const result= ReactTestUtils.renderIntoDocument(
                    <VideoListView videoList={videos} playVideo={() => { }} />)
        const liElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(result,'li')
        expect(liElements.length).toEqual(5)
        done()
    })
    
    }, 10000)
})

