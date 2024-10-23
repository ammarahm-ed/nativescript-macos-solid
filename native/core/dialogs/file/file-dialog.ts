export interface FileDialogOptions {
  chooseFiles?: boolean;
  chooseDirectories?: boolean;
  multiple?: boolean;
  fileTypes?: Array<string>;
  directoryUrl?: NSURL;
}
let fileDialog: NSOpenPanel;
export interface SaveFileDialogOptions {
  createDirectories?: boolean;
  filename?: string;
  fileTypes?: Array<string>;
  directoryUrl?: NSURL;
}
let saveDialog: NSSavePanel;

export function openFileDialog(options: FileDialogOptions) {
  return new Promise<Array<string | null>>((resolve, reject) => {
    fileDialog = NSOpenPanel.new();
    fileDialog.canChooseFiles = options?.chooseFiles || false;
    fileDialog.canChooseDirectories = options?.chooseDirectories || false;
    fileDialog.allowsMultipleSelection = options?.multiple || false;
    fileDialog.allowedFileTypes = options?.fileTypes || ["*"];
    if (options?.directoryUrl) {
      fileDialog.directoryURL = options.directoryUrl;
    } else {
      fileDialog.directoryURL = NSURL.fileURLWithPath(
        NSSearchPathForDirectoriesInDomains(
          NSSearchPathDirectory.Desktop,
          NSSearchPathDomainMask.UserDomain,
          true,
        ).firstObject,
      );
    }

    const response = fileDialog.runModal();
    if (response === NSModalResponseOK) {
      const urls: Array<string> = [];
      for (let i = 0; i < fileDialog.URLs.count; i++) {
        const url = fileDialog.URLs.objectAtIndex(i) as NSURL;
        urls.push(url.absoluteString);
      }
      resolve(urls);
    } else {
      reject([]);
    }
  });
}

export function saveFileDialog(options: SaveFileDialogOptions) {
  return new Promise<string | undefined>((resolve, reject) => {
    saveDialog = NSSavePanel.new();
    saveDialog.canCreateDirectories = options?.createDirectories || false;
    saveDialog.nameFieldStringValue = options?.filename || "";
    saveDialog.allowedFileTypes = options?.fileTypes || ["*"];
    if (options?.directoryUrl) {
      saveDialog.directoryURL = options.directoryUrl;
    } else {
      saveDialog.directoryURL = NSURL.fileURLWithPath(
        NSSearchPathForDirectoriesInDomains(
          NSSearchPathDirectory.Desktop,
          NSSearchPathDomainMask.UserDomain,
          true,
        ).firstObject,
      );
    }

    const response = saveDialog.runModal();
    if (response === NSModalResponseOK) {
      resolve(saveDialog.URL.absoluteString);
    } else {
      reject();
    }
  });
}
