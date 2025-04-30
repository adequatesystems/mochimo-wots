import { ByteBuffer, ByteArray } from '../types/byte-buffer';
/**
 * WOTS Hash Chain Implementation
 */
export declare class WOTSHash {
    static readonly XMSS_HASH_PADDING_F = 0;
    static readonly XMSS_HASH_PADDING_PRF = 3;
    /**
     * Set chain address in the address buffer
     */
    static setChainAddr(addr: ByteBuffer, chain: number): void;
    /**
     * Set hash address in the address buffer
     */
    static setHashAddr(addr: ByteBuffer, hash: number): void;
    /**
     * Set key and mask in the address buffer
     */
    static setKeyAndMask(addr: ByteBuffer, keyAndMask: number): void;
    /**
     * Convert address buffer to bytes in little-endian format
     */
    static addrToBytes(addr: ByteBuffer): ByteArray;
    /**
     * PRF function
     */
    static prf(out: ByteArray, offset: number, input: ByteArray, key: ByteArray): ByteArray;
    /**
     * F hash function
     */
    static thashF(out: ByteArray, outOffset: number, input: ByteArray, inOffset: number, pubSeed: ByteArray, addr: ByteBuffer): void;
}
