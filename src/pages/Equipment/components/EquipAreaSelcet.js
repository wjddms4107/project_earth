import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, FormControl, Select } from '@mui/material';

export const EquipAreaSelect = ({ area, handleArea }) => {
  const classes = useStyles();

  return (
    <FormControl>
      <Select
        className={classes.select}
        value={area}
        onChange={handleArea}
        displayEmpty={true}
      >
        <MenuItem value="">전체</MenuItem>
        <MenuItem value="구역A">A구역</MenuItem>
        <MenuItem value="구역B">B구역</MenuItem>
        <MenuItem value="구역C">C구역</MenuItem>
        <MenuItem value="구역D">D구역</MenuItem>
        <MenuItem value="구역E">E구역</MenuItem>
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles(() => ({
  select: {
    height: '32px',
    width: '200px',
    '& .MuiSelect-select': {
      padding: '4px 16px',
    },
  },
}));
