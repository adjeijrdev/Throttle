import {useRef} from 'react';


export default function ImageUploader() {
    const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImage = (file) => {
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setImage({ file, url: imageUrl });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleImage(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-container">
      <div
        className="drop-box"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
      >
        {image ? (
          <img src={image.url} alt="Preview" className="preview-image" />
        ) : (
          <p>Drag & Drop an image here</p>
        )}
      </div>

      <button className="upload-button" onClick={openFileDialog}>
        Select Image
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
    </div>
  );
}
