import React from 'react';
import PropTypes from 'prop-types';

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
  InputImplementation: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  handleOnKeyDown: PropTypes.func.isRequired,
};

Input.defaultProps = {
  InputImplementation: InputDefault,
};
