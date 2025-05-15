import React, { useState } from "react";
import tags from './tags.json';
import { useAlert } from "./Alert";


function Tags() {
    const [compNow, setComp] = useState({ ...tags[0], item: shuffleArray(tags[0].item) });
    const { showAlert, AlertComponent } = useAlert();

    const tagPrompt = ` You'll be provided a title and url for that Create an engaging and visually attractive LinkedIn post using the following structure and style. The title and link will be provided afterward:
Post Structure:
Title (Bold Font with Symbols) – Use bold Unicode font like 𝐓𝐢𝐭𝐥𝐞 and add relevant emojis to match the topic.
Description (Up to 75 words) – Write an engaging, professional, and energetic paragraph. Keep it unbolded. Include emojis and make it appealing.
Get More Info (Bold Font) – Add the provided link in plain text after a bold heading.
Key Players (Bold Font) – Tag 40 relevant companies with @ mentions (formatted for LinkedIn).
Hashtags (Bold Font) – Add 5–6 high-impact and relevant hashtags.
Only output the final post content — no explanations or comments.`;

    function shuffleArray(array) {
        return array.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    const handleCopy = async () => {
        const mainData = document.getElementById('allTags');
        if (!mainData) return;

        const htmlContent = mainData.innerHTML;
        const blob = new Blob([htmlContent], { type: "text/html" });
        const clipboardItem = new ClipboardItem({ "text/html": blob });
        await navigator.clipboard.write([clipboardItem]);
    };

    const handleCategoryClick = (comp) => {
        setComp(null);
        showAlert(`Added ${comp.category}`, 'success');
        setTimeout(() => setComp({ ...comp, item: shuffleArray(comp.item) }), 0);
    };

    return (
        <>
            <AlertComponent />
            <div className="tag-cont">
                <div id="tagcont-1">
                    {tags.map((comp, index) => (
                        <button
                            key={index}
                            className="copy-btn"
                            id="comp-btn"
                            onClick={() => handleCategoryClick(comp)} >
                            {comp.category}
                        </button>
                    ))}
                </div>
                <div id="tagcont-2">
                    {compNow && (
                        <>
                            <h2 id="titles" style={{ color: "white", textAlign: "center" }}>
                                {compNow.category}
                            </h2>
                            <div id="allTags" className="content" style={{ color: "grey" }}>
                                𝐊𝐞𝐲 𝐏𝐥𝐚𝐲𝐞𝐫𝐬:
                                {compNow.item.map((tag, index) => (
                                    index <= 30 && <span key={tag.urn}>
                                        <a
                                            className="ql-mention"
                                            href="/"
                                            data-entity-urn={`urn:li:fsd_company:${tag.urn}`}
                                            data-guid={index}
                                            data-object-urn={`urn:li:organization:${tag.urn}`}
                                            data-original-text={tag.company}
                                            spellCheck="false"
                                            data-test-ql-mention="true">
                                            {tag.company}
                                        </a> &#8203;
                                    </span>
                                ))}
                            </div>
                            <div>
                                <button className="copy-btn" onClick={handleCopy}>Copy All</button>
                                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(tagPrompt)}>Copy Prompt</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Tags;
