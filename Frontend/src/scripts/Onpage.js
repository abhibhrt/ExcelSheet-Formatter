// Onpage.js
import React, { useState } from "react";
// import { useAlert } from './Alert.js';
import '../stylesheets/onpage.css';

const Onpage = ({ sample }) => {
    // const { showAlert, AlertComponent } = useAlert();
    const [firstPara, setFirst] = useState('');
    const [secondpara, setSecond] = useState('');
    const {
        titleName,
        varPrev24,
        varNext32,
        varUnit,
        varCAGR,
        reportId,
        imageUrl
    } = sample;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    // Function to format text with bold and bullet points
    const formatText = (text) => {
        if (!text) return null;

        // Replace **bold** with <strong> tags
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Replace bullet points with list items
        const lines = formattedText.split('\n');
        let inList = false;
        let result = [];

        lines.forEach(line => {
            // Check for bullet points (starting with -, *, or numbers)
            if (/^(\s*[-*•]|\s*\d+\.)\s/.test(line)) {
                if (!inList) {
                    result.push('<ul>');
                    inList = true;
                }
                // Remove the bullet marker and wrap in li
                const listItem = line.replace(/^(\s*[-*•]|\s*\d+\.)\s/, '').trim();
                result.push(`<li>${listItem}</li>`);
            } else {
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                if (line.trim()) {
                    result.push(`<p>${line}</p>`);
                }
            }
        });

        if (inList) {
            result.push('</ul>');
        }

        // If no lists were found, return the original formatted text with paragraphs
        if (!result.includes('<ul>')) {
            return { __html: formattedText.split('\n').map(para => `<p>${para}</p>`).join('') };
        }

        return { __html: result.join('') };
    };

    return (
        <div className="onpage-container">
            {/* <AlertComponent /> */}
            <div className="readonly"></div>
            <h2>
                {titleName} Size and Projections
            </h2>
            <p style={{ textAlign: "justify" }}>
                The <strong>{titleName}</strong> Size was valued at{" "}
                <strong className="varClass">USD {varPrev24} {varUnit} in 2024</strong> and is expected to reach{" "}
                <strong className="varClass">USD {varNext32} {varUnit} by 2032</strong>, growing at a{" "}
                <strong className="varClass">{varCAGR} from 2025 to 2032.</strong>
                The research includes several divisions as well as an analysis of the trends and factors influencing and playing a
                substantial role in the market.
            </p>

            <div>
                {
                    !firstPara && <div>
                        <textarea
                            type="text"
                            onChange={(e) => setFirst(e.target.value)}
                            placeholder="Paste your content here. Use ** for bold text and - for bullet points"
                        />
                        <button onClick={() => handleCopy(`Write a Growth Paragraph And Drivers Paragraph on ${titleName} in 90 And 100 Word respectively give only paragraph's without heading.`)}>Copy Prompt</button>
                    </div>
                }
                <div dangerouslySetInnerHTML={formatText(firstPara)} />
            </div>

            <p>
                <strong className="varClass">&gt;&gt;&gt;Download the Sample Report Now:-</strong>{" "}
                <a
                    href={`https://www.marketresearchintellect.com/download-sample/?rid=${reportId}`}
                    target="_blank"
                    rel="noopener noreferrer" >
                    https://www.marketresearchintellect.com/download-sample/?rid={reportId}
                </a>
            </p>

            <div id="report_chart" style={{ textAlign: "center" }}>
                <img
                    className="mainImage"
                    title={`${titleName} Size & Scope`}
                    src={imageUrl}
                    alt={`The ${titleName} Size was valued at USD ${varPrev24} ${varUnit} in 2024 and is expected to reach USD ${varNext32} ${varUnit} by 2032, growing at a ${varCAGR} from 2025 to 2032.`}
                    width="1920"
                    height="1146" />
                <br />
                <strong className="text-danger blink">To Get Detailed Analysis &gt; </strong>
                <a
                    className="btn-sm btn-primary mt-2 mb-2"
                    href={`https://www.marketresearchintellect.com/download-sample/?rid=${reportId}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <strong>Request Sample Report</strong>
                </a>
            </div>
            <div className="second-para">
                {
                    !secondpara && <div>
                        <textarea
                            type="text"
                            onChange={(e) => setSecond(e.target.value)}
                            placeholder="Paste your content here. Use ** for bold text and - for bullet points"
                        />
                        <button onClick={() => handleCopy(`1. Write ${titleName} Market Dynamics (Market Drivers:, Market Challenges:, Market Trends:) 2. Write 4 points in Each point, unique point, no need to paraphase 3. make sure every point having atleast 100 to 120 words with unique data and 4. also not having any company name and not copywrite content 5. point title in bold and then its discription for EX (title or subtitle : discription ). 6. always keep heading unbold and start paragraph from ':' not from new line, never give horizontal line. 7. just give content don't comment anything like 'here is content etc' and don't give topic name.`)}>Copy Prompt</button>
                    </div>
                }
                <div dangerouslySetInnerHTML={formatText(secondpara)} />
            </div>
            <h2>{titleName}</h2>
            <div className="region-list">
                <h3>By Application</h3>
                <h3>By Product</h3>
                <h3>By Region</h3>
                <div className="region-group">
                    <h4>North America</h4>
                    <ul>
                        <li>United States of America</li>
                        <li>Canada</li>
                        <li>Mexico</li>
                    </ul>
                </div>

                <div className="region-group">
                    <h4>Europe</h4>
                    <ul>
                        <li>United Kingdom</li>
                        <li>Germany</li>
                        <li>France</li>
                        <li>Italy</li>
                        <li>Spain</li>
                        <li>Others</li>
                    </ul>
                </div>

                <div className="region-group">
                    <h4>Asia Pacific</h4>
                    <ul>
                        <li>China</li>
                        <li>Japan</li>
                        <li>India</li>
                        <li>ASEAN</li>
                        <li>Australia</li>
                        <li>Others</li>
                    </ul>
                </div>

                <div className="region-group">
                    <h4>Latin America</h4>
                    <ul>
                        <li>Brazil</li>
                        <li>Argentina</li>
                        <li>Mexico</li>
                        <li>Others</li>
                    </ul>
                </div>

                <div className="region-group">
                    <h4>Middle East and Africa</h4>
                    <ul>
                        <li>Saudi Arabia</li>
                        <li>United Arab Emirates</li>
                        <li>Nigeria</li>
                        <li>South Africa</li>
                        <li>Others</li>
                    </ul>
                </div>
            </div>
            <h3>Reasons to Purchase this Report:</h3>
        </div>
    );
};

export default Onpage;