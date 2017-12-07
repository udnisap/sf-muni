import React, { Component } from 'react';
import './App.css';
import { geoCentroid, geoMercator, geoPath } from 'd3-geo';
import uniq from 'lodash/uniq';

import Munis from './components/Munis';
import GeoMap from './components/GeoMap';
import SelectionForm from './components/SelectionForm';

import { UPDATE_TIME } from './constants';

const freeways = require('./sfmaps/freeways.json');
const streets = require('./sfmaps/streets.json');
const neighborhoods = require('./sfmaps/neighborhoods.json');
const arteries = require('./sfmaps/arteries.json');
const map = { neighborhoods, freeways, arteries, streets };

const width = 1450;
const height = 1500;

/**
 * This is used to does all the state manipulations and content creations. 
 * Ideally this can be moved to a redux-sage or something similar in order to make the UI code clearner and maintainable
 *
 **/
class App extends Component {
  state = {
    vehicles: [],
    routes: [],
    selectedRoute: null,
    opts: this.calculateOpts(),
    map
  };

  render() {
    const { opts, routes, selectedRoute, map, vehicles } = this.state;
    const selectedVehicles = selectedRoute
      ? vehicles.filter(vehicle => vehicle.routeTag === selectedRoute)
      : vehicles;

    return (
      <div>
        <svg width={width} height={height} preserveAspectRatio="xMidYMid meet">
          <Munis munis={selectedVehicles} opts={opts} />
          <GeoMap opts={opts} map={map} />
        </svg>
        <SelectionForm
          onChange={route => {
            this.setState({ selectedRoute: route === 'all' ? null : route });
          }}
          routes={routes}
        />
      </div>
    );
  }

  calculateOpts() {
    const center = geoCentroid(freeways);
    let scale = 150;
    let offset = [width / 2, height / 2];
    const projection = geoMercator()
      .scale(scale)
      .center(center)
      .translate(offset);
    // create the path
    const path = geoPath().projection(projection);

    const bounds = path.bounds(streets);
    const hscale = scale * width / (bounds[1][0] - bounds[0][0]);
    const vscale = scale * height / (bounds[1][1] - bounds[0][1]);
    scale = hscale < vscale ? hscale : vscale;
    offset = [
      width - (bounds[0][0] + bounds[1][0]) / 2.6,
      height - (bounds[0][1] + bounds[1][1]) / 2.25
    ];
    return { center, scale, offset };
  }

  update(agency = 'sf-muni') {
    fetch(
      `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=${agency}`
    )
      .then(data => data.json())
      .then(units => units.vehicle)
      .then(vehicles => {
        const routes = uniq(vehicles.map(({ routeTag }) => routeTag));
        this.setState({ vehicles, routes });
      });
  }

  componentWillUnMount() {
    clearInterval(this.timeout);
  }

  componentWillMount() {
    this.update();
    this.timeout = setInterval(this.update.bind(this), UPDATE_TIME);
  }
}

export default App;
