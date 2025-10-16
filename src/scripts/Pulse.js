import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { useAlert } from "./Alert";
import '../stylesheets/pulseblog.css';

function Pulse({ jsonData }) {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [tags, setTags] = useState(null);
    const [pageUrl, setPage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [time, setTime] = useState("Set Time");
    const { showAlert, AlertComponent } = useAlert();
    const lastNum = localStorage.getItem('lastNum') || null;

    useEffect(() => {
        if (jsonData.length > 0 && currentIndex >= 0 && currentIndex < jsonData.length) {
            const currentData = jsonData[currentIndex];
            setTitle(currentData.Column1);
            setContent(currentData.Column2);
            setTags(currentData.Column3);
            setPage(currentData.Column5)
        }
    }, [currentIndex, jsonData]);

    const handleNext = () => {
        if (currentIndex < jsonData.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            localStorage.setItem('lastNum', (currentIndex));
        } else {
            showAlert("You Have Reached the End of Data", 'warning');
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            localStorage.setItem('lastNum', (currentIndex));
        } else {
            showAlert("This is the Start of Data", 'warning');
        }
    };

    const handleCopyHtml = async () => {
        const mainData = document.getElementById("data-html-content");
        const htmlContent = mainData.innerHTML;
        const blob = new Blob([htmlContent], { type: "text/html" });
        const clipboardItem = new ClipboardItem({ "text/html": blob });
        await navigator.clipboard.write([clipboardItem]);
    };

    const handleCopyText = (text) => {
        navigator.clipboard.writeText(text || "");
    };

    const handleTime = () => {
        if (time === "Set Time") {
            setTime(prompt("Enter Time:") || "Set Time");
        } else {
            navigator.clipboard.writeText(time);
        }
    };

    return (
        <div className="data-viewer">
            <AlertComponent />
            <div className="data-navigation">
                <button
                    className="data-navigation__button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    Previous
                </button>
                <input
                    type="text"
                    className="data-navigation__input"
                    value={currentIndex}
                    onChange={(e) => {
                        let val = parseInt(e.target.value) || 0;
                        if (val >= 0 && val < jsonData.length) setCurrentIndex(val);
                    }}
                />
                <button
                    className="data-navigation__button"
                    onClick={handleNext}
                    disabled={currentIndex === jsonData.length - 1}
                >
                    Next
                </button>
            </div>
            <div className="data-actions">
                <button className="data-action__button" onClick={() => handleCopyText(title)}>
                    Copy Title
                </button>
                <button className="data-time-button" onClick={handleTime}>
                    {time}
                </button>
                <button className="data-action__button" onClick={handleCopyHtml}>
                    Copy Content
                </button>
                <button className="data-action__button" onClick={() => handleCopyText(tags)}>
                    Copy Tags
                </button>
                <button className="data-action__button" onClick={() => handleCopyText(pageUrl)} >
                    Page URL</button>
            </div>
            {jsonData.length > 0 ? (
                <div className="data-content">
                    <h2 className="data-title">{title}</h2>
                    <div
                        id="data-html-content"
                        className="data-html-content"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                    />
                    <div className="data-tags">{tags}</div>
                </div>
            ) : (
                <div className="data-upload-warning">
                    <p>Please! First Upload Excel (.xlsx) File Format</p> <i className="fa fa-warning" />
                    {
                        lastNum && <p>Your Last Index: {lastNum}</p>
                    }
                </div>
            )}
        </div>
    );
}

export default Pulse;