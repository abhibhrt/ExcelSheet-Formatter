import React, { useEffect, useState } from "react";
import { useAlert } from "./Alert";
import '../stylesheets/pulseblog.css';

function Blog({ jsonData }) {
  const [link, setLink] = useState(null);
  const [title, setTitle] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [meta, setMeta] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { showAlert, AlertComponent } = useAlert();

  useEffect(() => {
    if (jsonData.length > 0 && currentIndex >= 0 && currentIndex < jsonData.length) {
      const currentData = jsonData[currentIndex];

      const generatedPrompt = `"Please write me an SEO optimized article with the heading and topic mentioned at the end of this prompt request. 
        Please make sure that this article is:
        1. SEO optimized with headings and subheadings and paragraphs in different sizes and thickness.
        2. Explain the entire topic with as many sections and paragraphs needed.
        3. Include ${currentData.Column1} importance globally as a point of investment or business.
        4. Please make sure that in each sub-section there are at least 150-200 words, including as many facts and statistics as possible.
        5. End with an FAQs section with the top 5 questions and answers on this topic.
        6. Make the article professional and interesting.
        7. Write the article as a human with a natural flow.
        8. Avoid using company names for market values.
        9. Insert some recent trends, innovations, partnerships, or mergers in this topic.
        10. Format the article properly with 'h2' and 'h3' tags for headings and subheadings, and always start from Introduction with h2 type only don't give title in article.
        11. Avoid symbols '$' or '%', and in the introduction, hyperlink the text '${currentData.Column1}' with bold underlined text - ${currentData.Column2}.
        12. Keep each section in a single paragraph and provide a conclusion at the end after all FAQ's.

        The Topic is: ${currentData.Column3}"`;

      setTitle(currentData.Column3);
      setLink(currentData.Column2);
      setMeta(`${currentData.Column1} Size and Projection`);
      setPrompt(generatedPrompt);
    }
  }, [currentIndex, jsonData]);

  useEffect(() => {
    if (jsonData.length > 0) {
      const iframe = document.getElementById("data-iframe");
      if (iframe) {
        iframe.addEventListener("load", () => {
          setLoading(false);
        });
      }
    }
  }, [currentIndex, jsonData]);
  
  const handleNext = () => {
    if (currentIndex < jsonData.length - 1) {
      setLoading(true);
      setCurrentIndex((prev) => prev + 1);
    } else {
      showAlert("You Have Reached the End of Data", 'warning');
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setLoading(true);
      setCurrentIndex((prev) => prev - 1);
    } else {
      showAlert("This is the Start of Data", 'warning');
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text || "");
  };

  return (
    <div className="data-viewer">
      <AlertComponent/>
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
        <button className="data-action__button" onClick={() => handleCopyText(link)}>
          Copy Link
        </button>
        <button className="data-action__button" onClick={() => handleCopyText(prompt)}>
          Copy Prompt
        </button>
        <button className="data-action__button" onClick={() => handleCopyText(meta)}>
          Copy Meta
        </button>
      </div>
      {jsonData.length > 0 ? (
        <div className="data-content">
          <div className="data-iframe-container">
            {loading && (
              <div className="data-loading">
                <span className="loader"></span>
              </div>
            )}
            <iframe id="data-iframe" src={link} title="Blog Content"></iframe>
          </div>
          <h2 className="data-title">{title}</h2>
          <div className="data-html-content">{prompt}</div>
          <div className="data-tags">{meta} Size and Projection</div>
        </div>
      ) : (
        <div className="data-upload-warning">
          <p>Please! First Upload Excel (.xlsx) File Format</p> <i className="fa fa-warning"/>
        </div>
      )}
    </div>
  );
}

export default Blog;