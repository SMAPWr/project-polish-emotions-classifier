import React, { useReducer, useEffect, useState } from "react";
import "firebase/database";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import secondary from "@material-ui/core/colors/indigo";
import { CookiesProvider } from "react-cookie";

import Layout from "../Layout/Layout";
import DropZone from "../DropZone/DropZone";
import Table from "../Table/Table";
import { reducer, actions, initialState } from "../../helpers/twitterReducer";
import { getTweetsResults, getSampleResults } from "../../services/apiService";
import ServerErrorDialog from "../ServerErrorDialog/ServerErrorDialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onTweetsChange = (newTweets = []) => {
    dispatch({ type: actions.SET_TWEETS, data: newTweets });
  };

  const onAskForSampleData = async () => {
    const results = await getSampleResults(state.tweets);
    dispatch({ type: actions.SET_FULL_TWEETS, data: results });
    setIsDialogOpen(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (state.isRequestPending) {
      const request = getTweetsResults(state.tweets);
      request
        .then((response) => {
          dispatch({
            type: actions.UPDATE_TWEETS,
            data: response.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: actions.REMOVE_TWEETS,
          });
          setIsDialogOpen(true);
        });
    }
    // eslint-disable-next-line
  }, [state.isRequestPending]);

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <DropZone
            onFileChange={onTweetsChange}
            isLoading={state.isRequestPending}
            onAskForSampleData={onAskForSampleData}
          />
          <Table tweets={state.tweets} isLoading={state.isRequestPending} />
          <ServerErrorDialog
            onAccept={onAskForSampleData}
            open={isDialogOpen}
            onClose={closeDialog}
          />
        </Layout>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
