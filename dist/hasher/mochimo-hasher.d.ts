import { ByteArray } from '../types/byte-buffer';
/**
 * TypeScript implementation of MochimoHasher
 * Uses @noble/hashes for cross-platform hash implementations
 */
export declare class MochimoHasher {
    private hasher;
    private algorithm;
    constructor(algorithm?: string);
    private createHasher;
    /**
     * Updates the hash with the given data
     */
    update(buffer: ByteArray, offset?: number, length?: number): void;
    /**
     * Returns the final hash value
     */
    digest(): ByteArray;
    /**
     * Performs hash operation
     */
    static hash(data: ByteArray): ByteArray;
    static hash(data: ByteArray, offset: number, length: number): ByteArray;
    static hashWith(algorithm: string, data: ByteArray): ByteArray;
}
