import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import Muni from '../Muni';

describe('Muni', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Muni x={2} y={3} />, div);
  });

  it('renders without crashing', () => {
    expect(shallow(<Muni x={2} y={3} />)).toMatchSnapshot();
  });
});
