import { TrackElementModel } from "../models/ITrackElementModel";

interface FileData {
  version: number;
  createDate: string;
  items: TrackElementModel[];
}

class ImportExportService {
  public export(items: TrackElementModel[]) {
    const data: FileData = {
      version: 1,
      createDate: new Date().toISOString(),
      items,
    };
    return JSON.stringify(data);
  }

  import(content: string) {
    const data = JSON.parse(content) as FileData;

    //TODO: валидировать

    return data.items || [];
  }
}

export const importExportService = new ImportExportService();
