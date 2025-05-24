import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useAlert } from "./Alert";

const ExcelToZipApp = ({ jsonData }) => {
   const { showAlert, AlertComponent } = useAlert();
  const handleDownloadZip = async () => {
    if (!jsonData || jsonData.length === 0) {
      showAlert("No data available!", 'error');
      return ;
    }

    const zip = new JSZip();
    const mainFolder = zip.folder("All_Files");

    jsonData.forEach((currentData, index) => {
      if (currentData && currentData.Column1 && currentData.Column2) {
        const folderIndex = Math.floor(index / 100) + 1;
        const subFolderName = `100-Post-${folderIndex}`;
        const subFolder = mainFolder.folder(subFolderName);
        let fileName = currentData.Column1.toString().replace(/[<>:"/\\|?*,]/g, '-');
        if (!fileName.endsWith(".md")) {
          fileName += ".md";
        }
        const fileContent = currentData.Column2.toString();
        subFolder.file(fileName, fileContent);
      }
    });

    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "All_Files.zip");
    } catch (error) {
      console.error("Error generating ZIP:", error);
      alert("Failed to generate ZIP file.");
    }
  };

  return (
    <>
    <AlertComponent/>
    <span style={{cursor: "pointer", padding: "0 0.5rem"}} onClick={handleDownloadZip}>Zip <i className="fa fa-download"></i></span>
    </>
  );
};

export default ExcelToZipApp;
