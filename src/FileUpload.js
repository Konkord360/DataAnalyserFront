import { render } from "@testing-library/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import axios, { post } from "axios";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone, { Preview } from "react-dropzone-uploader";
import { color } from "highcharts";

const FileUpload = ({ refetch }) => {
  // const Preview = ({ meta }) => {
  //     const { name, percent, status } = meta
  //     return (
  //       <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
  //         {name}, {Math.round(percent)}%, {status}
  //       </span>
  //     )
  //   }
  // setHidden(isHidden);
  const [selectedFile, setSelectedFile] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    fileUpload(selectedFile).then((response) => {
      console.log(response.data);
      refetch();
    });
  };

  const onChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const fileUpload = (file) => {
    const url = "http://localhost:8080/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  const getUploadParams = ({ meta }) => {
    return { url: "localhost:8080/uploadFile" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) =>
      fileUpload(f.file).then((response) => {
        console.log(response.data);
        refetch();
        f.remove();
      })
    );
    // allFiles.forEach(
    //     f => f.remove()
    // )
  };

  const dropzoneStyle = {
    width: "100%",
    height: "20%",
    border: "1px solid black",
  };

  return (
    // <div>
    //     <form onSubmit={onFormSubmit}>
    //         <h1>File Upload</h1>
    //         <input type="file" onChange={onChange} />
    //         <button type="submit">Upload</button>
    //     </form>
    // </div>
    <div className="DropZoneDiv">
      <Dropzone
        // getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        canCancel={true}
        inputContent="Drop files here"
        styles={{
          dropzone: {
            minHeight: 200,
            maxHeight: 600,
            backgroundColor: "white",
            borderColor: "#1890ff",
          },
        }}
      ></Dropzone>
    </div>
  );
};

export default FileUpload;
