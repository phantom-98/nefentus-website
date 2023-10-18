import {
  r as a,
  c as H,
  b as G,
  u as B,
  d as i,
  e as z,
  s as m,
  f as F,
  j as e,
  B as b,
  L as K,
  a as T,
  g as q,
} from "./index-aff6404b.js";
import { z as j, I as x } from "./index-35d0d874.js";
import { C as X } from "./whiteCheckmark-8b4305a9.js";
import { u as $, t as J, E as Z } from "./error-de0f3ad8.js";
import { R as Y } from "./recaptcha-wrapper-faf002f1.js";
import { H as Q } from "./Helmet-bfad690c.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
const ee = "_login_oe9ty_1",
  se = "_message_oe9ty_11",
  ne = "_errormessagecontainer_oe9ty_18",
  oe = "_messagecontainer_oe9ty_25",
  re = "_left_oe9ty_32",
  ae = "_closeWrapper_oe9ty_45",
  te = "_card_oe9ty_55",
  ie = "_inputWrapper_oe9ty_89",
  ce = "_rememberInfo_oe9ty_95",
  le = "_right_oe9ty_112",
  me = "_buttonWrapper_oe9ty_119",
  pe = "_checkBox_oe9ty_124",
  _e = "_remeberInfo_oe9ty_139",
  de = "_top_oe9ty_160",
  ue = "_info_oe9ty_171",
  ge = "_buttonWrapperOTP_oe9ty_218",
  n = {
    login: ee,
    message: se,
    errormessagecontainer: ne,
    messagecontainer: oe,
    left: re,
    closeWrapper: ae,
    card: te,
    inputWrapper: ie,
    rememberInfo: ce,
    right: le,
    buttonWrapper: me,
    checkBox: pe,
    remeberInfo: _e,
    top: de,
    info: ue,
    "confirm-email": "_confirm-email_oe9ty_199",
    "button-group": "_button-group_oe9ty_205",
    buttonWrapperOTP: ge,
  },
  fe = ({ email: d, code: g, setCode: r, handleClick: p }) =>
    e.jsxs("div", {
      className: n["confirm-email"],
      children: [
        e.jsx("h3", { children: "Check your email for a code" }),
        e.jsxs("p", {
          children: [
            "We have sent a 6-digits code to ",
            d,
            ". The code expires shortly, so please enter it soon.",
          ],
        }),
        e.jsxs("form", {
          onSubmit: p,
          children: [
            e.jsx(x, {
              value: g,
              setState: r,
              style: { backgroundColor: "#161616" },
            }),
            e.jsx("div", {
              className: n["button-group"],
              children: e.jsx("div", {
                className: `${n.buttonWrapper} ${n.buttonWrapperOTP}`,
                children: e.jsx(b, {
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
  he = () => {
    var y, A;
    const d = a.useRef(),
      [g, r] = a.useState(null),
      [p, I] = a.useState(null),
      P = H(),
      u = new G(),
      { t: o } = B(),
      [_, w] = a.useState(
        i.get("nefentus-remember-me")
          ? JSON.parse(i.get("nefentus-remember-me"))
          : !1,
      ),
      N = j.object({
        email: j.string().min(1, { message: "Please enter your email" }),
        password: j.string().min(1, { message: "Please enter your password" }),
      }),
      {
        register: E,
        handleSubmit: R,
        getValues: f,
        formState: { errors: C },
      } = $({
        resolver: J(N),
        mode: "onSubmit",
        defaultValues: {
          email: i.get("nefentus-username") ? i.get("nefentus-username") : "",
          password: i.get("nefentus-password")
            ? z(i.get("nefentus-password"))
            : "",
        },
      });
    a.useEffect(() => {
      _
        ? (m("nefentus-username", f("email"), 365),
          m("nefentus-password", F(f("password")), 365),
          m("nefentus-remember-me", _, 365))
        : (m("nefentus-username", "", 365),
          m("nefentus-password", "", 365),
          m("nefentus-remember-me", !1, 365));
    }, [_, f]);
    const [k, D] = a.useState(!1),
      [v, O] = a.useState(null),
      [S, U] = a.useState("");
    function h() {
      const s = q(localStorage);
      P(s);
    }
    a.useEffect(() => {
      const s = new URLSearchParams(window.location.search);
      if (s.has("token")) {
        const c = s.get("token");
        M(c);
      }
      async function t() {
        (await u.checkJwt()) && h();
      }
      t();
    }, []);
    async function V(s, t) {
      if (!d.current.getValue()) r("Please verify the reCAPTCHA!");
      else {
        i.get("acceptCookie") !== !0 && (t = !1);
        try {
          const l = await u.login(s.email, s.password, t);
          if (l == null) {
            r("Invalid login data");
            return;
          } else l.requireOtp ? (D(!0), O(l.email)) : h();
        } catch {
          r("There was an error logging in");
        }
      }
    }
    async function L(s, t, c) {
      i.get("acceptCookie") !== !0 && (c = !1);
      try {
        if ((await u.verifyOTP(s, t, c)) == null) {
          r("Failed to Confirm");
          return;
        }
        h();
      } catch {
        r("There was an error logging in");
      }
    }
    const M = async (s) => {
        try {
          if ((await u.activateAccount(s)) == null) {
            r("Error on activating account: ");
            return;
          }
          I("Account successfully activated");
        } catch {
          r("Error on activating account: ");
        }
      },
      W = (s) => {
        s.preventDefault(), L(v, S, _);
      };
    return e.jsxs("div", {
      className: `${n.login}`,
      children: [
        e.jsx("div", {
          className: n.closeWrapper,
          children: e.jsx(b, {
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
                ((y = C.email) == null ? void 0 : y.message) ||
                ((A = C.password) == null ? void 0 : A.message),
            }),
            p &&
              e.jsx("div", {
                className: n.messagecontainer,
                children: e.jsx("p", { children: p }),
              }),
            k
              ? e.jsx(fe, { email: v, code: S, setCode: U, handleClick: W })
              : e.jsxs("form", {
                  onSubmit: R(V),
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
                          ref: d,
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
                                    _ &&
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
                      children: e.jsx(b, {
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
  ye = () =>
    e.jsxs("div", {
      className: "dashboardFont",
      children: [
        e.jsx(Q, {
          children: e.jsx("title", { children: "Nefentus | Login" }),
        }),
        e.jsx(he, {}),
      ],
    });
export { ye as default };
