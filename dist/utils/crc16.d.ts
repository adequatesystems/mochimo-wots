/**
 * Calculate CRC16 for a byte array
 * @param data The input byte array
 * @param offset Starting offset in the array
 * @param length Number of bytes to process
 * @returns The calculated CRC16 value
 * @throws Error if offset or length are invalid
 */
export declare function crc(data: Uint8Array, offset: number, length: number): number;
