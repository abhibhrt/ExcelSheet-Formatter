import React, { useEffect, useState } from "react";
import { useAlert } from "./Alert";

function Blog({ jsonData }) {
  const [Link, setLink] = useState(null);
  const [Title, setTitle] = useState(null);
  const [Prompt, setPrompt] = useState(null);
  const [Meta, setMeta] = useState(null);
  const [Index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true)
  const { showAlert, AlertComponent } = useAlert();

  useEffect(() => {
    if (jsonData.length > 0 && Index >= 0 && Index < jsonData.length) {
      const currentData = jsonData[Index];

      const prom = `"Please write me an SEO optimized article with the heading and topic mentioned at the end of this prompt request. 
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
      setPrompt(prom);
    }
  }, [Index, jsonData]);

  useEffect(() => {
    if (jsonData.length > 0) {
      const iframe = document.getElementById("iframeData");
      if (iframe) {
        iframe.addEventListener("load", () => {
          setLoading(false)
        });
      }
    }
  }, [Index, jsonData]);
  
  const handleNext = () => {
    if (Index < jsonData.length - 1) {
      setLoading(true)
      setIndex((prev) => prev + 1);
    } else {
      showAlert("You Have Reached the End of Data", 'warning');
    }
  };
  
  const handlePrev = () => {
    if (Index > 0) {
      setLoading(true)
      setIndex((prev) => prev - 1);
    } else {
      showAlert("This is the Start of Data", 'warning');
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text || "");
  };

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
        <button id="copyTitle" className="copy-btn" onClick={() => handleCopy(Title)}>Copy Title</button>
        <button id="copyLink" className="copy-btn" onClick={() => handleCopy(Link)}>Copy Link</button>
        <button id="copyHtml" className="copy-btn" onClick={() => handleCopy(Prompt)}>Copy Prompt</button>
        <button id="copyTags" className="copy-btn" onClick={() => handleCopy(Meta)}>Copy Meta</button>
      </div>
      {jsonData.length > 0 ? (
        <div className="cont-3">
          <div className="iframeCont">
          {loading && <div className="loading"><span className="loader"></span></div>}
          <iframe id="iframeData"z src={Link} title="uni"></iframe>
          </div>
          <h2 id="title" style={{ color: "white", textAlign: "center" }}>{Title}</h2>
          <p id="htmlContent" className="content csz">{Prompt}</p>
          <div id="tags" className="content csz">{Meta} Size and Projection</div>
        </div>
      ) : <div className="uploadwarn">Please! First Upload Excel (.xlsx) File Format <i className="fa fa-warning" ></i></div>}
    </div>
  );
}

export default Blog;
