import React from 'react';
import './DailyTips.css';

const DailyTips = () => {
  return (
    <div className="daily-tips-container">
      <h2 className="daily-tips-heading">Tips of the Day</h2>

      <div className="daily-tips-wrapper">
        {/* Tip 1 */}
        <div className="tip-card">
          <h3 className="tip-title">Keep Your Dependencies Secure</h3>
          <p className="tip-description">
            Run <code>npm audit</code> or <code>yarn audit</code> regularly to find and fix security vulnerabilities in third-party packages.
          </p>
          <a href="https://docs.npmjs.com/cli/v9/commands/npm-audit" className="tip-link" target="_blank" rel="noreferrer">
            View more about tip
          </a>
        </div>

        {/* Tip 2 */}
        <div className="tip-card">
          <h3 className="tip-title">Use Environment Variables</h3>
          <p className="tip-description">
            Store sensitive data like API keys and database URLs in environment variables instead of hardcoding them in your source code.
          </p>
          <a href="https://12factor.net/config" className="tip-link" target="_blank" rel="noreferrer">
            View more about tip
          </a>
        </div>

        {/* Tip 3 */}
        <div className="tip-card">
          <h3 className="tip-title">Learn Browser DevTools</h3>
          <p className="tip-description">
            Use Chrome or Firefox DevTools to inspect elements, debug JavaScript, and analyze performance directly in the browser.
          </p>
          <a href="https://developer.chrome.com/docs/devtools/" className="tip-link" target="_blank" rel="noreferrer">
            View more about tip
          </a>
        </div>
      </div>
    </div>
  );
};

export default DailyTips;
