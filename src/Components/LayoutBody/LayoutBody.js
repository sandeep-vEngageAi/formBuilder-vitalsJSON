import React, { useState, useEffect } from "react";
import "./LayoutBody.scss";
import InputTag from "../UI/InputTag/InputTag";
import SearchableComponent from "../UI/SearchDropdown/SearchableComponent";
import RadioButtonTag from "../UI/RadioButtonTag/RadioButtonTag";
import ExpectedResponses from "./ExpectedResponses/ExpectedResponses";
import Actions from "./Actions/Actions";
import { Button } from "@mui/material";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import PreviewPopup from "../UI/PreviewComponent/PreviewPopup";
import CheckBox from "../UI/CheckBox/CheckBox";
import masterJson from "../../Data/master.json";
import BotUtterances from "./BotUtterance/BotUtterances";
import { useDispatch, useSelector } from "react-redux";
import {
  showNotificationWithMessage,
  hasFileUpdated,
} from "../../store/actions";
const LayoutBody = (props) => {
  const selectedFileDetails = useSelector((state) => state.reducer.fileDetails);
  const fileUpdated = useSelector((state) => state.reducer.fileUpdated);
  const dispatch = useDispatch();
  const [jsonForm, setJsonForm] = useState({});
  const [visibility, setVisibility] = useState(false);
  const [modifiedJson, setModifiedJson] = useState({});
  const createForm = (jsonObject) => {
    let tempMasterJson = { ...masterJson };
    Object.keys(tempMasterJson).map((key, index) => {
      if (jsonObject && key in jsonObject) {
        tempMasterJson[key] = jsonObject[key];
      }
    });
    setJsonForm((prev) => {
      return { ...tempMasterJson };
    });
  };
  useEffect(() => {
    setJsonForm({});

    createForm(props.jsonObject);
  }, [props.currentSelectedJsonIndex, props.jsonObject]);
  const updatejsonObjectFields = (value, identifier) => {
    if (props.currentSelectedJsonIndex < 0) {
      dispatch(
        showNotificationWithMessage({
          variant: "warning",
          message: "Please Select JSON",
        })
      );
      return;
    }
    if (props.currentSelectedJsonIndex > -1) {
      if (!fileUpdated) {
        dispatch(hasFileUpdated(true));
      }
    }
    if (identifier == "type") {
      value = value?.["type"];
    } else if (identifier == "clinical_entity") {
      // [
      //   {
      //     "t_ref_clinical_entity_id": 1,
      //     "entity_name": "Cough",
      //     "measure_type": "BINARY"
      //   }
      // ]
      let entityName = value?.["entity_name"];
      setJsonForm((prev) => {
        return {
          ...prev,
          [identifier]: entityName,
          ["clinical_entity_id"]: value?.["t_ref_clinical_entity_id"],
        };
      });
      value = undefined;
    } else if (identifier == "symptom") {
      // {
      //   "t_ref_sns_entity_id": 1,
      //   "sns_entity_name": "Cough",
      //   "sns_entity_measure_type": "BINARY"
      // }
      let entityName = value && value?.["sns_entity_name"];
      setJsonForm((prev) => {
        return {
          ...prev,
          [identifier]: entityName,
        };
      });
      value = undefined;
    } else if (identifier == "measure_type") {
      //     {id:1,
      //     measure_type:"NUMBER_SCALE"
      // },
      let entityName = value && value?.["measure_type"];
      setJsonForm((prev) => {
        return {
          ...prev,
          [identifier]: entityName,
        };
      });
      value = undefined;
    } else if (identifier == "vital") {
      // {
      //   "vitals_id": 2,
      //   "common_name": "temperature",
      //   "unit_of_measurement": "degree farhenheit",
      //   "measure_type": "measure",
      //   "value_field": ""
      // }
      let entityName = value && value?.["common_name"];
      setJsonForm((prev) => {
        return {
          ...prev,
          [identifier]: entityName,
          ["vital_value"]: value?.["measure_type"],
          ["value"]: value?.["value_field"],
        };
      });
      value = undefined;
    }

    if (value !== undefined || value != null) {
      setJsonForm((prev) => {
        return {
          ...prev,
          [identifier]: value,
        };
      });
    }
  };
  const createModifiedJson = () => {
    let tempJsonForm = { ...jsonForm };
    let finalJsonForm = {};
    Object.keys(tempJsonForm).map((item, index) => {
      if (typeof tempJsonForm[item] == "boolean") {
        finalJsonForm[item] = tempJsonForm[item];
      } else if (Array.isArray(tempJsonForm[item])) {
        finalJsonForm[item] = tempJsonForm[item];
      } else {
        if (tempJsonForm?.[item].length !== 0) {
          finalJsonForm[item] = tempJsonForm[item];
        }
      }
    });

    return finalJsonForm;
  };
  const previewData = () => {
    let finalJsonForm = createModifiedJson();
    setModifiedJson((prev) => {
      return { ...prev, finalJsonForm };
    });
    setVisibility(true);
  };
  const saveJsonDataToTemplate = () => {
    try {
      let finalJsonForm = createModifiedJson();
      props.updateJsonTemplateData(
        finalJsonForm,
        props.currentSelectedJsonIndex
      );
      dispatch(
        showNotificationWithMessage({
          variant: "success",
          message: "Data Saved!",
        })
      );
      dispatch(hasFileUpdated(false));
    } catch (err) {
      dispatch(
        showNotificationWithMessage({
          variant: "error",
          message: "Sorry Error occured in Saving Data!",
        })
      );
    }
  };
  return (
    <div className="layoutBody__container">
      <div className="layoutBody__header">
        {selectedFileDetails && selectedFileDetails?.name
          ? selectedFileDetails?.name
          : "Selected File Name Displays Here!!📛"}
      </div>
      <div className="layoutBody__columns">
        <div className="layoutBody__column1">
          <div className="layoutBody__column1Row1">
            <div className="layoutBody__columnItem1">
              <InputTag
                displayName="question id"
                name="question_id"
                setValue={updatejsonObjectFields}
                value={jsonForm["question_id"]}
                helperText=""
              />
            </div>
            <SearchableComponent
              displayName="type"
              name="type"
              setValue={updatejsonObjectFields}
              value={jsonForm["type"]}
              data={props.typeOptionsData ? props.typeOptionsData : []}
              displayValue="type"
              placeholder="Enter type"
            />
          </div>
          <div className="layoutBody__column1Row2">
            <SearchableComponent
              displayName="vital"
              displayValue="common_name"
              name="vital"
              setValue={updatejsonObjectFields}
              value={jsonForm["vital"]}
              data={props.vitalsData}
              placeholder="Please Select vitals"
            />
            <InputTag
              displayName="vital_value"
              name="vital_value"
              setValue={updatejsonObjectFields}
              value={jsonForm["vital_value"]}
              disabled
            />
            <InputTag
              displayName="value"
              name="value"
              setValue={updatejsonObjectFields}
              value={jsonForm["value"]}
              disabled
            />
          </div>
          <div className="layoutBody__column1Row3">
            <BotUtterances
              displayName="bot_utterance"
              width="100%"
              name="bot_utterances"
              setValue={updatejsonObjectFields}
              value={jsonForm["bot_utterances"]}
            />
          </div>

          <div className="layoutBody__column1Row4">
            <InputTag
              displayName="fallback_response"
              width="100%"
              name="fallback_response"
              setValue={updatejsonObjectFields}
              value={jsonForm["fallback_response"]}
            />
          </div>
          <div className="layoutBody__column1Row5">
            <InputTag
              displayName="fallback"
              width="100%"
              name="fallback"
              setValue={updatejsonObjectFields}
              value={jsonForm["fallback"]}
            />
          </div>
          <div className="layoutBody__column1Row6">
            <InputTag
              displayName="delay"
              name="delay"
              setValue={updatejsonObjectFields}
              value={jsonForm["delay"]}
            />
            <InputTag
              displayName="repeat"
              name="repeat"
              setValue={updatejsonObjectFields}
              value={jsonForm["repeat"]}
            />
            <InputTag
              displayName="repeat times"
              name="repeat_times"
              setValue={updatejsonObjectFields}
              value={jsonForm["repeat_times"]}
            />
          </div>
          <div className="layoutBody__column1Row7">
            <InputTag
              displayName="query media"
              width="100%"
              name="query_media"
              setValue={updatejsonObjectFields}
              value={jsonForm["query_media"]}
            />
          </div>
          <div className="layoutBody__column1Row8">
            <div className="layoutBody__columnItem1">
              <SearchableComponent
                displayName="Symptom"
                displayValue="sns_entity_name"
                name="symptom"
                setValue={updatejsonObjectFields}
                value={jsonForm["symptom"]}
                placeholder="Select Symptoms"
                data={props.symptomData}
              />
            </div>
            <RadioButtonTag
              displayName="is clinical entity"
              name="is_clinical_entity"
              setValue={updatejsonObjectFields}
              value={jsonForm["is_clinical_entity"]}
            />
          </div>
          <div className="layoutBody__column1Row9">
            <div className="layoutBody__columnItem1">
              <SearchableComponent
                displayName="Clinical Entity"
                displayValue="entity_name"
                name="clinical_entity"
                setValue={updatejsonObjectFields}
                value={jsonForm["clinical_entity"]}
                data={props.clinicalEntitiesData}
                placeholder="Select clinical entity"
              />
            </div>
            <InputTag
              displayName="clinical_entity_id"
              name="clinical_entity_id"
              setValue={updatejsonObjectFields}
              value={jsonForm["clinical_entity_id"]}
              disabled
              placeholder="clinical entity id"
            />
          </div>
          <div className="layoutBody__column1Row9"></div>
        </div>
        <div className="layoutBody__column2">
          <ExpectedResponses
            name="expectedresponse"
            setValue={updatejsonObjectFields}
            value={jsonForm["expectedresponse"]}
          />
          <Actions
            height="300px"
            name="action"
            setValue={updatejsonObjectFields}
            value={jsonForm["action"]}
          />
          <div className="layoutBody__column2Row3">
            <div className="layoutBody__column2Row3Item1">
              <SearchableComponent
                displayName="Measure type"
                displayValue="measure_type"
                name="measure_type"
                setValue={updatejsonObjectFields}
                value={jsonForm["measure_type"]}
                data={props.measureTypeOptionsData}
                placeholder="Enter Measure Type"
              />
            </div>
            <RadioButtonTag
              displayName="check intent"
              name="check_intent"
              setValue={updatejsonObjectFields}
              value={jsonForm["check_intent"]}
            />
          </div>
          <div className="layoutBody__column2Row4"></div>
          <div className="layoutBody__column2Row5">
            <div className="layoutBody__columnItem1">
              <RadioButtonTag
                displayName="skip Response"
                name="skip_response"
                setValue={updatejsonObjectFields}
                value={jsonForm["skip_response"]}
              />
            </div>
            <div className="layoutBody__symptomLogger">
              <CheckBox
                displayName="Symptom Logger"
                height="20px"
                name="symptom_logger"
                setValue={updatejsonObjectFields}
                value={jsonForm["symptom_logger"]}
              />
            </div>
          </div>
          <div className="layoutBody__column2Row5">
            <InputTag
              displayName="query Response"
              name="query_response"
              setValue={updatejsonObjectFields}
              value={jsonForm["query_response"]}
            />
            <InputTag
              displayName="query Media"
              name="query_media"
              setValue={updatejsonObjectFields}
              value={jsonForm["query_media"]}
            />
            <InputTag
              displayName="query fallback"
              name="query_fallback"
              setValue={updatejsonObjectFields}
              value={jsonForm["query_fallback"]}
            />
          </div>
        </div>
      </div>
      <div className="layoutBody__buttons">
        <div className="layoutBody__button">
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilitySharpIcon />}
            onClick={previewData}
          >
            Preview
          </Button>
        </div>
        <div className="layoutBody__button">
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveSharpIcon />}
            onClick={saveJsonDataToTemplate}
          >
            Save
          </Button>
        </div>
      </div>
      <PreviewPopup
        visibility={visibility}
        setVisibility={setVisibility}
        jsonData={modifiedJson}
      />
    </div>
  );
};

export default LayoutBody;
