import React, { useState } from "react";
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#852508",
    },
    secondary: secondary,
  },
});

function App() {
  const [tweets, setTweets] = useState([]);

  const onTweetsChange = (newTweets = []) => {
    setTweets(newTweets);
  };

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <DropZone onFileChange={onTweetsChange} />
          <Table tweets={tweets} />
        </Layout>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
