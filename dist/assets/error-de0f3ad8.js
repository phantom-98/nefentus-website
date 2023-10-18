import { a3 as z, j as je } from "./index-aff6404b.js";
var ae = (e) => e.type === "checkbox",
  te = (e) => e instanceof Date,
  T = (e) => e == null;
const Ze = (e) => typeof e == "object";
var S = (e) => !T(e) && !Array.isArray(e) && Ze(e) && !te(e),
  vr = (e) =>
    S(e) && e.target ? (ae(e.target) ? e.target.checked : e.target.value) : e,
  gr = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e,
  _r = (e, i) => e.has(gr(i)),
  Vr = (e) => {
    const i = e.constructor && e.constructor.prototype;
    return S(i) && i.hasOwnProperty("isPrototypeOf");
  },
  Se =
    typeof window < "u" &&
    typeof window.HTMLElement < "u" &&
    typeof document < "u";
function $(e) {
  let i;
  const s = Array.isArray(e);
  if (e instanceof Date) i = new Date(e);
  else if (e instanceof Set) i = new Set(e);
  else if (!(Se && (e instanceof Blob || e instanceof FileList)) && (s || S(e)))
    if (((i = s ? [] : {}), !s && !Vr(e))) i = e;
    else for (const t in e) e.hasOwnProperty(t) && (i[t] = $(e[t]));
  else return e;
  return i;
}
var le = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
  E = (e) => e === void 0,
  d = (e, i, s) => {
    if (!i || !S(e)) return s;
    const t = le(i.split(/[,[\].]+?/)).reduce((l, u) => (T(l) ? l : l[u]), e);
    return E(t) || t === e ? (E(e[i]) ? s : e[i]) : t;
  },
  X = (e) => typeof e == "boolean";
const We = { BLUR: "blur", FOCUS_OUT: "focusout", CHANGE: "change" },
  M = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all",
  },
  W = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate",
  };
z.createContext(null);
var br = (e, i, s, t = !0) => {
    const l = { defaultValues: i._defaultValues };
    for (const u in e)
      Object.defineProperty(l, u, {
        get: () => {
          const f = u;
          return (
            i._proxyFormState[f] !== M.all &&
              (i._proxyFormState[f] = !t || M.all),
            s && (s[f] = !0),
            e[f]
          );
        },
      });
    return l;
  },
  U = (e) => S(e) && !Object.keys(e).length,
  Ar = (e, i, s, t) => {
    s(e);
    const { name: l, ...u } = e;
    return (
      U(u) ||
      Object.keys(u).length >= Object.keys(i).length ||
      Object.keys(u).find((f) => i[f] === (!t || M.all))
    );
  },
  Fe = (e) => (Array.isArray(e) ? e : [e]);
function xr(e) {
  const i = z.useRef(e);
  (i.current = e),
    z.useEffect(() => {
      const s =
        !e.disabled &&
        i.current.subject &&
        i.current.subject.subscribe({ next: i.current.next });
      return () => {
        s && s.unsubscribe();
      };
    }, [e.disabled]);
}
var I = (e) => typeof e == "string",
  Fr = (e, i, s, t, l) =>
    I(e)
      ? (t && i.watch.add(e), d(s, e, l))
      : Array.isArray(e)
      ? e.map((u) => (t && i.watch.add(u), d(s, u)))
      : (t && (i.watchAll = !0), s),
  pe = (e) => /^\w*$/.test(e),
  er = (e) => le(e.replace(/["|']|\]/g, "").split(/\.|\[/));
function x(e, i, s) {
  let t = -1;
  const l = pe(i) ? [i] : er(i),
    u = l.length,
    f = u - 1;
  for (; ++t < u; ) {
    const _ = l[t];
    let v = s;
    if (t !== f) {
      const k = e[_];
      v = S(k) || Array.isArray(k) ? k : isNaN(+l[t + 1]) ? {} : [];
    }
    (e[_] = v), (e = e[_]);
  }
  return e;
}
var rr = (e, i, s, t, l) =>
  i
    ? {
        ...s[e],
        types: { ...(s[e] && s[e].types ? s[e].types : {}), [t]: l || !0 },
      }
    : {};
const ke = (e, i, s) => {
  for (const t of s || Object.keys(e)) {
    const l = d(e, t);
    if (l) {
      const { _f: u, ...f } = l;
      if (u && i(u.name)) {
        if (u.ref.focus) {
          u.ref.focus();
          break;
        } else if (u.refs && u.refs[0].focus) {
          u.refs[0].focus();
          break;
        }
      } else S(f) && ke(f, i);
    }
  }
};
var $e = (e) => ({
    isOnSubmit: !e || e === M.onSubmit,
    isOnBlur: e === M.onBlur,
    isOnChange: e === M.onChange,
    isOnAll: e === M.all,
    isOnTouch: e === M.onTouched,
  }),
  He = (e, i, s) =>
    !s &&
    (i.watchAll ||
      i.watch.has(e) ||
      [...i.watch].some(
        (t) => e.startsWith(t) && /^\.\w+/.test(e.slice(t.length)),
      )),
  wr = (e, i, s) => {
    const t = le(d(e, s));
    return x(t, "root", i[s]), x(e, s, t), e;
  },
  Oe = (e) => e.type === "file",
  G = (e) => typeof e == "function",
  ce = (e) => {
    if (!Se) return !1;
    const i = e ? e.ownerDocument : 0;
    return (
      e instanceof
      (i && i.defaultView ? i.defaultView.HTMLElement : HTMLElement)
    );
  },
  fe = (e) => I(e),
  Te = (e) => e.type === "radio",
  de = (e) => e instanceof RegExp;
const Ke = { value: !1, isValid: !1 },
  ze = { value: !0, isValid: !0 };
var tr = (e) => {
  if (Array.isArray(e)) {
    if (e.length > 1) {
      const i = e
        .filter((s) => s && s.checked && !s.disabled)
        .map((s) => s.value);
      return { value: i, isValid: !!i.length };
    }
    return e[0].checked && !e[0].disabled
      ? e[0].attributes && !E(e[0].attributes.value)
        ? E(e[0].value) || e[0].value === ""
          ? ze
          : { value: e[0].value, isValid: !0 }
        : ze
      : Ke;
  }
  return Ke;
};
const Ge = { isValid: !1, value: null };
var sr = (e) =>
  Array.isArray(e)
    ? e.reduce(
        (i, s) =>
          s && s.checked && !s.disabled ? { isValid: !0, value: s.value } : i,
        Ge,
      )
    : Ge;
function Je(e, i, s = "validate") {
  if (fe(e) || (Array.isArray(e) && e.every(fe)) || (X(e) && !e))
    return { type: s, message: fe(e) ? e : "", ref: i };
}
var re = (e) => (S(e) && !de(e) ? e : { value: e, message: "" }),
  Qe = async (e, i, s, t, l) => {
    const {
        ref: u,
        refs: f,
        required: _,
        maxLength: v,
        minLength: k,
        min: H,
        max: w,
        pattern: b,
        validate: K,
        name: C,
        valueAsNumber: ve,
        mount: oe,
        disabled: ge,
      } = e._f,
      g = d(i, C);
    if (!oe || ge) return {};
    const R = f ? f[0] : u,
      q = (A) => {
        t &&
          R.reportValidity &&
          (R.setCustomValidity(X(A) ? "" : A || ""), R.reportValidity());
      },
      p = {},
      se = Te(u),
      Z = ae(u),
      _e = se || Z,
      B =
        ((ve || Oe(u)) && E(u.value) && E(g)) ||
        (ce(u) && u.value === "") ||
        g === "" ||
        (Array.isArray(g) && !g.length),
      J = rr.bind(null, C, s, p),
      j = (A, V, m, L = W.maxLength, N = W.minLength) => {
        const P = A ? V : m;
        p[C] = { type: A ? L : N, message: P, ref: u, ...J(A ? L : N, P) };
      };
    if (
      l
        ? !Array.isArray(g) || !g.length
        : _ &&
          ((!_e && (B || T(g))) ||
            (X(g) && !g) ||
            (Z && !tr(f).isValid) ||
            (se && !sr(f).isValid))
    ) {
      const { value: A, message: V } = fe(_)
        ? { value: !!_, message: _ }
        : re(_);
      if (
        A &&
        ((p[C] = { type: W.required, message: V, ref: R, ...J(W.required, V) }),
        !s)
      )
        return q(V), p;
    }
    if (!B && (!T(H) || !T(w))) {
      let A, V;
      const m = re(w),
        L = re(H);
      if (!T(g) && !isNaN(g)) {
        const N = u.valueAsNumber || (g && +g);
        T(m.value) || (A = N > m.value), T(L.value) || (V = N < L.value);
      } else {
        const N = u.valueAsDate || new Date(g),
          P = (ne) => new Date(new Date().toDateString() + " " + ne),
          Q = u.type == "time",
          ie = u.type == "week";
        I(m.value) &&
          g &&
          (A = Q
            ? P(g) > P(m.value)
            : ie
            ? g > m.value
            : N > new Date(m.value)),
          I(L.value) &&
            g &&
            (V = Q
              ? P(g) < P(L.value)
              : ie
              ? g < L.value
              : N < new Date(L.value));
      }
      if ((A || V) && (j(!!A, m.message, L.message, W.max, W.min), !s))
        return q(p[C].message), p;
    }
    if ((v || k) && !B && (I(g) || (l && Array.isArray(g)))) {
      const A = re(v),
        V = re(k),
        m = !T(A.value) && g.length > +A.value,
        L = !T(V.value) && g.length < +V.value;
      if ((m || L) && (j(m, A.message, V.message), !s))
        return q(p[C].message), p;
    }
    if (b && !B && I(g)) {
      const { value: A, message: V } = re(b);
      if (
        de(A) &&
        !g.match(A) &&
        ((p[C] = { type: W.pattern, message: V, ref: u, ...J(W.pattern, V) }),
        !s)
      )
        return q(V), p;
    }
    if (K) {
      if (G(K)) {
        const A = await K(g, i),
          V = Je(A, R);
        if (V && ((p[C] = { ...V, ...J(W.validate, V.message) }), !s))
          return q(V.message), p;
      } else if (S(K)) {
        let A = {};
        for (const V in K) {
          if (!U(A) && !s) break;
          const m = Je(await K[V](g, i), R, V);
          m &&
            ((A = { ...m, ...J(V, m.message) }), q(m.message), s && (p[C] = A));
        }
        if (!U(A) && ((p[C] = { ref: R, ...A }), !s)) return p;
      }
    }
    return q(!0), p;
  };
function mr(e, i) {
  const s = i.slice(0, -1).length;
  let t = 0;
  for (; t < s; ) e = E(e) ? t++ : e[i[t++]];
  return e;
}
function Dr(e) {
  for (const i in e) if (e.hasOwnProperty(i) && !E(e[i])) return !1;
  return !0;
}
function O(e, i) {
  const s = Array.isArray(i) ? i : pe(i) ? [i] : er(i),
    t = s.length === 1 ? e : mr(e, s),
    l = s.length - 1,
    u = s[l];
  return (
    t && delete t[u],
    l !== 0 &&
      ((S(t) && U(t)) || (Array.isArray(t) && Dr(t))) &&
      O(e, s.slice(0, -1)),
    e
  );
}
function we() {
  let e = [];
  return {
    get observers() {
      return e;
    },
    next: (l) => {
      for (const u of e) u.next && u.next(l);
    },
    subscribe: (l) => (
      e.push(l),
      {
        unsubscribe: () => {
          e = e.filter((u) => u !== l);
        },
      }
    ),
    unsubscribe: () => {
      e = [];
    },
  };
}
var ye = (e) => T(e) || !Ze(e);
function Y(e, i) {
  if (ye(e) || ye(i)) return e === i;
  if (te(e) && te(i)) return e.getTime() === i.getTime();
  const s = Object.keys(e),
    t = Object.keys(i);
  if (s.length !== t.length) return !1;
  for (const l of s) {
    const u = e[l];
    if (!t.includes(l)) return !1;
    if (l !== "ref") {
      const f = i[l];
      if (
        (te(u) && te(f)) ||
        (S(u) && S(f)) ||
        (Array.isArray(u) && Array.isArray(f))
          ? !Y(u, f)
          : u !== f
      )
        return !1;
    }
  }
  return !0;
}
var ir = (e) => e.type === "select-multiple",
  Er = (e) => Te(e) || ae(e),
  me = (e) => ce(e) && e.isConnected,
  nr = (e) => {
    for (const i in e) if (G(e[i])) return !0;
    return !1;
  };
function he(e, i = {}) {
  const s = Array.isArray(e);
  if (S(e) || s)
    for (const t in e)
      Array.isArray(e[t]) || (S(e[t]) && !nr(e[t]))
        ? ((i[t] = Array.isArray(e[t]) ? [] : {}), he(e[t], i[t]))
        : T(e[t]) || (i[t] = !0);
  return i;
}
function ur(e, i, s) {
  const t = Array.isArray(e);
  if (S(e) || t)
    for (const l in e)
      Array.isArray(e[l]) || (S(e[l]) && !nr(e[l]))
        ? E(i) || ye(s[l])
          ? (s[l] = Array.isArray(e[l]) ? he(e[l], []) : { ...he(e[l]) })
          : ur(e[l], T(i) ? {} : i[l], s[l])
        : (s[l] = !Y(e[l], i[l]));
  return s;
}
var De = (e, i) => ur(e, i, he(i)),
  ar = (e, { valueAsNumber: i, valueAsDate: s, setValueAs: t }) =>
    E(e)
      ? e
      : i
      ? e === ""
        ? NaN
        : e && +e
      : s && I(e)
      ? new Date(e)
      : t
      ? t(e)
      : e;
function Ee(e) {
  const i = e.ref;
  if (!(e.refs ? e.refs.every((s) => s.disabled) : i.disabled))
    return Oe(i)
      ? i.files
      : Te(i)
      ? sr(e.refs).value
      : ir(i)
      ? [...i.selectedOptions].map(({ value: s }) => s)
      : ae(i)
      ? tr(e.refs).value
      : ar(E(i.value) ? e.ref.value : i.value, e);
}
var kr = (e, i, s, t) => {
    const l = {};
    for (const u of e) {
      const f = d(i, u);
      f && x(l, u, f._f);
    }
    return {
      criteriaMode: s,
      names: [...e],
      fields: l,
      shouldUseNativeValidation: t,
    };
  },
  ue = (e) =>
    E(e)
      ? e
      : de(e)
      ? e.source
      : S(e)
      ? de(e.value)
        ? e.value.source
        : e.value
      : e,
  Sr = (e) =>
    e.mount &&
    (e.required ||
      e.min ||
      e.max ||
      e.maxLength ||
      e.minLength ||
      e.pattern ||
      e.validate);
function Xe(e, i, s) {
  const t = d(e, s);
  if (t || pe(s)) return { error: t, name: s };
  const l = s.split(".");
  for (; l.length; ) {
    const u = l.join("."),
      f = d(i, u),
      _ = d(e, u);
    if (f && !Array.isArray(f) && s !== u) return { name: s };
    if (_ && _.type) return { name: u, error: _ };
    l.pop();
  }
  return { name: s };
}
var pr = (e, i, s, t, l) =>
    l.isOnAll
      ? !1
      : !s && l.isOnTouch
      ? !(i || e)
      : (s ? t.isOnBlur : l.isOnBlur)
      ? !e
      : (s ? t.isOnChange : l.isOnChange)
      ? e
      : !0,
  Or = (e, i) => !le(d(e, i)).length && O(e, i);
const Tr = {
  mode: M.onSubmit,
  reValidateMode: M.onChange,
  shouldFocusError: !0,
};
function Lr(e = {}, i) {
  let s = { ...Tr, ...e },
    t = {
      submitCount: 0,
      isDirty: !1,
      isLoading: G(s.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      errors: {},
    },
    l = {},
    u =
      S(s.defaultValues) || S(s.values)
        ? $(s.defaultValues || s.values) || {}
        : {},
    f = s.shouldUnregister ? {} : $(u),
    _ = { action: !1, mount: !1, watch: !1 },
    v = {
      mount: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
    },
    k,
    H = 0;
  const w = {
      isDirty: !1,
      dirtyFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    },
    b = { values: we(), array: we(), state: we() },
    K = e.resetOptions && e.resetOptions.keepDirtyValues,
    C = $e(s.mode),
    ve = $e(s.reValidateMode),
    oe = s.criteriaMode === M.all,
    ge = (r) => (n) => {
      clearTimeout(H), (H = setTimeout(r, n));
    },
    g = async (r) => {
      if (w.isValid || r) {
        const n = s.resolver ? U((await B()).errors) : await j(l, !0);
        n !== t.isValid && b.state.next({ isValid: n });
      }
    },
    R = (r) => w.isValidating && b.state.next({ isValidating: r }),
    q = (r, n = [], a, y, c = !0, o = !0) => {
      if (y && a) {
        if (((_.action = !0), o && Array.isArray(d(l, r)))) {
          const h = a(d(l, r), y.argA, y.argB);
          c && x(l, r, h);
        }
        if (o && Array.isArray(d(t.errors, r))) {
          const h = a(d(t.errors, r), y.argA, y.argB);
          c && x(t.errors, r, h), Or(t.errors, r);
        }
        if (w.touchedFields && o && Array.isArray(d(t.touchedFields, r))) {
          const h = a(d(t.touchedFields, r), y.argA, y.argB);
          c && x(t.touchedFields, r, h);
        }
        w.dirtyFields && (t.dirtyFields = De(u, f)),
          b.state.next({
            name: r,
            isDirty: V(r, n),
            dirtyFields: t.dirtyFields,
            errors: t.errors,
            isValid: t.isValid,
          });
      } else x(f, r, n);
    },
    p = (r, n) => {
      x(t.errors, r, n), b.state.next({ errors: t.errors });
    },
    se = (r, n, a, y) => {
      const c = d(l, r);
      if (c) {
        const o = d(f, r, E(a) ? d(u, r) : a);
        E(o) || (y && y.defaultChecked) || n
          ? x(f, r, n ? o : Ee(c._f))
          : N(r, o),
          _.mount && g();
      }
    },
    Z = (r, n, a, y, c) => {
      let o = !1,
        h = !1;
      const F = { name: r };
      if (!a || y) {
        w.isDirty &&
          ((h = t.isDirty),
          (t.isDirty = F.isDirty = V()),
          (o = h !== F.isDirty));
        const D = Y(d(u, r), n);
        (h = d(t.dirtyFields, r)),
          D ? O(t.dirtyFields, r) : x(t.dirtyFields, r, !0),
          (F.dirtyFields = t.dirtyFields),
          (o = o || (w.dirtyFields && h !== !D));
      }
      if (a) {
        const D = d(t.touchedFields, r);
        D ||
          (x(t.touchedFields, r, a),
          (F.touchedFields = t.touchedFields),
          (o = o || (w.touchedFields && D !== a)));
      }
      return o && c && b.state.next(F), o ? F : {};
    },
    _e = (r, n, a, y) => {
      const c = d(t.errors, r),
        o = w.isValid && X(n) && t.isValid !== n;
      if (
        (e.delayError && a
          ? ((k = ge(() => p(r, a))), k(e.delayError))
          : (clearTimeout(H),
            (k = null),
            a ? x(t.errors, r, a) : O(t.errors, r)),
        (a ? !Y(c, a) : c) || !U(y) || o)
      ) {
        const h = {
          ...y,
          ...(o && X(n) ? { isValid: n } : {}),
          errors: t.errors,
          name: r,
        };
        (t = { ...t, ...h }), b.state.next(h);
      }
      R(!1);
    },
    B = async (r) =>
      s.resolver(
        f,
        s.context,
        kr(r || v.mount, l, s.criteriaMode, s.shouldUseNativeValidation),
      ),
    J = async (r) => {
      const { errors: n } = await B(r);
      if (r)
        for (const a of r) {
          const y = d(n, a);
          y ? x(t.errors, a, y) : O(t.errors, a);
        }
      else t.errors = n;
      return n;
    },
    j = async (r, n, a = { valid: !0 }) => {
      for (const y in r) {
        const c = r[y];
        if (c) {
          const { _f: o, ...h } = c;
          if (o) {
            const F = v.array.has(o.name),
              D = await Qe(c, f, oe, s.shouldUseNativeValidation && !n, F);
            if (D[o.name] && ((a.valid = !1), n)) break;
            !n &&
              (d(D, o.name)
                ? F
                  ? wr(t.errors, D, o.name)
                  : x(t.errors, o.name, D[o.name])
                : O(t.errors, o.name));
          }
          h && (await j(h, n, a));
        }
      }
      return a.valid;
    },
    A = () => {
      for (const r of v.unMount) {
        const n = d(l, r);
        n &&
          (n._f.refs ? n._f.refs.every((a) => !me(a)) : !me(n._f.ref)) &&
          Ve(r);
      }
      v.unMount = new Set();
    },
    V = (r, n) => (r && n && x(f, r, n), !Y(Le(), u)),
    m = (r, n, a) =>
      Fr(r, v, { ...(_.mount ? f : E(n) ? u : I(r) ? { [r]: n } : n) }, a, n),
    L = (r) => le(d(_.mount ? f : u, r, e.shouldUnregister ? d(u, r, []) : [])),
    N = (r, n, a = {}) => {
      const y = d(l, r);
      let c = n;
      if (y) {
        const o = y._f;
        o &&
          (!o.disabled && x(f, r, ar(n, o)),
          (c = ce(o.ref) && T(n) ? "" : n),
          ir(o.ref)
            ? [...o.ref.options].forEach(
                (h) => (h.selected = c.includes(h.value)),
              )
            : o.refs
            ? ae(o.ref)
              ? o.refs.length > 1
                ? o.refs.forEach(
                    (h) =>
                      (!h.defaultChecked || !h.disabled) &&
                      (h.checked = Array.isArray(c)
                        ? !!c.find((F) => F === h.value)
                        : c === h.value),
                  )
                : o.refs[0] && (o.refs[0].checked = !!c)
              : o.refs.forEach((h) => (h.checked = h.value === c))
            : Oe(o.ref)
            ? (o.ref.value = "")
            : ((o.ref.value = c),
              o.ref.type || b.values.next({ name: r, values: { ...f } })));
      }
      (a.shouldDirty || a.shouldTouch) &&
        Z(r, c, a.shouldTouch, a.shouldDirty, !0),
        a.shouldValidate && ne(r);
    },
    P = (r, n, a) => {
      for (const y in n) {
        const c = n[y],
          o = `${r}.${y}`,
          h = d(l, o);
        (v.array.has(r) || !ye(c) || (h && !h._f)) && !te(c)
          ? P(o, c, a)
          : N(o, c, a);
      }
    },
    Q = (r, n, a = {}) => {
      const y = d(l, r),
        c = v.array.has(r),
        o = $(n);
      x(f, r, o),
        c
          ? (b.array.next({ name: r, values: { ...f } }),
            (w.isDirty || w.dirtyFields) &&
              a.shouldDirty &&
              b.state.next({
                name: r,
                dirtyFields: De(u, f),
                isDirty: V(r, o),
              }))
          : y && !y._f && !T(o)
          ? P(r, o, a)
          : N(r, o, a),
        He(r, v) && b.state.next({ ...t }),
        b.values.next({ name: r, values: { ...f } }),
        !_.mount && i();
    },
    ie = async (r) => {
      const n = r.target;
      let a = n.name,
        y = !0;
      const c = d(l, a),
        o = () => (n.type ? Ee(c._f) : vr(r));
      if (c) {
        let h, F;
        const D = o(),
          ee = r.type === We.BLUR || r.type === We.FOCUS_OUT,
          dr =
            (!Sr(c._f) && !s.resolver && !d(t.errors, a) && !c._f.deps) ||
            pr(ee, d(t.touchedFields, a), t.isSubmitted, ve, C),
          Ae = He(a, v, ee);
        x(f, a, D),
          ee
            ? (c._f.onBlur && c._f.onBlur(r), k && k(0))
            : c._f.onChange && c._f.onChange(r);
        const xe = Z(a, D, ee, !1),
          yr = !U(xe) || Ae;
        if (
          (!ee && b.values.next({ name: a, type: r.type, values: { ...f } }),
          dr)
        )
          return (
            w.isValid && g(), yr && b.state.next({ name: a, ...(Ae ? {} : xe) })
          );
        if ((!ee && Ae && b.state.next({ ...t }), R(!0), s.resolver)) {
          const { errors: Ie } = await B([a]),
            hr = Xe(t.errors, l, a),
            qe = Xe(Ie, l, hr.name || a);
          (h = qe.error), (a = qe.name), (F = U(Ie));
        } else
          (h = (await Qe(c, f, oe, s.shouldUseNativeValidation))[a]),
            (y = Number.isNaN(D) || D === d(f, a, D)),
            y && (h ? (F = !1) : w.isValid && (F = await j(l, !0)));
        y && (c._f.deps && ne(c._f.deps), _e(a, F, h, xe));
      }
    },
    ne = async (r, n = {}) => {
      let a, y;
      const c = Fe(r);
      if ((R(!0), s.resolver)) {
        const o = await J(E(r) ? r : c);
        (a = U(o)), (y = r ? !c.some((h) => d(o, h)) : a);
      } else
        r
          ? ((y = (
              await Promise.all(
                c.map(async (o) => {
                  const h = d(l, o);
                  return await j(h && h._f ? { [o]: h } : h);
                }),
              )
            ).every(Boolean)),
            !(!y && !t.isValid) && g())
          : (y = a = await j(l));
      return (
        b.state.next({
          ...(!I(r) || (w.isValid && a !== t.isValid) ? {} : { name: r }),
          ...(s.resolver || !r ? { isValid: a } : {}),
          errors: t.errors,
          isValidating: !1,
        }),
        n.shouldFocus &&
          !y &&
          ke(l, (o) => o && d(t.errors, o), r ? c : v.mount),
        y
      );
    },
    Le = (r) => {
      const n = { ...u, ...(_.mount ? f : {}) };
      return E(r) ? n : I(r) ? d(n, r) : r.map((a) => d(n, a));
    },
    Ce = (r, n) => ({
      invalid: !!d((n || t).errors, r),
      isDirty: !!d((n || t).dirtyFields, r),
      isTouched: !!d((n || t).touchedFields, r),
      error: d((n || t).errors, r),
    }),
    or = (r) => {
      r && Fe(r).forEach((n) => O(t.errors, n)),
        b.state.next({ errors: r ? t.errors : {} });
    },
    Ne = (r, n, a) => {
      const y = (d(l, r, { _f: {} })._f || {}).ref;
      x(t.errors, r, { ...n, ref: y }),
        b.state.next({ name: r, errors: t.errors, isValid: !1 }),
        a && a.shouldFocus && y && y.focus && y.focus();
    },
    fr = (r, n) =>
      G(r)
        ? b.values.subscribe({ next: (a) => r(m(void 0, n), a) })
        : m(r, n, !0),
    Ve = (r, n = {}) => {
      for (const a of r ? Fe(r) : v.mount)
        v.mount.delete(a),
          v.array.delete(a),
          n.keepValue || (O(l, a), O(f, a)),
          !n.keepError && O(t.errors, a),
          !n.keepDirty && O(t.dirtyFields, a),
          !n.keepTouched && O(t.touchedFields, a),
          !s.shouldUnregister && !n.keepDefaultValue && O(u, a);
      b.values.next({ values: { ...f } }),
        b.state.next({ ...t, ...(n.keepDirty ? { isDirty: V() } : {}) }),
        !n.keepIsValid && g();
    },
    Ue = ({ disabled: r, name: n, field: a, fields: y }) => {
      if (X(r)) {
        const c = r ? void 0 : d(f, n, Ee(a ? a._f : d(y, n)._f));
        x(f, n, c), Z(n, c, !1, !1, !0);
      }
    },
    be = (r, n = {}) => {
      let a = d(l, r);
      const y = X(n.disabled);
      return (
        x(l, r, {
          ...(a || {}),
          _f: {
            ...(a && a._f ? a._f : { ref: { name: r } }),
            name: r,
            mount: !0,
            ...n,
          },
        }),
        v.mount.add(r),
        a
          ? Ue({ field: a, disabled: n.disabled, name: r })
          : se(r, !0, n.value),
        {
          ...(y ? { disabled: n.disabled } : {}),
          ...(s.progressive
            ? {
                required: !!n.required,
                min: ue(n.min),
                max: ue(n.max),
                minLength: ue(n.minLength),
                maxLength: ue(n.maxLength),
                pattern: ue(n.pattern),
              }
            : {}),
          name: r,
          onChange: ie,
          onBlur: ie,
          ref: (c) => {
            if (c) {
              be(r, n), (a = d(l, r));
              const o =
                  (E(c.value) &&
                    c.querySelectorAll &&
                    c.querySelectorAll("input,select,textarea")[0]) ||
                  c,
                h = Er(o),
                F = a._f.refs || [];
              if (h ? F.find((D) => D === o) : o === a._f.ref) return;
              x(l, r, {
                _f: {
                  ...a._f,
                  ...(h
                    ? {
                        refs: [
                          ...F.filter(me),
                          o,
                          ...(Array.isArray(d(u, r)) ? [{}] : []),
                        ],
                        ref: { type: o.type, name: r },
                      }
                    : { ref: o }),
                },
              }),
                se(r, !1, void 0, o);
            } else
              (a = d(l, r, {})),
                a._f && (a._f.mount = !1),
                (s.shouldUnregister || n.shouldUnregister) &&
                  !(_r(v.array, r) && _.action) &&
                  v.unMount.add(r);
          },
        }
      );
    },
    Re = () => s.shouldFocusError && ke(l, (r) => r && d(t.errors, r), v.mount),
    Me = (r, n) => async (a) => {
      a && (a.preventDefault && a.preventDefault(), a.persist && a.persist());
      let y = $(f);
      if ((b.state.next({ isSubmitting: !0 }), s.resolver)) {
        const { errors: c, values: o } = await B();
        (t.errors = c), (y = o);
      } else await j(l);
      O(t.errors, "root"),
        U(t.errors)
          ? (b.state.next({ errors: {} }), await r(y, a))
          : (n && (await n({ ...t.errors }, a)), Re(), setTimeout(Re)),
        b.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: U(t.errors),
          submitCount: t.submitCount + 1,
          errors: t.errors,
        });
    },
    cr = (r, n = {}) => {
      d(l, r) &&
        (E(n.defaultValue)
          ? Q(r, d(u, r))
          : (Q(r, n.defaultValue), x(u, r, n.defaultValue)),
        n.keepTouched || O(t.touchedFields, r),
        n.keepDirty ||
          (O(t.dirtyFields, r),
          (t.isDirty = n.defaultValue ? V(r, d(u, r)) : V())),
        n.keepError || (O(t.errors, r), w.isValid && g()),
        b.state.next({ ...t }));
    },
    Be = (r, n = {}) => {
      const a = r ? $(r) : u,
        y = $(a),
        c = r && !U(r) ? y : u;
      if ((n.keepDefaultValues || (u = a), !n.keepValues)) {
        if (n.keepDirtyValues || K)
          for (const o of v.mount)
            d(t.dirtyFields, o) ? x(c, o, d(f, o)) : Q(o, d(c, o));
        else {
          if (Se && E(r))
            for (const o of v.mount) {
              const h = d(l, o);
              if (h && h._f) {
                const F = Array.isArray(h._f.refs) ? h._f.refs[0] : h._f.ref;
                if (ce(F)) {
                  const D = F.closest("form");
                  if (D) {
                    D.reset();
                    break;
                  }
                }
              }
            }
          l = {};
        }
        (f = e.shouldUnregister ? (n.keepDefaultValues ? $(u) : {}) : $(c)),
          b.array.next({ values: { ...c } }),
          b.values.next({ values: { ...c } });
      }
      (v = {
        mount: new Set(),
        unMount: new Set(),
        array: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: "",
      }),
        !_.mount && i(),
        (_.mount = !w.isValid || !!n.keepIsValid),
        (_.watch = !!e.shouldUnregister),
        b.state.next({
          submitCount: n.keepSubmitCount ? t.submitCount : 0,
          isDirty: n.keepDirty
            ? t.isDirty
            : !!(n.keepDefaultValues && !Y(r, u)),
          isSubmitted: n.keepIsSubmitted ? t.isSubmitted : !1,
          dirtyFields: n.keepDirtyValues
            ? t.dirtyFields
            : n.keepDefaultValues && r
            ? De(u, r)
            : {},
          touchedFields: n.keepTouched ? t.touchedFields : {},
          errors: n.keepErrors ? t.errors : {},
          isSubmitSuccessful: n.keepIsSubmitSuccessful
            ? t.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
        });
    },
    Pe = (r, n) => Be(G(r) ? r(f) : r, n);
  return {
    control: {
      register: be,
      unregister: Ve,
      getFieldState: Ce,
      handleSubmit: Me,
      setError: Ne,
      _executeSchema: B,
      _getWatch: m,
      _getDirty: V,
      _updateValid: g,
      _removeUnmounted: A,
      _updateFieldArray: q,
      _updateDisabledField: Ue,
      _getFieldArray: L,
      _reset: Be,
      _resetDefaultValues: () =>
        G(s.defaultValues) &&
        s.defaultValues().then((r) => {
          Pe(r, s.resetOptions), b.state.next({ isLoading: !1 });
        }),
      _updateFormState: (r) => {
        t = { ...t, ...r };
      },
      _subjects: b,
      _proxyFormState: w,
      get _fields() {
        return l;
      },
      get _formValues() {
        return f;
      },
      get _state() {
        return _;
      },
      set _state(r) {
        _ = r;
      },
      get _defaultValues() {
        return u;
      },
      get _names() {
        return v;
      },
      set _names(r) {
        v = r;
      },
      get _formState() {
        return t;
      },
      set _formState(r) {
        t = r;
      },
      get _options() {
        return s;
      },
      set _options(r) {
        s = { ...s, ...r };
      },
    },
    trigger: ne,
    register: be,
    handleSubmit: Me,
    watch: fr,
    setValue: Q,
    getValues: Le,
    reset: Pe,
    resetField: cr,
    clearErrors: or,
    unregister: Ve,
    setError: Ne,
    setFocus: (r, n = {}) => {
      const a = d(l, r),
        y = a && a._f;
      if (y) {
        const c = y.refs ? y.refs[0] : y.ref;
        c.focus && (c.focus(), n.shouldSelect && c.select());
      }
    },
    getFieldState: Ce,
  };
}
function Wr(e = {}) {
  const i = z.useRef(),
    s = z.useRef(),
    [t, l] = z.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: G(e.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      errors: {},
      defaultValues: G(e.defaultValues) ? void 0 : e.defaultValues,
    });
  i.current ||
    (i.current = { ...Lr(e, () => l((f) => ({ ...f }))), formState: t });
  const u = i.current.control;
  return (
    (u._options = e),
    xr({
      subject: u._subjects.state,
      next: (f) => {
        Ar(f, u._proxyFormState, u._updateFormState, !0) &&
          l({ ...u._formState });
      },
    }),
    z.useEffect(() => {
      e.values && !Y(e.values, s.current)
        ? (u._reset(e.values, u._options.resetOptions), (s.current = e.values))
        : u._resetDefaultValues();
    }, [e.values, u]),
    z.useEffect(() => {
      u._state.mount || (u._updateValid(), (u._state.mount = !0)),
        u._state.watch &&
          ((u._state.watch = !1), u._subjects.state.next({ ...u._formState })),
        u._removeUnmounted();
    }),
    (i.current.formState = br(t, u)),
    i.current
  );
}
var Ye = function (e, i, s) {
    if (e && "reportValidity" in e) {
      var t = d(s, i);
      e.setCustomValidity((t && t.message) || ""), e.reportValidity();
    }
  },
  lr = function (e, i) {
    var s = function (l) {
      var u = i.fields[l];
      u && u.ref && "reportValidity" in u.ref
        ? Ye(u.ref, l, e)
        : u.refs &&
          u.refs.forEach(function (f) {
            return Ye(f, l, e);
          });
    };
    for (var t in i.fields) s(t);
  },
  Cr = function (e, i) {
    i.shouldUseNativeValidation && lr(e, i);
    var s = {};
    for (var t in e) {
      var l = d(i.fields, t),
        u = Object.assign(e[t] || {}, { ref: l && l.ref });
      if (Ur(i.names || Object.keys(e), t)) {
        var f = Object.assign({}, Nr(d(s, t)));
        x(f, "root", u), x(s, t, f);
      } else x(s, t, u);
    }
    return s;
  },
  Nr = function (e) {
    return Array.isArray(e) ? e.filter(Boolean) : [];
  },
  Ur = function (e, i) {
    return e.some(function (s) {
      return s.startsWith(i + ".");
    });
  },
  Rr = function (e, i) {
    for (var s = {}; e.length; ) {
      var t = e[0],
        l = t.code,
        u = t.message,
        f = t.path.join(".");
      if (!s[f])
        if ("unionErrors" in t) {
          var _ = t.unionErrors[0].errors[0];
          s[f] = { message: _.message, type: _.code };
        } else s[f] = { message: u, type: l };
      if (
        ("unionErrors" in t &&
          t.unionErrors.forEach(function (H) {
            return H.errors.forEach(function (w) {
              return e.push(w);
            });
          }),
        i)
      ) {
        var v = s[f].types,
          k = v && v[t.code];
        s[f] = rr(f, i, s, l, k ? [].concat(k, t.message) : t.message);
      }
      e.shift();
    }
    return s;
  },
  $r = function (e, i, s) {
    return (
      s === void 0 && (s = {}),
      function (t, l, u) {
        try {
          return Promise.resolve(
            (function (f, _) {
              try {
                var v = Promise.resolve(
                  e[s.mode === "sync" ? "parse" : "parseAsync"](t, i),
                ).then(function (k) {
                  return (
                    u.shouldUseNativeValidation && lr({}, u),
                    { errors: {}, values: s.raw ? t : k }
                  );
                });
              } catch (k) {
                return _(k);
              }
              return v && v.then ? v.then(void 0, _) : v;
            })(0, function (f) {
              if (
                (function (_) {
                  return _.errors != null;
                })(f)
              )
                return {
                  values: {},
                  errors: Cr(
                    Rr(
                      f.errors,
                      !u.shouldUseNativeValidation && u.criteriaMode === "all",
                    ),
                    u,
                  ),
                };
              throw f;
            }),
          );
        } catch (f) {
          return Promise.reject(f);
        }
      }
    );
  };
const Mr = "_error_1a6vs_1",
  Br = { error: Mr },
  Hr = ({ error: e, className: i }) =>
    e &&
    je.jsx("div", {
      className: `${Br.error} ${i}`,
      children: je.jsx("p", { children: e }),
    });
export { Hr as E, $r as t, Wr as u };
