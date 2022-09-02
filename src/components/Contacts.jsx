import { Component } from 'react';
import { Button } from './Styles';
import PropTypes from 'prop-types';

export class Contacts extends Component {
  render() {
    const { filterByName, toDelete } = this.props;

    return (
      <ul>
        {filterByName().map(({ name, number, id }) => (
          <li key={id}>
            {name}: {number}
            <Button
              type="submit"
              onClick={() => {
                toDelete(id);
              }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    );
  }
}
Contacts.propTypes = {
  filterByName: PropTypes.func,
  toDelete: PropTypes.func,
};
