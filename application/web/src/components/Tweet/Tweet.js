import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
// import SnackbarContent from "@material-ui/core/SnackbarContent";
// import Icon from "@material-ui/core/Icon";
import { TwitterTweetEmbed } from "react-twitter-embed";

import "./Tweet.css";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(29, 161, 242, 0.1)",
    width: "400px",
    margin: 0,
    padding: 0,
    minHeight: "100px",
    position: "relative",
  },
  tweet: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    backgroundColor: "#f44336",
    color: "#fff",
    fontWeight: 500,
  },
  errorMessage: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    backgroundColor: "#2196f336",
    color: "#000",
    fontWeight: 500,
  },
  textPlaceholder: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {
    position: "absolute",
    left: "45%",
    top: "25px",
  },
}));

export default function Tweet({ tweetId, tweetContent = "", type = "home" }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const onLoad = (data) => {
    setLoading(false);
  };

  // if (error === true) {
  //   return (
  //     <SnackbarContent
  //       className={classes.error}
  //       message={
  //         <React.Fragment>
  //           <span className={classes.errorMessage}>
  //             <Icon style={{ marginRight: "10px" }}>error_outline</Icon>
  //             Ups... There is a problem with this tweet. Please check if you
  //             have Adblock Disabled and if you have then just skip this tweet.
  //           </span>
  //         </React.Fragment>
  //       }
  //     />
  //   );
  // }

  return (
    tweetId && (
      <React.Fragment>
        <Card className={classes.card}>
          <CardContent className={"tweet-content"}>
            {tweetId && type !== "customText" && (
              <TwitterTweetEmbed
                onLoad={onLoad}
                tweetId={tweetId}
                placeholder={tweetContent}
                options={{ maxWidth: 800, cards: "hidden" }}
              />
            )}
            {tweetContent && type === "customText" && (
              <div className={classes.textPlaceholder}>
                {"Custom Text:"}
                <br />
                {tweetContent}
              </div>
            )}
          </CardContent>
          {loading && type !== "customText" && (
            <CircularProgress color="secondary" className={classes.progress} />
          )}
        </Card>
      </React.Fragment>
    )
  );
}
