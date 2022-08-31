import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

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
    width: '25%',
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

function createData(
  serial_number,
  equipment_type,
  equipment_company,
  equipment_area,
  equipment_id
) {
  return {
    serial_number,
    equipment_type,
    equipment_company,
    equipment_area,
    equipment_id,
  };
}
export default function EquipListTable({ equipList }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const isData = equipList.length !== 0;
  if (!isData) return <div>로딩중입니다.</div>;

  const goToDetailPage = equipment_id => {
    navigate(`/equipment/${equipment_id}`);
  };

  const rows = equipList.map(
    ({
      serial_number,
      equipment_type,
      equipment_company,
      equipment_area,
      equipment_id,
    }) =>
      createData(
        serial_number,
        equipment_type,
        equipment_company,
        equipment_area,
        equipment_id
      )
  );

  return (
    <TableContainer className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>시리얼</TableCell>
            <TableCell className={classes.tableCell}>타입</TableCell>
            <TableCell className={classes.tableCell}>소유주</TableCell>
            <TableCell className={classes.tableCell}>구역</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              onClick={() => goToDetailPage(row.equipment_id)}
              key={row.serial_number}
            >
              <TableCell className={classes.tableCell}>
                {row.serial_number}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {row.equipment_type}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {row.equipment_company}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {row.equipment_area}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
