import React, { useState } from 'react';
import Details from '../../Components/Details/details';

import axios from '../../Axios/axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import './customerInformation.css';

const CustomerInformation = () => {
  // Default user's details.
  const defaultDetails = {
    userId: '',
    userPhone: '',
    firstName: '',
    userBirthday: '',
    lastName: '',
    additionalComments: '',
  };

  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = useState(defaultDetails);
  const [clearInput, setClearInput] = useState(false);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setDetails({ ...details, [name]: value });
  };

  // Handle save button - send HTTP post request to save the user.
  const onClickSave = async () => {
    try {
      setClearInput(true);
      const response = await axios.post('/users/create', details); // Header in server
      handleClickOpen();
      setDetails(defaultDetails);
    } catch (err) {
      console.log('err'.err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClearInput(false);
  };

  return (
    <div className="customer-information-wrapper">
      <h1 className="text">יצירת\ עדכון פרטי לקוח</h1>

      <div className="row">
        <Details
          name="userId"
          label="תעודת זהות"
          row1={true}
          onInputChange={onInputChange}
          clear={clearInput}
        />
        <Details
          name="userPhone"
          label="טלפון"
          row1={true}
          onInputChange={onInputChange}
          clear={clearInput}
        />
      </div>
      <div className="row">
        <Details
          name="firstName"
          label="שם פרטי"
          row1={false}
          onInputChange={onInputChange}
          clear={clearInput}
        />
        <Details
          name="userBirthday"
          label="תאריך לידה"
          row1={false}
          onInputChange={onInputChange}
          clear={clearInput}
        />
      </div>

      <div className="row">
        <Details
          name="lastName"
          label="שם משפחה"
          row1={false}
          onInputChange={onInputChange}
          clear={clearInput}
        />
        <Details
          name="additionalComments"
          label="הערות נוספות"
          row1={false}
          onInputChange={onInputChange}
          clear={clearInput}
        />
      </div>
      <button className="save-button" onClick={onClickSave}>
        שמור
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            הצטרפת בהצלחה למערכת !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerInformation;
