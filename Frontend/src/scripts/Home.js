import React from "react";

function Home({ handleFileChange, upStatus }) {
    return (
        <div className="homeContainer">
            <header>
                <h1>Welcome to Excel Formatter</h1>
                <p>A simple tool to upload and process Excel files efficiently.</p>
            </header>
            <section className="uploadSection">
                {upStatus}
                <input type="file" className="infile" id="fileInput" accept=".xlsx" onChange={handleFileChange} />
            </section>
            <section className="aboutSection">
                <h2>How It Works</h2>
                <strong>
                    This application allows you to upload an Excel (.xlsx) file, which will be processed to extract data <br />
                    The extracted data will be displayed in a structured format inside the blog or pulse section
                </strong>
                <ol className="instruction">
                    <li>Click on the above (Upload) Button and upload your excel file</li>
                    <li>Wait untill your .xlsx file is uploaded Successfully</li>
                    <li>Then data will be extracted and formatted automatically.</li>
                    <li>Visit the "Blogs" or "Pulse" section to view the processed data.</li>
                    <li>Click on Zip button for download proccessed files of excel data</li>
                </ol>
            </section>
            <footer>
                <a className="credit" href='https://abhibhrt.netlify.app/admin' style={{fontSize:'20px'}} >Admin Page</a>
                <p>&copy;copyright <span style={{fontSize: '18px'}} className="credit">@Naushad Ansari</span> || All rights reserved</p>
            </footer>
        </div>
    );
}

export default Home;
