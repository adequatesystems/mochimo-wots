import { ByteArray } from '../types/byte-buffer';
/**
 * Tag implementation for Mochimo addresses
 */
export declare class Tag {
    static readonly TAG_LENGTH = 12;
    /**
     * Gets the tag from an address
     */
    static getTag(address: ByteArray): ByteArray;
    /**
     * Checks if a tag is all zeros
     */
    static isZero(tag: ByteArray): boolean;
    /**
     * Validates a tag
     */
    static isValid(tag: ByteArray): boolean;
    /**
     * Tags an address with the specified tag
     */
    static tag(address: ByteArray, tag: ByteArray): ByteArray;
}
