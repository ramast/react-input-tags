import React from 'react';

import { SuggestionListDefault } from '../implementation/SuggestionListDefault';

export const SuggestionList = ({
  SuggestionListImplementation,
  suggestions,
  highlightedSuggestionIndex,
  handleHighlight,
  handleSelect,
  getSuggestionValue,
  ...otherProps
}) =>
  <SuggestionListImplementation
    suggestions={suggestions}
    highlightedSuggestionIndex={highlightedSuggestionIndex}
    handleHighlight={handleHighlight}
    handleSelect={handleSelect}
    getSuggestionValue={getSuggestionValue}
    {...otherProps}
  />;

SuggestionList.propTypes = {
  SuggestionListImplementation: React.PropTypes.func.isRequired,
  suggestions: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
  highlightedSuggestionIndex: React.PropTypes.number.isRequired,
  handleHighlight: React.PropTypes.func.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
  getSuggestionValue: React.PropTypes.func.isRequired,
};

SuggestionList.defaultProps = {
  SuggestionListImplementation: SuggestionListDefault,
};
