interface DialogInfo<T> {
  component: React.FunctionComponent<T>;
  props: T;
}

interface BaseDialogInfo extends DialogInfo<any> {}

class DialogService {
  private _dialogs: BaseDialogInfo[] = [];
  private _onDialogsChange: ((dialogs: BaseDialogInfo[]) => void) | null = null;

  public get dialogs() {
    return this._dialogs;
  }

  public subscribe(
    dialogsChangedCallback: (dialogs: BaseDialogInfo[]) => void
  ) {
    this._onDialogsChange = dialogsChangedCallback;
  }

  public clearSubscription() {
    this._onDialogsChange = null;
  }

  public openDialog<T>(component: React.FunctionComponent<T>, props: T) {
    const info: BaseDialogInfo = { component, props };
    this._dialogs = this._dialogs.concat([info as BaseDialogInfo]);
    this._onDialogsChange && this._onDialogsChange(this.dialogs);
  }

  public closeLastDialog() {
    if (this._dialogs.length > 0) {
      this._dialogs = this._dialogs.slice(0, this._dialogs.length - 1);
      this._onDialogsChange && this._onDialogsChange(this.dialogs);
    }
  }
}

export const dialogService = new DialogService();
