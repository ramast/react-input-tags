import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import {
  InputTagsDefault,
  SuggestionList,
  calcNextIndexDefault,
  calcPreviousIndexDefault,
} from '../src/implementation/InputTagsDefault.jsx';
import {
  enterKeyCode,
  tabKeyCode,
  commaKeyCode,
  backspaceKeyCode,
  downKeyCode,
  upKeyCode,
  escapeKeyCode,
  aKeyCode,
} from '../src/keyCodes';

import { noop } from './util';
import { emptyString, nonEmptyString, items } from './mock';

describe('<InputTagsDefault />', () => {
  let inputTagsWrapper;
  let tags;
  let handleInsert;
  let handleRemove;
  let getTagValue;
  let createTag;
  let suggestions;
  let handleUpdateSuggestions;
  let getSuggestionValue;
  let focusElement;
  let selectElement;

  describe('when component mounts', () => {
    beforeEach(() => {
      tags = items;

      inputTagsWrapper = mount(
        <InputTagsDefault
          tags={tags}
          handleInsert={noop}
          handleRemove={noop}
        />
      )
    });

    it('should set state `inputValue` to empty string', () => {
      expect(inputTagsWrapper.state().inputValue).to.equal(emptyString);
    });

    it('should set state `inputIndex` to length of tags', () => {
      expect(inputTagsWrapper.state().inputIndex).to.equal(tags.length);
    });

    it('should set state `inputIsEditing` to false', () => {
      expect(inputTagsWrapper.state().inputIsEditing).to.equal(false);
    });

    it('should set state `showSuggestions` to length of tags', () => {
      expect(inputTagsWrapper.state().showSuggestions).to.equal(false);
    });

    it('should set state `highlightedSuggestionIndex` to zero', () => {
      expect(inputTagsWrapper.state().highlightedSuggestionIndex).to.equal(0);
    });
  });

  describe('create tag manually', () => {
    beforeEach(() => {
      tags = [];
      handleInsert = sinon.stub();
      createTag = sinon.stub();
      focusElement = sinon.stub();
      selectElement = sinon.stub();

      inputTagsWrapper = mount(
        <InputTagsDefault
          tags={tags}
          handleInsert={handleInsert}
          handleRemove={noop}
          createTag={createTag}
          focusElement={focusElement}
          selectElement={selectElement}
        />
      );
    });

    context('when input field is changed to non empty string', () => {
      const inputValue = nonEmptyString;

      beforeEach(() => {
        createTag.returns(inputValue);
        inputTagsWrapper.find('input').simulate('change', { target: { value: inputValue } });
      });

      it('should set the state `inputValue`', () => {
        expect(inputTagsWrapper.state().inputValue).to.equal(inputValue);
      });

      it('should set the state `showSuggestions` to be true', () => {
        expect(inputTagsWrapper.state().showSuggestions).to.equal(true);
      });

      it('should *not* focus on the input element', () => {
        expect(focusElement).to.not.have.been.called();
      });

      it('should *not* select the text in the input element', () => {
        expect(selectElement).to.not.have.been.called();
      });

      context('when focus leaves input field', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('blur');
        });

        it('should create the tag with input value', () => {
          expect(createTag).to.have.been.calledWith(inputValue);
        });

        it('should insert typed string as token', () => {
          expect(handleInsert).to.have.been.calledWith(tags, tags.length, inputValue);
        });

        it('should clear the state `inputValue`', () => {
          expect(inputTagsWrapper.state().inputValue).to.equal(emptyString);
        });

        it('should set the state `inputIndex` to be one greater than length of tags', () => {
          expect(inputTagsWrapper.state().inputIndex).to.equal(tags.length + 1);
        });

        it('should set the state of `inputIsEditing` to be false', () => {
          expect(inputTagsWrapper.state().inputIsEditing).to.equal(false);
        });

        it('should set the state `showSuggestions` to be false', () => {
          expect(inputTagsWrapper.state().showSuggestions).to.equal(false);
        });
      });

      context('when `enter` key is pressed', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('keydown', { keyCode: enterKeyCode });
        });

        it('should create the tag with input value', () => {
          expect(createTag).to.have.been.calledWith(inputValue);
        });

        it('should insert typed string as token', () => {
          expect(handleInsert).to.have.been.calledWith(tags, tags.length, inputValue);
        });

        it('should clear the state `inputValue`', () => {
          expect(inputTagsWrapper.state().inputValue).to.equal(emptyString);
        });

        it('should set the state `inputIndex` to be one greater than length of tags', () => {
          expect(inputTagsWrapper.state().inputIndex).to.equal(tags.length + 1);
        });

        it('should set the state of `inputIsEditing` to be false', () => {
          expect(inputTagsWrapper.state().inputIsEditing).to.equal(false);
        });

        it('should set the state `showSuggestions` to be false', () => {
          expect(inputTagsWrapper.state().showSuggestions).to.equal(false);
        });
      });

      context('when `tab` key is pressed', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('keydown', { keyCode: tabKeyCode });
        });

        it('should create the tag with input value', () => {
          expect(createTag).to.have.been.calledWith(inputValue);
        });

        it('should insert typed string as token', () => {
          expect(handleInsert).to.have.been.calledWith(tags, tags.length, inputValue);
        });

        it('should clear the state `inputValue`', () => {
          expect(inputTagsWrapper.state().inputValue).to.equal(emptyString);
        });

        it('should set the state `inputIndex` to be one greater than length of tags', () => {
          expect(inputTagsWrapper.state().inputIndex).to.equal(tags.length + 1);
        });

        it('should set the state of `inputIsEditing` to be false', () => {
          expect(inputTagsWrapper.state().inputIsEditing).to.equal(false);
        });

        it('should set the state `showSuggestions` to be false', () => {
          expect(inputTagsWrapper.state().showSuggestions).to.equal(false);
        });
      });

      context('when `comma` key is pressed', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('keydown', { keyCode: commaKeyCode });
        });

        it('should create the tag with input value', () => {
          expect(createTag).to.have.been.calledWith(inputValue);
        });

        it('should insert typed string as token', () => {
          expect(handleInsert).to.have.been.calledWith(tags, tags.length, inputValue);
        });

        it('should clear the state `inputValue`', () => {
          expect(inputTagsWrapper.state().inputValue).to.equal(emptyString);
        });

        it('should set the state `inputIndex` to be one greater than length of tags', () => {
          expect(inputTagsWrapper.state().inputIndex).to.equal(tags.length + 1);
        });

        it('should set the state of `inputIsEditing` to be false', () => {
          expect(inputTagsWrapper.state().inputIsEditing).to.equal(false);
        });

        it('should set the state `showSuggestions` to be false', () => {
          expect(inputTagsWrapper.state().showSuggestions).to.equal(false);
        });
      });

      context('when `a` key is pressed', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('keydown', { keyCode: aKeyCode });
        });

        it('should not create the tag', () => {
          expect(createTag).to.not.have.been.called();
        });

        it('should *not* insert typed string as token', () => {
          expect(handleInsert).to.not.have.been.called();
        });

        it('should *not* clear the state `inputValue`', () => {
          expect(inputTagsWrapper.state().inputValue).to.equal(inputValue);
        });

        it('should *not* set the state `inputIndex`', () => {
          expect(inputTagsWrapper.state().inputIndex).to.not.equal(tags.length + 1);
        });

        it('should *not* set the state `showSuggestions` to be false', () => {
          expect(inputTagsWrapper.state().showSuggestions).to.not.equal(false);
        });
      });
    });

    context('when input field is changed to empty string', () => {
      const inputValue = emptyString;

      beforeEach(() => {
        inputTagsWrapper.find('input').simulate('change', { target: { value: inputValue } });
      });

      it('should set the state `inputValue`', () => {
        expect(inputTagsWrapper.state().inputValue).to.equal(inputValue);
      });

      it('should set the state `showSuggestions` to false', () => {
        expect(inputTagsWrapper.state().showSuggestions).to.equal(false);
      });

      it('should set the state `inputIsEditing` to false', () => {
        expect(inputTagsWrapper.state().inputIsEditing).to.equal(false);
      });

      context('when focus leaves input field', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('blur');
        });

        it('should *not* insert typed string as token', () => {
          expect(handleInsert).to.not.have.been.called();
        });
      });

      context('when `enter` key is pressed', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('keydown', { keyCode: enterKeyCode });
        });

        it('should *not* insert typed string as token', () => {
          expect(handleInsert).to.not.have.been.called();
        });
      });

      context('when `tab` key is pressed', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('keydown', { keyCode: tabKeyCode });
        });

        it('should *not* insert typed string as token', () => {
          expect(handleInsert).to.not.have.been.called();
        });
      });

      context('when `comma` key is pressed', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('keydown', { keyCode: commaKeyCode });
        });

        it('should *not* insert typed string as token', () => {
          expect(handleInsert).to.not.have.been.called();
        });
      });
    });
  });

  describe('edit tag', () => {
    context('when there is at least one tag', () => {
      beforeEach(() => {
        tags = ['start', 'edit me', 'end'];
        // tags = ['edit me'];
        handleInsert = sinon.stub();
        handleRemove = sinon.stub();
        getTagValue = sinon.stub();
        focusElement = sinon.stub();
        selectElement = sinon.stub();

        inputTagsWrapper = mount(
          <InputTagsDefault
            value={emptyString}
            tags={tags}
            handleInsert={handleInsert}
            handleRemove={handleRemove}
            getTagValue={getTagValue}
            focusElement={focusElement}
            selectElement={selectElement}
          />
        );
      });

      describe('start editing tag', () => {
        context('when token is clicked', () => {
          const editTagIndex = 1;

          beforeEach(() => {
            getTagValue.returns(tags[editTagIndex]);
            inputTagsWrapper.find('button').at(editTagIndex).parent().childAt(0).simulate('click');
          });

          it('should remove the current tag', () => {
            expect(handleRemove).to.have.been.calledWith(tags, editTagIndex);
          });

          it('should get the tag value', () => {
            expect(getTagValue).to.have.been.calledWith(tags[editTagIndex]);
          });

          it('should set state `inputValue` to the previous tag', () => {
            expect(inputTagsWrapper.state().inputValue).to.equal(tags[editTagIndex]);
          });

          it('should set state `inputIndex` to the index of the tag being edited', () => {
            expect(inputTagsWrapper.state().inputIndex).to.equal(editTagIndex);
          });

          it('should set state `inputIsEditing` to true', () => {
            expect(inputTagsWrapper.state().inputIsEditing).to.equal(true);
          });

          it('should focus on the input element', () => {
            expect(focusElement).to.have.been.called();
          });

          it('should select the text in the input element', () => {
            expect(selectElement).to.have.been.called();
          });
        });
      });

      describe('stop editing tag', () => {
        context('when input value is empty string and a tag exists after it', () => {
          const editTagIndex = 1;
          const inputValue = emptyString;

          beforeEach(() => {
            inputTagsWrapper.find('button').at(editTagIndex).parent().childAt(0).simulate('click');
            inputTagsWrapper.find('input').simulate('change', { target: { value: inputValue } });
          });

          context('when focus leaves input field', () => {
            beforeEach(() => {
              inputTagsWrapper.find('input').simulate('blur');
            });

            it('should move input to end of tags', () => {
              expect(inputTagsWrapper.state().inputIndex).to.equal(tags.length);
            });
          });
        });
      });
    });
  });

  describe('delete tag', () => {
    context('when there is at least one tag', () => {
      beforeEach(() => {
        tags = ['delete me'];
        handleRemove = sinon.stub();

        inputTagsWrapper = mount(
          <InputTagsDefault
            tags={tags}
            handleInsert={noop}
            handleRemove={handleRemove}
          />
        );
      });

      context('when `x` button is clicked', () => {
        beforeEach(() => {
          inputTagsWrapper.find('button').simulate('click');
        });

        it('should remove token', () => {
          expect(handleRemove).to.have.been.calledWith(tags, tags.length - 1);
        });
      });

      context('when `backspace` key is pressed', () => {
        context('when input field has not been changed', () => {
          beforeEach(() => {
            inputTagsWrapper.find('input').simulate('keydown', { keyCode: backspaceKeyCode });
          });

          it('should remove token', () => {
            expect(handleRemove).to.have.been.calledWith(tags, tags.length - 1);
          });

          it('should set the state `inputIndex`', () => {
            expect(inputTagsWrapper.state().inputIndex).to.equal(tags.length - 1);
          });
        });

        context('when input field has been changed to empty string', () => {
          const inputValue = emptyString;

          beforeEach(() => {
            inputTagsWrapper.find('input').simulate('change', { target: { value: inputValue } });
            inputTagsWrapper.find('input').simulate('keydown', { keyCode: backspaceKeyCode });
          });

          it('should remove token', () => {
            expect(handleRemove).to.have.been.calledWith(tags, tags.length - 1);
          });

          it('should set the state `inputIndex`', () => {
            expect(inputTagsWrapper.state().inputIndex).to.equal(tags.length - 1);
          });
        });

        context('when input field has been changed to non empty string', () => {
          const inputValue = nonEmptyString;

          beforeEach(() => {
            inputTagsWrapper.find('input').simulate('change', { target: { value: inputValue } });
            inputTagsWrapper.find('input').simulate('keydown', { keyCode: backspaceKeyCode });
          });

          it('should *not* remove token', () => {
            expect(handleRemove).to.not.have.been.called();
          });
        });
      });
    });

    context('when there are no tags', () => {
      beforeEach(() => {
        tags = [];
        handleRemove = sinon.stub();

        inputTagsWrapper = mount(
          <InputTagsDefault
            tags={tags}
            handleInsert={noop}
            handleRemove={handleRemove}
          />
        );
      });

      context('when `backspace` key is pressed', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('keydown', { keyCode: backspaceKeyCode });
        });

        it('should *not* remove token', () => {
          expect(handleRemove).to.not.have.been.called();
        });
      });
    });
  });

  describe('suggestions', () => {
    beforeEach(() => {
      tags = [];
      handleInsert = sinon.stub();
      suggestions = items;
      handleUpdateSuggestions = sinon.stub();
      getSuggestionValue = sinon.stub();

      inputTagsWrapper = mount(
        <InputTagsDefault
          tags={tags}
          handleInsert={handleInsert}
          handleRemove={noop}
          suggestions={suggestions}
          handleUpdateSuggestions={handleUpdateSuggestions}
          getSuggestionValue={getSuggestionValue}
        />
      );
    });

    describe('show suggestions', () => {
      context('when inputValue is non empty string', () => {
        const newInputValue = nonEmptyString;

        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('change', { target: { value: newInputValue }});
        });

        it('should update the suggestions', () => {
          expect(handleUpdateSuggestions).to.have.been.calledWith(newInputValue);
        });

        context('when suggestions are updated', () => {
          const newSuggestions = items.slice(0, 2);

          beforeEach(() => {
            inputTagsWrapper.setProps({ suggestions: newSuggestions });
          });

          it('should set state `highlightedSuggestionIndex` to zero', () => {
            expect(inputTagsWrapper.state().highlightedSuggestionIndex).to.equal(0);
          });
        });
      });
    })

    describe('highlight suggestion', () => {
      context('when inputValue is non empty string', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('change', { target: { value: nonEmptyString }});
        });

        it('first item should be highlighted', () => {
          expect(inputTagsWrapper.state().highlightedSuggestionIndex).to.equal(0);
        });

        context('when suggestion is moused over', () => {
          const newHighlightedIndex = 1;

          beforeEach(() => {
            inputTagsWrapper.find('ul').childAt(newHighlightedIndex).simulate('mouseover');
          });

          it('should highlight the item', () => {
            expect(inputTagsWrapper.state().highlightedSuggestionIndex).to.equal(newHighlightedIndex);
          });
        });

        context('when down key is pressed', () => {
          const oldHighlightedIndex = 0; // first item is highlighted by default
          const numItems = items.length;
          const newHighlightedIndex = calcNextIndexDefault(oldHighlightedIndex, numItems);

          beforeEach(() => {
            inputTagsWrapper.find('input').simulate('keydown', { keyCode: downKeyCode });
          });

          it('should highlight the next item', () => {
            expect(inputTagsWrapper.state().highlightedSuggestionIndex).to.equal(newHighlightedIndex);
          });
        });

        context('when up key is pressed', () => {
          const oldHighlightedIndex = 0; // first item is highlighted by default
          const numItems = items.length;
          const newHighlightedIndex = calcPreviousIndexDefault(oldHighlightedIndex, numItems);

          beforeEach(() => {
            inputTagsWrapper.find('input').simulate('keydown', { keyCode: upKeyCode });
          });

          it('should highlight the previous item', () => {
            expect(inputTagsWrapper.state().highlightedSuggestionIndex).to.equal(newHighlightedIndex);
          });
        });
      });
    });

    describe('select suggestion', () => {
      context('when inputValue is non empty string', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('change', { target: { value: nonEmptyString }});
        });

        context('when suggestion is clicked', () => {
          const suggestionsIndex = 0;

          beforeEach(() => {
            getSuggestionValue.returns(suggestions[suggestionsIndex]);
            inputTagsWrapper.find('ul').childAt(suggestionsIndex).simulate('click');
          });

          it('should get the suggestion value', () => {
            expect(getSuggestionValue).to.have.been.calledWith(suggestions[suggestionsIndex]);
          });

          it('should insert the suggestion as token', () => {
            expect(handleInsert).to.have.been.calledWith(tags, tags.length, getSuggestionValue(suggestions[suggestionsIndex]));
          });
        });

        context('when suggestion is highlighted and enter key is pressed', () => {
          const suggestionsIndex = 0; // first suggestion is highlighted by default

          beforeEach(() => {
            getSuggestionValue.returns(suggestions[suggestionsIndex]);
            inputTagsWrapper.find('input').simulate('keydown', { keyCode: enterKeyCode });
          });

          it('should get the suggestion value', () => {
            expect(getSuggestionValue).to.have.been.calledWith(suggestions[suggestionsIndex]);
          });

          it('should insert the suggestion as token', () => {
            expect(handleInsert).to.have.been.calledWith(tags, tags.length, getSuggestionValue(suggestions[suggestionsIndex]));
          });
        });

        context('when suggestion is highlighted and tab key is pressed', () => {
          const suggestionsIndex = 0; // first suggestion is highlighted by default

          beforeEach(() => {
            getSuggestionValue.returns(suggestions[suggestionsIndex]);
            inputTagsWrapper.find('input').simulate('keydown', { keyCode: tabKeyCode });
          });

          it('should get the suggestion value', () => {
            expect(getSuggestionValue).to.have.been.calledWith(suggestions[suggestionsIndex]);
          });

          it('should insert the suggestion as token', () => {
            expect(handleInsert).to.have.been.calledWith(tags, tags.length, getSuggestionValue(suggestions[suggestionsIndex]));
          });
        });

        context('when suggestion is highlighted and comma key is pressed', () => {
          const suggestionsIndex = 0; // first suggestion is highlighted by default

          beforeEach(() => {
            getSuggestionValue.returns(suggestions[suggestionsIndex]);
            inputTagsWrapper.find('input').simulate('keydown', { keyCode: commaKeyCode });
          });

          it('should get the suggestion value', () => {
            expect(getSuggestionValue).to.have.been.calledWith(suggestions[suggestionsIndex]);
          });

          it('should insert the suggestion as token', () => {
            expect(handleInsert).to.have.been.calledWith(tags, tags.length, getSuggestionValue(suggestions[suggestionsIndex]));
          });
        });
      });
    });

    describe('close suggestions', () => {
      context('when inputValue is non empty string', () => {
        beforeEach(() => {
          inputTagsWrapper.find('input').simulate('change', { target: { value: nonEmptyString }});
        });

        context('when escape key is pressed', () => {
          beforeEach(() => {
            inputTagsWrapper.find('input').simulate('keydown', { keyCode: escapeKeyCode });
          });

          it('should close the suggestion list', () => {
            expect(inputTagsWrapper.state().showSuggestions).to.equal(false);
          });
        });
      });
    });
  });
});

describe('calcNextIndexDefault()', () => {
  context('when numItems is one', () => {
    const numItems = 1;

    context('when oldIndex is start of list', () => {
      const oldIndex = 0;

      it('should return oldIndex', () => {
        expect(calcNextIndexDefault(oldIndex, numItems)).to.equal(oldIndex);
      });
    });
  });

  context('when numItems is greater than one', () => {
    const numItems = 2;

    context('when oldIndex is start of list', () => {
      const oldIndex = 0;

      it('should return oldIndex + 1', () => {
        expect(calcNextIndexDefault(oldIndex, numItems)).to.equal(oldIndex + 1);
      });
    });

    context('when oldIndex is end of list', () => {
      const oldIndex = numItems - 1;

      it('should return start of list', () => {
        expect(calcNextIndexDefault(oldIndex, numItems)).to.equal(0);
      });
    });
  });
});

describe('calcPreviousIndexDefault()', () => {
  context('when numItems is one', () => {
    const numItems = 1;

    context('when oldIndex is start of list', () => {
      const oldIndex = 0;

      it('should return oldIndex', () => {
        expect(calcPreviousIndexDefault(oldIndex, numItems)).to.equal(oldIndex);
      });
    });
  });

  context('when numItems is greater than one', () => {
    const numItems = 2;

    context('when oldIndex is start of list', () => {
      const oldIndex = 0;

      it('should return end of list', () => {
        expect(calcPreviousIndexDefault(oldIndex, numItems)).to.equal(numItems - 1);
      });
    });

    context('when oldIndex is end of list', () => {
      const oldIndex = numItems - 1;

      it('should return oldIndex - 1', () => {
        expect(calcNextIndexDefault(oldIndex, numItems)).to.equal(oldIndex - 1);
      });
    });
  });
});
