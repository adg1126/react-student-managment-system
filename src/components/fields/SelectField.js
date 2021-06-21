import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectField = ({ options, value, label, handleChange }) => {
  return (
    <FormControl style={{ width: '7em' }} variant='outlined' margin='dense'>
      <InputLabel>{label}</InputLabel>
      <Select value={value ? value : ''} onChange={handleChange}>
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {options.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
