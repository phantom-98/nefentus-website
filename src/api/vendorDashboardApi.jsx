import Cookies from "js-cookie";
import { setCookie } from "../func/cookies";

export default class vendorDashboardApi {
  constructor() {
    //LAUNCH
    //this.baseURL = "https://nefentus.com:8443/api/dashboard/admin";
    //DEV
    this.baseURL =
      process.env.VITE_REACT_APP_BASE_ENDPOINT_API + "/dashboard/vendor";
    this.token = Cookies.get("token");
  }

  async updateToken(response) {
    if (response.headers.get("Token")) {
      this.token = response.headers.get("Token");
      setCookie("token", this.token);
    } else {
      console.log("token save failed");
    }
  }

  async checkPermission() {
    try {
      const url = `${this.baseURL}/`;
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
      return true;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getTotalIncome() {
    try {
      const url = `${this.baseURL}/income`;
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

  async getNumOrders() {
    try {
      const url = `${this.baseURL}/numOrders`;
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

  async getTotalIncomesPerDay() {
    try {
      const url = `${this.baseURL}/totalIncomesPerDay`;
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
      return response.json();
    } catch (error) {
      console.log(error);
      return null; // or return some default value
    }
  }

  async getProducts(current, dataLength, keyword = "") {
    try {
      const url = `${this.baseURL}/products?page=${current}&size=${dataLength}&keyword=${keyword}`;
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
      this.updateToken(response);
      const data = await response.json();
      return data;
    } catch (error) {
      return; // or return some default value
    }
  }

  /**
   * Upsert a new product (insert if link is null)
   */
  async upsertProduct(
    link,
    name,
    description,
    price,
    currency,
    stock,
    vatPercent,
  ) {
    try {
      let stockInt = -1;
      try {
        stockInt = parseInt(stock);
      } catch (error) {}

      const request = {
        productLink: link,
        name,
        description,
        price,
        stock: stockInt,
        vatPercent,
        currency,
      };

      const url = `${this.baseURL}/products/upsert`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(request),
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

  async uploadProductImage(link, file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${this.baseURL}/products/uploadImage?link=${link}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.updateToken(response);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error uploading the file:", error);
      return null;
    }
  }

  async getSignedImagePath(link) {
    try {
      const response = await fetch(`${this.baseURL}/products/image/${link}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.updateToken(response);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the product image:", error);
      return null;
    }
  }

  async deleteProduct(link) {
    try {
      const request = {
        productLink: link,
      };

      const url = `${this.baseURL}/products`;
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(request),
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

  async deleteProductImage(link) {
    try {
      const request = {
        productLink: link,
      };

      const url = `${this.baseURL}/products/image`;
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(request),
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

  async getOrders() {
    try {
      const url = `${this.baseURL}/orders`;
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
      this.updateToken(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the orders", error);
      return null;
    }
  }

  async getInvoices(current, dataLength, keyword = "") {
    try {
      const url = `${this.baseURL}/invoices?page=${current}&size=${dataLength}&keyword=${keyword}`;
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
      this.updateToken(response);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the orders", error);
      return null;
    }
  }

  async getInvoiceStatuses() {
    try {
      const url = `${this.baseURL}/invoice-statuses`;
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
      this.updateToken(response);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the orders", error);
      return null;
    }
  }

  async createInvoice(requestBody) {
    try {
      const url = `${this.baseURL}/invoice`;
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
      this.updateToken(response);
      const data = await response.text();
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return null; // or return some default value
    }
  }

  async deleteInvoice(invoiceLink) {
    try {
      const url = `${this.baseURL}/deleteInvoice/${invoiceLink}`;
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
      this.updateToken(response);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the orders", error);
      return null;
    }
  }

  async downloadInvoice(invoiceLink) {
    try {
      const url = `${this.baseURL}/downloadInvoice/${invoiceLink}`;
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
      this.updateToken(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error downloading invoices", error);
      return null;
    }
  }

  async getTransaction(hash) {
    try {
      const url = `${this.baseURL}/getTransaction/${hash}`;
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
      this.updateToken(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting transaction info", error);
      return null;
    }
  }
  async getTaxInfo() {
    try {
      const url = `${this.baseURL}/getTaxInfo`;

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
  async getInvoiceNumber() {
    try {
      const url = `${this.baseURL}/getNewInvoiceNumber`;

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
}
