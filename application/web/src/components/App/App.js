import React, {useState, useReducer, useEffect} from "react";
import firebase from "firebase/app";
import "firebase/database";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import secondary from "@material-ui/core/colors/indigo";
import { CookiesProvider } from "react-cookie";

import Layout from "../Layout/Layout";
import Form from "../Form/Form";
import Placeholder from "../Placeholder/Placeholder";
import DropZone from "../DropZone/DropZone";
import Table from "../Table/Table";
import { reducer, actions, initialState } from "../../helpers/twitterReducer";
import {getTweetsResults} from "../../services/apiService";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#852508",
    },
    secondary: secondary,
  },
});

function App() {
  console.log(process.env)
  const [state, dispatch] = useReducer(reducer, initialState);

  const onTweetsChange = (newTweets = []) => {
    dispatch({ type: actions.SET_TWEETS, data: newTweets });
  };

  useEffect(() => {
    if(state.isRequestPending) {
      const request = getTweetsResults(state.tweets)
      request.then(response => {
        dispatch({
          type: actions.UPDATE_TWEETS,
          data: response.data
        })
      })
    }
  }, [state.isRequestPending])

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <DropZone onFileChange={onTweetsChange} />
          <Table tweets={state.tweets} isLoading={state.isRequestPending} />
        </Layout>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
