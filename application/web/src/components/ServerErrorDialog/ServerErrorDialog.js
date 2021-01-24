import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from '@material-ui/core/Slide';
import DialogContentText from "@material-ui/core/DialogContentText";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ServerErrorDialog({ onClose, open, onAccept }) {

  const handleClose = () => {
    onClose();
  };

  const handleAccept = () => {
    onAccept()
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"There was an error on our Server"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          There was a problem receiving data from the server, do you want to display our sample predictions instead?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          I don't want to see sample data
        </Button>
        <Button onClick={handleAccept} color="primary">
          Sure, show me the sample date
        </Button>
      </DialogActions>
    </Dialog>
  );
}
