/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { storage } from "../../../apis/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as s from "./style";

const ImageUpload = ({ initialImage, onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSelectedImage(initialImage);
  }, [initialImage]);

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      setSelectedImage(localUrl);

      // Firebase Storage에 이미지 업로드
      const storageRef = ref(storage, `products/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        onImageUpload(downloadURL);
      } catch (error) {
        console.error("Failed to upload image", error);
        alert("Failed to upload image");
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div css={s.imageContainer} onClick={handleImageClick}>
      <img src={selectedImage} alt="Product" css={s.productImage} />
      <input
        type="file"
        ref={fileInputRef}
        css={s.fileInput}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;