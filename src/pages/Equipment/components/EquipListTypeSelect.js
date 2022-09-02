import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, FormControl, Select } from '@mui/material';

export const EquipListTypeSelect = ({ type, handleType }) => {
  const classes = useStyles();

  return (
    <FormControl>
      <Select
        className={classes.select}
        value={type}
        onChange={handleType}
        displayEmpty={true}
      >
        <MenuItem value="">전체</MenuItem>
        <MenuItem value="backhoe">backhoe</MenuItem>
        <MenuItem value="wheel_loader">wheel_loader</MenuItem>
        <MenuItem value="bulldozer">bulldozer</MenuItem>
        <MenuItem value="excavators">excavators</MenuItem>
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles(() => ({
  select: {
    height: '32px',
    width: '200px',
    fontSize: '14px',
    '& .MuiSelect-select': {
      padding: '4px 16px',
    },
  },
}));
