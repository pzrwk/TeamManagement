import axios, { AxiosError, AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import {
  IncomingMemberData,
  CreateMemberData,
} from "../components/AddNewMemberDialog/AddNewMemberDialog";
import { baseAPIUri } from "../const";
import { useDispatch } from "react-redux";
import { addMember } from "../store/store";
import _ from "lodash";

export function useImportMember(): {
  data: CreateMemberData;
  setData: React.Dispatch<React.SetStateAction<CreateMemberData>>;
  fetchData: () => Promise<CreateMemberData | undefined>;
  resetData: () => void;
} {
  const [data, setData] = useState<CreateMemberData>({
    name: "",
    email: "",
    phoneNumber: "",
    avatarUrl: null,
  });

  const resetData = () => {
    setData({
      name: "",
      email: "",
      phoneNumber: "",
      avatarUrl: null,
    });
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const incomingData = response.data as IncomingMemberData;
      const member = incomingData.results[0];
      const newData: CreateMemberData = {
        email: member.email,
        phoneNumber: member.phone,
        name: `${member.name.first} ${member.name.last}`,
        avatarUrl: member.picture.large,
      };
      setData(newData);
      return newData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return { data, setData, fetchData, resetData };
}

export function useDialogOpen() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return { isDialogOpen, openDialog, closeDialog };
}

export function useSubmitData() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  //todo: handle success and error
  const submitData = async (data: CreateMemberData) => {
    let result: boolean = false;
    await axios.post(`${baseAPIUri}/Member`, data).then((response: AxiosResponse) => {
      dispatch(addMember(response.data));
      result = true;
    }).catch((axiosError: AxiosError) => {
      setErrors(axiosError.response?.data.errors);
      result = false;
    });

    return result;
  };

  return { submitData, errors, setErrors };
}
