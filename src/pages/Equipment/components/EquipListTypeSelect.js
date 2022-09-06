import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, FormControl, Select } from '@mui/material';

export const EquipListTypeSelect = ({ type, handleType, menuItemType }) => {
  const classes = useStyles();

  if (!menuItemType) return <div>로딩중입니다.</div>;
  return (
    <FormControl>
      <Select
        className={classes.select}
        value={type}
        onChange={handleType}
        displayEmpty={true}
      >
        <MenuItem value="">전체</MenuItem>
        {menuItemType.map(equip => (
          <MenuItem key={equip} value={equip}>
            {equip}
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
