import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Blog from "./scripts/Blog.js";
import Home from "./scripts/Home.js";
import Pulse from "./scripts/Pulse.js";
import Zipping from "./scripts/Zipping.js";
import "./stylesheets/App.css";
import * as XLSX from "xlsx";
import Tags from './scripts/Tags.js';
import Onpage from './scripts/Onpage.js';
import { useEffect, useState, useCallback } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useAlert } from "./scripts/Alert.js";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [upStatus, setStatus] = useState(<h2 style={{ color: 'red' }}>Upload Your File Here</h2>);
  const { showAlert, AlertComponent } = useAlert();
  const [info, setInfo] = useState({
    ip: '',
    city: '',
    device: '',
  });

  useEffect(() => {
    const loadFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const device = result.visitorId;
        const res = await fetch('https://ipinfo.io/json?token=da9a42f22e929a');
        const data = await res.json();

        setInfo({
          ip: data.ip || '',
          city: data.city || '',
          device,
        });
      } catch (err) {
        showAlert(`FingerprintJS or IP fetch failed: ${err}`, 'error');
        setInfo(prev => ({
          ...prev,
          device: '',
        }));
      }
    };
    loadFingerprint();
  }, [showAlert]);

  useEffect(() => {
    if (!info.ip && !info.device) return;

    const requestServer = async () => {
      try {
        const ip = info.ip;
        const device = info.device;
        const city = info.city;
        const req = await fetch(process.env.REACT_APP_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ip,
            city,
            device,
          }),
        });

        const res = await req.json();
        if (req.ok) {
          showAlert(res.message, 'warning');
        } else {
          console.error("Server error:", res.error || res);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        showAlert("Failed to connect to server", 'error');
      }
    };

    requestServer();
  }, [info, showAlert]);

  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{ this is upload }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      setStatus(<h2 style={{ color: 'yellow' }}>Uploading Please Wait...</h2>);
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
      setStatus(<h2 style={{ color: 'green' }}>File Uploaded Successfully!</h2>);
    }
  }, [jsonData]);

  return (
    <Router>
      <AlertComponent />
      <nav>
        <div><span className="heading">Excel Formatter</span></div>
        <div className="nvBtns">
          <NavLink to="/" className="startBlog">Upload</NavLink>
          <NavLink to="/pulse" className="startBlog">Pulse</NavLink>
          <NavLink to="/blog" className="startBlog">Blogs</NavLink>
          <NavLink to="/tags" className="startBlog">Tagging</NavLink>
          <NavLink to="/onpage" onClick={() => showAlert(' Still In Progress', 'info')} className="startBlog">Onpage</NavLink>
          <Zipping jsonData={jsonData} />
        </div>
      </nav>
      <div className="spaceup"></div>
      <Routes>
        <Route path="/" element={<Home handleFileChange={handleFileChange} upStatus={upStatus} />} />
        <Route path="/blog" element={<Blog jsonData={jsonData} />} />
        <Route path="/pulse" element={<Pulse jsonData={jsonData} />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/onpage" element={<Onpage  />} />
      </Routes>
    </Router>
  );
}

export default App;