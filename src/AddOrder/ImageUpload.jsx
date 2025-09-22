import React, { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import style from "./addOrder.module.css";
import imgIcon from "../Assets/icons/img.png"
export default function ImageUpload() {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImage = (file) => {
    try {
      if (!file) return;

      // Basic validation before processing
      if (!file.type.startsWith("image/")) {
        throw new Error("Only image files are allowed");
      }

      const imageUrl = URL.createObjectURL(file);
      setImage({ file, url: imageUrl });
      setValue("productImage", file, { shouldValidate: true });
      clearErrors("productImage"); // Clear any previous errors
    } catch (error) {
      setError("productImage", {
        type: "manual",
        message: error.message,
      });
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImage(e.dataTransfer.files[0]);
  };

  const handleFileInputChange = (e) => {
    handleImage(e?.target?.files[0]);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImage(null);
    setValue("productImage", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <div className={style.uploadImageContainer}>
      <div
        className={`${style["drop-box"]}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onClick={openFileDialog}
      >
        {image ? (
          <>
            <img
              src={image.url}
              alt="Preview"
              className={style["preview-image"]}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className={style["remove-image-btn"]}
            >
              ×
            </button>
          </>
        ) : errors.logo?.message ? (
          <div className={style["upload-error"]}>
            <FiAlertCircle />
            <p>{errors.logo.message}</p>
          </div>
        ) : (
          <img src={imgIcon } alt="placeholder" />
        )}
      </div>
      <button
        type="button"
        className={style["upload-button"]}
        onClick={openFileDialog}
      >
        +
       
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
    </div>
  );
}
