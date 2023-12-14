import axios from "axios";
import { useState, useCallback } from "react";
import {
  IncomingMemberData,
  CreateMemberData,
} from "../components/AddNewMemberDialog/AddNewMemberDialog";
import { baseAPIUri } from "../const";

export function useImportMember(): {
  data: CreateMemberData;
  setData: React.Dispatch<React.SetStateAction<CreateMemberData>>;
  fetchData: () => Promise<CreateMemberData | undefined>;
} {
  const [data, setData] = useState<CreateMemberData>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const fetchData = useCallback(async () => {
    console.log('fetch')
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const incomingData = response.data as IncomingMemberData;
      const member = incomingData.results[0];
      const newData: CreateMemberData = {
        email: member.email,
        phoneNumber: member.phone,
        name: `${member.name.first} ${member.name.last}`,
      }
      setData(newData);
      return newData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return { data, setData, fetchData };
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
    //todo: handle success and error
    const submitData = async (data: CreateMemberData) => {
        const response = axios.post(`${baseAPIUri}/Member`, data);

        return response;
    }

    return {submitData};
  }