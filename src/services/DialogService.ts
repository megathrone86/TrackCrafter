interface DialogInfo<T> {
  component: React.FunctionComponent<T>;
  props: T;
}

interface BaseDialogInfo extends DialogInfo<any> {}

interface IServiceDialogInfo {
  dialogInfo: BaseDialogInfo;
  resolve?: (value?: unknown) => void;
}

//Сервис для низкоуровневой работы с диалогами
class DialogService {
  private _dialogs: IServiceDialogInfo[] = [];
  private _onDialogsChange: ((dialogs: BaseDialogInfo[]) => void) | null = null;

  public get dialogs() {
    return this._dialogs.map((t) => t.dialogInfo);
  }

  public subscribe(
    dialogsChangedCallback: (dialogs: BaseDialogInfo[]) => void
  ) {
    this._onDialogsChange = dialogsChangedCallback;
  }

  public clearSubscription() {
    this._onDialogsChange = null;
  }

  public openDialog<TProps, TResult>(
    component: React.FunctionComponent<TProps>,
    props: TProps
  ) {
    const serviceDialogInfo: IServiceDialogInfo = {
      dialogInfo: { component, props },
    };
    return new Promise<TResult>((resolve, reject) => {
      try {
        serviceDialogInfo.resolve = resolve as (value?: unknown) => void;
        this._dialogs = this._dialogs.concat([serviceDialogInfo]);
        this.fireDialogsChange();
      } catch (e) {
        reject(e);
      }
    });
  }

  public closeDialog(props: any, value?: unknown) {
    if (this._dialogs.length > 0) {
      const dialogInfo = this._dialogs.find(
        (t) => t.dialogInfo.props === props
      );
      if (dialogInfo) {
        this._dialogs = this._dialogs.filter((t) => t !== dialogInfo);
        if (dialogInfo.resolve) {
          dialogInfo.resolve(value);
        }
        this.fireDialogsChange();
      }
    }
  }

  fireDialogsChange() {
    if (this._onDialogsChange) {
      this._onDialogsChange(this.dialogs);
    }
  }
}

export const dialogService = new DialogService();
