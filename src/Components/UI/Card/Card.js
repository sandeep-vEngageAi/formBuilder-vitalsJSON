import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import './Card.scss';
import { useSelector } from "react-redux";
export default function ActionAreaCard(props) {
  const IsFormEmpty = useSelector(state=>state.reducer.someFormsEmpty)
  return (
    <Card sx={{ maxWidth: 350 }} onClick={props.onClick}  className={`${(props.index==props.currentSelectedJsonIndex) && "active__card"}
    ${((Object.keys(props.item).length == 0) && IsFormEmpty ) && "empty__form"}
    `}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom={false} variant="h8" component="div">
            {props.index+1}
           {props.item?.question_id &&<div className="">question id:  {props.item.question_id}</div> }
          </Typography>
          <Typography variant="subtitle" color="text.secondary">
           {props.item?.fallback &&<div className="">fallback:  {props.item.fallback}</div> }
           {props.item?.type &&<div className="">type:{props.item.type}</div> }
          
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}