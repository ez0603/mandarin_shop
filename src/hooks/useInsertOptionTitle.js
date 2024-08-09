import { useState } from "react";
import { registerOptionTitle } from "../apis/api/option"; // 경로가 정확한지 확인하세요.

const useInsertOptionTitle = () => {
  const [error, setError] = useState(null);

  const insertOptionTitle = async (productId, optionTitle, onSuccess) => {
    if (!optionTitle.trim()) {
      alert("옵션 타이틀을 입력해 주세요.");
      return;
    }

    const param = { productId, titleName: optionTitle };
    try {
        await registerOptionTitle(param);
        alert("추가가 완료되었습니다.");
        if (onSuccess) onSuccess();  // 성공 시 콜백 실행
    } catch (error) {
        setError(error);
        console.error(error);
    }
  };

  return { insertOptionTitle, error };
};

export default useInsertOptionTitle;
