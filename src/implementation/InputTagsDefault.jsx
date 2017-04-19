import React from 'react';

import { Input } from '../interface/Input';
import { Tag } from '../interface/Tag';
import { SuggestionList } from '../interface/SuggestionList';
import { SuggestionsLoader } from '../interface/SuggestionsLoader';
import { focusElement, selectElement, defaultClassNamePrefix } from './util';

import {
  tabKeyCode,
  enterKeyCode,
  commaKeyCode,
  backspaceKeyCode,
  downKeyCode,
  upKeyCode,
  escapeKeyCode,
} from '../keyCodes';

export const SuggestionListContainer = ({
  showSuggestions,
  suggestions,
  highlightedSuggestionIndex,
  handleHighlight,
  handleSelect,
  getSuggestionValue,
  ...otherProps
}) => {
  if (!showSuggestions) return null;
  return (
    <SuggestionList
      suggestions={suggestions}
      highlightedSuggestionIndex={highlightedSuggestionIndex}
      handleHighlight={handleHighlight}
      handleSelect={handleSelect}
      getSuggestionValue={getSuggestionValue}
      {...otherProps}
    />
  );
};

SuggestionListContainer.propTypes = {
  showSuggestions: React.PropTypes.bool.isRequired,
  suggestions: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
  highlightedSuggestionIndex: React.PropTypes.number.isRequired,
  handleHighlight: React.PropTypes.func.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
  getSuggestionValue: React.PropTypes.func.isRequired,
};

export const getTagValueDefault = tag => tag;

export const createTagDefault = inputValue => inputValue;

export const suggestionsDefault = [];

export const handleUpdateSuggestionsDefault = () => {};

export const getSuggestionValueDefault = suggestion => suggestion;

export const InputTagsClassNameDefault = `${defaultClassNamePrefix}-input-tags`;

export const calcNextIndexDefault = (oldIndex, numItems) =>
  (oldIndex + 1) % numItems;

export const calcPreviousIndexDefault = (oldIndex, numItems) =>
  ((oldIndex - 1) + numItems) % numItems;

export const insertKeyCodesDefault = [
  tabKeyCode,
  enterKeyCode,
  commaKeyCode,
];

export const removeKeyCodesDefault = [
  backspaceKeyCode,
];

export const nextKeyCodesDefault = [
  downKeyCode,
];

export const previousKeyCodesDefault = [
  upKeyCode,
];

export const closeKeyCodesDefault = [
  escapeKeyCode,
];

export const MIRROR_STYLES = [
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'wordSpacing',
];

export const INPUT_WIDTH_EXTRA = 2;

export const INPUT_MAX_WIDTH = 9999;

export class InputTagsDefault extends React.Component {
  static propTypes = {
    tags: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    handleInsert: React.PropTypes.func.isRequired,
    handleRemove: React.PropTypes.func.isRequired,
    getTagValue: React.PropTypes.func,
    createTag: React.PropTypes.func,
    suggestions: React.PropTypes.arrayOf(React.PropTypes.any),
    handleUpdateSuggestions: React.PropTypes.func,
    getSuggestionValue: React.PropTypes.func,
    InputTagsClassName: React.PropTypes.string,
    inputMaxWidth: React.PropTypes.number,
    mirrorStyles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    inputWidthExtra: React.PropTypes.number.isRequired,
    focusElement: React.PropTypes.func.isRequired,
    selectElement: React.PropTypes.func.isRequired,
    calcNextIndex: React.PropTypes.func.isRequired,
    calcPreviousIndex: React.PropTypes.func.isRequired,
    insertKeyCodes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    removeKeyCodes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    nextKeyCodes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    previousKeyCodes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    closeKeyCodes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  };

  static defaultProps = {
    getTagValue: getTagValueDefault,
    createTag: createTagDefault,
    suggestions: suggestionsDefault,
    handleUpdateSuggestions: handleUpdateSuggestionsDefault,
    getSuggestionValue: getSuggestionValueDefault,
    InputTagsClassName: InputTagsClassNameDefault,
    inputMaxWidth: INPUT_MAX_WIDTH,
    mirrorStyles: MIRROR_STYLES,
    inputWidthExtra: INPUT_WIDTH_EXTRA,
    focusElement,
    selectElement,
    calcNextIndex: calcNextIndexDefault,
    calcPreviousIndex: calcPreviousIndexDefault,
    insertKeyCodes: insertKeyCodesDefault,
    removeKeyCodes: removeKeyCodesDefault,
    nextKeyCodes: nextKeyCodesDefault,
    previousKeyCodes: previousKeyCodesDefault,
    closeKeyCodes: closeKeyCodesDefault,
  };

  state = {
    inputValue: '',
    inputIndex: this.props.tags.length,
    inputIsEditing: false,
    showSuggestions: false,
    highlightedSuggestionIndex: 0,
  }

  insertTag = (tags, insertTagIndex, inputValue) => {
    const { handleInsert } = this.props;

    this.setState({
      inputValue: '',
      inputIndex: tags.length + 1,
      inputIsEditing: false,
      showSuggestions: false,
    });
    handleInsert(tags, insertTagIndex, inputValue);
  }

  editTag = (tags, editTagIndex) => {
    const { getTagValue } = this.props;

    this.removeTag(tags, editTagIndex);
    this.setState({
      inputValue: getTagValue(tags[editTagIndex]),
      inputIndex: editTagIndex,
      inputIsEditing: true,
    });
  }

  removeTag = (tags, removeTagIndex) => {
    const { handleRemove } = this.props;

    handleRemove(tags, removeTagIndex);
  }

  handleInputOnChange = (event) => {
    const { handleUpdateSuggestions } = this.props;

    const inputValue = event.target.value;
    const showSuggestions = inputValue.length > 0;
    this.setState({ inputValue, showSuggestions, inputIsEditing: false });
    handleUpdateSuggestions(inputValue);
  }

  handleInputOnBlur = () => {
    const { inputValue, inputIndex } = this.state;
    const { tags, createTag } = this.props;

    if (inputValue.length > 0) {
      this.insertTag(tags, inputIndex, createTag(inputValue));
    }
  }

  handleInputOnKeyDown = (event) => {
    const { keyCode } = event;
    const { inputValue, inputIndex, showSuggestions, highlightedSuggestionIndex } = this.state;
    const {
      tags,
      createTag,
      suggestions,
      getSuggestionValue,
      calcNextIndex,
      calcPreviousIndex,
      insertKeyCodes,
      removeKeyCodes,
      nextKeyCodes,
      previousKeyCodes,
      closeKeyCodes,
    } = this.props;

    if (insertKeyCodes.includes(keyCode) && inputValue.length > 0) {
      // prevents typing comma from entering `,` in the input
      // prevents typing tab from setting the focus on something other than the input
      event.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        const suggestion = getSuggestionValue(suggestions[highlightedSuggestionIndex]);
        this.insertTag(tags, inputIndex, suggestion);
      } else {
        this.insertTag(tags, inputIndex, createTag(inputValue));
      }
    }

    if (removeKeyCodes.includes(keyCode) && inputValue.length === 0 && tags.length > 0
        && inputIndex > 0) {
      const removeTagIndex = inputIndex - 1;
      this.removeTag(tags, removeTagIndex);
      this.setState({ inputIndex: removeTagIndex });
    }

    if (closeKeyCodes.includes(keyCode)) {
      this.setShowSuggestions(false);
    }

    const oldHighlightedIndex = highlightedSuggestionIndex;
    const numSuggestions = suggestions.length;

    if (nextKeyCodes.includes(keyCode)) {
      const newHighlightedIndex = calcNextIndex(oldHighlightedIndex, numSuggestions);
      this.setHighlightedSuggestionIndex(newHighlightedIndex);
    }

    if (previousKeyCodes.includes(keyCode)) {
      const newHighlightedIndex = calcPreviousIndex(oldHighlightedIndex, numSuggestions);
      this.setHighlightedSuggestionIndex(newHighlightedIndex);
    }
  }

  handleEdit = () => {
    const element = this.inputNode;
    this.props.focusElement(element);
    this.props.selectElement(element);
  }

  mirrorInputStyle = () => {
    const { mirrorStyles } = this.props;
    const inputNode = this.inputNode;
    const mirrorNode = this.mirrorNode;
    if (!inputNode || !mirrorNode) return;

    const inputStyle = window.getComputedStyle(inputNode);
    mirrorStyles.forEach((mStyle) => {
      mirrorNode.style[mStyle] = inputStyle[mStyle];
    });
  }

  updateInputWidth = () => {
    const { inputWidthExtra, inputMaxWidth } = this.props;
    const inputNode = this.inputNode;
    const mirrorNode = this.mirrorNode;
    if (!inputNode || !mirrorNode) return;

    const updatedInputWidth = mirrorNode.offsetWidth + inputWidthExtra;
    const newInputWidth = (updatedInputWidth < inputMaxWidth) ? updatedInputWidth : inputMaxWidth;
    inputNode.style.width = `${newInputWidth}px`;
  }

  setShowSuggestions = (showSuggestions) => {
    this.setState({ showSuggestions });
  }

  setHighlightedSuggestionIndex = (highlightedSuggestionIndex) => {
    this.setState({ highlightedSuggestionIndex });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.suggestions !== this.props.suggestions) {
      this.setState({ highlightedSuggestionIndex: 0 });
    }
  }

  render() {
    const {
      tags,
      // must pull out handleRemove prop, otherwise will override Tag handleRemove in otherProps
      handleRemove, // eslint-disable-line no-unused-vars
      suggestions,
      getSuggestionValue,
      InputTagsClassName,
      ...otherProps
    } = this.props;
    const {
      inputValue,
      inputIndex,
      inputIsEditing,
      showSuggestions,
      highlightedSuggestionIndex,
    } = this.state;
    return (
      <div
        className={InputTagsClassName}
      >
        <div>
          {tags.slice(0, inputIndex).map((tag, index) =>
            <Tag
              key={index}
              value={tag}
              handleEdit={() => this.editTag(tags, index)}
              handleRemove={() => this.removeTag(tags, index)}
              {...otherProps}
            />
          )}
          <Input
            value={inputValue}
            handleOnChange={this.handleInputOnChange}
            handleOnBlur={this.handleInputOnBlur}
            handleOnKeyDown={this.handleInputOnKeyDown}
            inputRef={(node) => { this.inputNode = node; }}
            mirrorRef={(node) => { this.mirrorNode = node; }}
            mirrorInputStyle={this.mirrorInputStyle}
            updateInputWidth={this.updateInputWidth}
            inputIsEditing={inputIsEditing}
            handleEdit={this.handleEdit}
            {...otherProps}
          />
          {tags.slice(inputIndex).map((tag, index) =>
            <Tag
              key={index + inputIndex}
              value={tag}
              handleEdit={() => this.editTag(tags, index + inputIndex)}
              handleRemove={() => this.removeTag(tags, index + inputIndex)}
              {...otherProps}
            />
          )}
          <SuggestionsLoader
            {...otherProps}
          />
        </div>
        <SuggestionListContainer
          showSuggestions={showSuggestions}
          suggestions={suggestions}
          highlightedSuggestionIndex={highlightedSuggestionIndex}
          handleHighlight={this.setHighlightedSuggestionIndex}
          handleSelect={suggestion => this.insertTag(tags, inputIndex, suggestion)}
          getSuggestionValue={getSuggestionValue}
          {...otherProps}
        />
      </div>
    );
  }
}
