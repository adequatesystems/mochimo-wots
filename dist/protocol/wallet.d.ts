import { ByteArray } from '../types/byte-buffer';
import { WotsAddress } from './wots-addr';
interface WOTSWalletJSON {
    name?: string | null;
    wots?: ByteArray | null;
    addrTag?: ByteArray | null;
    secret?: ByteArray | null;
    addrTagHex?: string | null;
    wotsAddrHex?: string | null;
}
/**
 * WOTS Wallet Implementation in V3
 */
export declare class WOTSWallet implements WOTSWalletJSON {
    readonly name: string | null;
    readonly wots: ByteArray | null;
    wotsAddrHex: string | null;
    readonly addrTag: ByteArray | null;
    addrTagHex: string | null;
    readonly secret: ByteArray | null;
    mochimoAddr: WotsAddress | null;
    /**
     * Creates a new WOTS wallet
     */
    private constructor();
    getName(): string | null;
    /**
     * Get the full wots address (2208 bytes)
     * @returns
     */
    getWots(): ByteArray | null;
    /**
    * Get the hex string of the full wots address
    */
    getWotsHex(): string | null;
    /**
     * Get the wots public key (2144 bytes)
     */
    getWotsPk(): ByteArray | null;
    /**
    * Get the public seed used when generating the wots address
    */
    getWotsPubSeed(): ByteArray | null;
    /**
    * Get the wots+ address scheme used when generating the address
    */
    getWotsAdrs(): ByteArray | null;
    /**
     * Get the wots+ tag used when generating the address
     */
    getWotsTag(): ByteArray | null;
    /**
     * Get the 40 byte mochimo address [20 bytes tag + 20 bytes address]
     */
    getAddress(): ByteArray | null;
    /**
     * Get the address tag (20 bytes)
     */
    getAddrTag(): ByteArray | null;
    getAddrTagHex(): string | null;
    getAddrTagBase58(): string | null;
    /**
     * Get the address hash of mochimo address (20 bytes)
     */
    getAddrHash(): ByteArray | null;
    getSecret(): ByteArray | null;
    hasSecret(): boolean;
    /**
     * Sign data using the secret key
     */
    sign(data: ByteArray): ByteArray;
    /**
     * Verifies whether a signature is valid for a given message
     */
    verify(message: ByteArray, signature: ByteArray): boolean;
    /**
     * Address components generator used for generating address components for pk generation
     * @param wotsSeed
     * @returns
     */
    static componentsGenerator(wotsSeed: ByteArray): {
        private_seed: ByteArray;
        public_seed: ByteArray;
        addr_seed: ByteArray;
    };
    clear(): void;
    toString(): string;
    /**
     * Creates a wallet instance

     */
    static create(name: string, secret: ByteArray, v3tag?: ByteArray, randomGenerator?: (bytes: ByteArray) => void): WOTSWallet;
    toJSON(): WOTSWalletJSON;
}
export {};
