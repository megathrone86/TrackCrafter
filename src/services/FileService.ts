export interface OpenFileData<T> {
  fileName: string;
  content: T;
}

class FileService {
  //Доступно ли новое API с диалогом сохранения файла
  public isFileDialogEnabled() {
    try {
      return !!showSaveFilePicker;
    } catch {
      return false;
    }
  }

  //Эта функция открывает диалог сохранения файла (новое апи, не везде поддерживается)
  //Пока заточена только на json файлы
  public async saveFile(json: string, suggestedName: string) {
    try {
      const handle = await showSaveFilePicker({
        suggestedName,
        types: [
          {
            description: "JSON file",
            accept: { "application/json": [".json"] },
          },
        ],
      });
      const writable = await handle.createWritable();
      try {
        await writable.write(json);
      } finally {
        writable.close();
      }
    } catch (e) {
      console.debug(e);
    }
  }

  //Эта функция запускает в браузере загрузку файла с указанным содержимым
  //Пока заточена только на json файлы
  public forceFileDownload(json: string) {
    //старый костыль
    let elm = document.createElement("a");
    var dataStr =
      "data:application/json;charset=utf-8," + encodeURIComponent(json);
    elm.setAttribute("href", dataStr);
    elm.setAttribute("download", "track.json");
    elm.click();
  }

  //Эта функция открывает диалог выбора файла и возвращает текстовое содержимое файла.
  //Пока заточена только на json файлы
  public openFile() {
    return new Promise<OpenFileData<string> | null>((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";

      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target && target.files && target.files.length) {
          try {
            const file = target.files[0];
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
              if (readerEvent.target) {
                const content = readerEvent.target.result;
                return resolve({
                  content: content as string,
                  fileName: file.name,
                });
              } else {
                reject();
              }
            };
            reader.readAsText(file, "UTF-8");
          } catch (e) {
            reject(e);
          }
        } else {
          return resolve(null);
        }
      };
      input.click();
    });
  }
}

export const fileService = new FileService();
