import { useEffect, useState } from "react";
import { axiosInstance } from "../../utiles/axiosInstance";

function useCardList() {
  const [cardList, setCardList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const access_token = localStorage.getItem("access_token");
    const [cursor, setCursor] = useState(0);
    const [isAvailable, setIsAvailable] = useState(true);

  // async get data 
  const loadCardList = (url) => {
    let reqOption = {
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    };
    const response = axiosInstance.get(
      `/study?size=${url}`,
      reqOption
    );
    return response
  }

  const initialAction = async () => {
    let url;
    cursor ? url = `5&cursorId=${cursor}` : url = `10`

    if (!isAvailable) {
      return;
    } else {
      try {
        setIsLoading(true);

        // get card lists 
        const response = await loadCardList(url)

        // infinate scroll info
        const { nextAvailable, lastIdx } = response.data.sliceInfo;
        
        setTimeout(() => {
          setCardList([...cardList, ...response.data.data]);
          nextAvailable ? setCursor(lastIdx) : setIsAvailable(false);
          setIsLoading(false);
        }, 1000);

      } catch (error) {
        setIsLoading(false)
        alert(error);
      }
    }
  };


  useEffect(() => {
    initialAction();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        initialAction();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return {isLoading, cardList, setCardList }
};


export default useCardList;
