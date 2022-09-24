import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [getdata, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAsync = async () => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data.data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    };
    getAsync();
  }, []);

  return { getdata, isPending, error };
};
//커스텀 훅은 앞에 use를 사용하지 않으면 동작하지 않는다.

export default useFetch;
