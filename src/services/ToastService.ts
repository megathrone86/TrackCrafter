import { toast } from "react-toastify";

class ToastService {
  public info(msg: string) {
    toast(msg, { hideProgressBar: true });
  }

  public error(msg: string) {
    toast(msg, { hideProgressBar: true, type: "error" });
  }
}

export const toastService = new ToastService();
