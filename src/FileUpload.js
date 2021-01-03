
import React, { useState, useMemo } from "react";
import "./App.css";
import "react-dropzone-uploader/dist/styles.css";
import {useDropzone} from 'react-dropzone';
import Button from "@material-ui/core/Button";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'black',
  borderStyle: 'solid',
  backgroundColor: '#2b3033',
  color: '#1890ff',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};
const FileUpload = ({ refetch }) => {
  const [filteredFiles, setFilteredFiles] = useState();

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
  // const [fileList, setFileList] = useState();

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
  };

  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
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
    acceptedFiles.splice(file, 1);        // remove the file from the array
    files.splice(file, 1); 
    setFilteredFiles(files);
  };

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const uploadFiles = () => {
    console.log(acceptedFiles);
    console.log(files);
    if(files.length > 0){
      for(let i = 0; i < files.length; i++){
        fileUpload(acceptedFiles[i]);
        remove(i);
      }
    }
  }

  return (
    // <div>
    //     <form onSubmit={onFormSubmit}>
    //         <h1>File Upload</h1>
    //         <input type="file" onChange={onChange} />
    //         <button type="submit">Upload</button>
    //     </form>
    // </div>
    // <div className="DropZoneDiv">
    //   <Dropzone
    //     // getUploadParams={getUploadParams}
    //     onChangeStatus={handleChangeStatus}
    //     onSubmit={handleSubmit}
    //     canCancel={true}
    //     Layout={Layout}
    //     // PreviewComponent={Preview}
    //     inputContent="Drop files here"
    //     styles={{
    //       dropzone: {
    //         minHeight: 200,
    //         maxHeight: 600,
    //         backgroundColor: "#2b3033",
    //         borderColor: "#1890ff",
    //       },
    //     }}
    //   ></Dropzone>
    // </div>
    <div className="DropzoneContainer">
      <div {...getRootProps({style})}>
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
  );
};

export default FileUpload;
