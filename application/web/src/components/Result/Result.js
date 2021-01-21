import React from "react";
import Typography from "@material-ui/core/Typography";

import { Chart } from "react-google-charts";
import { emotions, emotionColors } from "../../helpers/config";
import { icons } from "../../helpers/settings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    maxWidth: "60px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  moreButton: {
    cursor: "pointer"
  }
}));

export default function Result({ data, id, onClickMore = () => {} }) {
  const classes = useStyles();
  if (data == null) {
    return "There was an error processing your request :(";
  }

  const sortedArray = Object.entries(data).sort(function (a, b) {
    return b[1] - a[1];
  });

  const onLinkClick = () => {
    onClickMore(id)
  }

  const values = sortedArray
    .slice(0, 3)
    .map((el) => [
      emotions[el[0]],
      Number(Number(el[1] * 100).toFixed(1)),
      emotionColors[el[0]],
      null,
    ]);

  const emotionIcon = icons[sortedArray[0][0]];

  return (
    <div className={classes.container}>
      <Chart
        width={"200px"}
        height={"300px"}
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
          titleTextStyle: { fontSize: 15 },
          title: "Top 3 emotions",
          // chartArea: { width: "90%" },
          bar: { groupWidth: "95%" },
          legend: { position: "none" },
        }}
        // For tests
        rootProps={{ "data-testid": "1" }}
      />
      <div className={classes.iconContainer}>
        <img
          className={classes.icon}
          src={emotionIcon}
          aria-label={values[0][0]}
        />
        <Typography className={classes.moreButton} onClick={onLinkClick} variant="h6" color="secondary" align="center">{"More"}</Typography>
      </div>
    </div>
  );
}