import React from React;
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export default function Spinner(prop) {

    const classes = useStyles();
    const { show_backdrop } = useSelector((state) => {
        return state;
      });

      console.log("show_backdrop: "+ show_backdrop)
    
    return (
        <Backdrop className={classes.backdrop} open={show_backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  

