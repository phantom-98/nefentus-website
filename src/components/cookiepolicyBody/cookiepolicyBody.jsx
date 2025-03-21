import styles from "./cookiepolicyBody.module.css";

const CookiePolicyBody = () => {
  return (
    <div
      className={`container ${styles.section}`}
      style={{ marginBlock: "2rem" }}
    >
      <h4>Last Update: May 10, 2024</h4>
      <h2>Cookie policy</h2>
      <div className={`${styles.body}`}>
        <div className={styles.content}>
          <div>
            <p>
              Nefentus Solutions LTD ("Nefentus" / "Company") employs cookies
              and similar technologies on your device, including mobile devices,
              to collect information such as your unique device identifier,
              mobile IP address, operating system details, mobile carrier, and
              location information, as permitted by applicable law.
            </p>

            <h4>Consent and Customization</h4>
            <p>
              Upon your first visit to our website, you will be prompted to
              accept or reject cookies. You can also customize your cookie
              preferences.
            </p>

            <p>
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  // Get all cookies
                  const cookies = document.cookie.split(";");
                  // Iterate through each cookie and set its expiration date to the past
                  for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    const name = cookie.split("=")[0];
                    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
                  }
                  alert("Cookies have been declined.");
                }}
              >
                Revoke my consent to the storage of cookies
              </span>
            </p>

            <h4>What Are Cookies?</h4>
            <p>
              Cookies are small text files placed on your device when you visit
              a website. They help the site recognize your device and store
              information about your visit, such as content viewed, language
              preferences, visit duration, and accessed advertisements.
            </p>

            <h4>Benefits of Cookies</h4>
            <p>
              Cookies facilitate efficient navigation between pages, remember
              your preferences, and enhance your overall user experience. They
              ensure that advertisements you see are relevant to your interests
              and help us understand your preferences. Different types of
              cookies serve various functions, which we explain below.
            </p>

            <h4>Usage of Collected Information</h4>
            <p>
              We use information gathered from cookies to analyze user behavior,
              serve personalized content and offers, and for other lawful
              purposes in certain jurisdictions. Cookie information from our
              advertisements on third-party sites may also be linked to an
              identifiable individual.
            </p>

            <h4>Third-Party Cookies</h4>
            <p>
              We use cookies, web beacons, and other tracking technologies from
              third-party companies for web analytics, measurement services, and
              targeted ads.
            </p>

            <h4>Managing Cookies</h4>
            <p>
              To remove existing cookies, use your browser options. To block
              future cookies, adjust your browser settings. Note that deleting
              or blocking cookies may affect your user experience.
            </p>

            <h4>Types of Cookies and Their Usage</h4>
            <p>
              Essential Cookies
              <br />
              Essential for the operation of our website and app, these cookies
              cannot be disabled. They are activated by your actions, such as
              setting privacy preferences, logging in, or filling out forms.
              Blocking these cookies may impair website or app functionality.
            </p>

            <h4>Performance Cookies</h4>
            <p>
              These cookies track how you use the website and app without
              collecting personal information. The data is typically anonymous
              and aggregated to help us understand usage patterns and improve
              our site. Performance cookies can be first-party or third-party.
            </p>

            <h4>Functionality Cookies</h4>
            <p>
              These cookies collect information about your device and any
              settings (like language and time zone) to provide customized
              content and services. They can be first-party or third-party.
            </p>

            <h4>Third-Party Cookies on Our Site</h4>
            <p>
              We employ third-party services (e.g., analytics providers, content
              partners) that may set cookies to deliver their services. These
              third-party cookies can track you across different websites or
              apps using the same service.
            </p>

            <h4>Our Third-Party Privacy Promise</h4>
            <p>
              We review the privacy policies of third-party providers to ensure
              they align with our standards. We do not knowingly use services
              that compromise or violate user privacy.
            </p>

            <h4>Controlling or Opting Out of Cookies</h4>
            <p>
              To refuse cookies from our website or app, adjust your browser
              settings. Most browsers accept cookies by default, but you can
              change these settings to refuse cookies or notify you when a site
              tries to set one.
            </p>

            <p>
              If you use multiple devices, update your settings on each device.
              Blocking all cookies may limit access to certain features and
              content across websites.
            </p>

            <p>
              For any questions or concerns about our Cookie Policy, please
              contact us at{" "}
              <a href="" style={{ color: "#078bb9" }}>
                office@nefentus.com
              </a>{" "}
              office@nefentus.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyBody;
