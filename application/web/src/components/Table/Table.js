import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tweet from "../Tweet/Tweet";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    margin: "auto",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    fontSize: "1rem",
  },
  labelIcon: {
    height: theme.spacing(6),
    marginRight: theme.spacing(2),
  },
  title: {
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    textAlign: "center",
  },
  table: {
    maxHeight: "60vh",
  },
  body: {
    height: "100%",
    overflowY: "auto",
  },
  tweetClass: {
    padding: 0
  }
}));

export default function TweetTable({ tweets = [] }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <React.Fragment>
      <TableContainer className={classes.table}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tweet</TableCell>
              <TableCell align="right">Emotion - Model 1</TableCell>
              <TableCell align="right">Emotion - Model 2</TableCell>
              <TableCell align="right">Emotion - Model 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tweets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="none" size="small" className={classes.tweetClass}>
                    <Tweet

                      tweetContent={row.content}
                      tweetId={"" + row.id.split("/")[3] + ""}
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: row.status === "On Time" ? "green" : "red",
                    }}
                  >
                    Model's API not available
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: row.status === "On Time" ? "green" : "red",
                    }}
                  >
                    Model's API not available
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: row.status === "On Time" ? "green" : "red",
                    }}
                  >
                    Model's API not available
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {tweets.length !== 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tweets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
      {tweets.length === 0 && (
        <Typography
          component="h2"
          variant="h6"
          color="textSecondary"
          gutterBottom
          className={classes.title}
        >
          Please upload file with tweets
        </Typography>
      )}
    </React.Fragment>
  );
}
