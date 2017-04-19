import React from 'react';

import { Suggestion } from '../interface/Suggestion';
import { defaultClassNamePrefix } from './util';

export const SuggestionListClassNameDefault = `${defaultClassNamePrefix}-suggestion-list`;

/* eslint-disable react/prefer-stateless-function */
export class SuggestionListDefault extends React.Component {
  static propTypes = {
    suggestions: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    highlightedSuggestionIndex: React.PropTypes.number.isRequired,
    handleHighlight: React.PropTypes.func.isRequired,
    handleSelect: React.PropTypes.func.isRequired,
    getSuggestionValue: React.PropTypes.func.isRequired,
    SuggestionListClassName: React.PropTypes.string,
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
