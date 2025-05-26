import React, { useState, useEffect } from "react";
import tags from './tags.json';
import { useAlert } from "./Alert";
import '../stylesheets/tags.css';

function Tags() {
    const [compNow, setComp] = useState({ ...tags[0], item: shuffleArray(tags[0].item) });
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState(tags);
    const { showAlert, AlertComponent } = useAlert();

    const tagPrompt = `You'll be provided a title and url for that Create an engaging and visually attractive LinkedIn post...`; // (keep your existing prompt)

    function shuffleArray(array) {
        return array.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    useEffect(() => {
        const filtered = tags.filter(tag => 
            tag.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategories(filtered);
    }, [searchTerm]);

    const handleCopy = async () => {
        try {
            const mainData = document.getElementById('allTags');
            if (!mainData) return;

            // Create a temporary div to preserve the LinkedIn mention format
            const tempDiv = document.createElement('div');
            tempDiv.appendChild(mainData.cloneNode(true));
            
            // Get the HTML content with preserved LinkedIn mentions
            const htmlContent = tempDiv.innerHTML;
            const blob = new Blob([htmlContent], { type: "text/html" });
            const clipboardItem = new ClipboardItem({ "text/html": blob });
            
            await navigator.clipboard.write([clipboardItem]);
            showAlert("Tags copied to clipboard with LinkedIn formatting!", "success");
        } catch (err) {
            console.error("Failed to copy tags:", err);
            showAlert("Failed to copy tags", "error");
        }
    };

    const handleCategoryClick = (comp) => {
        setComp(null);
        showAlert(`Loaded ${comp.category} tags`, 'success');
        setTimeout(() => setComp({ ...comp, item: shuffleArray(comp.item) }), 0);
    };

    return (
        <div className="tags-container">
            <AlertComponent />
            <div className="tags-header">
                <h1 className="tags-title">LinkedIn Tag Generator</h1>
                <div className="tags-search">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="tags-search-input"
                    />
                    <button 
                        className="tags-copy-prompt" 
                        onClick={() => {
                            navigator.clipboard.writeText(tagPrompt);
                            showAlert("Prompt copied to clipboard!", "success");
                        }}
                    >
                        Copy Prompt Template
                    </button>
                </div>
            </div>

            <div className="tags-content">
                <div className="tags-categories">
                    {filteredCategories.map((comp, index) => (
                        <button
                            key={index}
                            className={`tags-category-btn ${compNow?.category === comp.category ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(comp)}
                        >
                            {comp.category}
                        </button>
                    ))}
                </div>

                <div className="tags-display">
                    {compNow && (
                        <>
                            <div className="tags-display-header">
                                <h2 className="tags-display-title">{compNow.category}</h2>
                                <button 
                                    className="tags-copy-all" 
                                    onClick={handleCopy}
                                >
                                    Copy All Tags
                                </button>
                            </div>
                            
                            <div id="allTags" className="tags-list">
                                <div className="tags-section-title">𝐊𝐞𝐲 𝐏𝐥𝐚𝐲𝐞𝐫𝐬:</div>
                                <div className="tags-items">
                                    {compNow.item.slice(0, 30).map((tag, index) => (
                                        <span key={`${tag.urn}-${index}`} className="tag-item">
                                            <span
                                                className="ql-mention"
                                                data-entity-urn={`urn:li:fsd_company:${tag.urn}`}
                                                data-guid={index}
                                                data-object-urn={`urn:li:organization:${tag.urn}`}
                                                data-original-text={tag.company}
                                                spellCheck="false"
                                                data-test-ql-mention="true"
                                            >
                                                {tag.company}
                                            </span>
                                            &#8203;<br/>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tags;