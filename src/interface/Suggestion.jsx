import React from 'react';
import PropTypes from 'prop-types';

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
  SuggestionImplementation: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  handleHighlight: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

Suggestion.defaultProps = {
  SuggestionImplementation: SuggestionDefault,
};
