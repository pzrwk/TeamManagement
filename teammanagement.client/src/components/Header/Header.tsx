import Button from "../Button/Button";
import InlineButtonGroup from "../InlineButtonGroup/InlineButtonGroup";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useImportMember, useSubmitData } from "../../hooks/hooks";
import "./Header.scss";

function Header({
  openConfirmationDialog,
  openAddMemberDialog,
}: {
  openConfirmationDialog: () => void;
  openAddMemberDialog: () => void;
}) {
  const { submitData } = useSubmitData();
  const { fetchData } = useImportMember();

  const importMember = async () => {
    const data = await fetchData();

    if (data !== undefined) {
      await submitData(data);
      openConfirmationDialog();
    }
  };

  return (
    <div className="header">
      <div className="header-text">
        <h1>Lista członków zespołu</h1>
        <p className="description">Zarządzaj listą członków swojego zespołu</p>
      </div>
      <InlineButtonGroup>
        <Button
          variant="gray"
          fit
          text="Zaimportuj członka zespołu"
          icon={<CloudDownloadOutlinedIcon />}
          onClick={importMember}
        />
        <Button
          variant="gray"
          fit
          text="Dodaj członka zespołu"
          icon={<AddIcon />}
          onClick={openAddMemberDialog}
        />
      </InlineButtonGroup>
    </div>
  );
}

export default Header;
