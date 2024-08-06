import Cookies from "js-cookie";
import { setCookie } from "../func/cookies";
import ReactGA from "react-ga4";

export default class backendAPI {
  constructor() {
    this.baseURL = process.env.VITE_REACT_APP_BASE_ENDPOINT_API;
    this.token = Cookies.get("token");
    ReactGA.initialize(process.env.VITE_REACT_APP_GA_ID);
  }

  async updateToken(response) {
    if (response.headers.get("Token")) {
      this.token = response.headers.get("Token");
      setCookie("token", this.token);
    } else {
      console.log("token save failed");
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
      this.updateToken(response);
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
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
      localStorage.removeItem("isLoggedIn");
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

  async apply(title, firstName, lastName, email, linkedin, comment) {
    try {
      const url = `${this.baseURL}/apply`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          firstName,
          lastName,
          email,
          linkedin,
          comment,
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
  async contact(body) {
    try {
      const url = `${this.baseURL}/contact`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
}
