import React from 'react';

import { SuggestionsLoaderDefault } from '../implementation/SuggestionsLoaderDefault';

export const SuggestionsLoader = ({
  SuggestionsLoaderImplementation,
  ...otherProps
}) =>
  <SuggestionsLoaderImplementation
    {...otherProps}
  />;

SuggestionsLoader.propTypes = {
  SuggestionsLoaderImplementation: React.PropTypes.func.isRequired,
};

SuggestionsLoader.defaultProps = {
  SuggestionsLoaderImplementation: SuggestionsLoaderDefault,
};
