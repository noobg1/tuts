import ReactTestUtils from 'react-addons-test-utils'
import React from 'react'
import chai from 'chai'
import VideoThumbnail from '../components/VideoThumbnail.jsx'
import { shallow } from 'enzyme'
import sinon from 'sinon'
const expect = chai.expect



describe('VideoThumbnail', function () {
    it('should return number of childrens', function () {
        const result= ReactTestUtils.renderIntoDocument(<VideoThumbnail imageUrl={'https://i.ytimg.com/vi/PoESnWg-9GQ/default.jpg'} playVideo={() => {}} videoId={'PoESnWg-9GQ'}/>)
    
        const imgElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(result,'img')
         
        // const url = 'https://i.ytimg.com/vi/PoESnWg-9GQ/default.jpg'
        // const node = VideoThumbnail.refs.url
        // ReactTestUtils.Simulate.click(node)
        // expect(imgElements.length).toEqual(1)

        const onClick = sinon.spy();
        const wrapper = shallow(
        <VideoThumbnail imageUrl={'https://i.ytimg.com/vi/PoESnWg-9GQ/default.jpg'} playVideo={() => {}} videoId={'PoESnWg-9GQ'} onClick={'PoESnWg-9GQ'}/>
        )
        wrapper.find('img').simulate('click')
        //expect(1).toEqual(2)
        console.log(onClick)
        expect(onClick.calledOnce).to.eqls(true)

    })
})