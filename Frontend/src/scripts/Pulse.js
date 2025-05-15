import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { useAlert } from "./Alert";

function Pulse({ jsonData }) {
    const [Title, setTitle] = useState(null);
    const [Content, setContent] = useState(null);
    const [Tags, setTags] = useState(null);
    const [Index, setIndex] = useState(0);
    const [Time, setTime] = useState("Set Time")
    const { showAlert, AlertComponent } = useAlert();

    useEffect(() => {
        if (jsonData.length > 0 && Index >= 0 && Index < jsonData.length) {
            const currentData = jsonData[Index];
            setTitle(currentData.Column1);
            setContent(currentData.Column2);
            setTags(currentData.Column3);
        }
    }, [Index, jsonData]);

    const handleNext = () => {
        if (Index < jsonData.length - 1) {
            setIndex((prev) => prev + 1);
        } else {
            showAlert("You Have Reached the End of Data", 'warning');
        }
    };

    const handlePrev = () => {
        if (Index > 0) {
            setIndex((prev) => prev - 1);
        } else {
            showAlert("This is the Start of Data", 'warning');
        }
    };

    const handleCopy = async (elementId) => {
        const mainData = document.getElementById(elementId);
        const htmlContent = mainData.innerHTML;
        const blob = new Blob([htmlContent], { type: "text/html" });
        const clipboardItem = new ClipboardItem({ "text/html": blob });
        await navigator.clipboard.write([clipboardItem]);
    };

    const handleCopyn = (text) => {
        navigator.clipboard.writeText(text || "");
      };

    const handleTime = () =>{
        if(Time === "Set Time"){
            setTime(prompt("Enter Time:") || "Set Time")
        }
        else{
            navigator.clipboard.writeText(Time);
        }
    }


    return (
        <div className="blog-cont">
            <AlertComponent/>
            <div className="cont-1">
                <button id="prevButton" className="nepr" onClick={handlePrev}>Prev</button>
                <input
                    type="text"
                    className="num-in"
                    id="NumIn"
                    value={Index}
                    onChange={(e) => {
                        let val = parseInt(e.target.value) || 0;
                        if (val >= 0 && val < jsonData.length) setIndex(val);
                    }}
                />
                <button id="nextButton" className="nepr" onClick={handleNext}>Next</button>
            </div>
            <div className="cont-2">
                <button id="copyTitle" className="copy-btn" onClick={() => handleCopyn(Title)}>Copy Title</button>
                <button id="copyTime" className="copy-btn" onClick={() => handleTime()}>{Time}</button>
                <button id="copyHtml" className="copy-btn" onClick={() => handleCopy("htmlContents")}>Copy Content</button>
                <button id="copyTags" className="copy-btn" onClick={() => handleCopyn(Tags)}>Copy Tags</button>
            </div>
            {jsonData.length > 0 ? (
                <div className="cont-3">
                    <h2 id="titles" style={{ color: "white", textAlign: "center" }}>{Title}</h2>
                    <p id="htmlContents" className="content csz" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Content) }} />
                    <div id="tags" className="content csz">{Tags}</div>
                </div>
            ) : <div className="uploadwarn">Please! First Upload Excel (.xlsx) File Format <i className="fa fa-warning" ></i></div> }
        </div>
    );
}

export default Pulse;
