import React from 'react'
import { findDOMNode } from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import expect from 'expect'
import App from '../components/App.jsx'


describe('App', function () {
    it('should render an h1', function () {
        const app = ReactTestUtils.renderIntoDocument(
            <App />
        )
        const h1 = ReactTestUtils.findRenderedDOMComponentWithTag(
            app, 'h1'
        )
        expect(app).toExist();
        expect(findDOMNode(h1).textContent).toEqual('Ad free youtube!')
        
    })
    it('should be of type div and contain "n" children', function () {
        const renderer = ReactTestUtils.createRenderer()
        renderer.render(<App />)
        const result = renderer.getRenderOutput()

        expect(result.type).toBe('div');
        expect(result.props.children.length).toEqual(4)
    })
})

