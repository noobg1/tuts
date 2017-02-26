import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.js';
import ReactTestUtils from 'react-addons-test-utils';

describe ('App', () => {
  it('should render with the correct DOM', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('div');
    
  });
});
