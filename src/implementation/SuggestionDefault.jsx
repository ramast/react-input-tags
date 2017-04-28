import React from 'react';
import PropTypes from 'prop-types';

import { defaultClassNamePrefix } from './util';

export const SuggestionClassNameDefault = `${defaultClassNamePrefix}-suggestion`;

/* eslint-disable react/prefer-stateless-function */
export class SuggestionDefault extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    isHighlighted: PropTypes.bool.isRequired,
    handleHighlight: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    SuggestionClassName: PropTypes.string,
  }

  static defaultProps = {
    SuggestionClassName: SuggestionClassNameDefault,
  }

  render() {
    const {
      value,
      isHighlighted,
      handleHighlight,
      handleSelect,
      SuggestionClassName,
    } = this.props;
    const highlightClass = (isHighlighted) ? 'highlighted' : '';
    return (
      <li // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={`${SuggestionClassName} ${highlightClass}`}
        onMouseOver={handleHighlight}
        onMouseDown={event => event.preventDefault()} // prevents onBlur from inserting inputValue
        onClick={handleSelect}
      >
        {value}
      </li>
    );
  }
}
