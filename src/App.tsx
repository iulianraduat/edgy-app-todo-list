import EdgyApi from 'edgy-api';
import React from 'react';
import 'sanitize.css';
import CreateList from './components/CreateList';
import ViewList, { ViewListProps } from './components/ViewList';

const style: React.CSSProperties = {
  height: '100vh',
  width: '100vw'
};

const App = () => {
  const Api = new EdgyApi();
  return Api.isAppCfg() ? (
    <div style={style}>
      <ViewList {...((Api.getAppCfg() as unknown) as ViewListProps)} />
    </div>
  ) : (
    <CreateList />
  );
};

export default App;
