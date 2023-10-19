import {
  r,
  c as H,
  b as G,
  u as B,
  d as i,
  e as z,
  f as m,
  g as F,
  j as e,
  B as h,
  L as K,
  a as T,
  h as q,
} from "./index-dd74b233.js";
import { z as b, I as x } from "./index-e5cf03ca.js";
import { C as X } from "./whiteCheckmark-b355e707.js";
import { u as $, t as J, E as Z } from "./error-a03bd128.js";
import { R as Y } from "./recaptcha-wrapper-ef3879db.js";
import { H as Q } from "./Helmet-4c7ebf64.js";
import "./hoist-non-react-statics.cjs-41d71acf.js";
const ee = "_login_oe9ty_1",
  ne = "_message_oe9ty_11",
  se = "_errormessagecontainer_oe9ty_18",
  oe = "_messagecontainer_oe9ty_25",
  ae = "_left_oe9ty_32",
  re = "_closeWrapper_oe9ty_45",
  te = "_card_oe9ty_55",
  ie = "_inputWrapper_oe9ty_89",
  ce = "_rememberInfo_oe9ty_95",
  le = "_right_oe9ty_112",
  me = "_buttonWrapper_oe9ty_119",
  pe = "_checkBox_oe9ty_124",
  de = "_remeberInfo_oe9ty_139",
  ue = "_top_oe9ty_160",
  _e = "_info_oe9ty_171",
  fe = "_buttonWrapperOTP_oe9ty_218",
  s = {
    login: ee,
    message: ne,
    errormessagecontainer: se,
    messagecontainer: oe,
    left: ae,
    closeWrapper: re,
    card: te,
    inputWrapper: ie,
    rememberInfo: ce,
    right: le,
    buttonWrapper: me,
    checkBox: pe,
    remeberInfo: de,
    top: ue,
    info: _e,
    "confirm-email": "_confirm-email_oe9ty_199",
    "button-group": "_button-group_oe9ty_205",
    buttonWrapperOTP: fe,
  },
  ge = ({ email: u, code: f, setCode: a, handleClick: p }) =>
    e.jsxs("div", {
      className: s["confirm-email"],
      children: [
        e.jsx("h3", { children: "Check your email for a code" }),
        e.jsxs("p", {
          children: [
            "We have sent a 6-digits code to ",
            u,
            ". The code expires shortly, so please enter it soon.",
          ],
        }),
        e.jsxs("form", {
          onSubmit: p,
          children: [
            e.jsx(x, {
              value: f,
              setState: a,
              style: { backgroundColor: "#161616" },
            }),
            e.jsx("div", {
              className: s["button-group"],
              children: e.jsx("div", {
                className: `${s.buttonWrapper} ${s.buttonWrapperOTP}`,
                children: e.jsx(h, {
                  className: s.button,
                  onClick: p,
                  children: "Confirm",
                }),
              }),
            }),
          ],
        }),
      ],
    }),
  je = () => {
    var y, A;
    const u = r.useRef(),
      [f, a] = r.useState(null),
      [p, I] = r.useState(null),
      P = H(),
      _ = new G(),
      { t: o } = B(),
      [d, w] = r.useState(
        i.get("nefentus-remember-me")
          ? JSON.parse(i.get("nefentus-remember-me"))
          : !1,
      ),
      k = b.object({
        email: b.string().min(1, { message: "Please enter your email" }),
        password: b.string().min(1, { message: "Please enter your password" }),
      }),
      {
        register: E,
        handleSubmit: D,
        getValues: g,
        formState: { errors: v },
      } = $({
        resolver: J(k),
        mode: "onSubmit",
        defaultValues: {
          email: i.get("nefentus-username") ? i.get("nefentus-username") : "",
          password: i.get("nefentus-password")
            ? z(i.get("nefentus-password"))
            : "",
        },
      });
    r.useEffect(() => {
      d
        ? (m("nefentus-username", g("email"), 365),
          m("nefentus-password", F(g("password")), 365),
          m("nefentus-remember-me", d, 365))
        : (m("nefentus-username", "", 365),
          m("nefentus-password", "", 365),
          m("nefentus-remember-me", !1, 365));
    }, [d, g]);
    const [N, R] = r.useState(!1),
      [C, O] = r.useState(null),
      [S, U] = r.useState("");
    function j() {
      const n = q(localStorage);
      P(n);
    }
    r.useEffect(() => {
      const n = new URLSearchParams(window.location.search);
      if (n.has("token")) {
        const c = n.get("token");
        M(c);
      }
      async function t() {
        (await _.checkJwt()) && j();
      }
      t();
    }, []);
    async function V(n, t) {
      if (!u.current.getValue()) a("Please verify the reCAPTCHA!");
      else {
        i.get("acceptCookie") !== !0 && (t = !1);
        try {
          const l = await _.login(n.email, n.password, t);
          if (l == null) {
            a("Invalid login data");
            return;
          } else l.requireOtp ? (R(!0), O(l.email)) : j();
        } catch {
          a("There was an error logging in");
        }
      }
    }
    async function L(n, t, c) {
      i.get("acceptCookie") !== !0 && (c = !1);
      try {
        if ((await _.verifyOTP(n, t, c)) == null) {
          a("Failed to Confirm");
          return;
        }
        j();
      } catch {
        a("There was an error logging in");
      }
    }
    const M = async (n) => {
        try {
          if ((await _.activateAccount(n)) == null) {
            a("Error on activating account: ");
            return;
          }
          I("Account successfully activated");
        } catch {
          a("Error on activating account: ");
        }
      },
      W = (n) => {
        n.preventDefault(), L(C, S, d);
      };
    return e.jsxs("div", {
      className: `${s.login}`,
      children: [
        e.jsx("div", {
          className: s.closeWrapper,
          children: e.jsx(h, {
            link: "/",
            color: "white",
            children: o("login.close"),
          }),
        }),
        e.jsxs("div", {
          className: s.left,
          children: [
            e.jsx("img", { src: K, alt: "nefentus logo" }),
            e.jsxs("div", {
              children: [
                e.jsx("h2", {
                  children: e.jsx("span", {
                    className: "gradient",
                    children: o("login.titleP1") + "*",
                  }),
                }),
                e.jsx("p", { children: o("login.description") }),
                e.jsxs("p", {
                  children: [
                    o("login.info"),
                    e.jsx("u", {
                      children: e.jsx(T, {
                        to: "/signUp",
                        children: o("login.infoButton") + "*",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: s.right,
          children: [
            e.jsx(Z, {
              error:
                f ||
                ((y = v.email) == null ? void 0 : y.message) ||
                ((A = v.password) == null ? void 0 : A.message),
            }),
            p &&
              e.jsx("div", {
                className: s.messagecontainer,
                children: e.jsx("p", { children: p }),
              }),
            N
              ? e.jsx(ge, { email: C, code: S, setCode: U, handleClick: W })
              : e.jsxs("form", {
                  onSubmit: D(V),
                  children: [
                    e.jsxs("div", {
                      className: s.inputWrapper,
                      children: [
                        e.jsx(x, {
                          register: E,
                          name: "email",
                          label: o("signUp.emailLabel"),
                          placeholder: o("signUp.emailPlaceholder"),
                        }),
                        e.jsx(x, {
                          register: E,
                          name: "password",
                          label: o("signUp.passwordLabel"),
                          placeholder: o("signUp.passwordPlaceholder"),
                          secure: !0,
                        }),
                        e.jsx(Y, {
                          ref: u,
                          sitekey: "6Leb6H8oAAAAAM0q25gltEqlMOUUymzoDobq4NLc",
                          theme: "dark",
                        }),
                        e.jsxs("div", {
                          className: s.rememberInfo,
                          children: [
                            e.jsxs("div", {
                              onClick: () => w((n) => !n),
                              children: [
                                e.jsx("div", {
                                  className: s.checkBox,
                                  children:
                                    d &&
                                    e.jsx("img", { src: X, alt: "checkbox" }),
                                }),
                                e.jsx("p", { children: o("login.remember") }),
                              ],
                            }),
                            e.jsx(T, {
                              to: "/forgot-password",
                              children: e.jsx("p", {
                                children: o("login.forgot"),
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className: s.buttonWrapper,
                      children: e.jsx(h, {
                        className: s.button,
                        type: "submit",
                        children: o("login.button"),
                      }),
                    }),
                  ],
                }),
          ],
        }),
      ],
    });
  },
  ye = () =>
    e.jsxs("div", {
      className: "dashboardFont",
      children: [
        e.jsx(Q, {
          children: e.jsx("title", { children: "Nefentus | Login" }),
        }),
        e.jsx(je, {}),
      ],
    });
export { ye as default };
