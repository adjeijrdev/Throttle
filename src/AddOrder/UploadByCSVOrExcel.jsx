import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { orderUplodViaExcelCSVAPI } from "../api/order";
import styles from "./addOrder.module.css";
import { set } from "zod";
import { IoMdClose } from "react-icons/io";
import { BeatLoader } from "react-spinners";


export default function UploadByCSVOrExcel() {
  const [file, setFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
      toast.error("Please upload an Excel file (.xlsx, .xls, .csv)", {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
    }

    setFile(file);
    setOpenModal(true);
  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset input
    }
    setOpenModal(false);
  };



  const handleSubmit = async () => {

    setUploading(true);

    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
      
      toast.error("Please upload an Excel file (.xlsx, .xls, .csv)", {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Orders", file);
     
    try {
      const result = await orderUplodViaExcelCSVAPI(formData);

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });
      setFile(null)
      setOpenModal(false);
    } catch (error) {
      
      toast.error(error?.message, {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
    }
    handleRemove()
    setUploading(false);
  };
  return (
    <div>
      {openModal && (
        <UploadModal
          selectedFileName={file?.name}
          handleRemove={handleRemove}
          handleChange={handleClickUpload}
          handleSubmit={handleSubmit}
          isUploading={uploading}
        />
      )}

      <button
        className={styles.uploaderBtn}
        onClick={() => handleClickUpload()}
      >
        Upload by Excel/CSV
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </button>
    </div>
  );
}

const UploadModal = ({
  selectedFileName,
  handleRemove,
  handleChange,
  handleSubmit,
  isUploading,
}) => {
  return (
    <div className={styles.uploadModalContainer}>
      <div className={styles.uploadMDcloseBtn} onClick={()=>handleRemove()}>
        <IoMdClose size={20} color="#FF0554"  style={{marginRight:"10px", marginTop:"5px"}}/>
      </div>

      <div className={styles.uploadMainContent}>
        <div className={styles.upoadModalTitle}>Upload bulk orders</div>

        <p>
          <span className={styles.upMdtitleSub}>Selected File: </span>
          <span className={styles.mdfileName}> {selectedFileName}</span>
        </p>

        <div className={styles.modalBtnContanier}>
          <button
            className={styles.modalBtnRemove}
            onClick={() => handleRemove()}
          >
            Remove
          </button>
          <button
            className={styles.modalBtnChange}
            onClick={() => handleChange()}
          >
            Change
          </button>
          <button
            className={styles.modalBtnUpload}
            onClick={() => handleSubmit()}
          >
            {isUploading ? <BeatLoader color="white" /> : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};
