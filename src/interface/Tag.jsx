import React from 'react';

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
  TagImplementation: React.PropTypes.func.isRequired,
  value: React.PropTypes.any.isRequired,
  handleEdit: React.PropTypes.func.isRequired,
  handleRemove: React.PropTypes.func.isRequired,
};

Tag.defaultProps = {
  TagImplementation: TagDefault,
};
