var G = /* @__PURE__ */ ((r) => (r[r.BIG_ENDIAN = 0] = "BIG_ENDIAN", r[r.LITTLE_ENDIAN = 1] = "LITTLE_ENDIAN", r))(G || {});
class B {
  constructor(t) {
    this.buf = new Uint8Array(t), this.pos = 0, this.byteOrder = 0;
  }
  /**
   * Creates a new ByteBuffer with the given capacity
   */
  static allocate(t) {
    return new B(t);
  }
  /**
   * Creates a new ByteBuffer that wraps the given array
   */
  static wrap(t) {
    const e = new B(t.length);
    return e.buf.set(t), e;
  }
  /**
   * Sets this buffer's byte order
   */
  order(t) {
    return this.byteOrder = t, this;
  }
  /**
   * Sets or gets this buffer's position
   */
  position(t) {
    if (t === void 0)
      return this.pos;
    if (t < 0 || t > this.buf.length)
      throw new Error("Invalid position, position: " + t + ", length: " + this.buf.length);
    return this.pos = t, this;
  }
  /**
   * Returns this buffer's capacity
   */
  capacity() {
    return this.buf.length;
  }
  /**
   * Writes a byte or bytes into this buffer
   */
  put(t, e, s) {
    if (typeof t == "number") {
      if (this.pos >= this.buf.length)
        throw new Error("Buffer overflow");
      return this.buf[this.pos++] = t & 255, this;
    }
    const n = e || 0, i = s || t.length;
    if (n < 0 || n > t.length)
      throw new Error("Invalid offset");
    if (i < 0 || n + i > t.length)
      throw new Error("Invalid length");
    if (this.pos + i > this.buf.length)
      throw new Error("Buffer overflow");
    return this.buf.set(t.subarray(n, n + i), this.pos), this.pos += i, this;
  }
  /**
   * Writes an integer into this buffer
   */
  putInt(t) {
    if (this.pos + 4 > this.buf.length)
      throw new Error("Buffer overflow");
    return this.byteOrder === 0 ? (this.buf[this.pos++] = t >>> 24 & 255, this.buf[this.pos++] = t >>> 16 & 255, this.buf[this.pos++] = t >>> 8 & 255, this.buf[this.pos++] = t & 255) : (this.buf[this.pos++] = t & 255, this.buf[this.pos++] = t >>> 8 & 255, this.buf[this.pos++] = t >>> 16 & 255, this.buf[this.pos++] = t >>> 24 & 255), this;
  }
  /**
   * Gets bytes from the buffer into the destination array
   */
  get(t) {
    if (this.pos + t.length > this.buf.length)
      throw new Error("Buffer underflow");
    for (let e = 0; e < t.length; e++)
      t[e] = this.buf[this.pos++];
    return this;
  }
  /**
   * Gets a single byte from the buffer
   */
  get_() {
    if (this.pos >= this.buf.length)
      throw new Error("Buffer underflow");
    return this.buf[this.pos++];
  }
  /**
   * Returns a copy of the backing array
   */
  array() {
    return new Uint8Array(this.buf);
  }
  /**
   * Rewinds this buffer. Sets the position to zero
   */
  rewind() {
    return this.pos = 0, this;
  }
}
const at = "0123456789abcdef";
class d {
  /**
   * Create a copy of a byte array
   */
  static copyOf(t, e) {
    const s = new Uint8Array(e);
    return s.set(t.slice(0, e)), s;
  }
  /**
   * Convert a hexadecimal string to a byte array
   * @param hex The hexadecimal string to convert
   */
  static hexToBytes(t) {
    let e = t.toLowerCase();
    e.startsWith("0x") && (e = e.slice(2)), e.length % 2 !== 0 && (e = "0" + e);
    const s = new Uint8Array(e.length / 2);
    for (let n = 0; n < e.length; n += 2)
      s[n / 2] = parseInt(e.slice(n, n + 2), 16);
    return s;
  }
  /**
   * Compares two byte arrays
   */
  static compareBytes(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let s = 0; s < t.length; s++)
      if (t[s] !== e[s])
        return !1;
    return !0;
  }
  /**
   * Reads little-endian unsigned values from a buffer
   */
  static readLittleEndianUnsigned(t, e = 8) {
    const s = new Uint8Array(e);
    t.get(s);
    let n = 0n;
    for (let i = e - 1; i >= 0; i--)
      n = n << 8n | BigInt(s[i]);
    return n;
  }
  /**
   * Trims address for display
   */
  static trimAddress(t) {
    return `${t.substring(0, 32)}...${t.substring(t.length - 24)}`;
  }
  /**
   * Converts number to little-endian bytes
   */
  static numberToLittleEndian(t, e) {
    const s = new Uint8Array(e);
    let n = t;
    for (let i = 0; i < e; i++)
      s[i] = n & 255, n = n >>> 8;
    return s;
  }
  /**
   * Converts byte array to little-endian
   */
  static bytesToLittleEndian(t) {
    const e = new Uint8Array(t.length);
    for (let s = 0; s < t.length; s++)
      e[s] = t[t.length - 1 - s];
    return e;
  }
  /**
   * Fits byte array or string to specified length
   */
  static fit(t, e) {
    if (typeof t == "string") {
      const i = BigInt(t), o = new Uint8Array(e);
      let h = i;
      for (let l = 0; l < e; l++)
        o[l] = Number(h & 0xffn), h >>= 8n;
      return o;
    }
    const s = new Uint8Array(e), n = Math.min(t.length, e);
    return s.set(t.subarray(0, n)), s;
  }
  /**
   * Convert a byte array to its hexadecimal string representation
   * @param bytes The byte array to convert
   * @param offset Optional starting offset in the byte array
   * @param length Optional number of bytes to convert
   */
  static bytesToHex(t, e = 0, s = t.length) {
    const n = new Array(s * 2);
    for (let i = 0; i < s; i++) {
      const o = t[i + e] & 255;
      n[i * 2] = at[o >>> 4], n[i * 2 + 1] = at[o & 15];
    }
    return n.join("");
  }
  /**
   * Convert a number to a byte array of specified length
   * @param value The number to convert
   * @param length The desired length of the resulting byte array
   */
  static toBytes(t, e) {
    const s = t.toString(16).padStart(e * 2, "0");
    return d.hexToBytes(s);
  }
  /**
   * Convert a byte array to little-endian format
   * @param value The byte array to convert
   * @param offset Optional starting offset
   * @param length Optional number of bytes to convert
   */
  static toLittleEndian(t, e = 0, s = t.length) {
    const n = new Uint8Array(s);
    n.set(t.slice(e, e + s));
    for (let i = 0; i < n.length >> 1; i++) {
      const o = n[i];
      n[i] = n[n.length - i - 1], n[n.length - i - 1] = o;
    }
    return n;
  }
  /**
   * Clear a byte array by filling it with zeros
   */
  static clear(t) {
    t.fill(0);
  }
  /**
       * Compare two byte arrays for equality
       */
  static areEqual(t, e) {
    if (t.length !== e.length) return !1;
    for (let s = 0; s < t.length; s++)
      if (t[s] !== e[s]) return !1;
    return !0;
  }
}
function lt(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error("positive integer expected, got " + r);
}
function Lt(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function Q(r, ...t) {
  if (!Lt(r))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + r.length);
}
function V(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function At(r, t) {
  Q(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error("digestInto() expects output buffer of length at least " + e);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Bt = (r) => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4)), z = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength), H = (r, t) => r << 32 - t | r >>> t, D = (r, t) => r << t | r >>> 32 - t >>> 0, dt = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, Nt = (r) => r << 24 & 4278190080 | r << 8 & 16711680 | r >>> 8 & 65280 | r >>> 24 & 255;
function ct(r) {
  for (let t = 0; t < r.length; t++)
    r[t] = Nt(r[t]);
}
function Ht(r) {
  if (typeof r != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof r);
  return new Uint8Array(new TextEncoder().encode(r));
}
function tt(r) {
  return typeof r == "string" && (r = Ht(r)), Q(r), r;
}
class bt {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function et(r) {
  const t = (s) => r().update(tt(s)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function _t(r, t, e, s) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, s);
  const n = BigInt(32), i = BigInt(4294967295), o = Number(e >> n & i), h = Number(e & i), l = s ? 4 : 0, a = s ? 0 : 4;
  r.setUint32(t + l, o, s), r.setUint32(t + a, h, s);
}
const Gt = (r, t, e) => r & t ^ ~r & e, vt = (r, t, e) => r & t ^ r & e ^ t & e;
class yt extends bt {
  constructor(t, e, s, n) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = s, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = z(this.buffer);
  }
  update(t) {
    V(this);
    const { view: e, buffer: s, blockLen: n } = this;
    t = tt(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const h = Math.min(n - this.pos, i - o);
      if (h === n) {
        const l = z(t);
        for (; n <= i - o; o += n)
          this.process(l, o);
        continue;
      }
      s.set(t.subarray(o, o + h), this.pos), this.pos += h, o += h, this.pos === n && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    V(this), At(t, this), this.finished = !0;
    const { buffer: e, view: s, blockLen: n, isLE: i } = this;
    let { pos: o } = this;
    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > n - o && (this.process(s, 0), o = 0);
    for (let c = o; c < n; c++)
      e[c] = 0;
    _t(s, n - 8, BigInt(this.length * 8), i), this.process(s, 0);
    const h = z(t), l = this.outputLen;
    if (l % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const a = l / 4, u = this.get();
    if (a > u.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let c = 0; c < a; c++)
      h.setUint32(4 * c, u[c], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const s = t.slice(0, e);
    return this.destroy(), s;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: s, length: n, finished: i, destroyed: o, pos: h } = this;
    return t.length = n, t.pos = h, t.finished = i, t.destroyed = o, n % e && t.buffer.set(s), t;
  }
}
const kt = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), v = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), k = /* @__PURE__ */ new Uint32Array(64);
class Wt extends yt {
  constructor() {
    super(64, 32, 8, !1), this.A = v[0] | 0, this.B = v[1] | 0, this.C = v[2] | 0, this.D = v[3] | 0, this.E = v[4] | 0, this.F = v[5] | 0, this.G = v[6] | 0, this.H = v[7] | 0;
  }
  get() {
    const { A: t, B: e, C: s, D: n, E: i, F: o, G: h, H: l } = this;
    return [t, e, s, n, i, o, h, l];
  }
  // prettier-ignore
  set(t, e, s, n, i, o, h, l) {
    this.A = t | 0, this.B = e | 0, this.C = s | 0, this.D = n | 0, this.E = i | 0, this.F = o | 0, this.G = h | 0, this.H = l | 0;
  }
  process(t, e) {
    for (let c = 0; c < 16; c++, e += 4)
      k[c] = t.getUint32(e, !1);
    for (let c = 16; c < 64; c++) {
      const w = k[c - 15], f = k[c - 2], p = H(w, 7) ^ H(w, 18) ^ w >>> 3, A = H(f, 17) ^ H(f, 19) ^ f >>> 10;
      k[c] = A + k[c - 7] + p + k[c - 16] | 0;
    }
    let { A: s, B: n, C: i, D: o, E: h, F: l, G: a, H: u } = this;
    for (let c = 0; c < 64; c++) {
      const w = H(h, 6) ^ H(h, 11) ^ H(h, 25), f = u + w + Gt(h, l, a) + kt[c] + k[c] | 0, A = (H(s, 2) ^ H(s, 13) ^ H(s, 22)) + vt(s, n, i) | 0;
      u = a, a = l, l = h, h = o + f | 0, o = i, i = n, n = s, s = f + A | 0;
    }
    s = s + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, h = h + this.E | 0, l = l + this.F | 0, a = a + this.G | 0, u = u + this.H | 0, this.set(s, n, i, o, h, l, a, u);
  }
  roundClean() {
    k.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Ft = /* @__PURE__ */ et(() => new Wt()), R = /* @__PURE__ */ BigInt(2 ** 32 - 1), ut = /* @__PURE__ */ BigInt(32);
function Ct(r, t = !1) {
  return t ? { h: Number(r & R), l: Number(r >> ut & R) } : { h: Number(r >> ut & R) | 0, l: Number(r & R) | 0 };
}
function Ot(r, t = !1) {
  let e = new Uint32Array(r.length), s = new Uint32Array(r.length);
  for (let n = 0; n < r.length; n++) {
    const { h: i, l: o } = Ct(r[n], t);
    [e[n], s[n]] = [i, o];
  }
  return [e, s];
}
const Dt = (r, t, e) => r << e | t >>> 32 - e, Rt = (r, t, e) => t << e | r >>> 32 - e, Mt = (r, t, e) => t << e - 32 | r >>> 64 - e, Pt = (r, t, e) => r << e - 32 | t >>> 64 - e, Tt = [], Et = [], pt = [], Yt = /* @__PURE__ */ BigInt(0), O = /* @__PURE__ */ BigInt(1), Vt = /* @__PURE__ */ BigInt(2), $t = /* @__PURE__ */ BigInt(7), Kt = /* @__PURE__ */ BigInt(256), Xt = /* @__PURE__ */ BigInt(113);
for (let r = 0, t = O, e = 1, s = 0; r < 24; r++) {
  [e, s] = [s, (2 * e + 3 * s) % 5], Tt.push(2 * (5 * s + e)), Et.push((r + 1) * (r + 2) / 2 % 64);
  let n = Yt;
  for (let i = 0; i < 7; i++)
    t = (t << O ^ (t >> $t) * Xt) % Kt, t & Vt && (n ^= O << (O << /* @__PURE__ */ BigInt(i)) - O);
  pt.push(n);
}
const [jt, zt] = /* @__PURE__ */ Ot(pt, !0), ft = (r, t, e) => e > 32 ? Mt(r, t, e) : Dt(r, t, e), gt = (r, t, e) => e > 32 ? Pt(r, t, e) : Rt(r, t, e);
function qt(r, t = 24) {
  const e = new Uint32Array(10);
  for (let s = 24 - t; s < 24; s++) {
    for (let o = 0; o < 10; o++)
      e[o] = r[o] ^ r[o + 10] ^ r[o + 20] ^ r[o + 30] ^ r[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const h = (o + 8) % 10, l = (o + 2) % 10, a = e[l], u = e[l + 1], c = ft(a, u, 1) ^ e[h], w = gt(a, u, 1) ^ e[h + 1];
      for (let f = 0; f < 50; f += 10)
        r[o + f] ^= c, r[o + f + 1] ^= w;
    }
    let n = r[2], i = r[3];
    for (let o = 0; o < 24; o++) {
      const h = Et[o], l = ft(n, i, h), a = gt(n, i, h), u = Tt[o];
      n = r[u], i = r[u + 1], r[u] = l, r[u + 1] = a;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let h = 0; h < 10; h++)
        e[h] = r[o + h];
      for (let h = 0; h < 10; h++)
        r[o + h] ^= ~e[(h + 2) % 10] & e[(h + 4) % 10];
    }
    r[0] ^= jt[s], r[1] ^= zt[s];
  }
  e.fill(0);
}
class st extends bt {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, s, n = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = s, this.enableXOF = n, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, lt(s), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Bt(this.state);
  }
  keccak() {
    dt || ct(this.state32), qt(this.state32, this.rounds), dt || ct(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    V(this);
    const { blockLen: e, state: s } = this;
    t = tt(t);
    const n = t.length;
    for (let i = 0; i < n; ) {
      const o = Math.min(e - this.pos, n - i);
      for (let h = 0; h < o; h++)
        s[this.pos++] ^= t[i++];
      this.pos === e && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: e, pos: s, blockLen: n } = this;
    t[s] ^= e, e & 128 && s === n - 1 && this.keccak(), t[n - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    V(this, !1), Q(t), this.finish();
    const e = this.state, { blockLen: s } = this;
    for (let n = 0, i = t.length; n < i; ) {
      this.posOut >= s && this.keccak();
      const o = Math.min(s - this.posOut, i - n);
      t.set(e.subarray(this.posOut, this.posOut + o), n), this.posOut += o, n += o;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return lt(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (At(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: e, suffix: s, outputLen: n, rounds: i, enableXOF: o } = this;
    return t || (t = new st(e, s, n, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = s, t.outputLen = n, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const Jt = (r, t, e) => et(() => new st(t, r, e)), Zt = /* @__PURE__ */ Jt(6, 72, 512 / 8), Qt = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), St = /* @__PURE__ */ new Uint8Array(new Array(16).fill(0).map((r, t) => t)), te = /* @__PURE__ */ St.map((r) => (9 * r + 5) % 16);
let rt = [St], nt = [te];
for (let r = 0; r < 4; r++)
  for (let t of [rt, nt])
    t.push(t[r].map((e) => Qt[e]));
const It = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((r) => new Uint8Array(r)), ee = /* @__PURE__ */ rt.map((r, t) => r.map((e) => It[t][e])), se = /* @__PURE__ */ nt.map((r, t) => r.map((e) => It[t][e])), re = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), ne = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function wt(r, t, e, s) {
  return r === 0 ? t ^ e ^ s : r === 1 ? t & e | ~t & s : r === 2 ? (t | ~e) ^ s : r === 3 ? t & s | e & ~s : t ^ (e | ~s);
}
const M = /* @__PURE__ */ new Uint32Array(16);
class ie extends yt {
  constructor() {
    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: t, h1: e, h2: s, h3: n, h4: i } = this;
    return [t, e, s, n, i];
  }
  set(t, e, s, n, i) {
    this.h0 = t | 0, this.h1 = e | 0, this.h2 = s | 0, this.h3 = n | 0, this.h4 = i | 0;
  }
  process(t, e) {
    for (let f = 0; f < 16; f++, e += 4)
      M[f] = t.getUint32(e, !0);
    let s = this.h0 | 0, n = s, i = this.h1 | 0, o = i, h = this.h2 | 0, l = h, a = this.h3 | 0, u = a, c = this.h4 | 0, w = c;
    for (let f = 0; f < 5; f++) {
      const p = 4 - f, A = re[f], U = ne[f], N = rt[f], E = nt[f], b = ee[f], L = se[f];
      for (let _ = 0; _ < 16; _++) {
        const j = D(s + wt(f, i, h, a) + M[N[_]] + A, b[_]) + c | 0;
        s = c, c = a, a = D(h, 10) | 0, h = i, i = j;
      }
      for (let _ = 0; _ < 16; _++) {
        const j = D(n + wt(p, o, l, u) + M[E[_]] + U, L[_]) + w | 0;
        n = w, w = u, u = D(l, 10) | 0, l = o, o = j;
      }
    }
    this.set(this.h1 + h + u | 0, this.h2 + a + w | 0, this.h3 + c + n | 0, this.h4 + s + o | 0, this.h0 + i + l | 0);
  }
  roundClean() {
    M.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const oe = /* @__PURE__ */ et(() => new ie());
class S {
  constructor(t = "sha256") {
    this.algorithm = t, this.hasher = this.createHasher(t);
  }
  createHasher(t) {
    switch (t.toLowerCase()) {
      case "sha256":
        return Ft.create();
      case "sha3-512":
        return Zt.create();
      case "ripemd160":
        return oe.create();
      default:
        throw new Error(`Unsupported hash algorithm: ${t}`);
    }
  }
  /**
   * Updates the hash with the given data
   */
  update(t, e = 0, s = t.length) {
    if (e < 0 || e > t.length)
      throw new Error("Invalid offset");
    if (s < 0 || e + s > t.length)
      throw new Error("Invalid length");
    const n = t.subarray(e, e + s);
    this.hasher.update(n);
  }
  /**
   * Returns the final hash value
   */
  digest() {
    const t = this.hasher.digest();
    return this.hasher = this.createHasher(this.algorithm), t;
  }
  static hash(t, e, s) {
    const n = new S();
    return e !== void 0 && s !== void 0 ? n.update(new Uint8Array(t.subarray(e, e + s))) : n.update(new Uint8Array(t)), n.digest();
  }
  static hashWith(t, e) {
    const s = new S(t);
    return s.update(e), s.digest();
  }
}
const X = class X {
  /**
   * Set chain address in the address buffer
   */
  static setChainAddr(t, e) {
    t.position(20), t.putInt(e);
  }
  /**
   * Set hash address in the address buffer
   */
  static setHashAddr(t, e) {
    t.position(24), t.putInt(e);
  }
  /**
   * Set key and mask in the address buffer
   */
  static setKeyAndMask(t, e) {
    t.position(28), t.putInt(e);
  }
  /**
   * Convert address buffer to bytes in little-endian format
   */
  static addrToBytes(t) {
    t.position(0);
    const e = new Uint8Array(t.capacity());
    for (let s = 0; s < e.length; s += 4) {
      const n = t.get_(), i = t.get_(), o = t.get_(), h = t.get_();
      e[s] = h, e[s + 1] = o, e[s + 2] = i, e[s + 3] = n;
    }
    return e;
  }
  /**
   * PRF function
   */
  static prf(t, e, s, n) {
    const i = new Uint8Array(96), o = new Uint8Array(32);
    o[31] = this.XMSS_HASH_PADDING_PRF, i.set(o, 0), i.set(n, 32), i.set(s, 64);
    const h = new S();
    h.update(i);
    const l = h.digest();
    return t.set(l, e), t;
  }
  /**
   * F hash function
   */
  static thashF(t, e, s, n, i, o) {
    const h = new Uint8Array(96), l = new Uint8Array(32);
    l[31] = this.XMSS_HASH_PADDING_F, h.set(l, 0), this.setKeyAndMask(o, 0);
    let a = this.addrToBytes(o);
    this.prf(h, 32, a, i), this.setKeyAndMask(o, 1), a = this.addrToBytes(o);
    const u = new Uint8Array(32);
    this.prf(u, 0, a, i);
    for (let f = 0; f < 32; f++)
      h[64 + f] = s[f + n] ^ u[f];
    const c = new S();
    c.update(h);
    const w = c.digest();
    t.set(w, e);
  }
};
X.XMSS_HASH_PADDING_F = 0, X.XMSS_HASH_PADDING_PRF = 3;
let W = X;
const F = class F {
  /**
   * Gets the tag from an address
   */
  static getTag(t) {
    if (t.length !== 2208)
      throw new Error("Invalid address length");
    const e = new Uint8Array(F.TAG_LENGTH);
    return e.set(t.subarray(t.length - F.TAG_LENGTH)), e;
  }
  /**
   * Checks if a tag is all zeros
   */
  static isZero(t) {
    return !t || t.length !== F.TAG_LENGTH ? !1 : t.every((e) => e === 0);
  }
  /**
   * Validates a tag
   */
  static isValid(t) {
    return !(!t || t.length !== F.TAG_LENGTH);
  }
  /**
   * Tags an address with the specified tag
   */
  static tag(t, e) {
    if (!this.isValid(e))
      throw new Error("Invalid tag");
    if (t.length !== 2208)
      throw new Error("Invalid address length");
    if (e.length !== 12)
      throw new Error("Invalid tag length");
    const s = new Uint8Array(t);
    return s.set(e, s.length - e.length), s;
  }
};
F.TAG_LENGTH = 12;
let $ = F;
const T = class T {
  /**
   * Generates chains for WOTS
   */
  static gen_chain(t, e, s, n, i, o, h, l) {
    t.set(s.subarray(n, n + T.PARAMSN), e);
    for (let a = i; a < i + o && a < 16; a++)
      W.setHashAddr(l, a), W.thashF(t, e, t, e, h, l);
  }
  /**
   * Expands seed into WOTS private key
   */
  static expand_seed(t, e) {
    for (let s = 0; s < T.WOTSLEN; s++) {
      const n = d.toBytes(s, 32);
      W.prf(t, s * 32, n, e);
    }
  }
  /**
   * Converts message to base w (convenience overload)
   */
  static base_w(t, e) {
    return this.base_w_(t, e, 0, e.length);
  }
  /**
   * Converts message to base w
   */
  static base_w_(t, e, s = 0, n = e.length) {
    let i = 0, o = 0, h = 0, l = 0;
    for (let a = 0; a < n; a++)
      l === 0 && (h = t[i++], l += 8), l -= 4, e[o++ + s] = h >> l & 15;
    return e;
  }
  /**
   * Computes WOTS checksum
   */
  static wotsChecksum(t, e) {
    let s = 0;
    for (let i = 0; i < 64; i++)
      s += 15 - t[i];
    s <<= 4;
    const n = new Uint8Array(2);
    return n[0] = s >> 8 & 255, n[1] = s & 255, this.base_w_(n, t, e, t.length - e);
  }
  /**
   * Computes chain lengths
   */
  static chain_lengths(t, e) {
    const s = this.base_w_(t, e, 0, 64);
    return this.wotsChecksum(s, 64);
  }
  /**
   * Generates WOTS public key
   */
  static wots_pkgen(t, e, s, n, i) {
    this.expand_seed(t, e);
    const o = B.wrap(i);
    o.order(G.LITTLE_ENDIAN);
    for (let h = 0; h < T.WOTSLEN; h++)
      W.setChainAddr(o, h), this.gen_chain(t, h * 32, t, h * 32, 0, 15, s.subarray(n), o);
  }
  /**
   * Signs a message using WOTS
   */
  static wots_sign(t, e, s, n, i, o) {
    const h = new Array(T.WOTSLEN);
    this.chain_lengths(e, h), this.expand_seed(t, s);
    const l = B.wrap(o);
    l.order(G.LITTLE_ENDIAN);
    for (let a = 0; a < T.WOTSLEN; a++)
      W.setChainAddr(l, a), this.gen_chain(t, a * 32, t, a * 32, 0, h[a], n.subarray(i), l);
  }
  /**
   * Verifies a WOTS signature
   */
  static wots_pk_from_sig(t, e, s, n) {
    const i = new Uint8Array(T.WOTSSIGBYTES), o = new Array(T.WOTSLEN), h = new Uint8Array(n), l = B.wrap(h);
    l.order(G.LITTLE_ENDIAN), this.chain_lengths(e, o);
    for (let a = 0; a < T.WOTSLEN; a++)
      W.setChainAddr(l, a), this.gen_chain(i, a * 32, t, a * 32, o[a], 15 - o[a], s, l);
    return i;
  }
  /**
   * Generates a WOTS address using the componentsGenerator. 
   * Note:: use you own componentsGenerator that fills in deterministic bytes if you want to generate a specific address
   */
  static generateAddress(t, e, s) {
    if (!s)
      throw new Error("Invalid componentsGenerator");
    if (e.length !== 32)
      throw new Error("Invalid secret length");
    if (t !== null && t.length !== 12)
      throw new Error("Invalid tag");
    const n = new Uint8Array(2144), i = s(e);
    T.wots_pkgen(n, i.private_seed, i.public_seed, 0, i.addr_seed);
    const o = new Uint8Array(2208);
    o.set(n, 0), o.set(i.public_seed, 2144), o.set(i.addr_seed, 2176);
    const h = t ? $.tag(o, t) : o;
    for (let l = 0; l < 10; l++)
      if (!this.isValid(i.private_seed, h, P))
        throw new Error("Invalid WOTS");
    return h;
  }
  /**
   * Validates WOTS components
   */
  static isValidWithComponents(t, e, s, n, i) {
    if (t.length !== 32)
      throw new Error("Invalid secret length");
    if (e.length !== 2144)
      throw new Error("Invalid pk length");
    if (s.length !== 32)
      throw new Error("Invalid pubSeed length");
    if (n.length !== 32)
      throw new Error("Invalid rnd2 length");
    const o = new Uint8Array(32);
    i(o);
    const h = new Uint8Array(2144);
    this.wots_sign(h, o, t, s, 0, n);
    const l = this.wots_pk_from_sig(h, o, s, n);
    return d.compareBytes(l, e);
  }
  /**
   * Splits a WOTS address into its components
   */
  static splitAddress(t, e, s, n, i) {
    if (t.length !== 2208)
      throw new Error("Invalid address length");
    if (e.length !== 2144)
      throw new Error("Invalid pk length");
    if (s.length !== 32)
      throw new Error("Invalid pubSeed length");
    if (n.length !== 32)
      throw new Error("Invalid rnd2 length");
    if (i !== null && i.length !== 12)
      throw new Error("Invalid tag length");
    e.set(t.subarray(0, 2144)), s.set(t.subarray(2144, 2176)), n.set(t.subarray(2176, 2208)), i !== null && i.set(n.subarray(20, 32));
  }
  /**
   * Validates a WOTS address using a Random generator
   */
  static isValid(t, e, s = P) {
    const n = new Uint8Array(2144), i = new Uint8Array(32), o = new Uint8Array(32);
    return this.splitAddress(e, n, i, o, null), this.isValidWithComponents(t, n, i, o, P);
  }
  /**
   * Generates a random WOTS address using the randomGenerator
   * Note:: use you own randomGenerator that fills in deterministic bytes if you want to generate a specific address
   */
  static generateRandomAddress(t, e, s = P) {
    if (e.length !== 32)
      throw new Error("Invalid secret length");
    if (t !== null && t.length !== 12)
      throw new Error("Invalid tag");
    const n = new Uint8Array(2208), i = new Uint8Array(32);
    s(n), i.set(n.subarray(2176, 2208)), this.wots_pkgen(n, e, n, 2144, i), n.set(i, 2176);
    const o = t ? $.tag(n, t) : n;
    for (let h = 0; h < 10; h++)
      if (!this.isValid(e, o, s))
        throw new Error("Invalid WOTS");
    return o;
  }
};
T.WOTSW = 16, T.WOTSLOGW = 4, T.PARAMSN = 32, T.WOTSLEN1 = 64, T.WOTSLEN2 = 3, T.WOTSLEN = 67, T.WOTSSIGBYTES = 2144, T.TXSIGLEN = 2144;
let g = T;
function P(r) {
  for (let t = 0; t < r.length; t++)
    r[t] = Math.floor(Math.random() * 256);
}
const x = 40, m = 20, q = 2144, J = 8;
class C {
  constructor() {
    this.address = new Uint8Array(x), this.amount = BigInt(0);
  }
  bytes() {
    const t = new Uint8Array(x + J);
    return t.set(this.address), t.set(this.getAmountBytes(), x), t;
  }
  getTag() {
    return this.address.slice(0, m);
  }
  setTag(t) {
    this.address.set(t.slice(0, m), 0);
  }
  getAddrHash() {
    return this.address.slice(m, x);
  }
  getAddress() {
    return this.address.slice(0, x);
  }
  setAddrHash(t) {
    this.address.set(t.slice(0, m), m);
  }
  setAmountBytes(t) {
    this.amount = BigInt(
      new DataView(t.buffer).getBigUint64(0, !0)
    );
  }
  getAmount() {
    return this.amount;
  }
  getAmountBytes() {
    const t = new ArrayBuffer(J);
    return new DataView(t).setBigUint64(0, this.amount, !0), new Uint8Array(t);
  }
  static wotsAddressFromBytes(t) {
    const e = new C();
    if (t.length === q) {
      const s = this.addrFromWots(t);
      s && (e.setTag(s.slice(0, m)), e.setAddrHash(s.slice(m, x)));
    } else t.length === x ? (e.setTag(t.slice(0, m)), e.setAddrHash(t.slice(m, x))) : t.length === x + J && (e.setTag(t.slice(0, m)), e.setAddrHash(t.slice(m, x)), e.setAmountBytes(t.slice(x)));
    return e;
  }
  static wotsAddressFromHex(t) {
    const e = Buffer.from(t, "hex");
    return e.length !== x ? new C() : this.wotsAddressFromBytes(e);
  }
  static addrFromImplicit(t) {
    const e = new Uint8Array(x);
    return e.set(t.slice(0, m), 0), e.set(t.slice(0, x - m), m), e;
  }
  static addrHashGenerate(t) {
    const e = S.hashWith("sha3-512", t);
    return S.hashWith("ripemd160", e);
  }
  static addrFromWots(t) {
    if (t.length !== q)
      return null;
    const e = this.addrHashGenerate(t.slice(0, q));
    return this.addrFromImplicit(e);
  }
}
const he = [
  0,
  4129,
  8258,
  12387,
  16516,
  20645,
  24774,
  28903,
  33032,
  37161,
  41290,
  45419,
  49548,
  53677,
  57806,
  61935,
  4657,
  528,
  12915,
  8786,
  21173,
  17044,
  29431,
  25302,
  37689,
  33560,
  45947,
  41818,
  54205,
  50076,
  62463,
  58334,
  9314,
  13379,
  1056,
  5121,
  25830,
  29895,
  17572,
  21637,
  42346,
  46411,
  34088,
  38153,
  58862,
  62927,
  50604,
  54669,
  13907,
  9842,
  5649,
  1584,
  30423,
  26358,
  22165,
  18100,
  46939,
  42874,
  38681,
  34616,
  63455,
  59390,
  55197,
  51132,
  18628,
  22757,
  26758,
  30887,
  2112,
  6241,
  10242,
  14371,
  51660,
  55789,
  59790,
  63919,
  35144,
  39273,
  43274,
  47403,
  23285,
  19156,
  31415,
  27286,
  6769,
  2640,
  14899,
  10770,
  56317,
  52188,
  64447,
  60318,
  39801,
  35672,
  47931,
  43802,
  27814,
  31879,
  19684,
  23749,
  11298,
  15363,
  3168,
  7233,
  60846,
  64911,
  52716,
  56781,
  44330,
  48395,
  36200,
  40265,
  32407,
  28342,
  24277,
  20212,
  15891,
  11826,
  7761,
  3696,
  65439,
  61374,
  57309,
  53244,
  48923,
  44858,
  40793,
  36728,
  37256,
  33193,
  45514,
  41451,
  53516,
  49453,
  61774,
  57711,
  4224,
  161,
  12482,
  8419,
  20484,
  16421,
  28742,
  24679,
  33721,
  37784,
  41979,
  46042,
  49981,
  54044,
  58239,
  62302,
  689,
  4752,
  8947,
  13010,
  16949,
  21012,
  25207,
  29270,
  46570,
  42443,
  38312,
  34185,
  62830,
  58703,
  54572,
  50445,
  13538,
  9411,
  5280,
  1153,
  29798,
  25671,
  21540,
  17413,
  42971,
  47098,
  34713,
  38840,
  59231,
  63358,
  50973,
  55100,
  9939,
  14066,
  1681,
  5808,
  26199,
  30326,
  17941,
  22068,
  55628,
  51565,
  63758,
  59695,
  39368,
  35305,
  47498,
  43435,
  22596,
  18533,
  30726,
  26663,
  6336,
  2273,
  14466,
  10403,
  52093,
  56156,
  60223,
  64286,
  35833,
  39896,
  43963,
  48026,
  19061,
  23124,
  27191,
  31254,
  2801,
  6864,
  10931,
  14994,
  64814,
  60687,
  56684,
  52557,
  48554,
  44427,
  40424,
  36297,
  31782,
  27655,
  23652,
  19525,
  15522,
  11395,
  7392,
  3265,
  61215,
  65342,
  53085,
  57212,
  44955,
  49082,
  36825,
  40952,
  28183,
  32310,
  20053,
  24180,
  11923,
  16050,
  3793,
  7920
];
function it(r, t, e) {
  if (e < 0)
    throw new Error("Length cannot be negative");
  if (t + e > r.length)
    throw new Error("Offset + length exceeds array bounds");
  let s = 0;
  for (let n = t; n < t + e; n++) {
    const i = r[n] & 255, o = (s >>> 8 ^ i) & 255;
    s = (s << 8 ^ he[o]) & 65535;
  }
  return s;
}
function ae(r) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  const t = new Uint8Array(256);
  for (let a = 0; a < t.length; a++)
    t[a] = 255;
  for (let a = 0; a < r.length; a++) {
    const u = r.charAt(a), c = u.charCodeAt(0);
    if (t[c] !== 255)
      throw new TypeError(u + " is ambiguous");
    t[c] = a;
  }
  const e = r.length, s = r.charAt(0), n = Math.log(e) / Math.log(256), i = Math.log(256) / Math.log(e);
  function o(a) {
    if (a instanceof Uint8Array || (ArrayBuffer.isView(a) ? a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength) : Array.isArray(a) && (a = Uint8Array.from(a))), !(a instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (a.length === 0)
      return "";
    let u = 0, c = 0, w = 0;
    const f = a.length;
    for (; w !== f && a[w] === 0; )
      w++, u++;
    const p = (f - w) * i + 1 >>> 0, A = new Uint8Array(p);
    for (; w !== f; ) {
      let E = a[w], b = 0;
      for (let L = p - 1; (E !== 0 || b < c) && L !== -1; L--, b++)
        E += 256 * A[L] >>> 0, A[L] = E % e >>> 0, E = E / e >>> 0;
      if (E !== 0)
        throw new Error("Non-zero carry");
      c = b, w++;
    }
    let U = p - c;
    for (; U !== p && A[U] === 0; )
      U++;
    let N = s.repeat(u);
    for (; U < p; ++U)
      N += r.charAt(A[U]);
    return N;
  }
  function h(a) {
    if (typeof a != "string")
      throw new TypeError("Expected String");
    if (a.length === 0)
      return new Uint8Array();
    let u = 0, c = 0, w = 0;
    for (; a[u] === s; )
      c++, u++;
    const f = (a.length - u) * n + 1 >>> 0, p = new Uint8Array(f);
    for (; a[u]; ) {
      let E = t[a.charCodeAt(u)];
      if (E === 255)
        return;
      let b = 0;
      for (let L = f - 1; (E !== 0 || b < w) && L !== -1; L--, b++)
        E += e * p[L] >>> 0, p[L] = E % 256 >>> 0, E = E / 256 >>> 0;
      if (E !== 0)
        throw new Error("Non-zero carry");
      w = b, u++;
    }
    let A = f - w;
    for (; A !== f && p[A] === 0; )
      A++;
    const U = new Uint8Array(c + (f - A));
    let N = c;
    for (; A !== f; )
      U[N++] = p[A++];
    return U;
  }
  function l(a) {
    const u = h(a);
    if (u)
      return u;
    throw new Error("Non-base" + e + " character");
  }
  return {
    encode: o,
    decodeUnsafe: h,
    decode: l
  };
}
var le = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const ot = ae(le);
function xt(r) {
  if (!r) return null;
  if (r.length !== 20) throw new Error("Invalid address tag length");
  const t = it(r, 0, 20), e = new Uint8Array(22);
  e.set(r);
  const s = [t & 255, t >> 8 & 255];
  return e.set(s, r.length), ot.encode(e);
}
function de(r) {
  try {
    const t = ot.decode(r);
    if (t.length !== 22) return !1;
    const e = t[21] << 8 | t[20], s = it(t.subarray(0, 20), 0, 20);
    return e === s;
  } catch {
    return !1;
  }
}
function ce(r) {
  const t = ot.decode(r);
  if (t.length !== 22) throw new Error("Invalid base58 tag length");
  return t.subarray(0, 20);
}
const ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addrTagToBase58: xt,
  base58ToAddrTag: ce,
  validateBase58Tag: de
}, Symbol.toStringTag, { value: "Module" }));
let fe = class mt {
  /**
   * Creates a new WOTS wallet
   */
  constructor({
    name: t = null,
    wots: e = null,
    addrTag: s = null,
    secret: n = null
  }) {
    var i;
    if (n && n.length !== 32)
      throw new Error("Invalid secret length");
    if (s && s.length !== 20)
      throw new Error("Invalid address tag");
    this.name = t, this.wots = e ? new Uint8Array(e) : null, this.addrTag = s ? new Uint8Array(s) : null, this.secret = n ? new Uint8Array(n) : null, this.wotsAddrHex = this.wots ? d.bytesToHex(this.wots) : null, this.addrTagHex = this.addrTag ? d.bytesToHex(this.addrTag) : null, this.mochimoAddr = this.wots ? C.wotsAddressFromBytes(this.wots.slice(0, 2144)) : null, (i = this.mochimoAddr) == null || i.setTag(this.addrTag);
  }
  getName() {
    return this.name;
  }
  /**
   * Get the full wots address (2208 bytes)
   * @returns 
   */
  getWots() {
    return this.wots ? new Uint8Array(this.wots) : null;
  }
  /**
  * Get the hex string of the full wots address
  */
  getWotsHex() {
    return this.wotsAddrHex;
  }
  /**
   * Get the wots public key (2144 bytes)
   */
  getWotsPk() {
    return this.wots ? new Uint8Array(this.wots.slice(0, g.WOTSSIGBYTES)) : null;
  }
  /**
  * Get the public seed used when generating the wots address
  */
  getWotsPubSeed() {
    return this.wots ? this.wots.subarray(g.WOTSSIGBYTES, g.WOTSSIGBYTES + 32) : null;
  }
  /**
  * Get the wots+ address scheme used when generating the address
  */
  getWotsAdrs() {
    return this.wots ? this.wots.subarray(g.WOTSSIGBYTES + 32, g.WOTSSIGBYTES + 64) : null;
  }
  /**
   * Get the wots+ tag used when generating the address
   */
  getWotsTag() {
    return this.wots ? this.wots.subarray(g.WOTSSIGBYTES + 64 - 12, g.WOTSSIGBYTES + 64) : null;
  }
  /**
   * Get the 40 byte mochimo address [20 bytes tag + 20 bytes address]
   */
  getAddress() {
    return this.mochimoAddr ? this.mochimoAddr.bytes().slice(0, 40) : null;
  }
  /**
   * Get the address tag (20 bytes)
   */
  getAddrTag() {
    return this.addrTag ? new Uint8Array(this.addrTag) : null;
  }
  getAddrTagHex() {
    return this.addrTagHex;
  }
  getAddrTagBase58() {
    return this.addrTag ? xt(this.getAddrTag()) : null;
  }
  /**
   * Get the address hash of mochimo address (20 bytes)
   */
  getAddrHash() {
    return this.mochimoAddr ? this.mochimoAddr.getAddrHash() : null;
  }
  getSecret() {
    return this.secret ? new Uint8Array(this.secret) : null;
  }
  hasSecret() {
    return this.secret !== null;
  }
  /**
   * Sign data using the secret key
   */
  sign(t) {
    const e = this.secret, s = this.wots;
    if (!e || !s)
      throw new Error("Cannot sign without secret key or address");
    if (e.length !== 32)
      throw new Error("Invalid sourceSeed length, expected 32, got " + e.length);
    if (s.length !== 2208)
      throw new Error("Invalid sourceWots length, expected 2208, got " + s.length);
    s.subarray(0, g.WOTSSIGBYTES);
    const n = s.subarray(g.WOTSSIGBYTES, g.WOTSSIGBYTES + 32), i = s.subarray(g.WOTSSIGBYTES + 32, g.WOTSSIGBYTES + 64), o = new Uint8Array(g.WOTSSIGBYTES);
    return g.wots_sign(o, t, e, n, 0, i), o;
  }
  /**
   * Verifies whether a signature is valid for a given message
   */
  verify(t, e) {
    if (!this.wots)
      throw new Error("Cannot verify without public key (address)");
    const s = this.wots, n = s.subarray(0, g.WOTSSIGBYTES), i = s.subarray(g.WOTSSIGBYTES, g.WOTSSIGBYTES + 32), o = s.subarray(g.WOTSSIGBYTES + 32, g.WOTSSIGBYTES + 64), h = g.wots_pk_from_sig(e, t, i, o);
    return d.areEqual(h, n);
  }
  /**
   * Address components generator used for generating address components for pk generation
   * @param wotsSeed 
   * @returns 
   */
  static componentsGenerator(t) {
    const e = Buffer.from(t).toString("ascii"), s = S.hash(Buffer.from(e + "seed", "ascii")), n = S.hash(Buffer.from(e + "publ", "ascii")), i = S.hash(Buffer.from(e + "addr", "ascii"));
    return {
      private_seed: s,
      public_seed: n,
      addr_seed: i
    };
  }
  clear() {
    this.secret && d.clear(this.secret), this.wots && d.clear(this.wots), this.addrTag && d.clear(this.addrTag), this.addrTagHex && (this.addrTagHex = null), this.wotsAddrHex && (this.wotsAddrHex = null), this.mochimoAddr && (this.mochimoAddr = null);
  }
  toString() {
    let t = "Empty address";
    return this.wotsAddrHex ? t = `${this.wotsAddrHex.substring(0, 32)}...${this.wotsAddrHex.substring(this.wotsAddrHex.length - 24)}` : this.addrTagHex && (t = `tag-${this.addrTagHex}`), t;
  }
  /**
       * Creates a wallet instance
  
       */
  static create(t, e, s, n) {
    if (e.length !== 32)
      throw new Error("Invalid secret length");
    let i = e, o = null;
    const h = Buffer.from("420000000e00000001000000", "hex");
    if (n ? o = g.generateRandomAddress(h, e, n) : ({ private_seed: i } = this.componentsGenerator(e), o = g.generateAddress(h, e, this.componentsGenerator)), o.length !== 2208)
      throw new Error("Invalid sourcePK length");
    let l = s;
    if (l || (l = C.wotsAddressFromBytes(o.slice(0, 2144)).getTag()), l.length !== 20)
      throw new Error("Invalid tag");
    return new mt({ name: t, wots: o, addrTag: l, secret: i });
  }
  toJSON() {
    return {
      name: this.name,
      wots: this.wots,
      addrTag: this.addrTag,
      secret: this.secret,
      addrTagHex: this.addrTagHex,
      wotsAddrHex: this.wotsAddrHex
    };
  }
};
var ht = /* @__PURE__ */ ((r) => (r[r.Null = 0] = "Null", r[r.Hello = 1] = "Hello", r[r.HelloAck = 2] = "HelloAck", r[r.Transaction = 3] = "Transaction", r[r.Found = 4] = "Found", r[r.GetBlock = 5] = "GetBlock", r[r.GetIPList = 6] = "GetIPList", r[r.SendBL = 7] = "SendBL", r[r.SendIP = 8] = "SendIP", r[r.Busy = 9] = "Busy", r[r.Nack = 10] = "Nack", r[r.GetTFile = 11] = "GetTFile", r[r.Balance = 12] = "Balance", r[r.SendBal = 13] = "SendBal", r[r.Resolve = 14] = "Resolve", r[r.GetCBlock = 15] = "GetCBlock", r[r.MBlock = 16] = "MBlock", r[r.Hash = 17] = "Hash", r[r.TF = 18] = "TF", r[r.Identify = 19] = "Identify", r))(ht || {});
const Y = {
  LENGTH: 8920,
  TRANSACTION_BUFFER_LENGTH_OFFSET: 122,
  TRANSACTION_BUFFER_LENGTH_LENGTH: 2,
  TRANSACTION_BUFFER_OFFSET: 124,
  TRANSACTION_BUFFER_LENGTH: 8792,
  ADD_TO_PEER_LIST_TRANSACTION_BUFFER_LENGTH: 0,
  DO_NOT_ADD_TO_PEER_LIST_TRANSACTION_BUFFER_LENGTH: 1
};
var Ut = /* @__PURE__ */ ((r) => (r[r.Push = 7] = "Push", r[r.Wallet = 6] = "Wallet", r[r.Sanctuary = 5] = "Sanctuary", r[r.MFee = 4] = "MFee", r[r.Logging = 3] = "Logging", r))(Ut || {});
class K {
  constructor() {
    this.version = 4, this.flags = new Array(8).fill(!1), this.network = 1337, this.id1 = 0, this.id2 = 0, this.operation = ht.Transaction, this.cblock = 0n, this.blocknum = 0n, this.cblockhash = new Uint8Array(32), this.pblockhash = new Uint8Array(32), this.weight = new Uint8Array(32), this.transactionBufferLength = 1, this.sourceAddress = new Uint8Array(2208), this.destinationAddress = new Uint8Array(2208), this.changeAddress = new Uint8Array(2208), this.totalSend = new Uint8Array(8), this.totalChange = new Uint8Array(8), this.fee = new Uint8Array(8), this.signature = new Uint8Array(2144), this.trailer = 43981;
  }
  /**
   * Serializes datagram to bytes
   */
  serialize() {
    if (!this.operation)
      throw new Error("Operation not set");
    const t = B.allocate(Y.LENGTH);
    t.order(G.LITTLE_ENDIAN), t.put(this.version);
    const e = this.flags.map((n) => n ? "1" : "0").join("");
    t.put(parseInt(e, 2)), t.put(d.numberToLittleEndian(this.network, 2)), t.put(d.numberToLittleEndian(this.id1, 2)), t.put(d.numberToLittleEndian(this.id2, 2)), t.put(d.numberToLittleEndian(this.operation, 2)), t.put(d.numberToLittleEndian(Number(this.cblock), 8)), t.put(d.numberToLittleEndian(Number(this.blocknum), 8)), t.put(this.cblockhash), t.put(this.pblockhash), t.put(this.weight), t.put(d.numberToLittleEndian(this.transactionBufferLength, 2)), t.put(this.sourceAddress), t.put(this.destinationAddress), t.put(this.changeAddress), t.put(this.totalSend), t.put(this.totalChange), t.put(this.fee), t.put(this.signature);
    const s = t.array();
    return this.crc = it(s, 0, 8916), t.put(d.numberToLittleEndian(this.crc, 2)), t.put(d.numberToLittleEndian(this.trailer, 2)), t.array();
  }
  /**
   * Gets the network ID
   */
  getNetwork() {
    return this.network;
  }
  /**
   * Gets the trailer
   */
  getTrailer() {
    return this.trailer;
  }
  /**
   * Gets ID1
   */
  getId1() {
    return this.id1;
  }
  /**
   * Sets ID1
   */
  setId1(t) {
    return this.id1 = t, this;
  }
  /**
   * Gets ID2
   */
  getId2() {
    return this.id2;
  }
  /**
   * Sets ID2
   */
  setId2(t) {
    return this.id2 = t, this;
  }
  /**
   * Gets operation
   */
  getOperation() {
    return this.operation;
  }
  /**
   * Sets operation
   */
  setOperation(t) {
    return this.operation = t, this;
  }
  /**
   * Gets current block height
   */
  getCurrentBlockHeight() {
    return this.cblock;
  }
  /**
   * Sets current block height
   */
  setCurrentBlockHeight(t) {
    return this.cblock = t, this;
  }
  /**
   * Sets current block hash
   */
  setCurrentBlockHash(t) {
    if (t.length !== 32) throw new Error("Invalid hash length");
    return this.cblockhash = new Uint8Array(t), this;
  }
  /**
   * Sets previous block hash
   */
  setPreviousBlockHash(t) {
    if (t.length !== 32) throw new Error("Invalid hash length");
    return this.pblockhash = new Uint8Array(t), this;
  }
  /**
   * Gets block number
   */
  getBlocknum() {
    return this.blocknum;
  }
  /**
   * Sets block number
   */
  setBlocknum(t) {
    return this.blocknum = t, this;
  }
  /**
   * Gets weight
   */
  getWeight() {
    return new Uint8Array(this.weight);
  }
  /**
   * Sets weight from bigint
   */
  setWeight(t) {
    const e = d.fit(t.toString(), 32);
    return this.weight = d.bytesToLittleEndian(e), this;
  }
  /**
   * Sets weight from bytes
   */
  setWeightBytes(t) {
    if (t.length !== 32)
      throw new Error("Invalid weight length");
    return this.weight = d.bytesToLittleEndian(d.fit(t, 32)), this;
  }
  /**
   * Gets CRC
   */
  getCRC() {
    return this.crc ?? 0;
  }
  /**
   * Gets source address
   */
  getSourceAddress() {
    return new Uint8Array(this.sourceAddress);
  }
  /**
   * Sets source address
   */
  setSourceAddress(t) {
    if (t.length !== 2208)
      throw new Error("Invalid address length");
    return this.sourceAddress = new Uint8Array(t), this;
  }
  /**
   * Gets destination address
   */
  getDestinationAddress() {
    return new Uint8Array(this.destinationAddress);
  }
  /**
   * Sets destination address
   */
  setDestinationAddress(t) {
    if (t.length !== 2208)
      throw new Error("Invalid address length");
    return this.destinationAddress = new Uint8Array(t), this;
  }
  /**
   * Gets change address
   */
  getChangeAddress() {
    return new Uint8Array(this.changeAddress);
  }
  /**
   * Sets change address
   */
  setChangeAddress(t) {
    if (t.length !== 2208)
      throw new Error("Invalid address length");
    return this.changeAddress = new Uint8Array(t), this;
  }
  /**
   * Gets total send amount
   */
  getTotalSend() {
    return new Uint8Array(this.totalSend);
  }
  /**
   * Sets total send amount
   */
  setTotalSend(t) {
    if (t.length !== 8)
      throw new Error("Invalid amount length");
    return this.totalSend = new Uint8Array(t), this;
  }
  /**
   * Sets total send amount from bigint
   */
  setTotalSendBigInt(t) {
    return this.totalSend = d.numberToLittleEndian(Number(t), 8), this;
  }
  /**
   * Gets total change amount
   */
  getTotalChange() {
    return new Uint8Array(this.totalChange);
  }
  /**
   * Sets total change amount
   */
  setTotalChange(t) {
    if (t.length !== 8)
      throw new Error("Invalid amount length");
    return this.totalChange = new Uint8Array(t), this;
  }
  /**
   * Sets total change amount from bigint
   */
  setTotalChangeBigInt(t) {
    return this.totalChange = d.numberToLittleEndian(Number(t), 8), this;
  }
  /**
   * Gets fee amount
   */
  getFee() {
    return new Uint8Array(this.fee);
  }
  /**
   * Sets fee amount
   */
  setFee(t) {
    if (t.length !== 8)
      throw new Error("Invalid amount length");
    return this.fee = new Uint8Array(t), this;
  }
  /**
   * Sets fee amount from bigint
   */
  setFeeBigInt(t) {
    return this.fee = d.numberToLittleEndian(Number(t), 8), this;
  }
  /**
   * Gets signature
   */
  getSignature() {
    return new Uint8Array(this.signature);
  }
  /**
   * Sets signature
   */
  setSignature(t) {
    if (t.length !== 2144)
      throw new Error("Invalid signature length");
    return this.signature = new Uint8Array(t), this;
  }
  /**
   * Gets previous block hash
   */
  getPblockhash() {
    return new Uint8Array(this.pblockhash);
  }
  /**
   * Gets current block hash
   */
  getCblockhash() {
    return new Uint8Array(this.cblockhash);
  }
  /**
   * Parses capabilities from datagram
   */
  static parseCapabilities(t, e) {
    for (const s of Object.values(Ut))
      typeof s == "number" && t.flags[s] && e.add(s);
    return e;
  }
  /**
   * Gets route as weight
   */
  static getRouteAsWeight(t) {
    const e = new Uint8Array(32);
    let s = 0;
    const n = t.length > 8 ? t.length - 8 : 0;
    for (let i = n; i < t.length; i++) {
      const o = t[i].trim(), h = o.split(".");
      if (h.length !== 4)
        throw new Error(`Invalid IP ${o}`);
      for (const l of h) {
        const a = parseInt(l);
        if (a < 0 || a > 255)
          throw new Error(`Invalid byte ${a}`);
        e[s++] = a;
      }
    }
    return e;
  }
  /**
   * Parses transaction IPs from datagram
   */
  static parseTxIps(t, e) {
    const s = t.getWeight();
    for (let n = 0; n < s.length; n += 4) {
      let i = 0;
      const o = [];
      for (let h = 0; h < 4; h++) {
        const l = s[n + h];
        if (l === 0 && i++, i >= 4) break;
        o.push(l);
      }
      if (i >= 4) break;
      e.add(o.join("."));
    }
    return e;
  }
  /**
   * Gets transaction buffer length
   */
  getTransactionBufferLength() {
    return this.transactionBufferLength;
  }
  /**
   * Sets transaction buffer length
   */
  setTransactionBufferLength(t) {
    return this.transactionBufferLength = t, this;
  }
  /**
   * Checks if should add to peer list
   */
  isAddToPeerList() {
    return this.getTransactionBufferLength() !== 1;
  }
  /**
   * Sets add to peer list flag
   */
  setAddToPeerList(t) {
    return this.setTransactionBufferLength(t ? 0 : 1), this;
  }
  /**
   * Gets version
   */
  getVersion() {
    return this.version;
  }
  /**
   * Creates a clone of this datagram
   */
  clone() {
    return K.of(this.serialize());
  }
  /**
   * Creates datagram from bytes
   */
  static of(t) {
    if (t.length < Y.LENGTH)
      throw new Error(`Data length cannot be less than datagram length (${Y.LENGTH})`);
    const e = B.allocate(Y.LENGTH);
    e.order(G.LITTLE_ENDIAN), e.put(t), e.rewind();
    const s = new K();
    s.version = e.get_();
    const i = e.get_().toString(2).padStart(8, "0");
    s.flags = Array.from(i).map((h) => h !== "0"), s.network = Number(d.readLittleEndianUnsigned(e, 2)), s.id1 = Number(d.readLittleEndianUnsigned(e, 2)), s.id2 = Number(d.readLittleEndianUnsigned(e, 2));
    const o = Number(d.readLittleEndianUnsigned(e, 2));
    if (o === 0)
      throw new Error("Invalid operation code 0");
    return s.operation = o, s.cblock = d.readLittleEndianUnsigned(e, 8), s.blocknum = d.readLittleEndianUnsigned(e, 8), e.get(s.cblockhash), e.get(s.pblockhash), e.get(s.weight), s.transactionBufferLength = Number(d.readLittleEndianUnsigned(e, 2)), e.get(s.sourceAddress), e.get(s.destinationAddress), e.get(s.changeAddress), e.get(s.totalSend), e.get(s.totalChange), e.get(s.fee), e.get(s.signature), s.crc = Number(d.readLittleEndianUnsigned(e, 2)), s.trailer = Number(d.readLittleEndianUnsigned(e, 2)), s;
  }
}
const y = {
  LENGTH: 8824,
  ADDRESS_LENGTH: 2208,
  SIGNATURE_LENGTH: 2144,
  ID_LENGTH: 32,
  AMOUNT_LENGTH: 8
};
class I {
  constructor(t, e, s, n, i, o, h, l) {
    if (t.length !== 2208) throw new Error("Invalid source address length");
    if (e.length !== 2208) throw new Error("Invalid destination address length");
    if (s.length !== 2208) throw new Error("Invalid change address length");
    if (h.length !== 2144) throw new Error("Invalid signature length");
    if (l.length !== 32) throw new Error("Invalid id length");
    this.sourceAddress = new Uint8Array(t), this.destinationAddress = new Uint8Array(e), this.changeAddress = new Uint8Array(s), this.signature = new Uint8Array(h), this.id = new Uint8Array(l), this.sourceAddressHex = d.bytesToHex(this.sourceAddress), this.destinationAddressHex = d.bytesToHex(this.destinationAddress), this.changeAddressHex = d.bytesToHex(this.changeAddress), this.signatureHex = d.bytesToHex(this.signature), this.idHex = d.bytesToHex(this.id), this.totalSend = n, this.totalChange = i, this.fee = o, this.idValue = I.txIdToInteger(this.id);
  }
  /**
   * Converts transaction ID to integer value
   */
  static txIdToInteger(t) {
    let e = 0n;
    for (let s = 0; s < t.length; s++)
      e = e << 8n | BigInt(t[s]);
    return e;
  }
  /**
   * Calculates transaction ID from WOTS address
   */
  static txId(t) {
    if (t.length !== 2208)
      throw new Error("Invalid WOTS length");
    return S.hash(t);
  }
  /**
   * Validates WOTS signature
   */
  static isValidWOTSSignature(t) {
    const e = S.hash(t.subarray(0, 6648)), s = t.subarray(0, 2208), n = s.subarray(0, 2144), i = s.subarray(2144, 2176), o = s.subarray(2176, 2208), h = t.subarray(6648, 8792), l = g.wots_pk_from_sig(h, e, i, o);
    if (l.length !== n.length) return !1;
    for (let a = 0; a < n.length; a++)
      if (l[a] !== n[a]) return !1;
    return !0;
  }
  /**
   * Creates Transaction from raw bytes
   */
  static of(t) {
    if (t.length !== y.LENGTH)
      throw new Error(`Data length must be ${y.LENGTH}`);
    const e = B.wrap(t);
    e.order(G.LITTLE_ENDIAN);
    const s = new Uint8Array(2208);
    e.get(s);
    const n = new Uint8Array(2208);
    e.get(n);
    const i = new Uint8Array(2208);
    e.get(i);
    const o = d.readLittleEndianUnsigned(e, 8), h = d.readLittleEndianUnsigned(e, 8), l = d.readLittleEndianUnsigned(e, 8), a = new Uint8Array(2144);
    e.get(a);
    const u = new Uint8Array(32);
    return e.get(u), new I(
      s,
      n,
      i,
      o,
      h,
      l,
      a,
      u
    );
  }
  /**
   * Converts bigint to little-endian bytes
   */
  static bigIntToLEBytes(t, e) {
    const s = new Uint8Array(e);
    let n = t;
    for (let i = 0; i < e; i++)
      s[i] = Number(n & 0xFFn), n >>= 8n;
    return s;
  }
  /**
   * Converts little-endian bytes to bigint
   */
  static bytesToBigInt(t) {
    let e = 0n;
    for (let s = t.length - 1; s >= 0; s--)
      e = e << 8n | BigInt(t[s]);
    return e;
  }
  /**
   * Creates raw bytes from transaction
   */
  serialize() {
    const t = B.allocate(y.LENGTH);
    return t.order(G.LITTLE_ENDIAN), t.put(this.sourceAddress), t.put(this.destinationAddress), t.put(this.changeAddress), t.put(I.bigIntToLEBytes(this.totalSend, 8)), t.put(I.bigIntToLEBytes(this.totalChange, 8)), t.put(I.bigIntToLEBytes(this.fee, 8)), t.put(this.signature), t.put(this.id), t.array();
  }
  /**
   * Validates a transaction
   */
  static validate(t, e, s) {
    const n = t.serialize();
    if (n.length !== y.LENGTH)
      return `Invalid transaction length (expected ${y.LENGTH} but was ${n.length})`;
    if (d.compareBytes(t.sourceAddress, t.destinationAddress))
      return "Source address is identical to destination address";
    if (d.compareBytes(t.sourceAddress, t.changeAddress))
      return "Source address is identical to change address";
    if (t.fee < e)
      return `Invalid transaction fee (min required ${e} but was ${t.fee})`;
    const i = I.txId(t.sourceAddress);
    return d.compareBytes(i, t.id) ? s && t.idValue <= s.idValue ? `Invalid transaction order (id ${t.idValue} should be after ${s.idValue})` : t.totalSend < 0n ? "Total send cannot be negative" : t.totalChange < 0n ? "Total change cannot be negative" : t.fee < 0n ? "Fee cannot be negative" : I.isValidWOTSSignature(n) ? null : "Invalid WOTS signature" : `Invalid transaction id (expected ${d.bytesToHex(i)} but was ${t.idHex})`;
  }
  /**
   * Signs a transaction
   */
  static sign(t, e, s, n, i, o, h, l) {
    if (i.length !== 2208) throw new Error("Invalid source address length");
    if (h.length !== 2208) throw new Error("Invalid destination address length");
    if (l.length !== 2208) throw new Error("Invalid change address length");
    if (t <= 0n) throw new Error("Balance must be positive");
    if (e < 0n) throw new Error("Payment cannot be negative");
    if (s < 0n) throw new Error("Fee cannot be negative");
    if (n < 0n) throw new Error("Change cannot be negative");
    const a = t - s;
    if (a < 0n) throw new Error("Not enough fund for fee");
    const u = a - e;
    if (u < 0n) throw new Error("Not enough fund for fee and payment");
    const c = u - n;
    if (c < 0n) throw new Error("Not enough fund for fee, payment and change");
    if (c > 0n) throw new Error("Source address not fully spent");
    const w = B.allocate(y.LENGTH);
    w.order(G.LITTLE_ENDIAN), w.put(i), w.put(h), w.put(l), w.put(I.bigIntToLEBytes(e, y.AMOUNT_LENGTH)), w.put(I.bigIntToLEBytes(n, y.AMOUNT_LENGTH)), w.put(I.bigIntToLEBytes(s, y.AMOUNT_LENGTH));
    const f = w.array().subarray(0, 6648), p = S.hash(f);
    i.subarray(0, y.SIGNATURE_LENGTH);
    const A = i.subarray(y.SIGNATURE_LENGTH, y.SIGNATURE_LENGTH + 32), U = i.subarray(y.SIGNATURE_LENGTH + 32, y.SIGNATURE_LENGTH + 64), N = new Uint8Array(y.SIGNATURE_LENGTH);
    g.wots_sign(N, p, o, A, 0, U), w.position(6648), w.put(N);
    const E = I.txId(i);
    if (w.put(E), w.array().length !== y.LENGTH)
      throw new Error("Transaction length mismatch");
    const b = new K();
    return b.setOperation(ht.Transaction), b.setSourceAddress(i), b.setDestinationAddress(h), b.setChangeAddress(l), b.setTotalSend(I.bigIntToLEBytes(e, y.AMOUNT_LENGTH)), b.setTotalChange(I.bigIntToLEBytes(n, y.AMOUNT_LENGTH)), b.setFee(I.bigIntToLEBytes(s, y.AMOUNT_LENGTH)), b.setSignature(N), { datagram: b.serialize(), tx: w.array() };
  }
}
class Z {
  /**
   * Creates a new WOTS wallet
   */
  constructor({
    name: t = null,
    address: e = null,
    tag: s = null,
    secret: n = null
  }) {
    this.name = t, this.address = e, this.tag = s, this.secret = n, this.addressHex = this.address ? d.bytesToHex(this.address) : null, this.tagHex = this.tag ? d.bytesToHex(this.tag) : null, this.v3address = this.address ? C.wotsAddressFromBytes(this.address) : null;
  }
  getName() {
    return this.name;
  }
  getAddress() {
    return this.address ? new Uint8Array(this.address) : null;
  }
  getAddr() {
    return this.address ? new Uint8Array(this.address.slice(g.WOTSSIGBYTES, g.WOTSSIGBYTES + 32)) : null;
  }
  getPublSeed() {
    return this.address ? new Uint8Array(this.address.slice(g.WOTSSIGBYTES, g.WOTSSIGBYTES + 32)) : null;
  }
  getAddressHex() {
    return this.addressHex;
  }
  getTag() {
    return this.tag ? new Uint8Array(this.tag) : null;
  }
  getTagHex() {
    return this.tagHex;
  }
  getSecret() {
    return this.secret ? new Uint8Array(this.secret) : null;
  }
  hasSecret() {
    return this.secret !== null;
  }
  /**
   * Sign data using the secret key
   * @param data 
   * @returns 
   */
  sign(t) {
    const e = this.secret, s = this.address;
    if (!e || !s)
      throw new Error("Cannot sign without secret key or address");
    if (e.length !== 32)
      throw new Error("Invalid sourceSeed length, expected 32, got " + e.length);
    if (s.length !== 2208)
      throw new Error("Invalid sourceWots length, expected 2208, got " + s.length);
    s.subarray(0, g.WOTSSIGBYTES);
    const n = s.subarray(g.WOTSSIGBYTES, g.WOTSSIGBYTES + 32), i = s.subarray(g.WOTSSIGBYTES + 32, g.WOTSSIGBYTES + 64), o = new Uint8Array(g.WOTSSIGBYTES);
    return g.wots_sign(o, t, e, n, 0, i), o;
  }
  /**
   * Verifies whether a signature is valid for a given message
   * @param message 
   * @param signature 
   * @returns 
   */
  verify(t, e) {
    if (!this.address)
      throw new Error("Cannot verify without public key (address)");
    const s = this.address, n = s.subarray(0, g.WOTSSIGBYTES), i = s.subarray(g.WOTSSIGBYTES, g.WOTSSIGBYTES + 32), o = s.subarray(g.WOTSSIGBYTES + 32, g.WOTSSIGBYTES + 64), h = g.wots_pk_from_sig(e, t, i, o);
    return d.areEqual(h, n);
  }
  /**
   * Address components generator used for generating address components for pk generation
   * @param wotsSeed 
   * @returns 
   */
  static componentsGenerator(t) {
    const e = Buffer.from(t).toString("ascii"), s = S.hash(Buffer.from(e + "seed", "ascii")), n = S.hash(Buffer.from(e + "publ", "ascii")), i = S.hash(Buffer.from(e + "addr", "ascii"));
    return {
      private_seed: s,
      public_seed: n,
      addr_seed: i
    };
  }
  clear() {
    this.secret && d.clear(this.secret), this.address && d.clear(this.address), this.tag && d.clear(this.tag), this.tagHex && (this.tagHex = null), this.addressHex && (this.addressHex = null);
  }
  toString() {
    let t = "Empty address";
    return this.addressHex ? t = `${this.addressHex.substring(0, 32)}...${this.addressHex.substring(this.addressHex.length - 24)}` : this.tagHex && (t = `tag-${this.tagHex}`), t;
  }
  toJSON() {
    return {
      name: this.name,
      address: this.address,
      tag: this.tag,
      secret: this.secret,
      tagHex: this.tagHex,
      addressHex: this.addressHex
    };
  }
  static create(t, e, s) {
    if (e.length !== 32)
      throw new Error("Invalid secret length");
    if (s !== null && s.length !== 12)
      throw new Error("Invalid tag");
    const { private_seed: n } = this.componentsGenerator(e), i = g.generateAddress(s, e, this.componentsGenerator);
    return new Z({ name: t, address: i, tag: s, secret: n });
  }
  static createV3(t, e, s) {
    const { private_seed: n } = this.componentsGenerator(e), i = g.generateAddress(s, e, this.componentsGenerator);
    return new Z({ name: t, address: i, tag: s, secret: n });
  }
}
export {
  B as ByteBuffer,
  G as ByteOrder,
  K as Datagram,
  S as MochimoHasher,
  $ as Tag,
  ue as TagUtils,
  I as Transaction,
  g as WOTS,
  fe as WOTSWallet,
  Z as WOTSWalletV2,
  C as WotsAddress
};
