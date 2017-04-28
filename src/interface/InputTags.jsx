import React from 'react';
import PropTypes from 'prop-types';

import { InputTagsDefault } from '../implementation/InputTagsDefault';

export const InputTags = ({
  InputTagsImplementation,
  tags,
  handleInsert,
  handleRemove,
  ...otherProps
}) =>
  <InputTagsImplementation
    tags={tags}
    handleInsert={handleInsert}
    handleRemove={handleRemove}
    {...otherProps}
  />;

InputTags.propTypes = {
  InputTagsImplementation: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleInsert: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

InputTags.defaultProps = {
  InputTagsImplementation: InputTagsDefault,
};
