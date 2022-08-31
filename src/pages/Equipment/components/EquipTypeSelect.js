import React from 'react';
import { MenuItem, FormControl, Select } from '@mui/material';

export default function EquipTypeSelect({ type, handleType }) {
  return (
    <FormControl>
      <Select
        sx={{
          height: '32px',
          width: '200px',
          '& .MuiSelect-select': {
            padding: '4px 16px',
          },
        }}
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
}
