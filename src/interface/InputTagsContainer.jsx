import React from 'react';
import PropTypes from 'prop-types';

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
  InputTagsContainerImplementation: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleUpdateTags: PropTypes.func.isRequired,
};

InputTagsContainer.defaultProps = {
  InputTagsContainerImplementation: InputTagsContainerDefault,
};
