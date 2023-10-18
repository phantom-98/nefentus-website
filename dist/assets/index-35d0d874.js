import { j as T, r as Ae, u as Me } from "./index-aff6404b.js";
const $e = "_input_1fc7h_1",
  Pe = "_textarea_1fc7h_2",
  Ve = "_attachment_1fc7h_3",
  Le = "_inputWrapper_1fc7h_14",
  De = "_label_1fc7h_24",
  Ue = "_searchInput_1fc7h_45",
  ze = "_option_1fc7h_58",
  Be = "_body_1fc7h_66",
  We = "_dashboardLabel_1fc7h_98",
  qe = "_dashboardInput_1fc7h_102",
  Je = "_dashboardTextarea_1fc7h_103",
  Ye = "_hideInput_1fc7h_122",
  Z = {
    input: $e,
    textarea: Pe,
    attachment: Ve,
    inputWrapper: Le,
    label: De,
    searchInput: Ue,
    option: ze,
    body: Be,
    dashboardLabel: We,
    dashboardInput: qe,
    dashboardTextarea: Je,
    hideInput: Ye,
  },
  He = "/assets/dropdown-fa8fcfd0.svg",
  Ht = ({
    label: r,
    placeholder: e,
    value: t,
    setState: s,
    secure: n,
    disabled: a,
    dashboard: i,
    number: o,
    date: l,
    register: d,
    name: v,
    style: w,
  }) => {
    const ke = (Re) => {
        s && s(Re.target.value);
      },
      J = d !== void 0 && v !== void 0;
    return T.jsxs("div", {
      className: Z.inputWrapper,
      children: [
        r &&
          T.jsx("p", {
            className: `${Z.label} ${i ? Z.dashboardLabel : ""}`,
            children: r,
          }),
        T.jsx("input", {
          className: `${Z.input} ${i ? Z.dashboardInput : ""}`,
          type: n ? "password" : o ? "number" : l ? "date" : "text",
          placeholder: e,
          ...(J ? d(v) : null),
          value: t,
          style: w,
          onChange: ke,
          disabled: a,
        }),
      ],
    });
  },
  Gt = ({
    value: r,
    options: e = [],
    setValue: t,
    label: s = "",
    dashboard: n,
  }) => {
    const [a, i] = Ae.useState(!1),
      { t: o } = Me();
    return T.jsxs("div", {
      className: `${Z.inputWrapper} ${Z.option}`,
      children: [
        s &&
          s.length > 0 &&
          T.jsx("p", {
            className: `${Z.label} ${n ? Z.dashboardLabel : ""}`,
            children: s.length > 0 ? s : o("signUp.optionLabel"),
          }),
        T.jsxs("div", {
          className: `option ${Z.input} ${n ? Z.dashboardInput : ""}`,
          onClick: () => i((l) => !l),
          children: [
            r,
            " ",
            T.jsx("img", { src: He, alt: "dropdown" }),
            a &&
              T.jsx("div", {
                className: `card ${Z.body}`,
                children:
                  e.length > 0
                    ? e.map((l) =>
                        T.jsx("p", { onClick: () => t(l), children: l }, l),
                      )
                    : T.jsxs(T.Fragment, {
                        children: [
                          T.jsx(
                            "p",
                            {
                              onClick: () => t("Vendor"),
                              children: o("signUp.option1"),
                            },
                            "vendor",
                          ),
                          T.jsx(
                            "p",
                            {
                              onClick: () => t("Affiliate"),
                              children: o("signUp.option2"),
                            },
                            "affiliate",
                          ),
                          T.jsxs(
                            "p",
                            {
                              onClick: () => t("Vendor / Affiliate"),
                              children: [
                                o("signUp.option1"),
                                " / ",
                                o("signUp.option2"),
                              ],
                            },
                            "vendoraffiliate",
                          ),
                        ],
                      }),
              }),
          ],
        }),
      ],
    });
  };
var g;
(function (r) {
  r.assertEqual = (n) => n;
  function e(n) {}
  r.assertIs = e;
  function t(n) {
    throw new Error();
  }
  (r.assertNever = t),
    (r.arrayToEnum = (n) => {
      const a = {};
      for (const i of n) a[i] = i;
      return a;
    }),
    (r.getValidEnumValues = (n) => {
      const a = r.objectKeys(n).filter((o) => typeof n[n[o]] != "number"),
        i = {};
      for (const o of a) i[o] = n[o];
      return r.objectValues(i);
    }),
    (r.objectValues = (n) =>
      r.objectKeys(n).map(function (a) {
        return n[a];
      })),
    (r.objectKeys =
      typeof Object.keys == "function"
        ? (n) => Object.keys(n)
        : (n) => {
            const a = [];
            for (const i in n)
              Object.prototype.hasOwnProperty.call(n, i) && a.push(i);
            return a;
          }),
    (r.find = (n, a) => {
      for (const i of n) if (a(i)) return i;
    }),
    (r.isInteger =
      typeof Number.isInteger == "function"
        ? (n) => Number.isInteger(n)
        : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n);
  function s(n, a = " | ") {
    return n.map((i) => (typeof i == "string" ? `'${i}'` : i)).join(a);
  }
  (r.joinValues = s),
    (r.jsonStringifyReplacer = (n, a) =>
      typeof a == "bigint" ? a.toString() : a);
})(g || (g = {}));
var ve;
(function (r) {
  r.mergeShapes = (e, t) => ({ ...e, ...t });
})(ve || (ve = {}));
const u = g.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  A = (r) => {
    switch (typeof r) {
      case "undefined":
        return u.undefined;
      case "string":
        return u.string;
      case "number":
        return isNaN(r) ? u.nan : u.number;
      case "boolean":
        return u.boolean;
      case "function":
        return u.function;
      case "bigint":
        return u.bigint;
      case "symbol":
        return u.symbol;
      case "object":
        return Array.isArray(r)
          ? u.array
          : r === null
          ? u.null
          : r.then &&
            typeof r.then == "function" &&
            r.catch &&
            typeof r.catch == "function"
          ? u.promise
          : typeof Map < "u" && r instanceof Map
          ? u.map
          : typeof Set < "u" && r instanceof Set
          ? u.set
          : typeof Date < "u" && r instanceof Date
          ? u.date
          : u.object;
      default:
        return u.unknown;
    }
  },
  c = g.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]),
  Ge = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:");
class C extends Error {
  constructor(e) {
    super(),
      (this.issues = []),
      (this.addIssue = (s) => {
        this.issues = [...this.issues, s];
      }),
      (this.addIssues = (s = []) => {
        this.issues = [...this.issues, ...s];
      });
    const t = new.target.prototype;
    Object.setPrototypeOf
      ? Object.setPrototypeOf(this, t)
      : (this.__proto__ = t),
      (this.name = "ZodError"),
      (this.issues = e);
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const t =
        e ||
        function (a) {
          return a.message;
        },
      s = { _errors: [] },
      n = (a) => {
        for (const i of a.issues)
          if (i.code === "invalid_union") i.unionErrors.map(n);
          else if (i.code === "invalid_return_type") n(i.returnTypeError);
          else if (i.code === "invalid_arguments") n(i.argumentsError);
          else if (i.path.length === 0) s._errors.push(t(i));
          else {
            let o = s,
              l = 0;
            for (; l < i.path.length; ) {
              const d = i.path[l];
              l === i.path.length - 1
                ? ((o[d] = o[d] || { _errors: [] }), o[d]._errors.push(t(i)))
                : (o[d] = o[d] || { _errors: [] }),
                (o = o[d]),
                l++;
            }
          }
      };
    return n(this), s;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, g.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {},
      s = [];
    for (const n of this.issues)
      n.path.length > 0
        ? ((t[n.path[0]] = t[n.path[0]] || []), t[n.path[0]].push(e(n)))
        : s.push(e(n));
    return { formErrors: s, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
C.create = (r) => new C(r);
const Y = (r, e) => {
  let t;
  switch (r.code) {
    case c.invalid_type:
      r.received === u.undefined
        ? (t = "Required")
        : (t = `Expected ${r.expected}, received ${r.received}`);
      break;
    case c.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(
        r.expected,
        g.jsonStringifyReplacer,
      )}`;
      break;
    case c.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${g.joinValues(r.keys, ", ")}`;
      break;
    case c.invalid_union:
      t = "Invalid input";
      break;
    case c.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${g.joinValues(r.options)}`;
      break;
    case c.invalid_enum_value:
      t = `Invalid enum value. Expected ${g.joinValues(r.options)}, received '${
        r.received
      }'`;
      break;
    case c.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case c.invalid_return_type:
      t = "Invalid function return type";
      break;
    case c.invalid_date:
      t = "Invalid date";
      break;
    case c.invalid_string:
      typeof r.validation == "object"
        ? "includes" in r.validation
          ? ((t = `Invalid input: must include "${r.validation.includes}"`),
            typeof r.validation.position == "number" &&
              (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`))
          : "startsWith" in r.validation
          ? (t = `Invalid input: must start with "${r.validation.startsWith}"`)
          : "endsWith" in r.validation
          ? (t = `Invalid input: must end with "${r.validation.endsWith}"`)
          : g.assertNever(r.validation)
        : r.validation !== "regex"
        ? (t = `Invalid ${r.validation}`)
        : (t = "Invalid");
      break;
    case c.too_small:
      r.type === "array"
        ? (t = `Array must contain ${
            r.exact ? "exactly" : r.inclusive ? "at least" : "more than"
          } ${r.minimum} element(s)`)
        : r.type === "string"
        ? (t = `String must contain ${
            r.exact ? "exactly" : r.inclusive ? "at least" : "over"
          } ${r.minimum} character(s)`)
        : r.type === "number"
        ? (t = `Number must be ${
            r.exact
              ? "exactly equal to "
              : r.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${r.minimum}`)
        : r.type === "date"
        ? (t = `Date must be ${
            r.exact
              ? "exactly equal to "
              : r.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${new Date(Number(r.minimum))}`)
        : (t = "Invalid input");
      break;
    case c.too_big:
      r.type === "array"
        ? (t = `Array must contain ${
            r.exact ? "exactly" : r.inclusive ? "at most" : "less than"
          } ${r.maximum} element(s)`)
        : r.type === "string"
        ? (t = `String must contain ${
            r.exact ? "exactly" : r.inclusive ? "at most" : "under"
          } ${r.maximum} character(s)`)
        : r.type === "number"
        ? (t = `Number must be ${
            r.exact
              ? "exactly"
              : r.inclusive
              ? "less than or equal to"
              : "less than"
          } ${r.maximum}`)
        : r.type === "bigint"
        ? (t = `BigInt must be ${
            r.exact
              ? "exactly"
              : r.inclusive
              ? "less than or equal to"
              : "less than"
          } ${r.maximum}`)
        : r.type === "date"
        ? (t = `Date must be ${
            r.exact
              ? "exactly"
              : r.inclusive
              ? "smaller than or equal to"
              : "smaller than"
          } ${new Date(Number(r.maximum))}`)
        : (t = "Invalid input");
      break;
    case c.custom:
      t = "Invalid input";
      break;
    case c.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case c.not_multiple_of:
      t = `Number must be a multiple of ${r.multipleOf}`;
      break;
    case c.not_finite:
      t = "Number must be finite";
      break;
    default:
      (t = e.defaultError), g.assertNever(r);
  }
  return { message: t };
};
let Ze = Y;
function Xe(r) {
  Ze = r;
}
function oe() {
  return Ze;
}
const ce = (r) => {
    const { data: e, path: t, errorMaps: s, issueData: n } = r,
      a = [...t, ...(n.path || [])],
      i = { ...n, path: a };
    let o = "";
    const l = s
      .filter((d) => !!d)
      .slice()
      .reverse();
    for (const d of l) o = d(i, { data: e, defaultError: o }).message;
    return { ...n, path: a, message: n.message || o };
  },
  Qe = [];
function h(r, e) {
  const t = ce({
    issueData: e,
    data: r.data,
    path: r.path,
    errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, oe(), Y].filter(
      (s) => !!s,
    ),
  });
  r.common.issues.push(t);
}
class b {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const s = [];
    for (const n of t) {
      if (n.status === "aborted") return m;
      n.status === "dirty" && e.dirty(), s.push(n.value);
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, t) {
    const s = [];
    for (const n of t) s.push({ key: await n.key, value: await n.value });
    return b.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, t) {
    const s = {};
    for (const n of t) {
      const { key: a, value: i } = n;
      if (a.status === "aborted" || i.status === "aborted") return m;
      a.status === "dirty" && e.dirty(),
        i.status === "dirty" && e.dirty(),
        a.value !== "__proto__" &&
          (typeof i.value < "u" || n.alwaysSet) &&
          (s[a.value] = i.value);
    }
    return { status: e.value, value: s };
  }
}
const m = Object.freeze({ status: "aborted" }),
  Ne = (r) => ({ status: "dirty", value: r }),
  k = (r) => ({ status: "valid", value: r }),
  ge = (r) => r.status === "aborted",
  xe = (r) => r.status === "dirty",
  H = (r) => r.status === "valid",
  de = (r) => typeof Promise < "u" && r instanceof Promise;
var f;
(function (r) {
  (r.errToObj = (e) => (typeof e == "string" ? { message: e } : e || {})),
    (r.toString = (e) =>
      typeof e == "string" ? e : e == null ? void 0 : e.message);
})(f || (f = {}));
class E {
  constructor(e, t, s, n) {
    (this._cachedPath = []),
      (this.parent = e),
      (this.data = t),
      (this._path = s),
      (this._key = n);
  }
  get path() {
    return (
      this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const we = (r, e) => {
  if (H(e)) return { success: !0, data: e.value };
  if (!r.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const t = new C(r.common.issues);
      return (this._error = t), this._error;
    },
  };
};
function y(r) {
  if (!r) return {};
  const {
    errorMap: e,
    invalid_type_error: t,
    required_error: s,
    description: n,
  } = r;
  if (e && (t || s))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  return e
    ? { errorMap: e, description: n }
    : {
        errorMap: (i, o) =>
          i.code !== "invalid_type"
            ? { message: o.defaultError }
            : typeof o.data > "u"
            ? { message: s ?? o.defaultError }
            : { message: t ?? o.defaultError },
        description: n,
      };
}
class _ {
  constructor(e) {
    (this.spa = this.safeParseAsync),
      (this._def = e),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this));
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return A(e.data);
  }
  _getOrReturnCtx(e, t) {
    return (
      t || {
        common: e.parent.common,
        data: e.data,
        parsedType: A(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      }
    );
  }
  _processInputParams(e) {
    return {
      status: new b(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: A(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      },
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (de(t)) throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const s = this.safeParse(e, t);
    if (s.success) return s.data;
    throw s.error;
  }
  safeParse(e, t) {
    var s;
    const n = {
        common: {
          issues: [],
          async:
            (s = t == null ? void 0 : t.async) !== null && s !== void 0
              ? s
              : !1,
          contextualErrorMap: t == null ? void 0 : t.errorMap,
        },
        path: (t == null ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: A(e),
      },
      a = this._parseSync({ data: e, path: n.path, parent: n });
    return we(n, a);
  }
  async parseAsync(e, t) {
    const s = await this.safeParseAsync(e, t);
    if (s.success) return s.data;
    throw s.error;
  }
  async safeParseAsync(e, t) {
    const s = {
        common: {
          issues: [],
          contextualErrorMap: t == null ? void 0 : t.errorMap,
          async: !0,
        },
        path: (t == null ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: A(e),
      },
      n = this._parse({ data: e, path: s.path, parent: s }),
      a = await (de(n) ? n : Promise.resolve(n));
    return we(s, a);
  }
  refine(e, t) {
    const s = (n) =>
      typeof t == "string" || typeof t > "u"
        ? { message: t }
        : typeof t == "function"
        ? t(n)
        : t;
    return this._refinement((n, a) => {
      const i = e(n),
        o = () => a.addIssue({ code: c.custom, ...s(n) });
      return typeof Promise < "u" && i instanceof Promise
        ? i.then((l) => (l ? !0 : (o(), !1)))
        : i
        ? !0
        : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((s, n) =>
      e(s) ? !0 : (n.addIssue(typeof t == "function" ? t(s, n) : t), !1),
    );
  }
  _refinement(e) {
    return new O({
      schema: this,
      typeName: p.ZodEffects,
      effect: { type: "refinement", refinement: e },
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return j.create(this, this._def);
  }
  nullable() {
    return U.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return S.create(this, this._def);
  }
  promise() {
    return q.create(this, this._def);
  }
  or(e) {
    return K.create([this, e], this._def);
  }
  and(e) {
    return F.create(this, e, this._def);
  }
  transform(e) {
    return new O({
      ...y(this._def),
      schema: this,
      typeName: p.ZodEffects,
      effect: { type: "transform", transform: e },
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new ne({
      ...y(this._def),
      innerType: this,
      defaultValue: t,
      typeName: p.ZodDefault,
    });
  }
  brand() {
    return new Se({ typeName: p.ZodBranded, type: this, ...y(this._def) });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new fe({
      ...y(this._def),
      innerType: this,
      catchValue: t,
      typeName: p.ZodCatch,
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({ ...this._def, description: e });
  }
  pipe(e) {
    return ae.create(this, e);
  }
  readonly() {
    return me.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Ke = /^c[^\s-]{8,}$/i,
  Fe = /^[a-z][a-z0-9]*$/,
  et = /^[0-9A-HJKMNP-TV-Z]{26}$/,
  tt =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  rt =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  st = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let _e;
const nt =
    /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,
  at =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  it = (r) =>
    r.precision
      ? r.offset
        ? new RegExp(
            `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${r.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`,
          )
        : new RegExp(
            `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${r.precision}}Z$`,
          )
      : r.precision === 0
      ? r.offset
        ? new RegExp(
            "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$",
          )
        : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$")
      : r.offset
      ? new RegExp(
          "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$",
        )
      : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function ot(r, e) {
  return !!(
    ((e === "v4" || !e) && nt.test(r)) ||
    ((e === "v6" || !e) && at.test(r))
  );
}
class N extends _ {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = String(e.data)),
      this._getType(e) !== u.string)
    ) {
      const a = this._getOrReturnCtx(e);
      return (
        h(a, {
          code: c.invalid_type,
          expected: u.string,
          received: a.parsedType,
        }),
        m
      );
    }
    const s = new b();
    let n;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value &&
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            code: c.too_small,
            minimum: a.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: a.message,
          }),
          s.dirty());
      else if (a.kind === "max")
        e.data.length > a.value &&
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            code: c.too_big,
            maximum: a.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: a.message,
          }),
          s.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value,
          o = e.data.length < a.value;
        (i || o) &&
          ((n = this._getOrReturnCtx(e, n)),
          i
            ? h(n, {
                code: c.too_big,
                maximum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message,
              })
            : o &&
              h(n, {
                code: c.too_small,
                minimum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message,
              }),
          s.dirty());
      } else if (a.kind === "email")
        rt.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            validation: "email",
            code: c.invalid_string,
            message: a.message,
          }),
          s.dirty());
      else if (a.kind === "emoji")
        _e || (_e = new RegExp(st, "u")),
          _e.test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            h(n, {
              validation: "emoji",
              code: c.invalid_string,
              message: a.message,
            }),
            s.dirty());
      else if (a.kind === "uuid")
        tt.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            validation: "uuid",
            code: c.invalid_string,
            message: a.message,
          }),
          s.dirty());
      else if (a.kind === "cuid")
        Ke.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            validation: "cuid",
            code: c.invalid_string,
            message: a.message,
          }),
          s.dirty());
      else if (a.kind === "cuid2")
        Fe.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            validation: "cuid2",
            code: c.invalid_string,
            message: a.message,
          }),
          s.dirty());
      else if (a.kind === "ulid")
        et.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            validation: "ulid",
            code: c.invalid_string,
            message: a.message,
          }),
          s.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          (n = this._getOrReturnCtx(e, n)),
            h(n, {
              validation: "url",
              code: c.invalid_string,
              message: a.message,
            }),
            s.dirty();
        }
      else
        a.kind === "regex"
          ? ((a.regex.lastIndex = 0),
            a.regex.test(e.data) ||
              ((n = this._getOrReturnCtx(e, n)),
              h(n, {
                validation: "regex",
                code: c.invalid_string,
                message: a.message,
              }),
              s.dirty()))
          : a.kind === "trim"
          ? (e.data = e.data.trim())
          : a.kind === "includes"
          ? e.data.includes(a.value, a.position) ||
            ((n = this._getOrReturnCtx(e, n)),
            h(n, {
              code: c.invalid_string,
              validation: { includes: a.value, position: a.position },
              message: a.message,
            }),
            s.dirty())
          : a.kind === "toLowerCase"
          ? (e.data = e.data.toLowerCase())
          : a.kind === "toUpperCase"
          ? (e.data = e.data.toUpperCase())
          : a.kind === "startsWith"
          ? e.data.startsWith(a.value) ||
            ((n = this._getOrReturnCtx(e, n)),
            h(n, {
              code: c.invalid_string,
              validation: { startsWith: a.value },
              message: a.message,
            }),
            s.dirty())
          : a.kind === "endsWith"
          ? e.data.endsWith(a.value) ||
            ((n = this._getOrReturnCtx(e, n)),
            h(n, {
              code: c.invalid_string,
              validation: { endsWith: a.value },
              message: a.message,
            }),
            s.dirty())
          : a.kind === "datetime"
          ? it(a).test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            h(n, {
              code: c.invalid_string,
              validation: "datetime",
              message: a.message,
            }),
            s.dirty())
          : a.kind === "ip"
          ? ot(e.data, a.version) ||
            ((n = this._getOrReturnCtx(e, n)),
            h(n, {
              validation: "ip",
              code: c.invalid_string,
              message: a.message,
            }),
            s.dirty())
          : g.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _regex(e, t, s) {
    return this.refinement((n) => e.test(n), {
      validation: t,
      code: c.invalid_string,
      ...f.errToObj(s),
    });
  }
  _addCheck(e) {
    return new N({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...f.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...f.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...f.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...f.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...f.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...f.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...f.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...f.errToObj(e) });
  }
  datetime(e) {
    var t;
    return typeof e == "string"
      ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          message: e,
        })
      : this._addCheck({
          kind: "datetime",
          precision:
            typeof (e == null ? void 0 : e.precision) > "u"
              ? null
              : e == null
              ? void 0
              : e.precision,
          offset:
            (t = e == null ? void 0 : e.offset) !== null && t !== void 0
              ? t
              : !1,
          ...f.errToObj(e == null ? void 0 : e.message),
        });
  }
  regex(e, t) {
    return this._addCheck({ kind: "regex", regex: e, ...f.errToObj(t) });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...f.errToObj(t == null ? void 0 : t.message),
    });
  }
  startsWith(e, t) {
    return this._addCheck({ kind: "startsWith", value: e, ...f.errToObj(t) });
  }
  endsWith(e, t) {
    return this._addCheck({ kind: "endsWith", value: e, ...f.errToObj(t) });
  }
  min(e, t) {
    return this._addCheck({ kind: "min", value: e, ...f.errToObj(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: "max", value: e, ...f.errToObj(t) });
  }
  length(e, t) {
    return this._addCheck({ kind: "length", value: e, ...f.errToObj(t) });
  }
  nonempty(e) {
    return this.min(1, f.errToObj(e));
  }
  trim() {
    return new N({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    });
  }
  toLowerCase() {
    return new N({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    });
  }
  toUpperCase() {
    return new N({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
N.create = (r) => {
  var e;
  return new N({
    checks: [],
    typeName: p.ZodString,
    coerce:
      (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ...y(r),
  });
};
function ct(r, e) {
  const t = (r.toString().split(".")[1] || "").length,
    s = (e.toString().split(".")[1] || "").length,
    n = t > s ? t : s,
    a = parseInt(r.toFixed(n).replace(".", "")),
    i = parseInt(e.toFixed(n).replace(".", ""));
  return (a % i) / Math.pow(10, n);
}
class M extends _ {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = Number(e.data)),
      this._getType(e) !== u.number)
    ) {
      const a = this._getOrReturnCtx(e);
      return (
        h(a, {
          code: c.invalid_type,
          expected: u.number,
          received: a.parsedType,
        }),
        m
      );
    }
    let s;
    const n = new b();
    for (const a of this._def.checks)
      a.kind === "int"
        ? g.isInteger(e.data) ||
          ((s = this._getOrReturnCtx(e, s)),
          h(s, {
            code: c.invalid_type,
            expected: "integer",
            received: "float",
            message: a.message,
          }),
          n.dirty())
        : a.kind === "min"
        ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
          ((s = this._getOrReturnCtx(e, s)),
          h(s, {
            code: c.too_small,
            minimum: a.value,
            type: "number",
            inclusive: a.inclusive,
            exact: !1,
            message: a.message,
          }),
          n.dirty())
        : a.kind === "max"
        ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
          ((s = this._getOrReturnCtx(e, s)),
          h(s, {
            code: c.too_big,
            maximum: a.value,
            type: "number",
            inclusive: a.inclusive,
            exact: !1,
            message: a.message,
          }),
          n.dirty())
        : a.kind === "multipleOf"
        ? ct(e.data, a.value) !== 0 &&
          ((s = this._getOrReturnCtx(e, s)),
          h(s, {
            code: c.not_multiple_of,
            multipleOf: a.value,
            message: a.message,
          }),
          n.dirty())
        : a.kind === "finite"
        ? Number.isFinite(e.data) ||
          ((s = this._getOrReturnCtx(e, s)),
          h(s, { code: c.not_finite, message: a.message }),
          n.dirty())
        : g.assertNever(a);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, f.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, f.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, f.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, f.toString(t));
  }
  setLimit(e, t, s, n) {
    return new M({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: s, message: f.toString(n) },
      ],
    });
  }
  _addCheck(e) {
    return new M({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: "int", message: f.toString(e) });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: f.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: f.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: f.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: f.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: f.toString(t),
    });
  }
  finite(e) {
    return this._addCheck({ kind: "finite", message: f.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: f.toString(e),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: f.toString(e),
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find(
      (e) =>
        e.kind === "int" || (e.kind === "multipleOf" && g.isInteger(e.value)),
    );
  }
  get isFinite() {
    let e = null,
      t = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min"
        ? (t === null || s.value > t) && (t = s.value)
        : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
M.create = (r) =>
  new M({
    checks: [],
    typeName: p.ZodNumber,
    coerce: (r == null ? void 0 : r.coerce) || !1,
    ...y(r),
  });
class $ extends _ {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte);
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = BigInt(e.data)),
      this._getType(e) !== u.bigint)
    ) {
      const a = this._getOrReturnCtx(e);
      return (
        h(a, {
          code: c.invalid_type,
          expected: u.bigint,
          received: a.parsedType,
        }),
        m
      );
    }
    let s;
    const n = new b();
    for (const a of this._def.checks)
      a.kind === "min"
        ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
          ((s = this._getOrReturnCtx(e, s)),
          h(s, {
            code: c.too_small,
            type: "bigint",
            minimum: a.value,
            inclusive: a.inclusive,
            message: a.message,
          }),
          n.dirty())
        : a.kind === "max"
        ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
          ((s = this._getOrReturnCtx(e, s)),
          h(s, {
            code: c.too_big,
            type: "bigint",
            maximum: a.value,
            inclusive: a.inclusive,
            message: a.message,
          }),
          n.dirty())
        : a.kind === "multipleOf"
        ? e.data % a.value !== BigInt(0) &&
          ((s = this._getOrReturnCtx(e, s)),
          h(s, {
            code: c.not_multiple_of,
            multipleOf: a.value,
            message: a.message,
          }),
          n.dirty())
        : g.assertNever(a);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, f.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, f.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, f.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, f.toString(t));
  }
  setLimit(e, t, s, n) {
    return new $({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: s, message: f.toString(n) },
      ],
    });
  }
  _addCheck(e) {
    return new $({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: f.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: f.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: f.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: f.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: f.toString(t),
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
$.create = (r) => {
  var e;
  return new $({
    checks: [],
    typeName: p.ZodBigInt,
    coerce:
      (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ...y(r),
  });
};
class G extends _ {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = !!e.data), this._getType(e) !== u.boolean)
    ) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, {
          code: c.invalid_type,
          expected: u.boolean,
          received: s.parsedType,
        }),
        m
      );
    }
    return k(e.data);
  }
}
G.create = (r) =>
  new G({
    typeName: p.ZodBoolean,
    coerce: (r == null ? void 0 : r.coerce) || !1,
    ...y(r),
  });
class L extends _ {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = new Date(e.data)),
      this._getType(e) !== u.date)
    ) {
      const a = this._getOrReturnCtx(e);
      return (
        h(a, {
          code: c.invalid_type,
          expected: u.date,
          received: a.parsedType,
        }),
        m
      );
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return h(a, { code: c.invalid_date }), m;
    }
    const s = new b();
    let n;
    for (const a of this._def.checks)
      a.kind === "min"
        ? e.data.getTime() < a.value &&
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            code: c.too_small,
            message: a.message,
            inclusive: !0,
            exact: !1,
            minimum: a.value,
            type: "date",
          }),
          s.dirty())
        : a.kind === "max"
        ? e.data.getTime() > a.value &&
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            code: c.too_big,
            message: a.message,
            inclusive: !0,
            exact: !1,
            maximum: a.value,
            type: "date",
          }),
          s.dirty())
        : g.assertNever(a);
    return { status: s.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new L({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: f.toString(t),
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: f.toString(t),
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
L.create = (r) =>
  new L({
    checks: [],
    coerce: (r == null ? void 0 : r.coerce) || !1,
    typeName: p.ZodDate,
    ...y(r),
  });
class ue extends _ {
  _parse(e) {
    if (this._getType(e) !== u.symbol) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, {
          code: c.invalid_type,
          expected: u.symbol,
          received: s.parsedType,
        }),
        m
      );
    }
    return k(e.data);
  }
}
ue.create = (r) => new ue({ typeName: p.ZodSymbol, ...y(r) });
class X extends _ {
  _parse(e) {
    if (this._getType(e) !== u.undefined) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, {
          code: c.invalid_type,
          expected: u.undefined,
          received: s.parsedType,
        }),
        m
      );
    }
    return k(e.data);
  }
}
X.create = (r) => new X({ typeName: p.ZodUndefined, ...y(r) });
class Q extends _ {
  _parse(e) {
    if (this._getType(e) !== u.null) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, {
          code: c.invalid_type,
          expected: u.null,
          received: s.parsedType,
        }),
        m
      );
    }
    return k(e.data);
  }
}
Q.create = (r) => new Q({ typeName: p.ZodNull, ...y(r) });
class W extends _ {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(e) {
    return k(e.data);
  }
}
W.create = (r) => new W({ typeName: p.ZodAny, ...y(r) });
class V extends _ {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(e) {
    return k(e.data);
  }
}
V.create = (r) => new V({ typeName: p.ZodUnknown, ...y(r) });
class R extends _ {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return (
      h(t, { code: c.invalid_type, expected: u.never, received: t.parsedType }),
      m
    );
  }
}
R.create = (r) => new R({ typeName: p.ZodNever, ...y(r) });
class le extends _ {
  _parse(e) {
    if (this._getType(e) !== u.undefined) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, {
          code: c.invalid_type,
          expected: u.void,
          received: s.parsedType,
        }),
        m
      );
    }
    return k(e.data);
  }
}
le.create = (r) => new le({ typeName: p.ZodVoid, ...y(r) });
class S extends _ {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e),
      n = this._def;
    if (t.parsedType !== u.array)
      return (
        h(t, {
          code: c.invalid_type,
          expected: u.array,
          received: t.parsedType,
        }),
        m
      );
    if (n.exactLength !== null) {
      const i = t.data.length > n.exactLength.value,
        o = t.data.length < n.exactLength.value;
      (i || o) &&
        (h(t, {
          code: i ? c.too_big : c.too_small,
          minimum: o ? n.exactLength.value : void 0,
          maximum: i ? n.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: n.exactLength.message,
        }),
        s.dirty());
    }
    if (
      (n.minLength !== null &&
        t.data.length < n.minLength.value &&
        (h(t, {
          code: c.too_small,
          minimum: n.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: n.minLength.message,
        }),
        s.dirty()),
      n.maxLength !== null &&
        t.data.length > n.maxLength.value &&
        (h(t, {
          code: c.too_big,
          maximum: n.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: n.maxLength.message,
        }),
        s.dirty()),
      t.common.async)
    )
      return Promise.all(
        [...t.data].map((i, o) => n.type._parseAsync(new E(t, i, t.path, o))),
      ).then((i) => b.mergeArray(s, i));
    const a = [...t.data].map((i, o) =>
      n.type._parseSync(new E(t, i, t.path, o)),
    );
    return b.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new S({
      ...this._def,
      minLength: { value: e, message: f.toString(t) },
    });
  }
  max(e, t) {
    return new S({
      ...this._def,
      maxLength: { value: e, message: f.toString(t) },
    });
  }
  length(e, t) {
    return new S({
      ...this._def,
      exactLength: { value: e, message: f.toString(t) },
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
S.create = (r, e) =>
  new S({
    type: r,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: p.ZodArray,
    ...y(e),
  });
function z(r) {
  if (r instanceof x) {
    const e = {};
    for (const t in r.shape) {
      const s = r.shape[t];
      e[t] = j.create(z(s));
    }
    return new x({ ...r._def, shape: () => e });
  } else
    return r instanceof S
      ? new S({ ...r._def, type: z(r.element) })
      : r instanceof j
      ? j.create(z(r.unwrap()))
      : r instanceof U
      ? U.create(z(r.unwrap()))
      : r instanceof I
      ? I.create(r.items.map((e) => z(e)))
      : r;
}
class x extends _ {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend);
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const e = this._def.shape(),
      t = g.objectKeys(e);
    return (this._cached = { shape: e, keys: t });
  }
  _parse(e) {
    if (this._getType(e) !== u.object) {
      const d = this._getOrReturnCtx(e);
      return (
        h(d, {
          code: c.invalid_type,
          expected: u.object,
          received: d.parsedType,
        }),
        m
      );
    }
    const { status: s, ctx: n } = this._processInputParams(e),
      { shape: a, keys: i } = this._getCached(),
      o = [];
    if (!(this._def.catchall instanceof R && this._def.unknownKeys === "strip"))
      for (const d in n.data) i.includes(d) || o.push(d);
    const l = [];
    for (const d of i) {
      const v = a[d],
        w = n.data[d];
      l.push({
        key: { status: "valid", value: d },
        value: v._parse(new E(n, w, n.path, d)),
        alwaysSet: d in n.data,
      });
    }
    if (this._def.catchall instanceof R) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const v of o)
          l.push({
            key: { status: "valid", value: v },
            value: { status: "valid", value: n.data[v] },
          });
      else if (d === "strict")
        o.length > 0 &&
          (h(n, { code: c.unrecognized_keys, keys: o }), s.dirty());
      else if (d !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const v of o) {
        const w = n.data[v];
        l.push({
          key: { status: "valid", value: v },
          value: d._parse(new E(n, w, n.path, v)),
          alwaysSet: v in n.data,
        });
      }
    }
    return n.common.async
      ? Promise.resolve()
          .then(async () => {
            const d = [];
            for (const v of l) {
              const w = await v.key;
              d.push({ key: w, value: await v.value, alwaysSet: v.alwaysSet });
            }
            return d;
          })
          .then((d) => b.mergeObjectSync(s, d))
      : b.mergeObjectSync(s, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return (
      f.errToObj,
      new x({
        ...this._def,
        unknownKeys: "strict",
        ...(e !== void 0
          ? {
              errorMap: (t, s) => {
                var n, a, i, o;
                const l =
                  (i =
                    (a = (n = this._def).errorMap) === null || a === void 0
                      ? void 0
                      : a.call(n, t, s).message) !== null && i !== void 0
                    ? i
                    : s.defaultError;
                return t.code === "unrecognized_keys"
                  ? {
                      message:
                        (o = f.errToObj(e).message) !== null && o !== void 0
                          ? o
                          : l,
                    }
                  : { message: l };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new x({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new x({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(e) {
    return new x({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...e }),
    });
  }
  merge(e) {
    return new x({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: p.ZodObject,
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  catchall(e) {
    return new x({ ...this._def, catchall: e });
  }
  pick(e) {
    const t = {};
    return (
      g.objectKeys(e).forEach((s) => {
        e[s] && this.shape[s] && (t[s] = this.shape[s]);
      }),
      new x({ ...this._def, shape: () => t })
    );
  }
  omit(e) {
    const t = {};
    return (
      g.objectKeys(this.shape).forEach((s) => {
        e[s] || (t[s] = this.shape[s]);
      }),
      new x({ ...this._def, shape: () => t })
    );
  }
  deepPartial() {
    return z(this);
  }
  partial(e) {
    const t = {};
    return (
      g.objectKeys(this.shape).forEach((s) => {
        const n = this.shape[s];
        e && !e[s] ? (t[s] = n) : (t[s] = n.optional());
      }),
      new x({ ...this._def, shape: () => t })
    );
  }
  required(e) {
    const t = {};
    return (
      g.objectKeys(this.shape).forEach((s) => {
        if (e && !e[s]) t[s] = this.shape[s];
        else {
          let a = this.shape[s];
          for (; a instanceof j; ) a = a._def.innerType;
          t[s] = a;
        }
      }),
      new x({ ...this._def, shape: () => t })
    );
  }
  keyof() {
    return Ce(g.objectKeys(this.shape));
  }
}
x.create = (r, e) =>
  new x({
    shape: () => r,
    unknownKeys: "strip",
    catchall: R.create(),
    typeName: p.ZodObject,
    ...y(e),
  });
x.strictCreate = (r, e) =>
  new x({
    shape: () => r,
    unknownKeys: "strict",
    catchall: R.create(),
    typeName: p.ZodObject,
    ...y(e),
  });
x.lazycreate = (r, e) =>
  new x({
    shape: r,
    unknownKeys: "strip",
    catchall: R.create(),
    typeName: p.ZodObject,
    ...y(e),
  });
class K extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      s = this._def.options;
    function n(a) {
      for (const o of a) if (o.result.status === "valid") return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new C(o.ctx.common.issues));
      return h(t, { code: c.invalid_union, unionErrors: i }), m;
    }
    if (t.common.async)
      return Promise.all(
        s.map(async (a) => {
          const i = { ...t, common: { ...t.common, issues: [] }, parent: null };
          return {
            result: await a._parseAsync({
              data: t.data,
              path: t.path,
              parent: i,
            }),
            ctx: i,
          };
        }),
      ).then(n);
    {
      let a;
      const i = [];
      for (const l of s) {
        const d = { ...t, common: { ...t.common, issues: [] }, parent: null },
          v = l._parseSync({ data: t.data, path: t.path, parent: d });
        if (v.status === "valid") return v;
        v.status === "dirty" && !a && (a = { result: v, ctx: d }),
          d.common.issues.length && i.push(d.common.issues);
      }
      if (a) return t.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((l) => new C(l));
      return h(t, { code: c.invalid_union, unionErrors: o }), m;
    }
  }
  get options() {
    return this._def.options;
  }
}
K.create = (r, e) => new K({ options: r, typeName: p.ZodUnion, ...y(e) });
const ie = (r) =>
  r instanceof te
    ? ie(r.schema)
    : r instanceof O
    ? ie(r.innerType())
    : r instanceof re
    ? [r.value]
    : r instanceof P
    ? r.options
    : r instanceof se
    ? Object.keys(r.enum)
    : r instanceof ne
    ? ie(r._def.innerType)
    : r instanceof X
    ? [void 0]
    : r instanceof Q
    ? [null]
    : null;
class ye extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== u.object)
      return (
        h(t, {
          code: c.invalid_type,
          expected: u.object,
          received: t.parsedType,
        }),
        m
      );
    const s = this.discriminator,
      n = t.data[s],
      a = this.optionsMap.get(n);
    return a
      ? t.common.async
        ? a._parseAsync({ data: t.data, path: t.path, parent: t })
        : a._parseSync({ data: t.data, path: t.path, parent: t })
      : (h(t, {
          code: c.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [s],
        }),
        m);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(e, t, s) {
    const n = new Map();
    for (const a of t) {
      const i = ie(a.shape[e]);
      if (!i)
        throw new Error(
          `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
        );
      for (const o of i) {
        if (n.has(o))
          throw new Error(
            `Discriminator property ${String(e)} has duplicate value ${String(
              o,
            )}`,
          );
        n.set(o, a);
      }
    }
    return new ye({
      typeName: p.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: n,
      ...y(s),
    });
  }
}
function be(r, e) {
  const t = A(r),
    s = A(e);
  if (r === e) return { valid: !0, data: r };
  if (t === u.object && s === u.object) {
    const n = g.objectKeys(e),
      a = g.objectKeys(r).filter((o) => n.indexOf(o) !== -1),
      i = { ...r, ...e };
    for (const o of a) {
      const l = be(r[o], e[o]);
      if (!l.valid) return { valid: !1 };
      i[o] = l.data;
    }
    return { valid: !0, data: i };
  } else if (t === u.array && s === u.array) {
    if (r.length !== e.length) return { valid: !1 };
    const n = [];
    for (let a = 0; a < r.length; a++) {
      const i = r[a],
        o = e[a],
        l = be(i, o);
      if (!l.valid) return { valid: !1 };
      n.push(l.data);
    }
    return { valid: !0, data: n };
  } else
    return t === u.date && s === u.date && +r == +e
      ? { valid: !0, data: r }
      : { valid: !1 };
}
class F extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e),
      n = (a, i) => {
        if (ge(a) || ge(i)) return m;
        const o = be(a.value, i.value);
        return o.valid
          ? ((xe(a) || xe(i)) && t.dirty(), { status: t.value, value: o.data })
          : (h(s, { code: c.invalid_intersection_types }), m);
      };
    return s.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: s.data, path: s.path, parent: s }),
          this._def.right._parseAsync({
            data: s.data,
            path: s.path,
            parent: s,
          }),
        ]).then(([a, i]) => n(a, i))
      : n(
          this._def.left._parseSync({ data: s.data, path: s.path, parent: s }),
          this._def.right._parseSync({ data: s.data, path: s.path, parent: s }),
        );
  }
}
F.create = (r, e, t) =>
  new F({ left: r, right: e, typeName: p.ZodIntersection, ...y(t) });
class I extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== u.array)
      return (
        h(s, {
          code: c.invalid_type,
          expected: u.array,
          received: s.parsedType,
        }),
        m
      );
    if (s.data.length < this._def.items.length)
      return (
        h(s, {
          code: c.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        m
      );
    !this._def.rest &&
      s.data.length > this._def.items.length &&
      (h(s, {
        code: c.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
      t.dirty());
    const a = [...s.data]
      .map((i, o) => {
        const l = this._def.items[o] || this._def.rest;
        return l ? l._parse(new E(s, i, s.path, o)) : null;
      })
      .filter((i) => !!i);
    return s.common.async
      ? Promise.all(a).then((i) => b.mergeArray(t, i))
      : b.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new I({ ...this._def, rest: e });
  }
}
I.create = (r, e) => {
  if (!Array.isArray(r))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new I({ items: r, typeName: p.ZodTuple, rest: null, ...y(e) });
};
class ee extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== u.object)
      return (
        h(s, {
          code: c.invalid_type,
          expected: u.object,
          received: s.parsedType,
        }),
        m
      );
    const n = [],
      a = this._def.keyType,
      i = this._def.valueType;
    for (const o in s.data)
      n.push({
        key: a._parse(new E(s, o, s.path, o)),
        value: i._parse(new E(s, s.data[o], s.path, o)),
      });
    return s.common.async ? b.mergeObjectAsync(t, n) : b.mergeObjectSync(t, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, s) {
    return t instanceof _
      ? new ee({ keyType: e, valueType: t, typeName: p.ZodRecord, ...y(s) })
      : new ee({
          keyType: N.create(),
          valueType: e,
          typeName: p.ZodRecord,
          ...y(t),
        });
  }
}
class he extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== u.map)
      return (
        h(s, { code: c.invalid_type, expected: u.map, received: s.parsedType }),
        m
      );
    const n = this._def.keyType,
      a = this._def.valueType,
      i = [...s.data.entries()].map(([o, l], d) => ({
        key: n._parse(new E(s, o, s.path, [d, "key"])),
        value: a._parse(new E(s, l, s.path, [d, "value"])),
      }));
    if (s.common.async) {
      const o = new Map();
      return Promise.resolve().then(async () => {
        for (const l of i) {
          const d = await l.key,
            v = await l.value;
          if (d.status === "aborted" || v.status === "aborted") return m;
          (d.status === "dirty" || v.status === "dirty") && t.dirty(),
            o.set(d.value, v.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = new Map();
      for (const l of i) {
        const d = l.key,
          v = l.value;
        if (d.status === "aborted" || v.status === "aborted") return m;
        (d.status === "dirty" || v.status === "dirty") && t.dirty(),
          o.set(d.value, v.value);
      }
      return { status: t.value, value: o };
    }
  }
}
he.create = (r, e, t) =>
  new he({ valueType: e, keyType: r, typeName: p.ZodMap, ...y(t) });
class D extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== u.set)
      return (
        h(s, { code: c.invalid_type, expected: u.set, received: s.parsedType }),
        m
      );
    const n = this._def;
    n.minSize !== null &&
      s.data.size < n.minSize.value &&
      (h(s, {
        code: c.too_small,
        minimum: n.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: n.minSize.message,
      }),
      t.dirty()),
      n.maxSize !== null &&
        s.data.size > n.maxSize.value &&
        (h(s, {
          code: c.too_big,
          maximum: n.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: n.maxSize.message,
        }),
        t.dirty());
    const a = this._def.valueType;
    function i(l) {
      const d = new Set();
      for (const v of l) {
        if (v.status === "aborted") return m;
        v.status === "dirty" && t.dirty(), d.add(v.value);
      }
      return { status: t.value, value: d };
    }
    const o = [...s.data.values()].map((l, d) =>
      a._parse(new E(s, l, s.path, d)),
    );
    return s.common.async ? Promise.all(o).then((l) => i(l)) : i(o);
  }
  min(e, t) {
    return new D({
      ...this._def,
      minSize: { value: e, message: f.toString(t) },
    });
  }
  max(e, t) {
    return new D({
      ...this._def,
      maxSize: { value: e, message: f.toString(t) },
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
D.create = (r, e) =>
  new D({
    valueType: r,
    minSize: null,
    maxSize: null,
    typeName: p.ZodSet,
    ...y(e),
  });
class B extends _ {
  constructor() {
    super(...arguments), (this.validate = this.implement);
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== u.function)
      return (
        h(t, {
          code: c.invalid_type,
          expected: u.function,
          received: t.parsedType,
        }),
        m
      );
    function s(o, l) {
      return ce({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          oe(),
          Y,
        ].filter((d) => !!d),
        issueData: { code: c.invalid_arguments, argumentsError: l },
      });
    }
    function n(o, l) {
      return ce({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          oe(),
          Y,
        ].filter((d) => !!d),
        issueData: { code: c.invalid_return_type, returnTypeError: l },
      });
    }
    const a = { errorMap: t.common.contextualErrorMap },
      i = t.data;
    if (this._def.returns instanceof q) {
      const o = this;
      return k(async function (...l) {
        const d = new C([]),
          v = await o._def.args.parseAsync(l, a).catch((J) => {
            throw (d.addIssue(s(l, J)), d);
          }),
          w = await Reflect.apply(i, this, v);
        return await o._def.returns._def.type.parseAsync(w, a).catch((J) => {
          throw (d.addIssue(n(w, J)), d);
        });
      });
    } else {
      const o = this;
      return k(function (...l) {
        const d = o._def.args.safeParse(l, a);
        if (!d.success) throw new C([s(l, d.error)]);
        const v = Reflect.apply(i, this, d.data),
          w = o._def.returns.safeParse(v, a);
        if (!w.success) throw new C([n(v, w.error)]);
        return w.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new B({ ...this._def, args: I.create(e).rest(V.create()) });
  }
  returns(e) {
    return new B({ ...this._def, returns: e });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, s) {
    return new B({
      args: e || I.create([]).rest(V.create()),
      returns: t || V.create(),
      typeName: p.ZodFunction,
      ...y(s),
    });
  }
}
class te extends _ {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
te.create = (r, e) => new te({ getter: r, typeName: p.ZodLazy, ...y(e) });
class re extends _ {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return (
        h(t, {
          received: t.data,
          code: c.invalid_literal,
          expected: this._def.value,
        }),
        m
      );
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
re.create = (r, e) => new re({ value: r, typeName: p.ZodLiteral, ...y(e) });
function Ce(r, e) {
  return new P({ values: r, typeName: p.ZodEnum, ...y(e) });
}
class P extends _ {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e),
        s = this._def.values;
      return (
        h(t, {
          expected: g.joinValues(s),
          received: t.parsedType,
          code: c.invalid_type,
        }),
        m
      );
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const t = this._getOrReturnCtx(e),
        s = this._def.values;
      return (
        h(t, { received: t.data, code: c.invalid_enum_value, options: s }), m
      );
    }
    return k(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  extract(e) {
    return P.create(e);
  }
  exclude(e) {
    return P.create(this.options.filter((t) => !e.includes(t)));
  }
}
P.create = Ce;
class se extends _ {
  _parse(e) {
    const t = g.getValidEnumValues(this._def.values),
      s = this._getOrReturnCtx(e);
    if (s.parsedType !== u.string && s.parsedType !== u.number) {
      const n = g.objectValues(t);
      return (
        h(s, {
          expected: g.joinValues(n),
          received: s.parsedType,
          code: c.invalid_type,
        }),
        m
      );
    }
    if (t.indexOf(e.data) === -1) {
      const n = g.objectValues(t);
      return (
        h(s, { received: s.data, code: c.invalid_enum_value, options: n }), m
      );
    }
    return k(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
se.create = (r, e) => new se({ values: r, typeName: p.ZodNativeEnum, ...y(e) });
class q extends _ {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== u.promise && t.common.async === !1)
      return (
        h(t, {
          code: c.invalid_type,
          expected: u.promise,
          received: t.parsedType,
        }),
        m
      );
    const s = t.parsedType === u.promise ? t.data : Promise.resolve(t.data);
    return k(
      s.then((n) =>
        this._def.type.parseAsync(n, {
          path: t.path,
          errorMap: t.common.contextualErrorMap,
        }),
      ),
    );
  }
}
q.create = (r, e) => new q({ type: r, typeName: p.ZodPromise, ...y(e) });
class O extends _ {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === p.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e),
      n = this._def.effect || null,
      a = {
        addIssue: (i) => {
          h(s, i), i.fatal ? t.abort() : t.dirty();
        },
        get path() {
          return s.path;
        },
      };
    if (((a.addIssue = a.addIssue.bind(a)), n.type === "preprocess")) {
      const i = n.transform(s.data, a);
      return s.common.issues.length
        ? { status: "dirty", value: s.data }
        : s.common.async
        ? Promise.resolve(i).then((o) =>
            this._def.schema._parseAsync({ data: o, path: s.path, parent: s }),
          )
        : this._def.schema._parseSync({ data: i, path: s.path, parent: s });
    }
    if (n.type === "refinement") {
      const i = (o) => {
        const l = n.refinement(o, a);
        if (s.common.async) return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return o;
      };
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        return o.status === "aborted"
          ? m
          : (o.status === "dirty" && t.dirty(),
            i(o.value),
            { status: t.value, value: o.value });
      } else
        return this._def.schema
          ._parseAsync({ data: s.data, path: s.path, parent: s })
          .then((o) =>
            o.status === "aborted"
              ? m
              : (o.status === "dirty" && t.dirty(),
                i(o.value).then(() => ({ status: t.value, value: o.value }))),
          );
    }
    if (n.type === "transform")
      if (s.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        if (!H(i)) return i;
        const o = n.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return { status: t.value, value: o };
      } else
        return this._def.schema
          ._parseAsync({ data: s.data, path: s.path, parent: s })
          .then((i) =>
            H(i)
              ? Promise.resolve(n.transform(i.value, a)).then((o) => ({
                  status: t.value,
                  value: o,
                }))
              : i,
          );
    g.assertNever(n);
  }
}
O.create = (r, e, t) =>
  new O({ schema: r, typeName: p.ZodEffects, effect: e, ...y(t) });
O.createWithPreprocess = (r, e, t) =>
  new O({
    schema: e,
    effect: { type: "preprocess", transform: r },
    typeName: p.ZodEffects,
    ...y(t),
  });
class j extends _ {
  _parse(e) {
    return this._getType(e) === u.undefined
      ? k(void 0)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
j.create = (r, e) => new j({ innerType: r, typeName: p.ZodOptional, ...y(e) });
class U extends _ {
  _parse(e) {
    return this._getType(e) === u.null
      ? k(null)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
U.create = (r, e) => new U({ innerType: r, typeName: p.ZodNullable, ...y(e) });
class ne extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let s = t.data;
    return (
      t.parsedType === u.undefined && (s = this._def.defaultValue()),
      this._def.innerType._parse({ data: s, path: t.path, parent: t })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ne.create = (r, e) =>
  new ne({
    innerType: r,
    typeName: p.ZodDefault,
    defaultValue: typeof e.default == "function" ? e.default : () => e.default,
    ...y(e),
  });
class fe extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      s = { ...t, common: { ...t.common, issues: [] } },
      n = this._def.innerType._parse({
        data: s.data,
        path: s.path,
        parent: { ...s },
      });
    return de(n)
      ? n.then((a) => ({
          status: "valid",
          value:
            a.status === "valid"
              ? a.value
              : this._def.catchValue({
                  get error() {
                    return new C(s.common.issues);
                  },
                  input: s.data,
                }),
        }))
      : {
          status: "valid",
          value:
            n.status === "valid"
              ? n.value
              : this._def.catchValue({
                  get error() {
                    return new C(s.common.issues);
                  },
                  input: s.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
fe.create = (r, e) =>
  new fe({
    innerType: r,
    typeName: p.ZodCatch,
    catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
    ...y(e),
  });
class pe extends _ {
  _parse(e) {
    if (this._getType(e) !== u.nan) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, { code: c.invalid_type, expected: u.nan, received: s.parsedType }),
        m
      );
    }
    return { status: "valid", value: e.data };
  }
}
pe.create = (r) => new pe({ typeName: p.ZodNaN, ...y(r) });
const dt = Symbol("zod_brand");
class Se extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      s = t.data;
    return this._def.type._parse({ data: s, path: t.path, parent: t });
  }
  unwrap() {
    return this._def.type;
  }
}
class ae extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        return a.status === "aborted"
          ? m
          : a.status === "dirty"
          ? (t.dirty(), Ne(a.value))
          : this._def.out._parseAsync({
              data: a.value,
              path: s.path,
              parent: s,
            });
      })();
    {
      const n = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s,
      });
      return n.status === "aborted"
        ? m
        : n.status === "dirty"
        ? (t.dirty(), { status: "dirty", value: n.value })
        : this._def.out._parseSync({ data: n.value, path: s.path, parent: s });
    }
  }
  static create(e, t) {
    return new ae({ in: e, out: t, typeName: p.ZodPipeline });
  }
}
class me extends _ {
  _parse(e) {
    const t = this._def.innerType._parse(e);
    return H(t) && (t.value = Object.freeze(t.value)), t;
  }
}
me.create = (r, e) =>
  new me({ innerType: r, typeName: p.ZodReadonly, ...y(e) });
const Oe = (r, e = {}, t) =>
    r
      ? W.create().superRefine((s, n) => {
          var a, i;
          if (!r(s)) {
            const o =
                typeof e == "function"
                  ? e(s)
                  : typeof e == "string"
                  ? { message: e }
                  : e,
              l =
                (i = (a = o.fatal) !== null && a !== void 0 ? a : t) !== null &&
                i !== void 0
                  ? i
                  : !0,
              d = typeof o == "string" ? { message: o } : o;
            n.addIssue({ code: "custom", ...d, fatal: l });
          }
        })
      : W.create(),
  ut = { object: x.lazycreate };
var p;
(function (r) {
  (r.ZodString = "ZodString"),
    (r.ZodNumber = "ZodNumber"),
    (r.ZodNaN = "ZodNaN"),
    (r.ZodBigInt = "ZodBigInt"),
    (r.ZodBoolean = "ZodBoolean"),
    (r.ZodDate = "ZodDate"),
    (r.ZodSymbol = "ZodSymbol"),
    (r.ZodUndefined = "ZodUndefined"),
    (r.ZodNull = "ZodNull"),
    (r.ZodAny = "ZodAny"),
    (r.ZodUnknown = "ZodUnknown"),
    (r.ZodNever = "ZodNever"),
    (r.ZodVoid = "ZodVoid"),
    (r.ZodArray = "ZodArray"),
    (r.ZodObject = "ZodObject"),
    (r.ZodUnion = "ZodUnion"),
    (r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (r.ZodIntersection = "ZodIntersection"),
    (r.ZodTuple = "ZodTuple"),
    (r.ZodRecord = "ZodRecord"),
    (r.ZodMap = "ZodMap"),
    (r.ZodSet = "ZodSet"),
    (r.ZodFunction = "ZodFunction"),
    (r.ZodLazy = "ZodLazy"),
    (r.ZodLiteral = "ZodLiteral"),
    (r.ZodEnum = "ZodEnum"),
    (r.ZodEffects = "ZodEffects"),
    (r.ZodNativeEnum = "ZodNativeEnum"),
    (r.ZodOptional = "ZodOptional"),
    (r.ZodNullable = "ZodNullable"),
    (r.ZodDefault = "ZodDefault"),
    (r.ZodCatch = "ZodCatch"),
    (r.ZodPromise = "ZodPromise"),
    (r.ZodBranded = "ZodBranded"),
    (r.ZodPipeline = "ZodPipeline"),
    (r.ZodReadonly = "ZodReadonly");
})(p || (p = {}));
const lt = (r, e = { message: `Input not instance of ${r.name}` }) =>
    Oe((t) => t instanceof r, e),
  Ee = N.create,
  Ie = M.create,
  ht = pe.create,
  ft = $.create,
  je = G.create,
  pt = L.create,
  mt = ue.create,
  yt = X.create,
  _t = Q.create,
  vt = W.create,
  gt = V.create,
  xt = R.create,
  bt = le.create,
  kt = S.create,
  wt = x.create,
  Tt = x.strictCreate,
  Zt = K.create,
  Nt = ye.create,
  Ct = F.create,
  St = I.create,
  Ot = ee.create,
  Et = he.create,
  It = D.create,
  jt = B.create,
  Rt = te.create,
  At = re.create,
  Mt = P.create,
  $t = se.create,
  Pt = q.create,
  Te = O.create,
  Vt = j.create,
  Lt = U.create,
  Dt = O.createWithPreprocess,
  Ut = ae.create,
  zt = () => Ee().optional(),
  Bt = () => Ie().optional(),
  Wt = () => je().optional(),
  qt = {
    string: (r) => N.create({ ...r, coerce: !0 }),
    number: (r) => M.create({ ...r, coerce: !0 }),
    boolean: (r) => G.create({ ...r, coerce: !0 }),
    bigint: (r) => $.create({ ...r, coerce: !0 }),
    date: (r) => L.create({ ...r, coerce: !0 }),
  },
  Jt = m;
var Xt = Object.freeze({
  __proto__: null,
  defaultErrorMap: Y,
  setErrorMap: Xe,
  getErrorMap: oe,
  makeIssue: ce,
  EMPTY_PATH: Qe,
  addIssueToContext: h,
  ParseStatus: b,
  INVALID: m,
  DIRTY: Ne,
  OK: k,
  isAborted: ge,
  isDirty: xe,
  isValid: H,
  isAsync: de,
  get util() {
    return g;
  },
  get objectUtil() {
    return ve;
  },
  ZodParsedType: u,
  getParsedType: A,
  ZodType: _,
  ZodString: N,
  ZodNumber: M,
  ZodBigInt: $,
  ZodBoolean: G,
  ZodDate: L,
  ZodSymbol: ue,
  ZodUndefined: X,
  ZodNull: Q,
  ZodAny: W,
  ZodUnknown: V,
  ZodNever: R,
  ZodVoid: le,
  ZodArray: S,
  ZodObject: x,
  ZodUnion: K,
  ZodDiscriminatedUnion: ye,
  ZodIntersection: F,
  ZodTuple: I,
  ZodRecord: ee,
  ZodMap: he,
  ZodSet: D,
  ZodFunction: B,
  ZodLazy: te,
  ZodLiteral: re,
  ZodEnum: P,
  ZodNativeEnum: se,
  ZodPromise: q,
  ZodEffects: O,
  ZodTransformer: O,
  ZodOptional: j,
  ZodNullable: U,
  ZodDefault: ne,
  ZodCatch: fe,
  ZodNaN: pe,
  BRAND: dt,
  ZodBranded: Se,
  ZodPipeline: ae,
  ZodReadonly: me,
  custom: Oe,
  Schema: _,
  ZodSchema: _,
  late: ut,
  get ZodFirstPartyTypeKind() {
    return p;
  },
  coerce: qt,
  any: vt,
  array: kt,
  bigint: ft,
  boolean: je,
  date: pt,
  discriminatedUnion: Nt,
  effect: Te,
  enum: Mt,
  function: jt,
  instanceof: lt,
  intersection: Ct,
  lazy: Rt,
  literal: At,
  map: Et,
  nan: ht,
  nativeEnum: $t,
  never: xt,
  null: _t,
  nullable: Lt,
  number: Ie,
  object: wt,
  oboolean: Wt,
  onumber: Bt,
  optional: Vt,
  ostring: zt,
  pipeline: Ut,
  preprocess: Dt,
  promise: Pt,
  record: Ot,
  set: It,
  strictObject: Tt,
  string: Ee,
  symbol: mt,
  transformer: Te,
  tuple: St,
  undefined: yt,
  union: Zt,
  unknown: gt,
  void: bt,
  NEVER: Jt,
  ZodIssueCode: c,
  quotelessJson: Ge,
  ZodError: C,
});
export { Ht as I, Gt as O, Xt as z };
