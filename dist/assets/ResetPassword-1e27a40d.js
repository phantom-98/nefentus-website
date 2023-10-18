import { r as a, b, u as v, j as s, h as k, B as y } from "./index-aff6404b.js";
import { z as n, I as u } from "./index-35d0d874.js";
import { u as S, E, t as N } from "./error-de0f3ad8.js";
import { H as I } from "./Helmet-bfad690c.js";
const $ = "_login_1s321_1",
  R = "_errormessagecontainer_1s321_8",
  T = "_messagecontainer_1s321_17",
  U = "_card_1s321_26",
  A = "_top_1s321_70",
  L = "_info_1s321_81",
  M = "_buttonWrapper_1s321_85",
  o = {
    login: $,
    errormessagecontainer: R,
    messagecontainer: T,
    card: U,
    top: A,
    info: L,
    buttonWrapper: M,
  },
  W = () => {
    var m, p;
    const [w, c] = a.useState(null),
      [i, g] = a.useState(null),
      [h, f] = a.useState(null),
      x = new b(),
      { t: r } = v(),
      j = n
        .object({
          password: n
            .string()
            .min(1, { message: "Please enter your password" })
            .min(8, { message: "Password must be at least 8 characters" })
            .refine(
              (e) =>
                /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*\d){1,})(?=(.*[@#$%^&+=!_]){1,}).{8,}$/.test(
                  e,
                ),
              {
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
              },
            ),
          confirmPassword: n
            .string()
            .nonempty({ message: "Confirm your password" }),
        })
        .refine((e) => e.password === e.confirmPassword, {
          message: "Passwords must match",
          path: ["confirmPassword"],
        }),
      {
        register: l,
        handleSubmit: _,
        formState: { errors: d },
      } = S({ resolver: N(j), mode: "onSubmit" });
    a.useEffect(() => {
      const e = new URLSearchParams(window.location.search);
      if (e.has("token")) {
        const t = e.get("token");
        f(t);
      }
    }, []);
    async function P(e) {
      try {
        if ((await x.resetPassword(e.password, h)) == null) {
          c("Invalid Token!");
          return;
        }
        g("Password reset successfull!");
      } catch {
        c("There was an error updating the password!");
      }
    }
    return s.jsx("div", {
      className: o.login,
      children: s.jsxs("div", {
        className: o.card,
        children: [
          s.jsxs("div", {
            className: o.top,
            children: [
              s.jsx("img", { src: k, alt: "nefentus logo" }),
              s.jsx("h3", { children: r("reset-password.title") }),
              s.jsxs("div", {
                children: [
                  s.jsx(E, {
                    error:
                      w ||
                      ((m = d.password) == null ? void 0 : m.message) ||
                      ((p = d.confirmPassword) == null ? void 0 : p.message),
                  }),
                  i &&
                    s.jsx("div", {
                      className: o.messagecontainer,
                      children: s.jsx("p", {
                        style: { color: "green" },
                        children: i,
                      }),
                    }),
                ],
              }),
            ],
          }),
          s.jsxs("form", {
            onSubmit: _(P),
            children: [
              s.jsx(u, {
                register: l,
                name: "password",
                label: r("signUp.passwordLabel"),
                placeholder: r("signUp.passwordPlaceholder"),
                secure: !0,
              }),
              s.jsx(u, {
                register: l,
                name: "confirmPassword",
                label: r("reset-password.button-label-confirm"),
                placeholder: r("signUp.passwordPlaceholder"),
                secure: !0,
              }),
              s.jsx(y, {
                link: null,
                type: "submit",
                children: r("reset-password.button"),
              }),
              s.jsx("div", {
                className: o.info,
                children: s.jsx("p", { children: r("reset-password.info") }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  C = () =>
    s.jsxs("div", {
      className: "dashboardFont",
      children: [
        s.jsx(I, {
          children: s.jsx("title", { children: "Nefentus | Password-forgot" }),
        }),
        s.jsx(W, {}),
      ],
    });
export { C as default };
