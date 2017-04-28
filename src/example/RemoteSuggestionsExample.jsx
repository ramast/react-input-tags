import React from 'react';
import PropTypes from 'prop-types';
import { InputTagsContainer } from '../index';

const suggestionsLocalDefault = ['apple', 'banana', 'cherry'];

export class RemoteSuggestionsExample extends React.Component {
  static propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  static defaultProps = {
    suggestions: suggestionsLocalDefault,
  }

  state = {
    tags: [],
    suggestions: [],
    suggestionsAreLoading: false,
  }

  handleUpdateTags = (newTags) => {
    this.setState({ tags: newTags, suggestionsAreLoading: false });
  }

  handleUpdateSuggestions = (inputValue) => {
    this.setState({ suggestionsAreLoading: true });

    const { suggestions } = this.props;
    const newSuggestions = suggestions.filter(suggestion => suggestion.indexOf(inputValue) !== -1);

    // fake 2 second HTTP request
    setTimeout(() => {
      this.setState({ suggestions: newSuggestions, suggestionsAreLoading: false });
    }, 2000);
  }

  render() {
    const { suggestionsAreLoading } = this.state;
    return (
      <InputTagsContainer
        tags={this.state.tags}
        handleUpdateTags={this.handleUpdateTags}
        inputPlaceholder={'Add tag'}
        suggestions={this.state.suggestions}
        handleUpdateSuggestions={this.handleUpdateSuggestions}
        suggestionsAreLoading={suggestionsAreLoading}
      />
    );
  }
}
