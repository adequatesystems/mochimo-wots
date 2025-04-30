import { ByteArray } from '../types/byte-buffer';
export declare const TX_CONSTANTS: {
    readonly LENGTH: 8824;
    readonly ADDRESS_LENGTH: 2208;
    readonly SIGNATURE_LENGTH: 2144;
    readonly ID_LENGTH: 32;
    readonly AMOUNT_LENGTH: 8;
};
/**
 * @deprecated
 * This is no longer valid for Mochimo v3. Please use Mesh Api for creating transactions.
 * Transaction implementation
 */
export declare class Transaction {
    readonly sourceAddress: ByteArray;
    readonly sourceAddressHex: string;
    readonly destinationAddress: ByteArray;
    readonly destinationAddressHex: string;
    readonly changeAddress: ByteArray;
    readonly changeAddressHex: string;
    readonly totalSend: bigint;
    readonly totalChange: bigint;
    readonly fee: bigint;
    readonly signature: ByteArray;
    readonly signatureHex: string;
    readonly id: ByteArray;
    readonly idHex: string;
    readonly idValue: bigint;
    constructor(sourceAddress: ByteArray, destinationAddress: ByteArray, changeAddress: ByteArray, totalSend: bigint, totalChange: bigint, fee: bigint, signature: ByteArray, id: ByteArray);
    /**
     * Converts transaction ID to integer value
     */
    static txIdToInteger(txid: ByteArray): bigint;
    /**
     * Calculates transaction ID from WOTS address
     */
    static txId(wots: ByteArray): ByteArray;
    /**
     * Validates WOTS signature
     */
    static isValidWOTSSignature(rawTransaction: ByteArray): boolean;
    /**
     * Creates Transaction from raw bytes
     */
    static of(serial: ByteArray): Transaction;
    /**
     * Converts bigint to little-endian bytes
     */
    static bigIntToLEBytes(value: bigint, length: number): ByteArray;
    /**
     * Converts little-endian bytes to bigint
     */
    static bytesToBigInt(bytes: ByteArray): bigint;
    /**
     * Creates raw bytes from transaction
     */
    serialize(): ByteArray;
    /**
     * Validates a transaction
     */
    static validate(transaction: Transaction, minFee: bigint, previousTransaction?: Transaction): string | null;
    /**
     * Signs a transaction
     */
    static sign(balance: bigint, payment: bigint, fee: bigint, changeAmount: bigint, source: ByteArray, sourceSecret: ByteArray, destination: ByteArray, change: ByteArray): {
        datagram: ByteArray;
        tx: ByteArray;
    };
}
