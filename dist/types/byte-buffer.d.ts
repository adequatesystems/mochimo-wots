/**
 * ByteOrder enum to match Java's ByteOrder
 */
export declare enum ByteOrder {
    BIG_ENDIAN = 0,
    LITTLE_ENDIAN = 1
}
/**
 * TypeScript implementation of Java's ByteBuffer
 */
export declare class ByteBuffer {
    private buf;
    private pos;
    private byteOrder;
    private constructor();
    /**
     * Creates a new ByteBuffer with the given capacity
     */
    static allocate(capacity: number): ByteBuffer;
    /**
     * Creates a new ByteBuffer that wraps the given array
     */
    static wrap(array: Uint8Array): ByteBuffer;
    /**
     * Sets this buffer's byte order
     */
    order(order: ByteOrder): ByteBuffer;
    /**
     * Sets or gets this buffer's position
     */
    position(newPosition?: number): number | ByteBuffer;
    /**
     * Returns this buffer's capacity
     */
    capacity(): number;
    /**
     * Writes a byte or bytes into this buffer
     */
    put(input: number | Uint8Array, offset?: number, length?: number): ByteBuffer;
    /**
     * Writes an integer into this buffer
     */
    putInt(value: number): ByteBuffer;
    /**
     * Gets bytes from the buffer into the destination array
     */
    get(dst: ByteArray): ByteBuffer;
    /**
     * Gets a single byte from the buffer
     */
    get_(): number;
    /**
     * Returns a copy of the backing array
     */
    array(): Uint8Array;
    /**
     * Rewinds this buffer. Sets the position to zero
     */
    rewind(): ByteBuffer;
}
export type byte = number;
export type ByteArray = Uint8Array;
export type BigInt = bigint;
export type HexString = string;
