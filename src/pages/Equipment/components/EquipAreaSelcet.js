import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const useStyles = makeStyles(theme => ({
  select: {
    height: '32px',
    width: '200px',
    fontSize: '14px',
  },
  MenuItem: {
    fontSize: '14px',
  },
}));

export default function EquipAreaSelect({ area, handleArea }) {
  const classes = useStyles();

  return (
    <FormControl
      sx={{ minWidth: 120 }}
      // InputProps={{ style: { fontSize: 40 } }}
    >
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        className={classes.select}
        value={area}
        onChange={handleArea}
      >
        <MenuItem value="구역A">A구역</MenuItem>
        <MenuItem value="구역B">B구역</MenuItem>
        <MenuItem value="구역C">C구역</MenuItem>
        <MenuItem value="구역D">D구역</MenuItem>
        <MenuItem value="구역E">E구역</MenuItem>
      </Select>
    </FormControl>
  );
}
