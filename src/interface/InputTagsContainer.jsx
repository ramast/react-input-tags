import React from 'react';

import { InputTagsContainerDefault } from '../implementation/InputTagsContainerDefault.jsx';

export const InputTagsContainer = ({
  InputTagsContainerImplementation,
  tags,
  handleUpdateTags,
  inputPlaceholder,
  suggestions,
  handleUpdateSuggestions,
}) =>
  <InputTagsContainerImplementation
    tags={tags}
    handleUpdateTags={handleUpdateTags}
    inputPlaceholder={inputPlaceholder}
    suggestions={suggestions}
    handleUpdateSuggestions={handleUpdateSuggestions}
  />;

InputTagsContainer.propTypes = {
  InputTagsContainerImplementation: React.PropTypes.func.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
  handleUpdateTags: React.PropTypes.func.isRequired,
  inputPlaceholder: React.PropTypes.string,
  suggestions: React.PropTypes.arrayOf(React.PropTypes.any),
  handleUpdateSuggestions: React.PropTypes.func,
};

InputTagsContainer.defaultProps = {
  InputTagsContainerImplementation: InputTagsContainerDefault,
};