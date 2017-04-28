import React from 'react';
import PropTypes from 'prop-types';
import { InputTagsContainer } from '../index';

const reverseString = string =>
  string.split('').reverse().join('');

const ReverseTag = ({ value, handleRemove }) => (
  <span className={'react-input-tags-tag'}>
    <span>
      {reverseString(value)}
    </span>
    <button
      onClick={handleRemove}
    >
      {'x'}
    </button>
  </span>
  );

ReverseTag.propTypes = {
  value: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export class CustomTagExample extends React.Component {
  state = {
    tags: [],
  }

  handleUpdateTags = (newTags) => {
    this.setState({ tags: newTags });
  }

  render() {
    return (
      <InputTagsContainer
        tags={this.state.tags}
        handleUpdateTags={this.handleUpdateTags}
        TagImplementation={ReverseTag}
      />
    );
  }
}
