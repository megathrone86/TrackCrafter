import { createUid } from "../helpers/bl-helper";
import { ITrackElementModel } from "../models/ITrackElementModel";

interface FileData {
  version: number;
  createDate: string;
  items: ITrackElementModel[];
}

//Сервис для импорта и экспорта содержимого редактора
class ImportExportService {
  public export(items: ITrackElementModel[]) {
    const data: FileData = {
      version: 2,
      createDate: new Date().toISOString(),
      items,
    };
    return JSON.stringify(data);
  }

  import(content: string) {
    const data = JSON.parse(content) as FileData;

    if (data.version === 1) {
      data.items.forEach((t) => (t.uid = createUid()));
    }

    //TODO: валидировать

    return data.items || [];
  }
}

export const importExportService = new ImportExportService();
