import React from 'react';
import PropTypes from 'prop-types';

import { TagDefault } from '../implementation/TagDefault';

export const Tag = ({
  TagImplementation,
  value,
  handleEdit,
  handleRemove,
  ...otherProps
}) =>
  <TagImplementation
    value={value}
    handleEdit={handleEdit}
    handleRemove={handleRemove}
    {...otherProps}
  />;

Tag.propTypes = {
  TagImplementation: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

Tag.defaultProps = {
  TagImplementation: TagDefault,
};
