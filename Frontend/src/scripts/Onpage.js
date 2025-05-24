import { useState, useEffect } from "react";
import { useAlert } from './Alert';
import '../stylesheets/onpage.css';
import OnpageFinal from './OnpageFinal';

export default function Onpage({ jsonData }) {
    const { showAlert, AlertComponent } = useAlert();
    const [Index, setIndex] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [fax, setFax] = useState({
        para1: "",
        para2: "",
        para3: "",
        para4: "",
    });
    const [data, setData] = useState({
        Column1: "",
        Column2: "",
        Column3: "",
        Column4: "",
        Column5: "",
        Column6: "",
        Column7: "",
        Column8: "",
        Column9: "",
        Column10: "",
        Column11: "",
        Column12: "",
    });

    useEffect(() => {
        if (jsonData.length > 0 && Index >= 0 && Index < jsonData.length) {
            const currentData = jsonData[Index];
            setData(currentData);
        }
    }, [Index, jsonData]);

    const handleCopy = (prompt) => {
        navigator.clipboard.writeText(prompt);
    };

    useEffect(() => {
        console.log(fax);
    }, [fax]);

    const handleNext = () => {
        if (Index < jsonData.length - 1) {
            setIndex((prev) => prev + 1);
            setTrigger(false);
        } else {
            showAlert("You Have Reached the End of Data", 'warning');
        }
    };

    const handlePrev = () => {
        if (Index > 0) {
            setIndex((prev) => prev - 1);
            setTrigger(false);
        } else {
            showAlert("This is the Start of Data", 'warning');
        }
    };

    const handleGenerate = () => {
        if (fax.para1 && fax.para2 && fax.para3 && fax.para4) {
            setTrigger(true);
        }
        else {
            showAlert("Please! Fill all the Paragraphs", 'warning');
        }
    }

    const prompts = {
        prompt1: `Write a Growth Paragraph And Drivers Paragraph on ${data.Column2} in 90 And 100 Word respectively, just write the paragraph don't include any other text and always split both paragraph with <br> tag.`,
        prompt2: `1. Write ${data.Column2} Dynamics (Categories - Market Drivers:, Market Challenges:, Market Trends:) in HTML format.
                    2. Write 4 points for each Category, must be unique point, no need to paraphase.
                    3. make sure every point having atleast 100 to 120 words with unique data.
                    4. make sure that not having any company name and not copywrite content.
                    5. write point title and then its description for Example (title : description )
                    6. write each category in h4 tag like <h4>Market Drivers</h4>.
                    7. keep same structure as <ol><li><strong>title should be here:</strong>description should be here</li></ol>`,

        prompt3:   `Provide a structured analysis of the ${data.Column2} including the following three sections. Each section must be formatted in HTML using <h3> for titles and <ul><li> for content. Include specific, relevant, and positive information related to the market.
                    By Key Players: Use this HTML structure:
                    <h3>By Key Players</h3> <ul> <li><strong>Company Name:</strong> One-sentence positive insight or market-related contribution.</li> ... </ul>
                    By Applications: Use this HTML structure:
                    <h3>By Applications</h3> <ul> <li><strong>Application Area:</strong> One-sentence description of how DAC chips are used in this application, including notable insights or examples.</li> ... </ul>
                    By Types: Use this HTML structure:
                    <h3>By Types</h3> <ul> <li><strong>DAC Type:</strong> One-sentence explanation of the type, its use case, and a key benefit or characteristic.</li> ... </ul>`,

        prompt4: `1. Provide  the latest developments and  innovations or investments or mergers, acquisitions, and partnerships related to the key player such as ${data.Column12} of lull in recent months or years.
                    2. Dont ues data including forecasted values or CAGR in the results, it must and mandatory.  
                    3. Use business news, stock market updates, and official websites of relevant government bodies from specific countries or globally to get data. Ensure the data is current and specific to ${data.Column2}. 
                    4. Each paragraph should have at least 60 or more Characters. 
                    5. The information should be related and included with letest and recent investment or  merger or partnership, inovation or new product or service launch in recpective market which is related to above keyplayers  with each point covering significant updates or developments but make sure this is must related to lull or industry, not other industry detail. 
                    6. Focus on concrete events or innovations by key players - These keyplayers ${data.Column12} in ${data.Column2}. 
                    7. Exclude any source names or company names unless they are one of the key players in ${data.Column12} insted of using their name only use their info or data.
                    8. Ensure the data is not sourced from restricted domains such as *Verified Market Research* or *Market Research Intellect* or verified market reports
                    9. The data should be presented in at least three or five paragraphs, each structured with relevant and specific information related ${data.Column2} and this mentioned keyplayers 
                    10. ensure data collected is in rewrite format not same to same as like source data structured
                    11. Only give four paragraph in html format (<ul><li>paragraph</li> other 3...</ul>), dont include any other text`
    };

    return (
        <div className="blog-cont">
            <AlertComponent />
            <div className="upper-onpage">
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
                <div className="cont-2 oncont-2">
                    <a className="copy-btn" href={data.Column3} target="_blank" rel="noopener noreferrer">Live Url</a>
                    <a className="copy-btn" href={data.Column4} target="_blank" rel="noopener noreferrer">Edit Url</a>
                    <button className="copy-btn" onClick={handleGenerate}>Generate</button>
                </div>
                <h3 className="on-head-title">{data.Column2}</h3>
            </div>
            {jsonData.length > 0 ? <div className="lower-onpage">
                <div className="inputs-pro">
                    <textarea name="First Paragraph" onChange={(e) => setFax({ ...fax, para1: e.target.value })} />
                    <button className="copy-btn" onClick={() => handleCopy(prompts.prompt1)}>
                        Copy Prompt-1
                    </button>
                </div>
                <div className="inputs-pro">
                    <textarea name="First Paragraph" onChange={(e) => setFax({ ...fax, para2: e.target.value })} />
                    <button className="copy-btn" onClick={() => handleCopy(prompts.prompt2)}>
                        Copy Prompt-2
                    </button>
                </div>
                <div className="inputs-pro">
                    <textarea name="First Paragraph" onChange={(e) => setFax({ ...fax, para3: e.target.value })} />
                    <button className="copy-btn" onClick={() => handleCopy(prompts.prompt3)}>
                        Copy Prompt-3
                    </button>
                </div>
                <div className="inputs-pro">
                    <textarea name="First Paragraph" onChange={(e) => setFax({ ...fax, para4: e.target.value })} />
                    <button className="copy-btn" onClick={() => handleCopy(prompts.prompt4)}>
                        Copy Prompt-4
                    </button>
                </div>
            </div> : <div className="uploadwarn">Please! First Upload Excel (.xlsx) File Format <i className="fa fa-warning" ></i></div>}
            {
                trigger && <OnpageFinal data={data} fax={fax} />
            }
        </div>
    );
}
