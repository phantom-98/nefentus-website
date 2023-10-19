import {
  r,
  c as H,
  b as G,
  u as B,
  d as i,
  e as z,
  s as m,
  f as F,
  j as e,
  B as h,
  L as K,
  a as T,
  g as q,
} from "./index-80ad4a2a.js";
import { z as b, I as x } from "./index-d2e049d5.js";
import { C as X } from "./whiteCheckmark-b355e707.js";
import { u as $, t as J, E as Z } from "./error-409177f8.js";
import { R as Y } from "./recaptcha-wrapper-bf7eb57d.js";
import { H as Q } from "./Helmet-3728875c.js";
import "./hoist-non-react-statics.cjs-6fdb2ae2.js";
const ee = "_login_oe9ty_1",
  se = "_message_oe9ty_11",
  ne = "_errormessagecontainer_oe9ty_18",
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
  _e = "_top_oe9ty_160",
  ue = "_info_oe9ty_171",
  ge = "_buttonWrapperOTP_oe9ty_218",
  n = {
    login: ee,
    message: se,
    errormessagecontainer: ne,
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
    top: _e,
    info: ue,
    "confirm-email": "_confirm-email_oe9ty_199",
    "button-group": "_button-group_oe9ty_205",
    buttonWrapperOTP: ge,
  },
  fe = ({ email: _, code: g, setCode: a, handleClick: p }) =>
    e.jsxs("div", {
      className: n["confirm-email"],
      children: [
        e.jsx("h3", { children: "Check your email for a code" }),
        e.jsxs("p", {
          children: [
            "We have sent a 6-digits code to ",
            _,
            ". The code expires shortly, so please enter it soon.",
          ],
        }),
        e.jsxs("form", {
          onSubmit: p,
          children: [
            e.jsx(x, {
              value: g,
              setState: a,
              style: { backgroundColor: "#161616" },
            }),
            e.jsx("div", {
              className: n["button-group"],
              children: e.jsx("div", {
                className: `${n.buttonWrapper} ${n.buttonWrapperOTP}`,
                children: e.jsx(h, {
                  className: n.button,
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
    var S, A;
    const _ = r.useRef(),
      [g, a] = r.useState(null),
      [p, I] = r.useState(null),
      P = H(),
      u = new G(),
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
        getValues: f,
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
        ? (m("nefentus-username", f("email"), 365),
          m("nefentus-password", F(f("password")), 365),
          m("nefentus-remember-me", d, 365))
        : (m("nefentus-username", "", 365),
          m("nefentus-password", "", 365),
          m("nefentus-remember-me", !1, 365));
    }, [d, f]);
    const [N, R] = r.useState(!1),
      [C, O] = r.useState(null),
      [y, U] = r.useState("");
    function j() {
      const s = q(localStorage);
      P(s);
    }
    r.useEffect(() => {
      const s = new URLSearchParams(window.location.search);
      if (s.has("token")) {
        const c = s.get("token");
        M(c);
      }
      async function t() {
        (await u.checkJwt()) && j();
      }
      t();
    }, []);
    async function V(s, t) {
      if (!_.current.getValue()) a("Please verify the reCAPTCHA!");
      else {
        i.get("acceptCookie") !== !0 && (t = !1);
        try {
          const l = await u.login(s.email, s.password, t);
          if (l == null) {
            a("Invalid login data");
            return;
          } else l.requireOtp ? (R(!0), O(l.email)) : j();
        } catch {
          a("There was an error logging in");
        }
      }
    }
    async function L(s, t, c) {
      i.get("acceptCookie") !== !0 && (c = !1);
      try {
        if ((await u.verifyOTP(s, t, c)) == null) {
          a("Failed to Confirm");
          return;
        }
        j();
      } catch {
        a("There was an error logging in");
      }
    }
    const M = async (s) => {
        try {
          if ((await u.activateAccount(s)) == null) {
            a("Error on activating account: ");
            return;
          }
          I("Account successfully activated");
        } catch {
          a("Error on activating account: ");
        }
      },
      W = (s) => {
        s.preventDefault(), L(C, y, d);
      };
    return e.jsxs("div", {
      className: `${n.login}`,
      children: [
        e.jsx("div", {
          className: n.closeWrapper,
          children: e.jsx(h, {
            link: "/",
            color: "white",
            children: o("login.close"),
          }),
        }),
        e.jsxs("div", {
          className: n.left,
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
          className: n.right,
          children: [
            e.jsx(Z, {
              error:
                g ||
                ((S = v.email) == null ? void 0 : S.message) ||
                ((A = v.password) == null ? void 0 : A.message),
            }),
            p &&
              e.jsx("div", {
                className: n.messagecontainer,
                children: e.jsx("p", { children: p }),
              }),
            N
              ? e.jsx(fe, { email: C, code: y, setCode: U, handleClick: W })
              : e.jsxs("form", {
                  onSubmit: D(V),
                  children: [
                    e.jsxs("div", {
                      className: n.inputWrapper,
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
                          ref: _,
                          sitekey: "6Leb6H8oAAAAAM0q25gltEqlMOUUymzoDobq4NLc",
                          theme: "dark",
                        }),
                        e.jsxs("div", {
                          className: n.rememberInfo,
                          children: [
                            e.jsxs("div", {
                              onClick: () => w((s) => !s),
                              children: [
                                e.jsx("div", {
                                  className: n.checkBox,
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
                      className: n.buttonWrapper,
                      children: e.jsx(h, {
                        className: n.button,
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
  Se = () =>
    e.jsxs("div", {
      className: "dashboardFont",
      children: [
        e.jsx(Q, {
          children: e.jsx("title", { children: "Nefentus | Login" }),
        }),
        e.jsx(je, {}),
      ],
    });
export { Se as default };
