import { render } from '@testing-library/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import './App.css';
import axios, {post} from "axios";



const FileUpload = ({refetch}) =>{
    // setHidden(isHidden);
    const [selectedFile, setSelectedFile] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();
        fileUpload(selectedFile).then((response) => {
            console.log(response.data);
            refetch();
        })
    }

    const onChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const fileUpload = (file) => {
        const url = 'http://localhost:8080/uploadFile';
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData,config);
    }


    return(
        <div>
            <form onSubmit={onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={onChange} />
                <button type="submit">Upload</button>
            </form>
        </div>  
    )

}

export default FileUpload;