import React from 'react';

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>Your privacy is important to us. This policy explains how we collect, use, and share your information on our website.</p>
      
      <h2>Information We Collect</h2>
      <p>We collect minimal information from you:</p>
      <ul>
        <li>Your name and email address when you choose to log in using Google.</li>
        <li>Contributor&apos;s data will be used solely for managing contributions.</li>
      </ul>
      
      <h2>Google Login</h2>
      <p>We offer Google login for contributors who want to contribute to our website. This is optional and used only for authentication purposes.</p>
      
      <h2>Third Parties</h2>
      <p>We do not use any third-party trackers on our website. Your data is not shared with any third parties without your explicit consent.</p>
      
      <h2>Your Choices</h2>
      <p>You can choose not to use the Google login option and contribute anonymously.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:wowdeveloper@protmail.com">wowdeveloper@protmail.com</a>.</p>
      
      <p>This Privacy Policy was last updated on {currentDate}.</p>
    </div>
  );
};

export default PrivacyPolicy;
