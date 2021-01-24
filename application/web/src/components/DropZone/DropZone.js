import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import LoadingAnimation from "./LoadingAnimation";
import Typography from "@material-ui/core/Typography";
import dataIcon from "./statistics.png";

const useStyles = makeStyles((theme) => ({
  zone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontSize: "1.2rem",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    position: "relative",
    minHeight: "110px",
  },
  rowDisplay: {
    backgroundColor: "#fafafa",
    borderColor: "#eeeeee",
    color: "#bdbdbd",
    display: "flex",
    flexDirection: "row !important",
  },
  activeStyle: {
    borderColor: "#2196f3",
  },
  acceptStyle: {
    borderColor: "#00e676",
  },
  rejectStyle: {
    borderColor: "#ff1744",
    color: "#ff1744",
  },
  iconContainer: {
    display: "flex",
    padding: `0 ${theme.spacing(2)}px`,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    maxWidth: "60px",
  },
  moreButton: {
    cursor: "pointer",
  },
  fullInfo: {
    flex: 1,
    textAlign: "center",
  },
}));

export default function DropZone({
  onFileChange = () => {},
  onAskForSampleData = () => {},
  isLoading = false,
}) {
  const classes = useStyles();
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading failed");
      reader.onload = () => {
        // Parse CSV file
        const result = JSON.parse(reader.result);
        if (Array.isArray(result) && result[0].id != null) {
          onFileChange(
            result.filter((item, pos) => {
              return result.findIndex((el) => el.id === item.id) === pos;
            })
          );
        }
      };

      // read file contents
      acceptedFiles.forEach((file) => reader.readAsText(file));
    },
    [onFileChange]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "application/json", onDrop });

  const onLinkClick = () => {
    onAskForSampleData();
  };

  const style = `${classes.zone} ${!isLoading ? classes.rowDisplay : ""} ${
    isDragActive ? classes.activeStyle : ""
  } ${isDragAccept ? classes.acceptStyle : ""} ${
    isDragReject ? classes.rejectStyle : ""
  }`;

  return (
    <div className={classes.rowDisplay}>
      <div className={style} {...getRootProps()}>
        <input {...getInputProps()} />
        {!isLoading ? (
          isDragActive ? (
            isDragAccept ? (
              <p className={classes.fullInfo}>Drop the files here ...</p>
            ) : (
              <p className={classes.fullInfo}>
                You cannot drop this type of file, we only accept{" "}
                <strong>.json</strong> files
              </p>
            )
          ) : (
            <p className={classes.fullInfo}>
              Drag 'n' drop some data files here, or click to select files
            </p>
          )
        ) : (
          ""
        )}
        {isLoading && <LoadingAnimation />}
      </div>
      <div className={classes.iconContainer} onClick={onLinkClick}>
        <img
          className={classes.icon}
          src={dataIcon}
          aria-label={"Load preprocessed data"}
        />
        <Typography
          className={classes.moreButton}
          variant="h6"
          color="secondary"
          align="center"
        >
          {"Try on our data"}
        </Typography>
      </div>
    </div>
  );
}
