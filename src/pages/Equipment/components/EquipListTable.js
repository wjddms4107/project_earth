import React from 'react';
import { useNavigate } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const useStyles = makeStyles({
  tableContainer: { border: '1px solid #D5DDE4', borderRadius: '4px' },
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

const StyledTableRow = withStyles(theme => ({
  root: {},
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  root: { height: 35 },
}))(TableCell);

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

  // console.log('equipList:', equipList);
  // console.log('rows:', rows);

  return (
    <TableContainer className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell
              className={classes.tableCell}
              padding="none"
              align="center"
              width="25%"
            >
              시리얼
            </TableCell>
            <TableCell
              className={classes.tableCell}
              padding="none"
              align="center"
              width="25%"
            >
              타입
            </TableCell>
            <TableCell
              className={classes.tableCell}
              padding="none"
              align="center"
              width="25%"
            >
              소유주
            </TableCell>
            <TableCell padding="none" align="center" width="25%">
              구역
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow
              onClick={() => goToDetailPage(row.equipment_id)}
              key={row.serial_number}
            >
              <StyledTableCell padding="none" align="center">
                {row.serial_number}
              </StyledTableCell>
              <StyledTableCell padding="none" align="center">
                {row.equipment_type}
              </StyledTableCell>
              <StyledTableCell padding="none" align="center">
                {row.equipment_company}
              </StyledTableCell>
              <StyledTableCell padding="none" align="center">
                {row.equipment_area}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
