import React, { useState, useEffect } from "react";

export function handleResponse(response) {
  return response.json().then((json) => {
    if (!response.ok) {
      const error = Object.assign({}, json, {
        status: response.status,
        statusText: response.statusText,
      });
      return Promise.reject(error);
    }
    return json;
  });
}

export const getFetchFunction = async (urlEndpoint) => {
  if (!navigator.onLine) {
    alert("Please connect to Network.")
    return null;
  }
  try {
    let valueFetched = fetch(
      `${process.env.REACT_APP_BACKEND_SERVICE_URL}/${urlEndpoint}`,
      {
        method: "GET"
      }
    )
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    return valueFetched;
  } catch (err) {
    alert(err);
    ;
    return null;
  }
};

export const useFetch = (urlEndpoint, fetchAgain = false) => {
  const [response, setResponse] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  
  
  React.useEffect(() => {
    const fetchData = async () => {
      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      let requestOptions = {
        method: "GET",
      
      };
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVICE_URL}/${urlEndpoint}`,
          requestOptions
        )
          .then((response) => {
            if(response.status == 401){
              alert("un-Authorised!!!.Please Login Again")
                localStorage.removeItem("state");
            }
            return response.json()
          })
          .then((result) => {
            setIsLoading(false);
            setResponse(result);
            return result;
          });
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fetchAgain]);

  return { response, error, isLoading };
};
