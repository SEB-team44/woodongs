import { useEffect, useState } from "react";

function useCardList() {
  const [cardList, setCardList] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const access_token = localStorage.getItem("access_token");


  let reqOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      credentials: "include",
      Authorization: access_token,
    },
  };
  
  const getCardList = async () => {
    let url;

    if (cursor) {
      url = `https://api.woodongs.site/study?size=5&cursorId=${cursor}`;
    } else {
      url = `https://api.woodongs.site/study?size=10`;
    }
    if (!isAvailable) {
      return;
    }

    fetch(url, reqOption)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => {
        setIsLoading(true);
        setTimeout(() => {
          setCardList([...cardList, ...data.data]);
          if (data.sliceInfo.nextAvailable) {
            setCursor(data.sliceInfo.lastIdx);
          } else {
            setIsAvailable(false);
          }
          setIsLoading(false);
        }, 1000);
      });
  };

useEffect(() => {
  getCardList()
},[])
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollHeight = document.documentElement.scrollHeight;
  //     const scrollTop = document.documentElement.scrollTop;
  //     const clientHeight = document.documentElement.clientHeight;
  //     if (scrollTop + clientHeight >= scrollHeight) {
  //       getCardList();
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  
  // }, );
  return  cardList ;
};


export default useCardList;
