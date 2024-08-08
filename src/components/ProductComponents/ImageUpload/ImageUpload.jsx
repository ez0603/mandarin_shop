/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { storage } from "../../../apis/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as s from "./style";

const ImageUpload = ({ initialImage, onImageUpload, isEditing }) => {
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

      // 파일 입력 요소 리셋
      e.target.value = null;
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.value = ""; // 파일 입력 요소 리셋
      fileInputRef.current.click();
    }
  };

  return (
    <div css={s.imageContainer} onClick={handleImageClick}>
      <img src={selectedImage} alt="Product" css={s.productImage} />
      {isEditing && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            css={s.fileInput}
            onChange={handleImageChange}
            onClick={(e) => e.stopPropagation()} // 클릭 이벤트가 버블링되지 않도록 설정
          />
          <div css={s.overlay}>
            <span>클릭해 이미지를 변경하세요</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
