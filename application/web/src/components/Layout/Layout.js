import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import logo from './logo.png';
import chromeLogo from './chromewebstore.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with React and Material UI for "}
      <Link color="inherit" href="https://pwr.edu.pl/en/">
        <b>WUST</b>
      </Link>{" "}
      {"."}<br/><span style={{fontSize: 10}}>
      {"Icons made by "}
      <Link href="https://www.flaticon.com/authors/freepik" color="inherit" title="Freepik">Freepik</Link>
      {" from "}
      <Link href="https://www.flaticon.com/" color="inherit" title="Flaticon">www.flaticon.com</Link></span>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '90%',
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  logo: {
    width: 50,
    marginRight: theme.spacing(2),

  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    // padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      // marginTop: theme.spacing(6),
      marginBottom: theme.spacing(1),
      // padding: theme.spacing(3),
    },
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <img alt={"Logo"} className={classes.logo} src={logo} />
          <Typography variant="h6" color="inherit" noWrap>
            POLEMIC - POLish EMotIon Classifier
          </Typography>
          <span style={{'flex': 1}} />
          <Typography style={{paddingRight: '10px'}} variant="subtitle1" color="inherit" noWrap>
            {"Use Chrome Extension "}
          </Typography>
          <a rel={"noreferrer"} target={"_blank"} aria-label={"extension link"} href={"https://chrome.google.com/webstore/detail/polemic/amohljmlgkapaaplajmicnbegfheolae"}>
            <img alt={"POLEMIC - chrome extension"} className={classes.logo} src={chromeLogo} /></a>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>{children}</React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
