import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const useStyles = makeStyles({
  table: { border: '1px solid #D5DDE4' },
  tableRow: {},
  tableCell: {
    width: '25%',
    height: '49px',
    border: '1px solid #D5DDE4',
    background: '#EFF2F5',
  },
});

const StyledTableRow = withStyles(theme => ({
  root: { height: '40px' },
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  root: {
    height: '40px',
  },
}))(TableCell);

function createData(시리얼, 타입, 소유주, 구역) {
  return { 시리얼, 타입, 소유주, 구역 };
}
export default function EquipListTable({ equipList }) {
  const classes = useStyles();

  const isData = equipList.length !== 0;
  if (!isData) return <div>로딩중입니다.</div>;
  const rows = equipList.map(
    ({ serial_number, equipments_type, equipment_owner, equipment_area }) =>
      createData(
        serial_number,
        equipments_type,
        equipment_owner,
        equipment_area
      )
  );

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell} align="center">
              시리얼
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              타입
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              소유주
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              구역
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.시리얼}>
              <StyledTableCell align="center">{row.시리얼}</StyledTableCell>
              <StyledTableCell align="center">{row.타입}</StyledTableCell>
              <StyledTableCell align="center">{row.소유주}</StyledTableCell>
              <StyledTableCell align="center">{row.구역}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
