import React, {useReducer, useEffect} from "react";
import "firebase/database";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import secondary from "@material-ui/core/colors/indigo";
import { CookiesProvider } from "react-cookie";

import Layout from "../Layout/Layout";
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
  }, [state.isRequestPending, state.tweets])

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <DropZone onFileChange={onTweetsChange} isLoading={state.isRequestPending} />
          <Table tweets={state.tweets} isLoading={state.isRequestPending} />
        </Layout>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
