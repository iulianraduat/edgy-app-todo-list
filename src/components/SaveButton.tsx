import { Button } from '@material-ui/core';
import React from 'react';

const style: React.CSSProperties = {
  whiteSpace: 'nowrap'
};

interface SaveButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isDisabled, onClick }) => (
  <Button variant="contained" color="primary" disabled={isDisabled} onClick={onClick} style={style}>
    Save
  </Button>
);

export default SaveButton;
