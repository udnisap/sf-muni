import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import Munis from '../Munis';

const emptyMuniProps = {
  munis: [],
  opts: {
    center: [-122.4156103593884, 37.757576707691854],
    scale: 533151.8917874214,
    offset: [892.3481572354682, 833.3687293139296]
  }
};

import withMuniProps from './withMunis';
describe('Muni', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Munis {...emptyMuniProps} />, div);
  });

  it('render without munis', () => {
    expect(shallow(<Munis {...emptyMuniProps} />)).toMatchSnapshot();
  });

  it('render with munis', () => {
    expect(shallow(<Munis {...withMuniProps} />)).toMatchSnapshot();
  });
});
