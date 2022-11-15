import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

export const FileUploader = ({ label, Url, setUrl, editMode }) => {
  console.log("Url", Url);
  const fileList = [
    Url
      ? {
          uid: "1",
          name: label + ".png",
          status: "done",
          response: '{"status": "success"}',
          url: Url,
        }
      : {},
  ];
  const fileExists = Object.keys(fileList[0]).length;
  const props = {
    maxCount: 1,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
    },
    fileList: fileList,
  };

  const showUploadList = editMode ? true : false;
  if(showUploadList){
    showUploadList = fileExists > 0 ? true : false;
  } 

  const addFile = (options) => {
    const { file } = options;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadFile(options, reader.result);
    };
    reader.onerror = () => {
      console.log("Error");
    };
  };

  const uploadFile = async (options, base64EncodedImage) => {
    const { onSuccess, onError, file, onProgress } = options;

    console.log(base64EncodedImage);

    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("DATA", data);
          setUrl(data.uploadedResponse.secure_url);
          onSuccess("Ok");
        });
    } catch (err) {
      console.error(err);
      onError({ err });
    }
  };
  return (
    <Upload {...props} customRequest={addFile} showUploadList={showUploadList}>
      <Button icon={<UploadOutlined />}>Click to Upload (Max: 1) </Button>
    </Upload>
  );
};
