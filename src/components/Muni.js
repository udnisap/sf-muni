import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';
import { select } from 'd3-selection';
import { UPDATE_TIME, APPEARIN_TIME } from '../constants';

class Muni extends Component {
  componentWillEnter(cb) {
    select(this.node)
      .transition()
      .duration(APPEARIN_TIME)
      .ease(easeLinear)
      .style('fill-opacity', 1)
      .on('end', () => {
        this.setState({ alpha: 1 });
        cb();
      });
  }

  componentWillLeave(cb) {
    select(this.node)
      .transition()
      .duration(APPEARIN_TIME)
      .ease(easeLinear)
      .style('fill-opacity', 0)
      .on('end', () => {
        this.setState({ alpha: 0 });
        cb();
      });
  }

  componentWillReceiveProps(nextProps) {
    const { x, y } = nextProps;
    if (this.state.x !== x || this.state.y !== y) {
      select(this.node)
        .transition()
        .duration(UPDATE_TIME)
        .ease(easeLinear)
        .attr('cx', x)
        .attr('cy', y)
        .on('end', () => {
          this.setState({ x, y });
        });
    }
  }

  constructor(props) {
    super(props);
    const { x, y } = this.props;
    this.state = {
      alpha: 0,
      x,
      y
    };
  }

  render() {
    const { alpha, x, y } = this.state;
    return (
      <circle
        ref={node => (this.node = node)}
        cx={x}
        cy={y}
        r={5}
        className="muni"
        style={{ fillOpacity: alpha }}
      />
    );
  }
}

Muni.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default Muni;
