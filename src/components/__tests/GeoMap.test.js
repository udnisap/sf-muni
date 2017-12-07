import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import GeoMap from '../GeoMap';

const freeways = require('../../sfmaps/freeways.json');
const streets = require('../../sfmaps/streets.json');
const neighborhoods = require('../../sfmaps/neighborhoods.json');
const arteries = require('../../sfmaps/arteries.json');
const map = { neighborhoods, freeways, arteries, streets };
const opts = {
  center: [-122.4156103593884, 37.757576707691854],
  scale: 533151.8917874214,
  offset: [892.3481572354682, 833.3687293139296]
};

describe('GeoMap', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GeoMap map={map} opts={opts} />, div);
  });
});
