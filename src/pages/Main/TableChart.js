import React, { Suspense } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import '../../assets/locales/lang/i18next';

export default function TableChart({ data }) {
  if (!data) return <div>로딩중입니다.</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();

  const typeToString = data => {
    let dataArray = [];
    data.countByType.forEach((value, key) => {
      let string = t(key) + '(' + value + ') ';
      dataArray.push(string);
    });
    return dataArray;
  };

  const stateToString = data => {
    let dataArray = [];
    data.countByState.forEach((value, key) => {
      let string = t(key) + '(' + value + ') ';
      dataArray.push(string);
    });
    return dataArray;
  };

  return (
    <Suspense fallback="Loading...">
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
            {data.map((inputMap, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {inputMap.datetime
                      .toISOString()
                      .replace('T', ' ')
                      .replace(/\..*/, '')}
                  </TableCell>
                  <TableCell>{typeToString(inputMap)}</TableCell>
                  <TableCell>{stateToString(inputMap)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Suspense>
  );
}
