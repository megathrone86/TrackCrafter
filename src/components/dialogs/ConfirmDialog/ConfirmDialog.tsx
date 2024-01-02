import { dialogService } from "../../../services/DialogService";
import "./ConfirmDialog.scss";

export interface IConfirmDialogProps {
  message: string;
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
    dialogService.closeDialog(props, true);
  }

  function handleCancelClick(): void {
    dialogService.closeDialog(props, false);
  }
}

export function showConfirm(message: string) {
  return dialogService.openDialog<IConfirmDialogProps, boolean>(ConfirmDialog, {
    message,
  });
}
