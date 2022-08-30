import React from 'react';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

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

export default function EquipTypeSelect({ area, handleSelect }) {
  const classes = useStyles();

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
}

const AREA_INFO = [
  {
    area_id: 1,
    area_value: '',
    area_name: '전체',
  },
  {
    area_id: 2,
    area_value: 1,
    area_name: '1구역',
  },
  {
    area_id: 3,
    area_value: 2,
    area_name: '2구역',
  },
];
