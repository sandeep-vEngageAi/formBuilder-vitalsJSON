import React ,{useState,useEffect} from "react";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from "react-json-pretty/dist/monikai";
import "./JsonPrettier.scss";
import ScrollView from "devextreme-react/scroll-view";
const JsonPrettier = (props) => {
  const [data,setData] = useState([]);
  useEffect(()=>{
    let stringiFiedResponse = [];
    let jsonData = props.jsonData;
    if (typeof jsonData != "string") {
      stringiFiedResponse = JSON.stringify(jsonData, undefined, 2);
    } else {
      stringiFiedResponse = JSON.stringify(jsonData, undefined, 4);
    }
    setData(stringiFiedResponse)
  },[])
  const changedValue=(value)=>{
  }
  return (
    <ScrollView scrollByContent={true} scrollByThumb={true} style={{height:"100%"}} >
      <div className="text-content"  >
          
        <JSONPretty
          data={props.jsonData}
          theme={JSONPrettyMon}
          onChange={(value)=>changedValue(value)}
        ></JSONPretty>
      </div>
    </ScrollView>
  );
};

export default JsonPrettier;
