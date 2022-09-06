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

export const AreaListTable = ({ areaList }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  /**
   * Detail 페이지 진입 navigate
   * @param {*} area_id
   */
  const goToDetailPage = area_id => {
    navigate(`/area/detail/${area_id}`);
  };

  const createData = (
    area_id,
    area_name,
    latitude,
    longitude,
    cam_latitude,
    cam_longitude
  ) => {
    return {
      area_id,
      area_name,
      latitude,
      longitude,
      cam_latitude,
      cam_longitude,
    };
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

  if (!areaList) return <div>로딩중입니다.</div>;

  return (
    <TableContainer className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>이름</TableCell>
            <TableCell className={classes.tableCell}>구역 위치</TableCell>
            <TableCell className={classes.tableCell}>카메라 위치</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow
                className={classes.tableBodyRow}
                onClick={() => goToDetailPage(row.area_id)}
                key={row.area_id}
              >
                <TableCell className={classes.tableCell}>
                  {row.area_name}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.latitude}, {row.longitude}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.cam_latitude}, {row.cam_longitude}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
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
    width: '25%',
    '&.MuiTableCell-head': {
      padding: 0,
      textAlign: 'center',
      borderRight: '1px solid #D5DDE4',
      '&:last-child': {
        borderRight: '0px',
      },
    },
    '&.MuiTableCell-body': {
      height: 35,
      padding: 0,
      textAlign: 'center',
    },
  },
  tableBodyRow: {
    cursor: 'pointer',
  },
});
