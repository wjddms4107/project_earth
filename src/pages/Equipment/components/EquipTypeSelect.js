import React from 'react';
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

export default function EquipTypeSelect({ type, handleType }) {
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
        value={type}
        onChange={handleType}
      >
        <MenuItem value="backhoe">backhoe</MenuItem>
        <MenuItem value="wheel_loader">wheel_loader</MenuItem>
        <MenuItem value="bulldozer">bulldozer</MenuItem>
        <MenuItem value="excavators">excavators</MenuItem>
      </Select>
    </FormControl>
  );
}
