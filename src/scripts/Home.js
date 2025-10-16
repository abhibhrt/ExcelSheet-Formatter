import React from "react";

function Home({ handleFileChange, uploadStatus }) {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="home-header__title">Welcome to Excel Formatter</h1>
            </header>
            <section className="home-upload-section">
                {uploadStatus}
                <label htmlFor="fileInput" className="home-upload__label">
                    Choose File <i class="fas fa-file-upload"></i>
                    <input type="file" className="home-upload__input" id="fileInput" accept=".xlsx" onChange={handleFileChange} />
                </label>
            </section>
            <section className="home-info-section">
                <h2 className="home-info__title">How It Works <i class="fa-solid fa-link"/></h2>
                <ol className="home-instructions">
                    <li className="home-instruction__item">Click on the above (Upload) Button and upload your excel file</li>
                    <li className="home-instruction__item">Wait until your .xlsx file is uploaded Successfully</li>
                    <li className="home-instruction__item">Then data will be extracted and formatted automatically.</li>
                    <li className="home-instruction__item">Visit the "Blogs" or "Pulse" section to view the processed data.</li>
                    <li className="home-instruction__item">Click on Zip button for download processed files of excel data</li>
                </ol>
            </section>
            <footer className="home-footer">
                <p className="home-footer__copyright">&copy;copyright <a className="home-footer__author" href='https://abhibhrt.vercel.app' target="_blank" rel="noopener noreferrer">@abhibhrt</a> || All rights reserved</p>
            </footer>
        </div>
    );
}

export default Home;