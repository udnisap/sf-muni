import React from 'react';
import PropTypes from 'prop-types';
import { geoMercator, geoPath } from 'd3-geo';

const GeoMap = ({
  map: { streets, freeways, arteries, neighborhoods },
  opts: { center, scale, offset }
}) => {
  const projection = geoMercator()
    .center(center)
    .scale(scale)
    .translate(offset);
  const path = geoPath().projection(projection);
  return (
    <g>
      {neighborhoods.features.map((neighborhood, i) => (
        <path key={i} d={path(neighborhood)} className="neighborhood" />
      ))}
      {arteries.features.map((artery, i) => (
        <path key={i} d={path(artery)} className="arteries" />
      ))}
      {streets.features.map((street, i) => (
        <path key={i} d={path(street)} className="street" />
      ))}
      {freeways.features.map((freeway, i) => (
        <path key={i} d={path(freeway)} className="freeway" />
      ))}
    </g>
  );
};

GeoMap.propTypes = {
  map: PropTypes.object.isRequired,
  opts: PropTypes.object.isRequired
};
export default GeoMap;
