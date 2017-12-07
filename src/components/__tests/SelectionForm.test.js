import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import SelectionForm from '../SelectionForm';

const props = {
  routes: ['test1', 'test2'],
  onChange: jest.fn()
};

describe('Selection Form', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SelectionForm {...props} />, div);
  });

  it("should render 'all' without any items", () => {
    const emptyRoutes = { ...props, routes: [] };
    const comp = render(<SelectionForm {...props} />);
    expect(comp.find('option').length).toEqual(1); // 'all' option
  });

  it('should match snapshot', () => {
    const comp = shallow(<SelectionForm {...props} />);
    expect.toMatchSnapshot();
  });

  it.only('should call onChange when select is changed', () => {
    const comp = mount(<SelectionForm {...props} />);
    const selection = 'test';
    comp.find('select').simulate('change', { target: { value: selection } });
    expect(props.onChange).toBeCalledWith(selection);
  });
});
