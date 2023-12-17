import React, { useEffect, useState } from "react";
import Input from "./Input";
import IconButton from "../IconButton/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseAPIUri } from "../../const";
import { updateMember } from "../../store/store";
import { useDispatch } from "react-redux";
import _ from "lodash";

type EditableFieldProps = {
  memberId?: number;
  value?: string;
  name: string;
  required?: boolean;
  labelText: string;
  readOnly?: boolean;
  disabled?: boolean;
  updateEditingField: React.Dispatch<React.SetStateAction<string>>;
};

function EditableField({
  memberId,
  value,
  name,
  required,
  labelText,
  readOnly,
  disabled,
  updateEditingField,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const originalValue = value;
  const [currentValue, setCurrentValue] = useState<string>(value || "");
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentValue(value || "");
  }, [isEditing, value, disabled]);

  const startEdit = () => {
    setIsEditing(true);
    updateEditingField(name!);
  };

  const discardEdit = () => {
    setIsEditing(false);
    setCurrentValue(originalValue || "");
    updateEditingField("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  const updateValue = () => {
    axios
      .patch(`${baseAPIUri}/Member`, { id: memberId, [name]: currentValue })
      .then((res: AxiosResponse) => {
        setIsEditing(false);
        dispatch(updateMember(res.data));
        updateEditingField("");
      })
  };

  return (
    <>
      {isEditing ? (
        <>
          <Input
            name={name}
            required={required}
            labelText={labelText}
            value={currentValue}
            onChange={handleChange}
          />
          <IconButton
            style={{ paddingTop: "8px" }}
            icon={<CheckIcon />}
            onClick={updateValue}
          />
          <IconButton
            style={{ paddingTop: "8px" }}
            icon={<CloseIcon />}
            onClick={discardEdit}
          />
        </>
      ) : (
        <>
          <Input
            name={name}
            required={required}
            labelText={labelText}
            value={value}
            readOnly={readOnly}
          />
          <IconButton
            disabled={disabled}
            icon={<EditOutlinedIcon />}
            onClick={startEdit}
          />
        </>
      )}
    </>
  );
}

export default EditableField;
