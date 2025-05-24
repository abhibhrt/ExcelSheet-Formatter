/* global tinymce */
import React, { useEffect, useRef } from 'react';
import '../stylesheets/onpage.css';

export default function MarketResearchReport({ data, fax }) {
  const editorRef = useRef(null);
 
  const richContent = `
    <h2>${data.Column2} and Projections</h2>
    <p>The <strong>${data.Column2}</strong> was valued at <strong style="color:#ca7d00">USD ${data.Column6}
        ${data.Column9} in 2026</strong> and is expected to reach <strong style="color:#ca7d00">USD ${data.Column7}
        ${data.Column9} by 2033</strong>, growing at a <strong style="color:#ca7d00">${data.Column8}% CAGR from 2026 to
        2033.</strong> The research includes several divisions as well as an analysis of the trends and factors
      influencing and playing a substantial role in the market.</p>
      <p>${fax.para1}</p>

    <p><strong style="color:#ca7d00">&gt;&gt;&gt;Download the Sample Report Now:-</strong> <a
        href="https://www.marketresearchintellect.com/download-sample/?rid=${data.Column1}" target="_blank"
        rel="noopener noreferrer"><u>https://www.marketresearchintellect.com/download-sample/?rid=${data.Column1}</u></a></p>

    <p><img src="${data.Column5}" title="${data.Column2} Size &amp; Scope" width="1400" /></p>
    <div style="text-align: center;"><strong class="text-danger blink">To Get Detailed Analysis &gt;</strong> <a href="https://www.marketresearchintellect.com/download-sample/?rid=${data.Column1}" target="_blank"><strong>Request Sample Report</strong></a></div>

    <p>The <strong>${data.Column2}</strong> report is meticulously tailored for a specific market segment, offering a detailed and thorough overview of an industry or multiple sectors. This all-encompassing report leverages both quantitative and qualitative methods to project trends and developments from 2026 to 2033. It covers a broad spectrum of factors, including product pricing strategies, the market reach of products and services across national and regional levels, and the dynamics within the primary market as well as its submarkets. Furthermore, the analysis takes into account the industries that utilize end applications, consumer behaviour, and the political, economic, and social environments in key countries.</p>
    <p>The structured segmentation in the report ensures a multifaceted understanding of the ${data.Column2} from several perspectives. It divides the market into groups based on various classification criteria, including end-use industries and product/service types. It also includes other relevant groups that are in line with how the market is currently functioning. The report&rsquo;s in-depth analysis of crucial elements covers market prospects, the competitive landscape, and corporate profiles.</p>
    <p>The assessment of the major industry participants is a crucial part of this analysis. Their product/service portfolios, financial standing, noteworthy business advancements, strategic methods, market positioning, geographic reach, and other important indicators are evaluated as the foundation of this analysis. The top three to five players also undergo a SWOT analysis, which identifies their opportunities, threats, vulnerabilities, and strengths. The chapter also discusses competitive threats, key success criteria, and the big corporations' present strategic priorities. Together, these insights aid in the development of well-informed marketing plans and assist companies in navigating the always-changing ${data.Column2} environment.</p>
    <h3>${data.Column2} Dynamics</h3>
    ${fax.para2}
    <h2>${data.Column2} Segmentations</h2>
    </ul>
    ${fax.para3}
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
    <h3>Recent Developement In ${data.Column2}</h3>
    ${fax.para4}
    <h4>Reasons to Purchase this Report:</h4>
    <div class="list-container">
      <p style="margin:0px;">• The market is segmented based on both economic and non-economic criteria, and both a
        qualitative and quantitative analysis is performed. A thorough grasp of the market's numerous segments and
        sub-segments is provided by the analysis.</p>
      <p style="margin:0px;">– The analysis provides a detailed understanding of the market's various segments and
        sub-segments.</p>
      <p style="margin:0px;">• Market value (USD Billion) information is given for each segment and sub-segment.</p>
      <p style="margin:0px;">– The most profitable segments and sub-segments for investments can be found using this data.
      </p>
      <p style="margin:0px;">• The area and market segment that are anticipated to expand the fastest and have the most
        market share are identified in the report.</p>
      <p style="margin:0px;">– Using this information, market entrance plans and investment decisions can be developed.
      </p>
      <p style="margin:0px;">• The research highlights the factors influencing the market in each region while analysing
        how the product or service is used in distinct geographical areas.</p>
      <p style="margin:0px;">– Understanding the market dynamics in various locations and developing regional expansion
        strategies are both aided by this analysis.</p>
      <p style="margin:0px;">• It includes the market share of the leading players, new service/product launches,
        collaborations, company expansions, and acquisitions made by the companies profiled over the previous five years,
        as well as the competitive landscape.</p>
      <p style="margin:0px;">– Understanding the market's competitive landscape and the tactics used by the top companies
        to stay one step ahead of the competition is made easier with the aid of this knowledge.</p>
      <p style="margin:0px;">• The research provides in-depth company profiles for the key market participants, including
        company overviews, business insights, product benchmarking, and SWOT analyses.</p>
      <p style="margin:0px;">– This knowledge aids in comprehending the advantages, disadvantages, opportunities, and
        threats of the major actors.</p>
      <p style="margin:0px;">• The research offers an industry market perspective for the present and the foreseeable
        future in light of recent changes.</p>
      <p style="margin:0px;">– Understanding the market's growth potential, drivers, challenges, and restraints is made
        easier by this knowledge.</p>
      <p style="margin:0px;">• Porter's five forces analysis is used in the study to provide an in-depth examination of
        the market from many angles.</p>
      <p style="margin:0px;">– This analysis aids in comprehending the market's customer and supplier bargaining power,
        threat of replacements and new competitors, and competitive rivalry.</p>
      <p style="margin:0px;">• The Value Chain is used in the research to provide light on the market.</p>
      <p style="margin:0px;">– This study aids in comprehending the market's value generation processes as well as the
        various players' roles in the market's value chain.</p>
      <p style="margin:0px;">• The market dynamics scenario and market growth prospects for the foreseeable future are
        presented in the research.</p>
      <p style="margin:0px;">– The research gives 6-month post-sales analyst support, which is helpful in determining the
        market's long-term growth prospects and developing investment strategies. Through this support, clients are
        guaranteed access to knowledgeable advice and assistance in comprehending market dynamics and making wise
        investment decisions.</p>
    </div>
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
        content_style: '',
        setup: (editor) => {
          editor.on("init", () => {
            editor.setContent(richContent);
          });
        },
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
      <div id='data-render' ref={editorRef} /> 
    </div>
  );
}