import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, FormControl, Select } from '@mui/material';

export const EquipListAreaSelect = ({ area, handleArea, menuItemArea }) => {
  const classes = useStyles();

  if (!menuItemArea) return <div>로딩중입니다.</div>;
  return (
    <FormControl>
      <Select
        className={classes.select}
        value={area}
        onChange={handleArea}
        displayEmpty={true}
      >
        <MenuItem value="">전체</MenuItem>
        {menuItemArea.map((area, index) => (
          <MenuItem key={area} value={index + 1}>
            {area}
          </MenuItem>
        ))}
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
