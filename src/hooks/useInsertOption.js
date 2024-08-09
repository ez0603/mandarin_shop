import { useState } from 'react';
import { registerOption } from '../apis/api/product'; // 경로가 정확한지 확인하세요.

const useInsertOption = () => {
  const [error, setError] = useState(null);

  const insertOption = async (productId, optionTitleId, optionName, onSuccess) => {
    if (!optionName.trim()) {
      alert("옵션 이름을 입력해 주세요.");
      return;
    }

    try {
      const params = { productId, optionTitleId, optionName };
      console.log(params);
      await registerOption(params);
      if (onSuccess) onSuccess();  // 성공 시 콜백 실행
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return { insertOption, error };
};

export default useInsertOption;
