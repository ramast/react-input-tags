import React from 'react';

import { InputTagsContainerDefault } from '../implementation/InputTagsContainerDefault';

export const InputTagsContainer = ({
  InputTagsContainerImplementation,
  tags,
  handleUpdateTags,
  ...otherProps
}) =>
  <InputTagsContainerImplementation
    tags={tags}
    handleUpdateTags={handleUpdateTags}
    {...otherProps}
  />;

InputTagsContainer.propTypes = {
  InputTagsContainerImplementation: React.PropTypes.func.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
  handleUpdateTags: React.PropTypes.func.isRequired,
};

InputTagsContainer.defaultProps = {
  InputTagsContainerImplementation: InputTagsContainerDefault,
};
