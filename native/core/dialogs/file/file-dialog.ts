interface FileDialogOptions {
  chooseFiles?: boolean;
  chooseDirectories?: boolean;
  multiple?: boolean;
  fileTypes?: Array<string>;
  directoryUrl?: NSURL;
}
let fileDialog: NSOpenPanel;

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
          true
        ).firstObject
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
