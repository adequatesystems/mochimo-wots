import { ByteArray } from '../types/byte-buffer';
import { WotsAddress } from './wots-addr';
interface WOTSWalletJSON {
    name?: string | null;
    address?: ByteArray | null;
    tag?: ByteArray | null;
    secret?: ByteArray | null;
    tagHex?: string | null;
    addressHex?: string | null;
}
/**
 * @deprecated use WOTSWalletV3 instead
 */
export declare class WOTSWallet implements WOTSWalletJSON {
    readonly name: string | null;
    readonly address: ByteArray | null;
    addressHex: string | null;
    readonly tag: ByteArray | null;
    tagHex: string | null;
    readonly secret: ByteArray | null;
    v3address: WotsAddress | null;
    /**
     * Creates a new WOTS wallet
     */
    private constructor();
    getName(): string | null;
    getAddress(): ByteArray | null;
    getAddr(): ByteArray | null;
    getPublSeed(): ByteArray | null;
    getAddressHex(): string | null;
    getTag(): ByteArray | null;
    getTagHex(): string | null;
    getSecret(): ByteArray | null;
    hasSecret(): boolean;
    /**
     * Sign data using the secret key
     * @param data
     * @returns
     */
    sign(data: ByteArray): ByteArray;
    /**
     * Verifies whether a signature is valid for a given message
     * @param message
     * @param signature
     * @returns
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
    toJSON(): WOTSWalletJSON;
    static create(name: string, secret: ByteArray, tag: ByteArray): WOTSWallet;
    static createV3(name: string, secret: ByteArray, v3tag: ByteArray): WOTSWallet;
}
export {};
