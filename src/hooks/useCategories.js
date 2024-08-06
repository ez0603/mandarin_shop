import { useQuery } from "react-query";
import { searchAllCategoryRequest } from "../apis/api/categoty";
import { useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useQuery(["categoryQuery"], searchAllCategoryRequest, {
    onSuccess: (response) => {
      setCategories(
        response.data.map((category) => ({
          value: category.categoryId,
          label: category.categoryName,
        }))
      );
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return categories;
};

export default useCategories;
