export declare class WotsAddress {
    private address;
    private amount;
    constructor();
    bytes(): Uint8Array;
    getTag(): Uint8Array;
    setTag(tag: Uint8Array): void;
    getAddrHash(): Uint8Array;
    getAddress(): Uint8Array;
    setAddrHash(addrHash: Uint8Array): void;
    setAmountBytes(amount: Uint8Array): void;
    getAmount(): bigint;
    getAmountBytes(): Uint8Array;
    static wotsAddressFromBytes(bytes: Uint8Array): WotsAddress;
    static wotsAddressFromHex(wotsHex: string): WotsAddress;
    static addrFromImplicit(tag: Uint8Array): Uint8Array;
    static addrHashGenerate(input: Uint8Array): Uint8Array;
    static addrFromWots(wots: Uint8Array): Uint8Array | null;
}
