import { useState } from 'react';
import { registerOptionTitle } from '../apis/api/product'; // 경로가 정확한지 확인하세요.

const useInsertOptionTitle = () => {
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const insertOptionTitle = async (productId, optionTitle) => {
    const param = { productId, titleName: optionTitle };
    try {
      await registerOptionTitle(param);
      alert("추가가 완료되었습니다.");
      setRefresh((prev) => !prev); // 상태를 토글하여 새로 고침 트리거
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return { insertOptionTitle, error, refresh };
};

export default useInsertOptionTitle;