import React from 'react';
import PropTypes from 'prop-types';

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
  SuggestionListImplementation: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.any).isRequired,
  highlightedSuggestionIndex: PropTypes.number.isRequired,
  handleHighlight: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
};

SuggestionList.defaultProps = {
  SuggestionListImplementation: SuggestionListDefault,
};
