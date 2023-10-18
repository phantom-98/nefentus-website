import {
  r as a,
  b as x,
  u as j,
  j as e,
  h as b,
  B as v,
} from "./index-aff6404b.js";
import { z as c, I as w } from "./index-35d0d874.js";
import { u as N, E as I, t as E } from "./error-de0f3ad8.js";
import { H as P } from "./Helmet-bfad690c.js";
const W = "_login_1cnmn_1",
  k = "_message_1cnmn_8",
  S = "_errormessagecontainer_1cnmn_15",
  y = "_messagecontainer_1cnmn_22",
  B = "_left_1cnmn_29",
  M = "_card_1cnmn_33",
  F = "_inputWrapper_1cnmn_50",
  L = "_remeberInfo_1cnmn_56",
  A = "_checkBox_1cnmn_73",
  H = "_buttonWrapper_1cnmn_92",
  R = "_top_1cnmn_105",
  T = "_info_1cnmn_116",
  s = {
    login: W,
    message: k,
    errormessagecontainer: S,
    messagecontainer: y,
    left: B,
    card: M,
    inputWrapper: F,
    remeberInfo: L,
    checkBox: A,
    buttonWrapper: H,
    top: R,
    info: T,
  },
  U = () => {
    var t;
    const [i, r] = a.useState(null),
      [o, l] = a.useState(null),
      m = new x(),
      { t: n } = j(),
      d = c.object({
        email: c.string().min(1, { message: "Please enter your email" }),
      }),
      {
        register: p,
        handleSubmit: g,
        formState: { errors: _ },
      } = N({ resolver: E(d), mode: "onSubmit" });
    async function u(h) {
      try {
        if ((await m.forgotPassword(h.email)) == null) {
          r("Invalid email address!");
          return;
        }
        l("Email sent to reset password!");
      } catch {
        r("There was an error sending the email!");
      }
    }
    return e.jsx("div", {
      className: s.login,
      children: e.jsxs("div", {
        className: s.card,
        children: [
          e.jsxs("div", {
            className: s.left,
            children: [
              e.jsx("img", { src: b, alt: "nefentus logo" }),
              e.jsx("h3", { children: n("forgot-password.title") }),
            ],
          }),
          e.jsx("div", {
            className: s.top,
            children: e.jsxs("div", {
              className: s.message,
              children: [
                e.jsx(I, {
                  error: i || ((t = _.email) == null ? void 0 : t.message),
                }),
                o &&
                  e.jsx("div", {
                    className: s.messagecontainer,
                    children: e.jsx("p", { children: o }),
                  }),
              ],
            }),
          }),
          e.jsxs("form", {
            onSubmit: g(u),
            children: [
              e.jsx(w, {
                register: p,
                name: "email",
                label: n("signUp.emailLabel"),
                placeholder: n("signUp.emailPlaceholder"),
              }),
              e.jsx("div", {
                className: s.buttonWrapper,
                children: e.jsx(v, {
                  link: null,
                  type: "submit",
                  children: n("forgot-password.button"),
                }),
              }),
              e.jsx("div", {
                className: s.info,
                children: e.jsx("p", { children: n("forgot-password.info") }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  D = () =>
    e.jsxs("div", {
      className: "dashboardFont",
      children: [
        e.jsx(P, {
          children: e.jsx("title", {
            children: "Nefentus | Password forgotten",
          }),
        }),
        e.jsx(U, {}),
      ],
    });
export { D as default };
