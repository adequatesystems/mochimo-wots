import { ByteArray } from '../types/byte-buffer';
/**
 * WOTS Protocol Implementation
 */
export declare class WOTS {
    static readonly WOTSW = 16;
    static readonly WOTSLOGW = 4;
    static readonly PARAMSN = 32;
    static readonly WOTSLEN1 = 64;
    static readonly WOTSLEN2 = 3;
    static readonly WOTSLEN = 67;
    static readonly WOTSSIGBYTES = 2144;
    static readonly TXSIGLEN = 2144;
    /**
     * Generates chains for WOTS
     */
    private static gen_chain;
    /**
     * Expands seed into WOTS private key
     */
    private static expand_seed;
    /**
     * Converts message to base w (convenience overload)
     */
    static base_w(msg: ByteArray, destination: number[]): number[];
    /**
     * Converts message to base w
     */
    private static base_w_;
    /**
     * Computes WOTS checksum
     */
    private static wotsChecksum;
    /**
     * Computes chain lengths
     */
    private static chain_lengths;
    /**
     * Generates WOTS public key
     */
    static wots_pkgen(pk: ByteArray, seed: ByteArray, pub_seed: ByteArray, offset: number, addr: ByteArray): void;
    /**
     * Signs a message using WOTS
     */
    static wots_sign(sig: ByteArray, msg: ByteArray, seed: ByteArray, pub_seed: ByteArray, offset: number, addr: ByteArray): void;
    /**
     * Verifies a WOTS signature
     */
    static wots_pk_from_sig(signature: ByteArray, msg: ByteArray, pub_seed: ByteArray, addr: ByteArray): ByteArray;
    /**
     * Generates a WOTS address using the componentsGenerator.
     * Note:: use you own componentsGenerator that fills in deterministic bytes if you want to generate a specific address
     */
    static generateAddress(tag: ByteArray | null, secret: ByteArray, componentsGenerator: (wotsSeed: ByteArray) => {
        private_seed: ByteArray;
        public_seed: ByteArray;
        addr_seed: ByteArray;
    }): ByteArray;
    /**
     * Validates WOTS components
     */
    private static isValidWithComponents;
    /**
     * Splits a WOTS address into its components
     */
    static splitAddress(address: ByteArray, pk: ByteArray, pubSeed: ByteArray, rnd2: ByteArray, tag: ByteArray | null): void;
    /**
     * Validates a WOTS address using a Random generator
     */
    static isValid(secret: ByteArray, address: ByteArray, random?: typeof randomBytes): boolean;
    /**
     * Generates a random WOTS address using the randomGenerator
     * Note:: use you own randomGenerator that fills in deterministic bytes if you want to generate a specific address
     */
    static generateRandomAddress(tag: ByteArray | null, secret: ByteArray, randomGenerator?: (bytes: ByteArray) => void): ByteArray;
}
declare function randomBytes(bytes: ByteArray): void;
export {};
