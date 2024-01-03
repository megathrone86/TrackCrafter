import { useEffect, useState } from "react";
import { dialogService } from "../../../services/DialogService";
import "./DialogContainer.scss";

export function DialogContainer() {
  const [dialogs, setDialogs] = useState(dialogService.dialogs);

  useEffect(() => {
    dialogService.subscribe((val) => setDialogs(val));
    return () => dialogService.clearSubscription();
  }, []);

  return (
    <>
      {dialogs.map((dialog, i) => (
        <div className="tc-App-dialog" key={i}>
          <div className="tc-App-dialog-body">
            {dialog.component(dialog.props)}
          </div>
        </div>
      ))}
    </>
  );
}
