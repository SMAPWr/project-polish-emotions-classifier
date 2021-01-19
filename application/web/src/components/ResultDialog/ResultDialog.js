import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { Chart } from "react-google-charts";
import { emotions, emotionColors } from "../../helpers/config";
import { icons } from "../../helpers/settings";

const sortedColumns = [
  "zlosc",
  "wstret",
  "strach",
  "smutek",
  "neutralny",
  "zaskoczenie",
  "oczekiwanie",
  "podziw",
  "radosc",
];

const modelNames = ["Original", "Słowosieć", "Brand24"];

const useStyles = makeStyles((theme) => ({
  charts: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
  },
  sentiment: {
    paddingTop: theme.spacing(2),
    textAlign: "center",
  },
}));

function getSentiment(topEmotion) {
  if (sortedColumns.slice(0, 4).includes(topEmotion)) {
    return <span style={{color: 'red'}}>{"Negatywny"}</span>;
  }
  if (sortedColumns.slice(6).includes(topEmotion)) {
    return <span style={{color: 'lightGreen'}}>{"Pozytywny"}</span>;
  }
  return "Neutralny";
}

export default function ResultDialog({ onClose, open, tweet }) {
  const classes = useStyles();
  if (tweet == null) {
    return null;
  }

  const valuesModel1 = sortedColumns.map((emotion) => [
    emotions[emotion],
    Number(Number(tweet.model1[emotion] * 100).toFixed(1)),
    emotionColors[emotion],
    null,
  ]);
  const valuesModel2 = sortedColumns.map((emotion) => [
    emotions[emotion],
    Number(Number(tweet.model2[emotion] * 100).toFixed(1)),
    emotionColors[emotion],
    null,
  ]);
  const valuesModel3 = sortedColumns.map((emotion) => [
    emotions[emotion],
    Number(Number(tweet.model3[emotion] * 100).toFixed(1)),
    emotionColors[emotion],
    null,
  ]);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const scoreSum = [tweet.model1, tweet.model2, tweet.model3].reduce(
    (acc, item) => {
      for (const emotion in item) {
        acc[emotion] = item[emotion] + (acc[emotion] || 0);
      }
      return acc;
    }, {}
  );

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="result-dialog"
      open={open}
      maxWidth={false}
      fullWidth={true}
    >
      <DialogTitle id="result-dialog" className={classes.title}>
        Tweet results
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.info}>
          <Typography variant={"subtitle2"}>{"Tweet's content"}</Typography>
          <SnackbarContent message={tweet.content} />
          <Typography className={classes.sentiment} variant={"h6"}>
            {"Avg. Sentiment: "}
            <span>{getSentiment(Object.entries(scoreSum).sort(function (a, b) {
              return b[1] - a[1];
            })[0][0])}</span>
          </Typography>
        </div>
        <div className={classes.charts}>
          {[valuesModel1, valuesModel2, valuesModel3].map((values, idx) => (
            <Chart
              width={"500px"}
              height={"400px"}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={[
                [
                  "Emotion",
                  "Certainty [%]",
                  { role: "style" },
                  {
                    sourceColumn: 0,
                    role: "annotation",
                    type: "string",
                    calc: "stringify",
                  },
                ],
                ...values,
              ]}
              options={{
                title: `Emotions - ${modelNames[idx]}`,
                titleTextStyle: { fontSize: 18 },
                // chartArea: { width: "90%" },
                bar: { groupWidth: "90%" },
                legend: { position: "none" },
                hAxis: {
                  title: "Certainty [%]",
                  titleTextStyle: { fontSize: 16 },
                },
              }}
              // For tests
              rootProps={{ "data-testid": idx }}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
