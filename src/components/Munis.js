import React from 'react';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-addons-transition-group';
import { geoMercator } from 'd3-geo';

import Muni from './Muni';

const Munis = ({ munis, opts: { center, scale, offset } }) => {
  const projection = geoMercator()
    .center(center)
    .scale(scale)
    .translate(offset);
  return (
    <ReactTransitionGroup component="g">
      {munis
        .map(unit => ({
          id: unit.id,
          position: projection([unit.lon, unit.lat])
        }))
        .map(({ position: [x, y], id }, i) => (
          <Muni key={id} index={id} x={x} y={y} />
        ))}
    </ReactTransitionGroup>
  );
};

Munis.propTypes = {
  munis: PropTypes.array.isRequired,
  opts: PropTypes.object.isRequired
};
export default Munis;
