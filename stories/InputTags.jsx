import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { InputTags } from '../src/index';

import { noop } from '../test/util';
import { items, emptyString } from '../test/mock';

storiesOf('InputTags', module)
  .add('create token by typing non empty string and clicking on something else', () => {
    return (
      <InputTags
        tags={['insert another']}
        handleInsert={action('handleInsert')}
        handleRemove={noop}
      />
    )
  })
  .add('create token by typing non empty string and pressing tab', () => {
    return (
      <InputTags
        tags={['insert another']}
        handleInsert={action('handleInsert')}
        handleRemove={noop}
      />
    )
  })
  .add('create token by typing non empty string and pressing comma', () => {
    return (
      <InputTags
        tags={['insert another']}
        handleInsert={action('handleInsert')}
        handleRemove={noop}
      />
    )
  })
  .add('create token by typing non empty string and pressing enter', () => {
    return (
      <InputTags
        tags={['insert another']}
        handleInsert={action('handleInsert')}
        handleRemove={noop}
      />
    )
  })
  .add('edit token by clicking on tag', () => {
    return (
      <InputTags
        tags={['edit me']}
        handleInsert={noop}
        handleRemove={action('handleRemove')}
      />
    )
  })
  .add('delete token by clicking delete button', () => {
    return (
      <InputTags
        tags={['delete me']}
        handleInsert={noop}
        handleRemove={action('handleRemove')}
      />
    )
  })
  .add('delete token by backspacing when input is empty', () => {
    return (
      <InputTags
        tags={['delete me']}
        handleInsert={noop}
        handleRemove={action('handleRemove')}
      />
    )
  })
  .add('show input placeholder by rendering', () => {
    return (
      <InputTags
        tags={[]}
        handleInsert={noop}
        handleRemove={noop}
        inputPlaceholder={'Add Tag'}
      />
    )
  })
  .add('update input width by typing', () => {
    return (
      <InputTags
        tags={[]}
        handleInsert={noop}
        handleRemove={noop}
      />
    )
  })
  .add('update input width with a max setting by typing', () => {
    return (
      <InputTags
        tags={[]}
        handleInsert={noop}
        handleRemove={noop}
        inputMaxWidth={100}
      />
    )
  })
  .add('show suggestions list by typing non empty string', () => {
    return (
      <InputTags
        tags={[]}
        handleInsert={noop}
        handleRemove={noop}
        suggestions={items}
        handleUpdateSuggestions={action('handleUpdateSuggestions')}
      />
    )
  })
  .add('create token by typing non empty string and clicking suggestion', () => {
    return (
      <InputTags
        tags={[]}
        handleInsert={action('handleInsert')}
        handleRemove={noop}
        suggestions={items}
      />
    )
  })
  .add('create token by typing non empty string and pressing enter for highlighted suggestion', () => {
    return (
      <InputTags
        tags={[]}
        handleInsert={action('handleInsert')}
        handleRemove={noop}
        suggestions={items}
      />
    )
  })
  .add('highlight next suggestion by typing non empty string and pressing down', () => {
    return (
      <InputTags
        tags={[]}
        handleInsert={noop}
        handleRemove={noop}
        suggestions={items}
      />
    )
  })
  .add('highlight previous suggestion by typing non empty string and pressing up', () => {
    return (
      <InputTags
        tags={[]}
        handleInsert={noop}
        handleRemove={noop}
        suggestions={items}
      />
    )
  })
  .add('hide suggestions list by typing non empty string and pressing escape', () => {
    return (
      <InputTags
        tags={[]}
        handleInsert={noop}
        handleRemove={noop}
        suggestions={items}
      />
    )
  });
