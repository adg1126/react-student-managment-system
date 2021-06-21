import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

const SelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl
    style={{ marginTop: '0.5em' }}
    variant='outlined'
    error={touched && error}
    fullWidth
  >
    <InputLabel>{label}</InputLabel>
    <Select {...input} {...custom} onChange={value => input.onChange(value)}>
      {children}
    </Select>
    <FormHelperText>{touched && error}</FormHelperText>
  </FormControl>
);

export default SelectField;
