import React from 'react';
import PropTypes from 'prop-types';

import { Suggestion } from '../interface/Suggestion';
import { defaultClassNamePrefix } from './util';

export const SuggestionListClassNameDefault = `${defaultClassNamePrefix}-suggestion-list`;

/* eslint-disable react/prefer-stateless-function */
export class SuggestionListDefault extends React.Component {
  static propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.any).isRequired,
    highlightedSuggestionIndex: PropTypes.number.isRequired,
    handleHighlight: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    getSuggestionValue: PropTypes.func.isRequired,
    SuggestionListClassName: PropTypes.string,
  }

  static defaultProps = {
    SuggestionListClassName: SuggestionListClassNameDefault,
  }

  render() {
    const {
      suggestions,
      highlightedSuggestionIndex,
      handleHighlight,
      handleSelect,
      getSuggestionValue,
      SuggestionListClassName,
      ...otherProps
    } = this.props;
    return (
      <ul className={SuggestionListClassName}>
        {suggestions.map((suggestion, index) => {
          const isHighlighted = highlightedSuggestionIndex === index;
          return (
            <Suggestion
              key={index}
              value={suggestion}
              isHighlighted={isHighlighted}
              handleHighlight={() => handleHighlight(index)}
              handleSelect={() => handleSelect(getSuggestionValue(suggestion))}
              {...otherProps}
            />
          );
        })}
      </ul>
    );
  }
}
