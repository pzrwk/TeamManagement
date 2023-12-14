import { useEffect, useState } from "react";
import "./App.scss";
import AddNewMemberDialog from "./components/AddNewMemberDialog/AddNewMemberDialog.tsx";
import ConfirmationDialog from "./components/Dialog/ConfirmationDialog.tsx";
import { useDialogOpen } from "./hooks/hooks.ts";
import Header from "./components/Header/Header.tsx";
import axios, { AxiosResponse } from "axios";
import { baseAPIUri } from "./const.ts";
import MembersTable from "./components/MembersTable/MembersTable.tsx";

export type MemberData = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
};

function App() {
  const {
    isDialogOpen: isAddMemberDialogOpen,
    openDialog: openAddMemberDialog,
    closeDialog: closeAddMemberDialog,
  } = useDialogOpen();
  const {
    isDialogOpen: isConfirmationDialogOpen,
    openDialog: openConfirmationDialog,
    closeDialog: closeConfirmationDialog,
  } = useDialogOpen();

  const [data, setData] = useState<Array<MemberData> | null>(null);

  useEffect(() => {
    axios.get(`${baseAPIUri}/Member`).then((res: AxiosResponse) => {
      const incomingData: Array<MemberData> = res.data;
      setData(incomingData);
    });
  }, []);

  return (
    <div>
      <Header
        openAddMemberDialog={openAddMemberDialog}
        openConfirmationDialog={openConfirmationDialog}
      />
      <div className="content">
        <MembersTable data={data}/>
      </div>

      {isAddMemberDialogOpen &&<AddNewMemberDialog
        open={isAddMemberDialogOpen}
        closeDialog={closeAddMemberDialog}
      />}

      {isConfirmationDialogOpen && <ConfirmationDialog
        open={isConfirmationDialogOpen}
        closeDialog={closeConfirmationDialog}
      >
        <p>Członek zespołu dodany</p>
      </ConfirmationDialog>}
    </div>
  );
}

export default App;
