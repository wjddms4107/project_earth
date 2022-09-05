import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, FormControl, Select } from '@mui/material';
export const EquipListAreaSelect = ({ area, handleArea }) => {
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
        <MenuItem value="1">A구역</MenuItem>
        <MenuItem value="2">B구역</MenuItem>
        <MenuItem value="3">C구역</MenuItem>
        <MenuItem value="4">D구역</MenuItem>
        <MenuItem value="5">E구역</MenuItem>
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
