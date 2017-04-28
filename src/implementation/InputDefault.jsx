import React from 'react';
import PropTypes from 'prop-types';

import { defaultClassNamePrefix, noop } from './util';

export const InputClassNameDefault = `${defaultClassNamePrefix}-input`;

export const mirrorInputStyleDefault = noop;
export const updateInputWidthDefault = noop;
export const handleEditDefault = noop;

export class InputDefault extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleOnBlur: PropTypes.func.isRequired,
    handleOnKeyDown: PropTypes.func.isRequired,
    InputClassName: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    inputTabIndex: PropTypes.number,
    inputRef: PropTypes.func,
    mirrorRef: PropTypes.func,
    mirrorInputStyle: PropTypes.func,
    updateInputWidth: PropTypes.func,
    inputIsEditing: PropTypes.bool,
    handleEdit: PropTypes.func,
  }

  static defaultProps = {
    InputClassName: InputClassNameDefault,
    mirrorInputStyle: mirrorInputStyleDefault,
    updateInputWidth: updateInputWidthDefault,
    handleEdit: handleEditDefault,
  }

  componentDidMount() {
    const { mirrorInputStyle, updateInputWidth } = this.props;
    mirrorInputStyle();
    updateInputWidth();
  }

  componentDidUpdate(prevProps) {
    const { updateInputWidth, handleEdit } = this.props;
    updateInputWidth();

    if (prevProps.inputIsEditing === false && this.props.inputIsEditing === true) {
      handleEdit();
    }
  }

  render() {
    const {
      value,
      handleOnChange,
      handleOnBlur,
      handleOnKeyDown,
      inputPlaceholder,
      inputTabIndex,
      inputRef,
      mirrorRef,
      InputClassName,
    } = this.props;

    const mirrorValue = value || inputPlaceholder;
    const mirrorStyle = {
      position: 'absolute',
      whiteSpace: 'pre',
      overflow: 'scroll',
      visibility: 'hidden',
    };

    return (
      <span>
        <span
          ref={mirrorRef}
          style={mirrorStyle}
        >
          {mirrorValue}
        </span>
        <input
          ref={inputRef}
          type={'text'}
          value={value}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyDown={handleOnKeyDown}
          placeholder={inputPlaceholder}
          tabIndex={inputTabIndex}
          className={InputClassName}
        />
      </span>
    );
  }
}
