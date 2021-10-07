import React, { useEffect } from "react";
const ReadJson = () => {
  const fetchListOfData = async () => {
    let fetchedData = await fetch("https://drive.google.com/drive/folders/1g0Q0jvD8ms0Y5N-UksVtR4Ma7K675IEm?usp=sharing",{
        method:"GET",
        mode: 'no-cors',
        header:{
            "Access-Control-Allow-Origin": "*"
        }
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => console.log(result));
  };

  useEffect(() => {
    fetchListOfData();
  }, []);
  return <div>Reading File... </div>;
};

export default ReadJson;
