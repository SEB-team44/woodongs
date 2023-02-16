import { useEffect, useState } from "react";
import { axiosInstance } from "axios";

function useCardList() {
  const [cardList, setCardList] = useState([]);
  const access_token = localStorage.getItem("access_token");


  const reqOption = {
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
  };
  let url;

  const getCardList = async (cursor, isAvailable) => {
    if (cursor) {
      url = `5&cursorId=${cursor}`;
    } else {
      url = `10`;
    }
    if (!isAvailable) {
      return;
    } else {
      try {
        // setIsLoading(true);
        const response = await axiosInstance.get(`/study?size=${url}`, reqOption);
        
        // infinate scroll info
        const {nextAvailable, lastIdx} = response.data.sliceInfo
        setTimeout(() => {
          setCardList([...response.data.data]);
          // nextAvailable
          //   ? setCursor(lastIdx)
          //   : setIsAvailable(false);
          // setIsLoading(false);
        }, 1000);
      } catch (error) {
        alert(error);
      }
    }
    return  cardList, nextAvailable, lastIdx;
  };

useEffect(() => {
  getCardList()
},[])

  return {getCardList};
};


export default useCardList;
