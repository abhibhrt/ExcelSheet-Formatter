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
            setParagraphs({
                para1: "",
                para2: "",
                para3: "",
                para4: "",
                para5: ""
            });
        } else {
            showAlert("You Have Reached the End of Data", 'warning');
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setIsGenerated(false);
            setParagraphs({
                para1: "",
                para2: "",
                para3: "",
                para4: "",
            });
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
prompt1: `1) Provide a comprehensive, human-written SEO Friendly market overview and growth para of the ${currentData.Column2} , AND
2) in second paragraph add introduction of ${currentData.Column2} (exclude market word in this just give intro of the topic or thing before market word ).
3) Then provide ${currentData.Column2} including its global and regional growth trends, key drivers, opportunities, challenges, and emerging technologies. The content should be 300–500 words, detailed, and fact-rich.  Do not include any forecasted values or citations, but ensure the content feels professional, analytical, and informative like a market research report summary. and remove  dashes (Not all) or symbols (Not all)  used to highlight important words. Simply include the key words or sentences directly without it.
Give all paragraphs in html format in <p> tag and only give 3 paragraphs.`,

prompt2: `1. Write ${currentData.Column2} Dynamics (Categories - ${currentData.Column2} Drivers:, ${currentData.Column2} Market Challenges:, ${currentData.Column2} Market Trends:) in HTML format.
2. Write 4 points for each Category, must be unique point, no need to paraphase.
3. make sure every point having atleast 120 to 150 words with unique data.
4. make sure that not having any company name and not copywrite content.
5. write point title and then its description for Example (title : description )
6. write each category in h4 tag like <h4>${currentData.Column2} Drivers:</h4>.
7. keep same structure as <ul><li><p><strong>title should be here:</strong>description should be here</p></li></ul>`,

prompt3: `1. introduction and future scope with these keyplayers, ${currentData.Column12}, make sure its having related detail to this ${currentData.Column11} or Industry in positive way with add some important info releted to each keyplayers in one sentence in ordered list
2. These applications ${currentData.Column11}  with info and also add some important info releted to each Application in one sentence in ordered list 
3. also add these types ${currentData.Column10} with info also add some important info releted to each types in one sentence in ordered list.
4. give always in html format by keeping below structure:
<h3>By Applications</h3> 
<ul><li><p/><strong>Application Area:</strong> description upto 35-45 words </p></li> ... </ul>
<h3>By Products</h3>
<ul> <li><p/><strong>Product Type:</strong> description upto 35-45 words </p></li> ... </ul>
<h3>By Key Players</h3> 
<p>write details here about the topic in positive way </p>
<ul><li><p/><strong>Company Name:</strong> One-sentence positive insight or market-related contribution. </p></li> ... </ul>`,      

prompt4: `1. Provide  the latest developments and  innovations or investments or mergers, acquisitions, and partnerships related to the key player such as ${currentData.Column12} of lull in recent months or years.
2. Dont ues data including forecasted values or CAGR in the results, it must and mandatory.  
3. Use business news, stock market updates, and official websites of relevant government bodies from specific countries or globally to get data. Ensure the data is current and specific to ${currentData.Column2}. 
4. Each paragraph should have at least 60 or more Characters. 
5. The information should be related and included with letest and recent investment or  merger or partnership, inovation or new product or service launch in recpective market which is related to above keyplayers  with each point covering significant updates or developments but make sure this is must related to lull or industry, not other industry detail. 
6. Focus on concrete events or innovations by key players - These keyplayers ${currentData.Column12} in ${currentData.Column2}. 
7. Exclude any source names or company names unless they are one of the key players in ${currentData.Column12} insted of using their name only use their info or data.
8. Ensure the data is not sourced from restricted domains such as *Verified Market Research* or *Market Research Intellect* or verified market reports
9. The data should be presented in fixed 3 paragraphs, each structured with relevant and specific information related ${currentData.Column2} and this mentioned keyplayers 
10. ensure data collected is in rewrite format not same to same as like source data structured, never include source refrence in paragraph.
11. Only give four paragraph in html format (<ul><li >paragraph<br/><br/></li> other 2...</ul>), neither give any images nor refrences or any other text.`,
    
prompt5: `
Rewrite with profesional words and ifno in 300 to 500 words without any external link or source name and only in paragraph form - no bullets points should be added  ${currentData.Column2} report is meticulously tailored for a specific market segment, offering a detailed and thorough overview of an industry or multiple sectors. This all-encompassing report leverages both quantitative and qualitative methods to project trends and developments from 2026 to 2033 of ${currentData.Column2}. It covers a broad spectrum of factors (with example in one sentence), including product pricing strategies, the market reach of products(if possible- with example in one sentence) and services across national and regional levels, and the dynamics within the primary market as well as its submarkets(with example if possible in one sentence). Furthermore, the analysis takes into account the industries that utilize end applications(with example in one sentence), consumer behaviour, and the political, economic, and social environments in key countries.
The structured segmentation in the report ensures a multifaceted understanding of the ${currentData.Column2} from several perspectives. It divides the market into groups based on various classification criteria, including end-use industries and product/service types. It also includes other relevant groups that are in line with how the market is currently functioning. The report’s in-depth analysis of crucial elements covers market prospects, the competitive landscape, and corporate profiles.
The assessment of the major industry participants is a crucial part of this analysis. Their product/service portfolios, financial standing, noteworthy business advancements, strategic methods, market positioning, geographic reach, and other important indicators are evaluated as the foundation of this analysis. The top three to five players also undergo a SWOT analysis, which identifies their opportunities, threats, vulnerabilities, and strengths. The chapter also discusses competitive threats, key success criteria, and the big corporations' present strategic priorities. Together, these insights aid in the development of well-informed marketing plans and assist companies in navigating the always-changing ${currentData.Column2} environment.
at final give all paragraphs in html format like <p>first paragraph</p> ... and other fixed 3 paragraphs.
`
};

    return (
        <div className="data-viewer">
            <AlertComponent />
            <div className="data-navigation-container">
                <div className="data-navigation">
                    <button 
                        className="data-navigation__button" 
                        onClick={handlePrev}
                        disabled={currentIndex === 0}>
                        Previous
                    </button>
                    <input
                        type="text"
                        className="data-navigation__input"
                        value={currentIndex}
                        onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            if (val >= 0 && val < jsonData.length) setCurrentIndex(val);
                        }} />
                    <button 
                        className="data-navigation__button" 
                        onClick={handleNext}
                        disabled={currentIndex === jsonData.length - 1} >
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
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="data-input-column">
                            <textarea 
                                className="data-input__textarea"
                                value={paragraphs[`para${num}`]}
                                onChange={(e) => setParagraphs({
                                    ...paragraphs,
                                    [`para${num}`]: e.target.value
                                })}
                                placeholder={`Paragraph ${num}`}/>
                            <button 
                                className="data-action__button"
                                onClick={() => handleCopy(prompts[`prompt${num}`])}>
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