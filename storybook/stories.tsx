import { storiesOf } from '@storybook/react';
import React from 'react';
import CreateList from '../src/components/CreateList';
import ViewList from '../src/components/ViewList';

const style: React.CSSProperties = {
  height: 20
};

const taskEventIds: string[] = ['1', '2'];

storiesOf('App', module)
  .add('create a list', () => (
    <div style={style}>
      <CreateList />
    </div>
  ))
  .add('view a list', () => (
    <div style={style}>
      <ViewList taskEventIds={taskEventIds} />
    </div>
  ));
