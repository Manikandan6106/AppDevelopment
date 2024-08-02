import React from 'react';
import '../styling/PrivacyPolicy.css'; // Import CSS if you have specific styles for this component
import AdminNavbar from './AdminNavbar';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <AdminNavbar />
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-title">Privacy Policy</h1>
        <p className="privacy-policy-intro">
          Your privacy is important to us. This privacy statement explains what personal data we collect, how we use it, and your rights regarding your data.
        </p>
        <section className="privacy-policy-section">
          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal information that you provide to us, such as your name, email address, and phone number. We also collect information about your use of our services and your interactions with us.
          </p>
        </section>
        <section className="privacy-policy-section">
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services. We may also use your data to communicate with you and to respond to your inquiries.
          </p>
        </section>
        <section className="privacy-policy-section">
          <h2>3. How We Share Your Information</h2>
          <p>
            We do not share your personal information with third parties except as necessary to provide our services or as required by law.
          </p>
        </section>
        <section className="privacy-policy-section">
          <h2>4. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You can also object to or restrict our processing of your data.
          </p>
        </section>
        <section className="privacy-policy-section">
          <h2>5. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website.
          </p>
        </section>
        <section className="privacy-policy-section">
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions or concerns about this privacy policy, please contact us at <a href="mailto:support@landsters.com">support@landsters.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
