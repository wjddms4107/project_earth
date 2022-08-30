import React from 'react';
import { useNavigate } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../../../index.css';

export default function EquipListTable({ areaList }) {
  const classes = useStyles();
  const navigate = useNavigate();

  if (!areaList) return <div>로딩중입니다.</div>;

  const goToDetailPage = area_id => {
    navigate(`/list/${area_id}`);
  };

  const rows = areaList.map(
    ({
      area_id,
      area_name,
      latitude,
      longitude,
      cam_latitude,
      cam_longitude,
    }) =>
      createData(
        area_id,
        area_name,
        latitude,
        longitude,
        cam_latitude,
        cam_longitude
      )
  );

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell
              className={classes.tableCell}
              padding="none"
              align="center"
            >
              이름
            </TableCell>
            <TableCell
              className={classes.tableCell}
              padding="none"
              align="center"
            >
              구역 위치
            </TableCell>
            <TableCell
              className={classes.tableCell}
              padding="none"
              align="center"
            >
              카메라 위치
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <StyledTableRow
                onClick={() => goToDetailPage(row.area_id)}
                key={row.area_id}
              >
                <StyledTableCell padding="none" align="center">
                  {row.area_name}
                </StyledTableCell>
                <StyledTableCell padding="none" align="center">
                  {row.latitude}, {row.longitude}
                </StyledTableCell>
                <StyledTableCell padding="none" align="center">
                  {row.cam_latitude}, {row.cam_longitude}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const useStyles = makeStyles({
  table: {},
  tableRow: {},
  tableCell: {
    width: '25%',
    height: 42,
    border: '1px solid #D5DDE4',
    background: '#EFF2F5',
    padding: 'none',
  },
  '.css-1q1u3t4-MuiTableRow-root': {
    color: 'red',
    fontSize: '100px',
  },
  '.css-6gz8hr-MuiTableCell-root': {
    color: 'red',
    fontSize: '100px',
  },
});

const StyledTableRow = withStyles(theme => ({
  root: { border: '1px solid #D5DDE4' },
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  root: { height: 35 },
}))(TableCell);

function createData(
  area_id,
  area_name,
  latitude,
  longitude,
  cam_latitude,
  cam_longitude
) {
  return {
    area_id,
    area_name,
    latitude,
    longitude,
    cam_latitude,
    cam_longitude,
  };
}
