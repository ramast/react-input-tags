import React from 'react';

import { InputDefault } from '../implementation/InputDefault';

export const Input = ({
  InputImplementation,
  value,
  handleOnChange,
  handleOnBlur,
  handleOnKeyDown,
  ...otherProps
}) =>
  <InputImplementation
    value={value}
    handleOnChange={handleOnChange}
    handleOnBlur={handleOnBlur}
    handleOnKeyDown={handleOnKeyDown}
    {...otherProps}
  />;

Input.propTypes = {
  InputImplementation: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  handleOnChange: React.PropTypes.func.isRequired,
  handleOnBlur: React.PropTypes.func.isRequired,
  handleOnKeyDown: React.PropTypes.func.isRequired,
};

Input.defaultProps = {
  InputImplementation: InputDefault,
};
