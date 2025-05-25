import { useState, useEffect } from "react";
import { useAlert } from './Alert';
import '../stylesheets/onpage.css';
import OnpageFinal from './OnpageFinal';

export default function Onpage({ jsonData }) {
    const { showAlert, AlertComponent } = useAlert();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGenerated, setIsGenerated] = useState(false);
    const [paragraphs, setParagraphs] = useState({
        para1: "",
        para2: "",
        para3: "",
        para4: "",
    });
    const [currentData, setCurrentData] = useState({
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
        if (jsonData.length > 0 && currentIndex >= 0 && currentIndex < jsonData.length) {
            setCurrentData(jsonData[currentIndex]);
        }
    }, [currentIndex, jsonData]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleNext = () => {
        if (currentIndex < jsonData.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setIsGenerated(false);
        } else {
            showAlert("You Have Reached the End of Data", 'warning');
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setIsGenerated(false);
        } else {
            showAlert("This is the Start of Data", 'warning');
        }
    };

    const handleGenerate = () => {
        if (Object.values(paragraphs).every(para => para.trim())) {
            setIsGenerated(true);
        } else {
            showAlert("Please! Fill all the Paragraphs", 'warning');
        }
    };

    const prompts = {
prompt1: `Write a Growth Paragraph And Drivers Paragraph on ${currentData.Column2} in 90 And 100 Word respectively, just write the paragraph don't include any other text and always split both paragraph with <br><br> tag.`,
prompt2: `1. Write ${currentData.Column2} Dynamics (Categories - Market Drivers:, Market Challenges:, Market Trends:) in HTML format.
2. Write 4 points for each Category, must be unique point, no need to paraphase.
3. make sure every point having atleast 100 to 120 words with unique data.
4. make sure that not having any company name and not copywrite content.
5. write point title and then its description for Example (title : description )
6. write each category in h3 tag like <h4>Market Drivers:</h4>.
7. keep same structure as <ol><li><strong>title should be here:</strong>description should be here</li></ol>`,

prompt3: `1. introduction and future scope with these keyplayers, ${currentData.Column12}, make sure its having related detail to this ${currentData.Column11} or Industry in positive way with add some important info releted to each keyplayers in one sentence in ordered list
2. These applications ${currentData.Column11}  with info and also add some important info releted to each Application in one sentence in ordered list 
3. also add these types ${currentData.Column10} with info also add some important info releted to each types in one sentence in ordered list.
4. give always in html format by keeping below structure:
<h3>By Applications</h3> 
<ul> <li><strong>Application Area:</strong> description upto 35-45 words</li> ... </ul>
<h3>By Products</h3> 
<ul> <li><strong>Product Type:</strong> description upto 35-45 words</li> ... </ul>
<h3>By Key Players</h3> 
<ul><li><strong>Company Name:</strong> One-sentence positive insight or market-related contribution.</li> ... </ul>`,
        

prompt4: `1. Provide  the latest developments and  innovations or investments or mergers, acquisitions, and partnerships related to the key player such as ${currentData.Column12} of lull in recent months or years.
2. Dont ues data including forecasted values or CAGR in the results, it must and mandatory.  
3. Use business news, stock market updates, and official websites of relevant government bodies from specific countries or globally to get data. Ensure the data is current and specific to ${currentData.Column2}. 
4. Each paragraph should have at least 60 or more Characters. 
5. The information should be related and included with letest and recent investment or  merger or partnership, inovation or new product or service launch in recpective market which is related to above keyplayers  with each point covering significant updates or developments but make sure this is must related to lull or industry, not other industry detail. 
6. Focus on concrete events or innovations by key players - These keyplayers ${currentData.Column12} in ${currentData.Column2}. 
7. Exclude any source names or company names unless they are one of the key players in ${currentData.Column12} insted of using their name only use their info or data.
8. Ensure the data is not sourced from restricted domains such as *Verified Market Research* or *Market Research Intellect* or verified market reports
9. The data should be presented in at least three or five paragraphs, each structured with relevant and specific information related ${currentData.Column2} and this mentioned keyplayers 
10. ensure data collected is in rewrite format not same to same as like source data structured
11. Only give four paragraph in html format (<ul><li>paragraph</li> other 3...</ul>), neither give any images nor refrences or any other text.`
    };

    return (
        <div className="data-viewer">
            <AlertComponent />
            <div className="data-navigation-container">
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
                            const val = parseInt(e.target.value) || 0;
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
                    <a 
                        className="data-action__button" 
                        href={currentData.Column3} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Live Url
                    </a>
                    <a 
                        className="data-action__button" 
                        href={currentData.Column4} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Edit Url
                    </a>
                    <button 
                        className="data-action__button data-action__button--primary" 
                        onClick={handleGenerate}
                    >
                        Generate
                    </button>
                </div>
                <h3 className="data-title">{currentData.Column2}</h3>
            </div>
            
            {jsonData.length > 0 ? (
                <div className="data-input-row">
                    {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="data-input-column">
                            <textarea 
                                className="data-input__textarea"
                                value={paragraphs[`para${num}`]}
                                onChange={(e) => setParagraphs({
                                    ...paragraphs,
                                    [`para${num}`]: e.target.value
                                })}
                                placeholder={`Paragraph ${num}`}
                            />
                            <button 
                                className="data-action__button"
                                onClick={() => handleCopy(prompts[`prompt${num}`])}
                            >
                                Copy Prompt-{num}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="data-upload-warning">
                    <p>Please! First Upload Excel (.xlsx) File Format</p> <i className="fa fa-warning"/>
                </div>
            )}
            
            {isGenerated && <OnpageFinal data={currentData} fax={paragraphs} />}
        </div>
    );
}