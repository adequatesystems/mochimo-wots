import { ByteArray, HexString, ByteBuffer } from '../types/byte-buffer';
export declare const HEX_CHARS = "0123456789abcdef";
/**
 * Utility functions for byte operations
 */
export declare class ByteUtils {
    /**
     * Create a copy of a byte array
     */
    static copyOf(original: ByteArray, length: number): ByteArray;
    /**
     * Convert a hexadecimal string to a byte array
     * @param hex The hexadecimal string to convert
     */
    static hexToBytes(hex: HexString): ByteArray;
    /**
     * Compares two byte arrays
     */
    static compareBytes(a: Uint8Array, b: Uint8Array): boolean;
    /**
     * Reads little-endian unsigned values from a buffer
     */
    static readLittleEndianUnsigned(buffer: ByteBuffer, bytes?: number): bigint;
    /**
     * Trims address for display
     */
    static trimAddress(addressHex: string): string;
    /**
     * Converts number to little-endian bytes
     */
    static numberToLittleEndian(value: number, length: number): ByteArray;
    /**
     * Converts byte array to little-endian
     */
    static bytesToLittleEndian(bytes: ByteArray): ByteArray;
    /**
     * Fits byte array or string to specified length
     */
    static fit(bytes: ByteArray | string, length: number): ByteArray;
    /**
     * Convert a byte array to its hexadecimal string representation
     * @param bytes The byte array to convert
     * @param offset Optional starting offset in the byte array
     * @param length Optional number of bytes to convert
     */
    static bytesToHex(bytes: ByteArray, offset?: number, length?: number): HexString;
    /**
     * Convert a number to a byte array of specified length
     * @param value The number to convert
     * @param length The desired length of the resulting byte array
     */
    static toBytes(value: number | bigint, length: number): ByteArray;
    /**
     * Convert a byte array to little-endian format
     * @param value The byte array to convert
     * @param offset Optional starting offset
     * @param length Optional number of bytes to convert
     */
    static toLittleEndian(value: ByteArray, offset?: number, length?: number): ByteArray;
    /**
     * Clear a byte array by filling it with zeros
     */
    static clear(data: ByteArray): void;
    /**
         * Compare two byte arrays for equality
         */
    static areEqual(a: ByteArray, b: ByteArray): boolean;
}
