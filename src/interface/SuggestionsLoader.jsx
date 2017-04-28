import React from 'react';
import PropTypes from 'prop-types';

import { SuggestionsLoaderDefault } from '../implementation/SuggestionsLoaderDefault';

export const SuggestionsLoader = ({
  SuggestionsLoaderImplementation,
  ...otherProps
}) =>
  <SuggestionsLoaderImplementation
    {...otherProps}
  />;

SuggestionsLoader.propTypes = {
  SuggestionsLoaderImplementation: PropTypes.func.isRequired,
};

SuggestionsLoader.defaultProps = {
  SuggestionsLoaderImplementation: SuggestionsLoaderDefault,
};
