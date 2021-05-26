import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Details from '../../Components/Details/details';
import axios from '../../Axios/axios';

import './searchCustomer.css';

// Table's style.
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  table: {
    minWidth: 650,
  },
}));

const SearchCustomer = () => {
  const classes = useStyles();

  const [searchProperty, setSearchProperty] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [openSelect, setSelectOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [clearInput, setClearInput] = useState(false);

  const handleSelectChange = ({ target }) => {
    setSearchProperty(target.value);
  };
  const createRows = (res) => {
    setRows(res);
  };
  const [openDialog, setOpenDialog] = React.useState(false);

  // Handle search button - send HTTP get request to get user's details.
  const onSearchClick = async () => {
    try {
      if (searchProperty !== '' && searchValue !== '') {
        const value = Number(searchValue);
        let response;
        if (searchProperty === 'user-id') {
          response = await axios.get(`/users/find-user-by-id/${value}`);
          console.log('response', response.data);
        } else if (searchProperty === 'user-phone') {
          response = await axios.get(
            `/users/find-user-by-phone-number/${value}`
          );
        }
        clearInputs();
        setClearInput(false);
        createRows(response.data);
      } else {
        handleOpenDialog();
      }
    } catch (err) {
      console.log('onSearchClick failed!', err);
    }
  };
  const HandleSearchValue = ({ target }) => {
    setSearchValue(target.value);
    console.log('HandleSearchValue target.value', target.value);
  };

  // Open validation dialog.
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setClearInput(false);
  };

  const clearInputs = () => {
    setClearInput(true);
    setSearchProperty('');
  };
  const handleCloseSelect = () => {
    setSelectOpen(false);
  };

  const handleOpenSelect = () => {
    setSelectOpen(true);
  };

  return (
    <div className="search-customer-wrapper">
      <h1 className="search-customer-header"> חיפוש לקוח</h1>

      <div className="search-customer-colum">
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openSelect}
            onClose={handleCloseSelect}
            onOpen={handleOpenSelect}
            value={searchProperty}
            onChange={handleSelectChange}
            minwidth="150"
            labelwidth="150"
          >
            <MenuItem value="user-id">תעודת זהות</MenuItem>
            <MenuItem value="user-phone">טלפון</MenuItem>
          </Select>
        </FormControl>
        <label className="search-customer-text">אמצעי זיהוי</label>
      </div>
      <Details
        name="value"
        label="ערך"
        row1={false}
        onInputChange={HandleSearchValue}
        clear={clearInput}
      />
      <button className="search-button" onClick={onSearchClick}>
        חיפוש
      </button>

      <div className="table">
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>תעודת זהות</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">שם פרטי</TableCell>
                <TableCell align="right">שם שמפחה</TableCell>
                <TableCell align="right">טלפון</TableCell>
                <TableCell align="right">תאריך לידה</TableCell>
                <TableCell align="right">הערות נוספות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.user_id}</TableCell>
                    <TableCell align="right">{row.first_name}</TableCell>
                    <TableCell align="right">{row.last_name}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.birthday}</TableCell>
                    <TableCell align="right">
                      {row.additional_comments}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            חייב להכניס את כל הפרטים!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchCustomer;
