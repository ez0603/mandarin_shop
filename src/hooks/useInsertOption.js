import { useState } from 'react';
import { registerOption } from '../apis/api/product'; // 경로가 정확한지 확인하세요.

const useInsertOption = () => {
  const [error, setError] = useState(null);

  const insertOption = async (productId, optionTitleId, optionName) => {
    try {
      const params = { productId, optionTitleId, optionName };
      console.log(params);
      await registerOption(params);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return { insertOption, error };
};

export default useInsertOption;