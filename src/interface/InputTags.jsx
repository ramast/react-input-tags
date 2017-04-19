import React from 'react';

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
  InputTagsImplementation: React.PropTypes.func.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
  handleInsert: React.PropTypes.func.isRequired,
  handleRemove: React.PropTypes.func.isRequired,
};

InputTags.defaultProps = {
  InputTagsImplementation: InputTagsDefault,
};
