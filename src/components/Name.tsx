import { TextField } from '@material-ui/core';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import React from 'react';

const formHelperTextProps: Partial<FormHelperTextProps> = {
  style: {
    color: '#ff0000'
  }
};

interface NameProps {
  name: string;
  onChange: (name: string) => void;
}

const Name: React.FC<NameProps> = ({ name, onChange }) => (
  <TextField
    label="Name of the list"
    value={name}
    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange(ev.target.value)}
    fullWidth={true}
    helperText={name.length === 0 ? 'The name is required' : ' '}
    FormHelperTextProps={formHelperTextProps}
  />
);

export default Name;
