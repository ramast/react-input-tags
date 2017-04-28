import React from 'react';
import PropTypes from 'prop-types';
import { InputTags } from '../interface/InputTags';

export const handleInsertDefault = (currentTags, insertTagIndex, newTag) =>
  [
    ...currentTags.slice(0, insertTagIndex),
    newTag,
    ...currentTags.slice(insertTagIndex),
  ];

export const handleRemoveDefault = (currentTags, removeTagIndex) =>
  [
    ...currentTags.slice(0, removeTagIndex),
    ...currentTags.slice(removeTagIndex + 1),
  ];

export class InputTagsContainerDefault extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.any).isRequired,
    handleUpdateTags: PropTypes.func.isRequired,
    handleInsertTag: PropTypes.func,
    handleRemoveTag: PropTypes.func,
  }

  static defaultProps = {
    handleInsertTag: handleInsertDefault,
    handleRemoveTag: handleRemoveDefault,
  }

  handleInsert = (currentTags, insertTagIndex, newTag) => {
    const { handleInsertTag, handleUpdateTags } = this.props;
    const newTags = handleInsertTag(currentTags, insertTagIndex, newTag);
    handleUpdateTags(newTags);
  }

  handleRemove = (currentTags, removeTagIndex) => {
    const { handleRemoveTag, handleUpdateTags } = this.props;
    const newTags = handleRemoveTag(currentTags, removeTagIndex);
    handleUpdateTags(newTags);
  }

  render() {
    const {
      tags,
      ...otherProps
    } = this.props;
    return (
      <InputTags
        tags={tags}
        handleInsert={this.handleInsert}
        handleRemove={this.handleRemove}
        {...otherProps}
      />
    );
  }
}
