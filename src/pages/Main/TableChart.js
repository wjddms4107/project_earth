import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import DataFilter from './dataFilter';

export default function TableChart({ data }) {
  if (!data) return <div>로딩중입니다.</div>;

  //////////////////////////////////////// NEW
  const DATA = [
    {
      datetime: '2022-08-19T19:23:24+0900',
      type: [
        {
          detection_info: 'blackhoe',
          state: 'unload',
        },
        {
          detection_info: 'rode_roller',
          state: 'unload',
        },
        {
          detection_info: 'blackhoe',
          state: 'load',
        },
        {
          detection_info: 'etc',
          state: 'travel',
        },
        {
          detection_info: 'excavator',
          state: 'unload',
        },
        {
          detection_info: 'excavator',
          state: 'idle',
        },
        {
          detection_info: 'excavator',
          state: 'idle',
        },
        {
          detection_info: 'excavator',
          state: 'idle',
        },
        {
          detection_info: 'excavator',
          state: 'idle',
        },
      ],
    },
  ];
  const alpha = new DataFilter(DATA[0]);
  alpha.setCountByType();
  alpha.setCountByState();
  alpha.setTypeByState();

  const mapToArray = inputMap => {
    let array = [];

    inputMap.forEach(function (value, key) {
      let obj = {};
      obj.name = key;
      obj.value = value;
      array.push(obj);
    });

    return array;
  };
  //////////////////////////////////////// NEW

  const countToString = data => {
    let dataArray = [];
    data.map(count => {
      let string = count.name + '(' + count.count + ') ';
      return dataArray.push(string);
    });
    return dataArray;
  };

  const stateToString = data => {
    let dataArray = [];
    data.map(state => {
      let string = state.state + '(' + state.count + ') ';
      return dataArray.push(string);
    });
    return dataArray;
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: '100%', width: '100%' }}
        aria-label="caption table"
      >
        <TableHead>
          <TableRow>
            <TableCell>시간</TableCell>
            <TableCell>중장비 개수</TableCell>
            <TableCell>중장비 상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.datetime}>
              <TableCell component="th" scope="row">
                {item.datetime}
              </TableCell>
              <TableCell>{countToString(item.vehicle_count)}</TableCell>
              <TableCell>{stateToString(item.vehicle_state)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableBody>
          {data.map(item => (
            <TableRow key={item.datetime}>
              <TableCell component="th" scope="row">
                {item.datetime}
              </TableCell>
              <TableCell>{countToString(item.vehicle_count)}</TableCell>
              <TableCell>{stateToString(item.vehicle_state)}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
}
