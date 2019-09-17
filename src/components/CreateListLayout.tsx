import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
  name: {
    flexGrow: 1,
    marginRight: 20
  },
  top: {
    alignItems: 'center',
    display: 'flex',
    margin: '10px 10px 0 10px'
  }
};

interface CreateListLayoutProps {
  list: JSX.Element;
  name: JSX.Element;
  saveButton: JSX.Element;
  saveMessage: JSX.Element;
}

const CreateListLayout: React.FC<CreateListLayoutProps> = ({ list, name, saveButton, saveMessage }) => (
  <div style={styles.container}>
    {saveMessage}
    <div style={styles.top}>
      <div style={styles.name}>{name}</div>
      <div style={styles.saveButton}>{saveButton}</div>
    </div>
    {list}
  </div>
);

export default CreateListLayout;
