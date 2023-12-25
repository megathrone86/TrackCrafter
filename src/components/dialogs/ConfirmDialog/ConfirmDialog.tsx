import { dialogService } from "../../../services/DialogService";
import "./ConfirmDialog.scss";

export interface IConfirmDialogProps {
  message: string;
  onOk: () => void;
}

export function ConfirmDialog(props: IConfirmDialogProps) {
  return (
    <div className="tc-ConfirmDialog">
      <p>{props.message}</p>

      <div className="tc-ConfirmDialog-actions">
        <button onClick={handleOkClick}>ОК</button>
        <button onClick={handleCancelClick}>Отмена</button>
      </div>
    </div>
  );

  function handleOkClick(): void {
    props.onOk();
    dialogService.closeLastDialog();
  }

  function handleCancelClick(): void {
    dialogService.closeLastDialog();
  }
}
