import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Blog from "./scripts/Blog.js";
import Home from "./scripts/Home.js";
import Pulse from "./scripts/Pulse.js";
import Zipping from "./scripts/Zipping.js";
import "./stylesheets/Home.css";
import * as XLSX from "xlsx";
import Tags from './scripts/Tags.js';
import Onpage from './scripts/Onpage.js';
import { useEffect, useState, useCallback } from "react";
import { useAlert } from "./scripts/Alert.js";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(<h2 className="upload-status upload-status--initial">Upload Your File Here</h2>);
  const { showAlert, AlertComponent } = useAlert();

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      setUploadStatus(<h2 className="upload-status upload-status--loading">Uploading Please Wait...</h2>);
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const formattedData = rawData.map((row) => ({
          Column1: row[0] || "",
          Column2: row[1] || "",
          Column3: row[2] || "",
          Column4: row[3] || "",
          Column5: row[4] || "",
          Column6: row[5] || "",
          Column7: row[6] || "",
          Column8: row[7] || "",
          Column9: row[8] || "",
          Column10: row[9] || "",
          Column11: row[10] || "",
          Column12: row[11] || ""
        }));
        setJsonData(formattedData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      showAlert("Please select a valid Excel file.", 'error');
    }
  }, [showAlert]);

  useEffect(() => {
    if (jsonData.length > 0) {
      setUploadStatus(<h2 className="upload-status upload-status--success">File Uploaded Successfully!</h2>);
    }
  }, [jsonData]);

  return (
    <Router>
      <AlertComponent />
      <nav className="app-navbar">
        <div className="app-navbar__logo"><span className="app-navbar__logo-text">Excel Formatter</span></div>
        <div className="app-navbar__links">
          <NavLink to="/" className="app-navbar__link">Upload</NavLink>
          <NavLink to="/pulse" className="app-navbar__link">Pulse</NavLink>
          <NavLink to="/blog" className="app-navbar__link">Blogs</NavLink>
          <NavLink to="/onpage" className="app-navbar__link">Onpage</NavLink>
          <NavLink to="/tags" className="app-navbar__link">Tagging</NavLink>
          <Zipping jsonData={jsonData} className="app-navbar__zip-button" />
        </div>
      </nav>
      <div className="app-navbar-spacer"></div>
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<Home handleFileChange={handleFileChange} uploadStatus={uploadStatus} />} />
          <Route path="/blog" element={<Blog jsonData={jsonData} />} />
          <Route path="/pulse" element={<Pulse jsonData={jsonData} />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/onpage" element={<Onpage jsonData={jsonData} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;