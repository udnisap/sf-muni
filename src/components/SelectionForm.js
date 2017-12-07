import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Well, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class SelectionForm extends Component {
  render() {
    const { routes, onChange } = this.props;
    return (
      <div className="form">
        <Well>
          <h3> SF - Muni Map</h3>
          <p>
            Welcome to SF-Muni map live update map. This will update every 15 seconds with the latest locations of the Munis in SF.
            {' '}
          </p>
          <p>
            To Check a specific route, use the dropdown below.
          </p>
          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>Select a Route</ControlLabel>
            <FormControl
              componentClass="select"
              onChange={event => {
                onChange(event.target.value);
              }}
            >
              <option value="all">all</option>
              {routes.map(route => (
                <option key={route} value={route}> {route} </option>
              ))}
            </FormControl>
          </FormGroup>

        </Well>
      </div>
    );
  }
}
SelectionForm.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectionForm;
