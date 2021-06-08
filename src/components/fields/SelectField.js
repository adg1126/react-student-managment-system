import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: '1em',
    width: '100%'
  },
  formControl: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.grey800
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.grey800
    },
    '& .Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'blue'
      }
    },
    '& label.Mui-focused': {
      color: 'blue'
    }
  }
}));

const SelectField = ({ options, value, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl
      style={{ width: '7em' }}
      className={classes.formControl}
      variant='outlined'
      margin='dense'
    >
      <InputLabel>Course</InputLabel>
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
