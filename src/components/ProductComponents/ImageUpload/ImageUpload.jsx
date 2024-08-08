/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { storage } from "../../../apis/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as s from "./style";
import { SyncLoader } from "react-spinners";
const ImageUpload = ({ initialImage, onImageUpload, isEditing }) => {
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
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
      setIsLoading(true); // 업로드 시작 시 로딩 상태 설정
      const storageRef = ref(storage, `products/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Uploaded image URL:", downloadURL); // 디버그 로그 추가
        onImageUpload(downloadURL);
      } catch (error) {
        console.error("Failed to upload image", error);
        alert("Failed to upload image");
      } finally {
        setIsLoading(false); // 업로드 완료 후 로딩 상태 해제
      }

      // 파일 입력 요소 리셋
      e.target.value = null;
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
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
      {isLoading && <div css={s.loader}> <SyncLoader color="white" size={10}/></div>} {/* 로딩 스피너 추가 */}
    </div>
  );
};

export default ImageUpload;
