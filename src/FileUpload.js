import React, { useState, useMemo } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";
import Button from "@material-ui/core/Button";
import WaitWindow from "./WaitWindow";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "black",
  borderStyle: "solid",
  backgroundColor: "#2b3033",
  color: "#1890ff",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const FileUpload = ({ redraw }) => {
  const [filteredFiles, setFilteredFiles] = useState();
  const [waitingForTheResponse, setWaitingForTheResponse] = useState(false);

  const fileUpload = (files) => {
    const url = "http://localhost:8080/uploadFile";
    const formData = new FormData();

    files.forEach(file =>{
      formData.append("files", file);
    })
    
    console.log(files);
    const config = {
      method: "POST",
      body: formData,
    };

    setWaitingForTheResponse(true);
    fetch(url, config)
    .then((response) => response.json())
    .then((response) => {
      redraw(response);
      setWaitingForTheResponse(false);
    });
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  const files = acceptedFiles.map((file, i) => (
    <div className="filePreview">
      <div className="fileName">
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      </div>
      <div className="filePreviewButton">
        <Button variant="outlined" color="primary" onClick={() => remove(i)}>
          delete file
        </Button>
      </div>
    </div>
  ));

  const remove = (file) => {
    acceptedFiles.splice(file, 1); // remove the file from the array
    files.splice(file, 1);
    setFilteredFiles(files);
  };

  const removeAllFiles = () => {
    acceptedFiles.splice(0, acceptedFiles.length);
    files.splice(0, files.length);
    setFilteredFiles([]);
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const uploadFiles = () => {
    if (files.length > 0) {
        fileUpload(acceptedFiles);
        setFilteredFiles();;
        removeAllFiles();
    }
  };

  return (
    <div>
      {waitingForTheResponse ? <WaitWindow /> : ""}
      <div className="DropzoneContainer">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div className="filesPreview">
          <h4>Files</h4>
          {files}
        </div>
        <div className="SubmitButton">
          <Button variant="outlined" color="primary" onClick={uploadFiles}>
            Upload files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
