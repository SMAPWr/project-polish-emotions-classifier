import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import LoadingAnimation from "./LoadingAnimation";

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
}));

export default function DropZone({
  onFileChange = () => {},
  isLoading = false,
}) {
  const classes = useStyles();
  const onDrop = useCallback((acceptedFiles) => {
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
  }, [onFileChange]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "application/json", onDrop });

  const style = `${classes.zone} ${isDragActive ? classes.activeStyle : ""} ${
    isDragAccept ? classes.acceptStyle : ""
  } ${isDragReject ? classes.rejectStyle : ""}`;

  return (
    <div className={style} {...getRootProps()}>
      <input {...getInputProps()} />
      {!isLoading ? (
        isDragActive ? (
          isDragAccept ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              You cannot drop this type of file, we only accept{" "}
              <strong>.json</strong> files
            </p>
          )
        ) : (
          <p>Drag 'n' drop some data files here, or click to select files</p>
        )
      ) : (
        ""
      )}
      {isLoading && <LoadingAnimation />}
    </div>
  );
}
