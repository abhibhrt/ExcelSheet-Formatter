/* global tinymce */
import React, { useEffect, useRef } from 'react';
import '../stylesheets/onpage.css';

export default function MarketResearchReport({ data, fax }) {
  const editorRef = useRef(null);

  const keyPlayersListMatch = fax.para3.match(/<h3>By Key Players<\/h3>\s*<ul>[\s\S]*?<\/ul>/);
  const keyPlayersUlOnly = keyPlayersListMatch ? keyPlayersListMatch[0].replace(/<h3>By Key Players<\/h3>\s*/, '') : '';
  const applicationsAndProductsOnly = fax.para3.replace(/<h3>By Key Players<\/h3>\s*<ul>[\s\S]*?<\/ul>/, '');

  const richContent = `
    <p>${fax.para1}</p>
    <p><strong style="color:#ca7d00">&gt;&gt;&gt;Download the Sample Report Now:-</strong> <a
        href="https://www.marketresearchintellect.com/download-sample/?rid=${data.Column1}" target="_blank"
        rel="noopener noreferrer"><u>https://www.marketresearchintellect.com/download-sample/?rid=${data.Column1}</u></a></p>

    <p><img src="${data.Column5}" title="${data.Column2} Size &amp; Scope" width="1400" /></p>
    <div class="download-box">
    <div style=" display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 1500px; margin: 10px auto; box-sizing: border-box; font-family: Arial, sans-serif;">
      <div style="color: #de3944; font-size: 16px; flex: 1; text-align: center; border: 3px solid #de3944; padding: 5.6px 20px;">
        Discover the Major Trends Driving This Market
      </div>
      <a href="https://www.marketresearchintellect.com/download-sample/?rid=${data.Column1}" style="background-color: #de3944; color: white; text-decoration: none; padding: 8px 20px; font-weight: bold; width: 20%; text-align:center;">
        Download PDF
      </a>
    </div>
    <h3>Market Study</h3>
    ${fax.para5}
    <h3>${data.Column2} Dynamics</h3>
    ${fax.para2}
    <h2>${data.Column2} Segmentations</h2>
    </ul>
    ${applicationsAndProductsOnly}
    <h3>By&nbsp;Region</h3>
    <h4>North America</h4>
    <ul>
      <li>United States of America</li>
      <li>Canada</li>
      <li>Mexico</li>
    </ul>
    <h4>Europe</h4>
    <ul>
      <li>United Kingdom</li>
      <li>Germany</li>
      <li>France</li>
      <li>Italy</li>
      <li>Spain</li>
      <li>Others</li>
    </ul>
    <h4>Asia Pacific</h4>
    <ul>
      <li>China</li>
      <li>Japan</li>
      <li>India</li>
      <li>ASEAN</li>
      <li>Australia</li>
      <li>Others</li>
    </ul>
    <h4>Latin America</h4>
    <ul>
      <li>Brazil</li>
      <li>Argentina</li>
      <li>Mexico</li>
      <li>Others</li>
    </ul>
    <h4>Middle East and Africa</h4>
    <ul>
      <li>Saudi Arabia</li>
      <li>United Arab Emirates</li>
      <li>Nigeria</li>
      <li>South Africa</li>
      <li>Others</li>
    </ul>
    <h3>By Key Players</h3>
    <p>The <strong>${data.Column2}</strong> offers an in-depth analysis of both established and emerging competitors within the market. It includes a comprehensive list of prominent companies, organized based on the types of products they offer and other relevant market criteria. In addition to profiling these businesses, the report provides key information about each participant's entry into the market, offering valuable context for the analysts involved in the study. This detailed information enhances the understanding of the competitive landscape and supports strategic decision-making within the industry.</p>
    ${keyPlayersUlOnly}
    <h3>Recent Developement In ${data.Column2}</h3>
    ${fax.para4}
    <h4>Global ${data.Column2}: Research Methodology</h4>
    <p>The research methodology includes both primary and secondary research, as well as expert panel reviews. Secondary research utilises press releases, company annual reports, research papers related to the industry, industry periodicals, trade journals, government websites, and associations to collect precise data on business expansion opportunities. Primary research entails conducting telephone interviews, sending questionnaires via email, and, in some instances, engaging in face-to-face interactions with a variety of industry experts in various geographic locations. Typically, primary interviews are ongoing to obtain current market insights and validate the existing data analysis. The primary interviews provide information on crucial factors such as market trends, market size, the competitive landscape, growth trends, and future prospects. These factors contribute to the validation and reinforcement of secondary research findings and to the growth of the analysis team’s market knowledge.</p>
    <h4>Customization of the Report</h4>
    <p>• In case of any queries or customization requirements please connect with our sales team, who will ensure that
      your requirements are met.</p>
    <p><strong style="color:#ca7d00">&gt;&gt;&gt; Ask For Discount @-</strong> <a
        href="https://www.marketresearchintellect.com/ask-for-discount/?rid=${data.Column1}" target="_blank"
        rel="noopener noreferrer"><u>https://www.marketresearchintellect.com/ask-for-discount/?rid=${data.Column1}</u></a></p>
  `;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js";
    script.referrerPolicy = "origin";

    script.onload = () => {
      tinymce.init({
        target: editorRef.current,
        menubar: false,
        toolbar: false,
        readonly: true,
        statusbar: false,
        content_style: 'height: 100vh;',
        setup: (editor) => {
          editor.on("init", () => {
            editor.setContent(richContent);
          });
        }
      });
    };

    document.body.appendChild(script);

    return () => {
      if (window.tinymce) {
        window.tinymce.remove();
      }
    };
  }, [richContent]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const notif = document.querySelector('.tox-notifications-container');
      if (notif) {
        notif.style.display = 'none';
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="blog-cont">
      <div id='data-render' style={{ height: '100vh' }} ref={editorRef} />
    </div>
  );
}