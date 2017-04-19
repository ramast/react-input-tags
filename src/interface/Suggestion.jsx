import React from 'react';

import { SuggestionDefault } from '../implementation/SuggestionDefault';

export const Suggestion = ({
  SuggestionImplementation,
  value,
  isHighlighted,
  handleHighlight,
  handleSelect,
  ...otherProps
}) =>
  <SuggestionImplementation
    value={value}
    isHighlighted={isHighlighted}
    handleHighlight={handleHighlight}
    handleSelect={handleSelect}
    {...otherProps}
  />;

Suggestion.propTypes = {
  SuggestionImplementation: React.PropTypes.func.isRequired,
  value: React.PropTypes.any.isRequired,
  isHighlighted: React.PropTypes.bool.isRequired,
  handleHighlight: React.PropTypes.func.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
};

Suggestion.defaultProps = {
  SuggestionImplementation: SuggestionDefault,
};
