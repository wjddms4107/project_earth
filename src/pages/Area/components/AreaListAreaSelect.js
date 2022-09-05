import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, FormControl, Select } from '@mui/material';

export const AreaListAreaSelect = ({ area, handleSelect }) => {
  const classes = useStyles();

  const AREA_INFO = [
    {
      area_id: 1,
      area_value: '',
      area_name: '전체',
    },
    {
      area_id: 2,
      area_value: 1,
      area_name: '구역A',
    },
    {
      area_id: 3,
      area_value: 2,
      area_name: '구역B',
    },
    {
      area_id: 4,
      area_value: 3,
      area_name: '구역C',
    },
    {
      area_id: 5,
      area_value: 4,
      area_name: '구역D',
    },
    {
      area_id: 6,
      area_value: 5,
      area_name: '구역E',
    },
  ];

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        className={classes.select}
        value={area}
        onChange={handleSelect}
        displayEmpty={true}
      >
        {AREA_INFO.map(area => {
          return (
            <MenuItem key={area.id} value={area.area_value}>
              {area.area_name}
            </MenuItem>
          );
        })}
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
