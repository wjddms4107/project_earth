import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import 'assets/locales/lang/i18next';

export const TableChart = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  /**
   * Map 객체를 배열로 변환, 중장비 개수
   * @param {*} data
   * @returns 데이터 배열
   */
  const countToString = data => {
    let dataArray = [];
    data.countByType.forEach((value, key) => {
      let string = t(key) + '(' + value + ') ';
      dataArray.push(string);
    });
    return dataArray;
  };

  /**
   * Map 객체를 배열로 변환, 중장비 상태
   * @param {*} data
   * @returns 데이터 배열
   */
  const stateToString = data => {
    let dataArray = [];
    data.countByState.forEach((value, key) => {
      let string = t(key) + '(' + value + ') ';
      dataArray.push(string);
    });
    return dataArray;
  };

  if (!data) return <div>로딩중입니다.</div>;

  return (
    <Suspense fallback="Loading...">
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell}>시간</TableCell>
              <TableCell className={classes.tableCell}>중장비 개수</TableCell>
              <TableCell className={classes.tableCell}>중장비 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((inputMap, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className={classes.tableCell}>
                    {inputMap.datetime
                      .toISOString()
                      .replace('T', ' ')
                      .replace(/\..*/, '')}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {countToString(inputMap)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {stateToString(inputMap)}
                  </TableCell>
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
    borderBottom: 0,
  },
  tableRow: {
    height: 40,
    background: '#EFF2F5',
  },
  tableCell: {
    '&:last-child': {
      borderRight: '0px',
    },
    '&.MuiTableCell-head': {
      padding: 0,
      textAlign: 'center',
      borderRight: '1px solid #D5DDE4',
    },
    '&.MuiTableCell-body': {
      height: 35,
      padding: 0,
      textAlign: 'center',
    },
  },
});
