import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { useTranslation } from 'react-i18next';
import '../../assets/locales/lang/i18next';

export const TableChart = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  if (!data) return <div>로딩중입니다.</div>;

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
      <TableContainer className={classes.tableContainer} sx={{ width: '100%' }}>
        <Table sx={{ width: '100%' }} aria-label="caption table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell}>시간</TableCell>
              <TableCell className={classes.tableCell}>중장비 개수</TableCell>
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
};

const useStyles = makeStyles({
  tableContainer: {
    border: '1px solid #D5DDE4',
    borderRadius: '4px',
    borderBottom: '0px',
  },
  table: {},
  tableHead: {},
  tableRow: {
    height: 40,
    background: '#EFF2F5',
    padding: 'none',
  },
  tableCell: {
    borderRight: '1px solid #D5DDE4',
  },
});
