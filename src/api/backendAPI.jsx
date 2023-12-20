import Cookies from "js-cookie";
import setCookie from "../components/setCookie/setCookie";
import ReactGA from "react-ga4";

export default class backendAPI {
  constructor() {
    this.baseURL = process.env.VITE_REACT_APP_BASE_ENDPOINT_API;
    this.token = Cookies.get("token");
    ReactGA.initialize(process.env.VITE_REACT_APP_GA_ID);
  }

  async checkJwt() {
    try {
      const url = `${this.baseURL}/auth/checkJWTCookie`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return true;
    } catch (error) {
      return false; // or return some default value
    }
  }

  async register(formData) {
    try {
      const url = `${this.baseURL}/auth/register`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        ReactGA.event({
          category: "Registration",
          action: "registration_active",
          label: formData.email,
        });
      }
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async registerByEmail(email) {
    try {
      const url = `${this.baseURL}/auth/register/email`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        setCookie("token", data.jwtToken);
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("contactEmail", data.contactEmail);
        localStorage.setItem("affiliateLink", data.affiliateLink);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("business", data.business);
        localStorage.setItem("phoneNumber", data.phoneNumber);
        localStorage.setItem("username", data.username);
        localStorage.setItem("profile_pic", data.profileImage);
        localStorage.setItem("roles", data.roles);
        localStorage.setItem("country", data.country);
        localStorage.setItem("hasTotp", data.hasTotp);
        // localStorage.setItem("requireKyc", data.requireKyc);
        localStorage.setItem("hasOtp", data.hasOtp);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("antiPhishingCode", data.antiPhishingCode);
        localStorage.setItem("marketingUpdates", data.marketingUpdates);
        localStorage.setItem("emailNotifications", data.emailNotifications);
        localStorage.setItem("appNotifications", data.appNotifications);
        localStorage.setItem("notificationLanguage", data.notificationLanguage);
        localStorage.setItem("enableInvoicing", data.enableInvoicing);

        ReactGA.event({
          category: "User",
          action: "login",
          label: data.email,
        });

        return data;
      }
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async updateUserByEmail(updateRequest) {
    try {
      const url = `${this.baseURL}/auth/update/email`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRequest),
      };
      const response = await fetch(url, options);

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error("Internal Server Error");
        }

        return response.text().then((error) => {
          try {
            const errorData = JSON.parse(error);
            const valueArray = Object.values(errorData);
            throw new Error(valueArray[0]);
          } catch (e) {
            if (e instanceof SyntaxError) {
              throw new Error(error);
            } else {
              throw e;
            }
          }
        });
      } else {
        const data = await response.json();
        localStorage.setItem("email", data.email);
        localStorage.setItem("contactEmail", data.contactEmail);
        localStorage.setItem("affiliateLink", data.affiliateLink);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("business", data.business);
        localStorage.setItem("phoneNumber", data.phoneNumber);
        localStorage.setItem("username", data.username);
        localStorage.setItem("profile_pic", data.profileImage);
        localStorage.setItem("roles", data.roles);
        localStorage.setItem("country", data.country);
        localStorage.setItem("hasTotp", data.hasTotp);
        // localStorage.setItem("requireKyc", data.requireKyc);
        localStorage.setItem("hasOtp", data.hasOtp);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("antiPhishingCode", data.antiPhishingCode);
        localStorage.setItem("marketingUpdates", data.marketingUpdates);
        localStorage.setItem("emailNotifications", data.emailNotifications);
        localStorage.setItem("appNotifications", data.appNotifications);
        localStorage.setItem("notificationLanguage", data.notificationLanguage);
        localStorage.setItem("enableInvoicing", data.enableInvoicing);

        window.dispatchEvent(new Event("storage"));

        ReactGA.event({
          category: "User",
          action: "login",
          label: data.email,
        });

        return data;
      }
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async forgotPassword(email) {
    try {
      const url = `${this.baseURL}/forgot-password`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: email,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async resetPassword(newPassword, token) {
    try {
      const url = `${this.baseURL}/auth/reset-password`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          token,
        }),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async changeEmailDashboard(newEmail) {
    try {
      const url = `${this.baseURL}/auth/change-email`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: newEmail,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async confirmEmail(code, newEmail) {
    try {
      const payload = {
        token: code,
        newEmail: newEmail,
      };
      const url = `${this.baseURL}/auth/confirm-email`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getProfile() {
    try {
      const url = `${this.baseURL}/auth/getUserProfile`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getInvoiceSettings() {
    try {
      const url = `${this.baseURL}/auth/get-invoice-settings`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    } catch (error) {
      return null;
    }
  }

  async updateInvoiceSettings(settings) {
    try {
      const url = `${this.baseURL}/auth/update-invoice-settings`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(settings),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async update(formData) {
    try {
      const url = `${this.baseURL}/auth/update`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("email", data.email);
      localStorage.setItem("contactEmail", data.contactEmail);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("business", data.business);
      localStorage.setItem("phoneNumber", data.phoneNumber);
      localStorage.setItem("country", data.country);
      localStorage.setItem("username", data.username);
      localStorage.setItem("antiPhishingCode", data.antiPhishingCode);
      localStorage.setItem("marketingUpdates", data.marketingUpdates);
      localStorage.setItem("emailNotifications", data.emailNotifications);
      localStorage.setItem("appNotifications", data.appNotifications);
      localStorage.setItem("notificationLanguage", data.notificationLanguage);
      localStorage.setItem("enableInvoicing", data.enableInvoicing);
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async setPhishingCode(code) {
    try {
      const url = `${this.baseURL}/auth/setup/antiPhishingCode`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(code),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.text();
    } catch (error) {
      return null; // or return some default value
    }
  }

  async updateFirstName(firstName) {
    try {
      const url = `${this.baseURL}/auth/update/first-name`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ firstName }),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("firstName", firstName);
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async updateLastName(lastName) {
    try {
      const url = `${this.baseURL}/auth/update/last-name`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ lastName }),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("lastName", lastName);
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getTotpToken(data) {
    try {
      const url = `${this.baseURL}/auth/setup/getTotpToken`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(data),
      };
      return (await fetch(url, options)).text();
    } catch (e) {
      throw new Error("Network response was not ok");
    }
  }

  async verifyTotpToken(email, code, checkbox) {
    try {
      const url = `${this.baseURL}/auth/verify/totp`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          token: code,
          rememberMe: checkbox,
        }),
      };
      const response = await fetch(url, options);

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      if (response.ok) {
        const data = await response.json();
        setCookie("token", data.jwtToken);
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("contactEmail", data.contactEmail);
        localStorage.setItem("affiliateLink", data.affiliateLink);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("business", data.business);
        localStorage.setItem("phoneNumber", data.phoneNumber);
        localStorage.setItem("username", data.username);
        localStorage.setItem("profile_pic", data.profileImage);
        localStorage.setItem("roles", data.roles);
        localStorage.setItem("country", data.country);
        localStorage.setItem("hasTotp", data.hasTotp);
        // localStorage.setItem("requireKyc", data.requireKyc);
        localStorage.setItem("hasOtp", data.hasOtp);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("antiPhishingCode", data.antiPhishingCode);

        ReactGA.event({
          category: "User",
          action: "login",
          label: data.email,
        });
      }

      return response;
    } catch (e) {
      console.log(e, "responseresponse");

      return e;
    }
  }

  async setupTotp(data) {
    try {
      const url = `${this.baseURL}/auth/setup/totp`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(data),
      };
      return await fetch(url, options);
    } catch (e) {
      throw new Error("Network response was not ok");
    }
  }

  async setupOtp(data) {
    try {
      const url = `${this.baseURL}/auth/setup/otp`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(data),
      };
      return await fetch(url, options);
    } catch (e) {
      throw new Error("Network response was not ok");
    }
  }

  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${this.baseURL}/auth/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem("profile_pic", data.message);
      return data.message;
    } catch (error) {
      console.error("There was an error uploading the file:", error);
      return null;
    }
  }

  async signout() {
    try {
      const url = `${this.baseURL}/auth/signout`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      Cookies.remove("token");
      localStorage.clear();
      return response;
    } catch (error) {
      Cookies.remove("token");
      localStorage.clear();
      console.error("There was an error signing out:", error);
      return null; // or return some default value
    }
  }

  async getProfilePicture(token) {
    try {
      const url = `${this.baseURL}/auth/profilePic`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      return null;
    } catch (error) {
      console.error(error);
    }
  }

  async login(username, password, longToken) {
    try {
      const url = `${this.baseURL}/auth/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password,
          rememberMe: longToken,
        }),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data.hasOtp) {
        setCookie("token", data.jwtToken);
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("contactEmail", data.contactEmail);
        localStorage.setItem("affiliateLink", data.affiliateLink);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("business", data.business);
        localStorage.setItem("phoneNumber", data.phoneNumber);
        localStorage.setItem("username", data.username);
        localStorage.setItem("profile_pic", data.profileImage);
        localStorage.setItem("roles", data.roles);
        localStorage.setItem("country", data.country);
        localStorage.setItem("hasTotp", data.hasTotp);
        // localStorage.setItem("requireKyc", data.requireKyc);
        localStorage.setItem("hasOtp", data.hasOtp);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("antiPhishingCode", data.antiPhishingCode);
        localStorage.setItem("marketingUpdates", data.marketingUpdates);
        localStorage.setItem("emailNotifications", data.emailNotifications);
        localStorage.setItem("appNotifications", data.appNotifications);
        localStorage.setItem("notificationLanguage", data.notificationLanguage);
        localStorage.setItem("enableInvoicing", data.enableInvoicing);
        localStorage.setItem("vatNumber", data.vatNumber);
        localStorage.setItem("sendInvoice", data.sendInvoice);
      }

      ReactGA.event({
        category: "User",
        action: "login",
        label: data.email,
      });

      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async verifyOTP(email, code, longToken) {
    try {
      const url = `${this.baseURL}/auth/verify/otp`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code,
          rememberMe: longToken,
        }),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const step = data.hasOtp !== data.hasTotp;

      if (step) {
        setCookie("token", data.jwtToken);
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("contactEmail", data.contactEmail);
        localStorage.setItem("affiliateLink", data.affiliateLink);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("business", data.business);
        localStorage.setItem("phoneNumber", data.phoneNumber);
        localStorage.setItem("username", data.username);
        localStorage.setItem("profile_pic", data.profileImage);
        localStorage.setItem("roles", data.roles);
        localStorage.setItem("country", data.country);
        localStorage.setItem("hasTotp", data.hasTotp);
        // localStorage.setItem("requireKyc", data.requireKyc);
        localStorage.setItem("hasOtp", data.hasOtp);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("antiPhishingCode", data.antiPhishingCode);
        localStorage.setItem("marketingUpdates", data.marketingUpdates);
        localStorage.setItem("emailNotifications", data.emailNotifications);
        localStorage.setItem("appNotifications", data.appNotifications);
        localStorage.setItem("notificationLanguage", data.notificationLanguage);
        localStorage.setItem("enableInvoicing", data.enableInvoicing);

        ReactGA.event({
          category: "User",
          action: "login",
          label: data.email,
        });
      }

      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async activateAccount(token) {
    try {
      const url = `${this.baseURL}/auth/activate`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: token,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error activating the account:", error);
      return null; // or return some default value
    }
  }

  async checkPassword(password) {
    try {
      const url = `${this.baseURL}/auth/checkPassword`;
      const requestBody = {
        password: password,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(requestBody),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async checkPermissionAff() {
    if (!this.token) {
      // Der Benutzer ist nicht angemeldet
      return false;
    }

    const url = `${this.baseURL}/dashboard/affiliate`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to check affiliate permissions");
      }
      return true;
    } catch (error) {
      console.error("Error checking affiliate permissions:", error);
      return false;
    }
  }

  async checkPermissionVendor() {
    if (!this.token) {
      // Der Benutzer ist nicht angemeldet
      return null;
    }

    const url = `${this.baseURL}/dashboard/vendor`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to check admin permissions");
      }
      return response;
    } catch (error) {
      console.error("Error checking admin permissions:", error);
      return null;
    }
  }

  async checkPermissionAdmin() {
    if (!this.token) {
      // Der Benutzer ist nicht angemeldet
      return false;
    }

    const url = `${this.baseURL}/dashboard/admin`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to check admin permissions");
      }
      return true;
    } catch (error) {
      console.error("Error checking admin permissions:", error);
      return false;
    }
  }

  async getAdminDashboardTotalStats() {
    const url = `${this.baseURL}/dashboard/admin/data`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to get admin dashboard data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting admin dashboard data:", error);
      return null;
    }
  }

  async getAffiliateDashboardTotalStats() {
    const url = `${this.baseURL}/dashboard/affiliate/data`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: localStorage.getItem("affiliateLink"),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to get affiliate dashboard data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting affiliate dashboard data:", error);
      return null;
    }
  }

  async countAffiliate(affiliate) {
    try {
      const url = `${this.baseURL}/clicks/${affiliate}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `Network response was not ok (${response.status} ${response.statusText})`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error counting the affiliates:", error);
      throw error;
    }
  }

  async isRequiredKYC() {
    try {
      const url = `${this.baseURL}/auth/auth/requireKyc`;

      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async uploadKYCByType(type, file) {
    try {
      if (!file) {
        return null;
      }
      const formData = new FormData();
      const userId = localStorage.getItem("userId");
      const url = `${this.baseURL}/auth/${userId}/upload_kyc?type=${type}`;
      formData.append("file", file);

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async uploadKYCByText(type, content) {
    try {
      if (!content) {
        return null;
      }
      const formData = new FormData();
      const userId = localStorage.getItem("userId");
      const url = `${this.baseURL}/auth/${userId}/upload_kyc_text?type=${type}`;
      formData.append("content", content);
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getByKYC(type, userId) {
    try {
      const url = `${this.baseURL}/auth/${userId}/kyc-image-url?type=${type}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return { [type]: data };
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getByKYCText(type, userId) {
    try {
      const url = `${this.baseURL}/auth/${userId}/kyc-text-url?type=${type}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return { [type]: data };
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getKYCLevel(userId) {
    try {
      const url = `${this.baseURL}/auth/${userId}/kyc-level`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async deleteProfileImage() {
    try {
      const url = `${this.baseURL}/auth/deleteImage`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: null,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      localStorage.setItem("profile_pic", "null");
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getWalletAddresses() {
    try {
      const url = `${this.baseURL}/wallet/addresses`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async send(tokenAddress, amount, toAddress, password) {
    try {
      const url = `${this.baseURL}/wallet/send`;
      const requestBody = {
        tokenAddress: tokenAddress,
        amount: amount,
        toAddress: toAddress,
        password: password,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(requestBody),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getProduct(productLink) {
    try {
      const url = `${this.baseURL}/product/${productLink}`;
      let headers = {};
      if (this.token) {
        headers = {
          Authorization: `Bearer ${this.token}`,
        };
      }

      const options = {
        method: "GET",
        headers: headers,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getProductImage(productLink) {
    try {
      const url = `${this.baseURL}/productImage/${productLink}`;
      let headers = {};
      if (this.token) {
        headers = {
          Authorization: `Bearer ${this.token}`,
        };
      }

      const options = {
        method: "GET",
        headers: headers,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getHierarchy(userId) {
    try {
      const url = `${this.baseURL}/hierarchy/${userId}`;
      let headers = {};
      if (this.token) {
        headers = {
          Authorization: `Bearer ${this.token}`,
        };
      }

      const options = {
        method: "GET",
        headers: headers,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async setTransactionInfo(transactionInfo, buyerAddress, productOrInvoiceId) {
    try {
      const url = `${this.baseURL}/transaction`;
      let headers = {};
      if (this.token) {
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        };
      }

      const body = {
        transactionInfo: transactionInfo,
        buyerAddress: buyerAddress,
        ...productOrInvoiceId,
      };

      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null; // or return some default value
    }
  }

  async getInvoice(invoiceLink) {
    try {
      const url = `${this.baseURL}/invoice/${invoiceLink}`;
      let headers = {};
      if (this.token) {
        headers = {
          Authorization: `Bearer ${this.token}`,
        };
      }

      const options = {
        method: "GET",
        headers: headers,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async updateInvoice(link, requestBody) {
    try {
      const url = `${this.baseURL}/invoice/${link}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async makePayment(
    currencyAddress,
    amount,
    quantity,
    password,
    stablecoinAddress,
    transInfoArg,
  ) {
    try {
      const url = `${this.baseURL}/payment`;
      let headers = {};
      if (this.token) {
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        };
      }

      const body = {
        currencyAddress: currencyAddress,
        stablecoinAddress: stablecoinAddress,
        amount: amount,
        quantity: quantity,
        password: password,
        ...transInfoArg,
      };

      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      };
      const response = await fetch(url, options);
      if (response.status === 412) {
        return "insufficientFunds";
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async registerWalletAddress(ConnectedWallet) {
    try {
      const url = `${this.baseURL}/wallet/address?address=${ConnectedWallet.address}&name=${ConnectedWallet.name}`;
      let headers = {};
      if (this.token) {
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        };
      }

      const options = {
        method: "GET",
        headers: headers,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }
}
