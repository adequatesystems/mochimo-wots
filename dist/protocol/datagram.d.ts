import { ByteArray } from '../types/byte-buffer';
import { Operation } from '../types/enums';
/**
 * Datagram constants
 */
export declare const DATAGRAM_CONSTANTS: {
    readonly LENGTH: 8920;
    readonly TRANSACTION_BUFFER_LENGTH_OFFSET: 122;
    readonly TRANSACTION_BUFFER_LENGTH_LENGTH: 2;
    readonly TRANSACTION_BUFFER_OFFSET: 124;
    readonly TRANSACTION_BUFFER_LENGTH: 8792;
    readonly ADD_TO_PEER_LIST_TRANSACTION_BUFFER_LENGTH: 0;
    readonly DO_NOT_ADD_TO_PEER_LIST_TRANSACTION_BUFFER_LENGTH: 1;
};
/**
 * Capability flags for datagram
 */
export declare enum Capability {
    Push = 7,
    Wallet = 6,
    Sanctuary = 5,
    MFee = 4,
    Logging = 3
}
/**
 * Datagram implementation
 */
export declare class Datagram {
    private version;
    private flags;
    private network;
    private id1;
    private id2;
    private operation;
    private cblock;
    private blocknum;
    private cblockhash;
    private pblockhash;
    private weight;
    private transactionBufferLength;
    private sourceAddress;
    private destinationAddress;
    private changeAddress;
    private totalSend;
    private totalChange;
    private fee;
    private signature;
    private crc;
    private trailer;
    /**
     * Serializes datagram to bytes
     */
    serialize(): ByteArray;
    /**
     * Gets the network ID
     */
    getNetwork(): number;
    /**
     * Gets the trailer
     */
    getTrailer(): number;
    /**
     * Gets ID1
     */
    getId1(): number;
    /**
     * Sets ID1
     */
    setId1(id1: number): this;
    /**
     * Gets ID2
     */
    getId2(): number;
    /**
     * Sets ID2
     */
    setId2(id2: number): this;
    /**
     * Gets operation
     */
    getOperation(): Operation;
    /**
     * Sets operation
     */
    setOperation(operation: Operation): this;
    /**
     * Gets current block height
     */
    getCurrentBlockHeight(): bigint;
    /**
     * Sets current block height
     */
    setCurrentBlockHeight(cblock: bigint): this;
    /**
     * Sets current block hash
     */
    setCurrentBlockHash(hash: ByteArray): this;
    /**
     * Sets previous block hash
     */
    setPreviousBlockHash(hash: ByteArray): this;
    /**
     * Gets block number
     */
    getBlocknum(): bigint;
    /**
     * Sets block number
     */
    setBlocknum(blocknum: bigint): this;
    /**
     * Gets weight
     */
    getWeight(): ByteArray;
    /**
     * Sets weight from bigint
     */
    setWeight(weight: bigint): this;
    /**
     * Sets weight from bytes
     */
    setWeightBytes(weight: ByteArray): this;
    /**
     * Gets CRC
     */
    getCRC(): number;
    /**
     * Gets source address
     */
    getSourceAddress(): ByteArray;
    /**
     * Sets source address
     */
    setSourceAddress(addr: ByteArray): this;
    /**
     * Gets destination address
     */
    getDestinationAddress(): ByteArray;
    /**
     * Sets destination address
     */
    setDestinationAddress(addr: ByteArray): this;
    /**
     * Gets change address
     */
    getChangeAddress(): ByteArray;
    /**
     * Sets change address
     */
    setChangeAddress(addr: ByteArray): this;
    /**
     * Gets total send amount
     */
    getTotalSend(): ByteArray;
    /**
     * Sets total send amount
     */
    setTotalSend(amount: ByteArray): this;
    /**
     * Sets total send amount from bigint
     */
    setTotalSendBigInt(amount: bigint): this;
    /**
     * Gets total change amount
     */
    getTotalChange(): ByteArray;
    /**
     * Sets total change amount
     */
    setTotalChange(amount: ByteArray): this;
    /**
     * Sets total change amount from bigint
     */
    setTotalChangeBigInt(amount: bigint): this;
    /**
     * Gets fee amount
     */
    getFee(): ByteArray;
    /**
     * Sets fee amount
     */
    setFee(amount: ByteArray): this;
    /**
     * Sets fee amount from bigint
     */
    setFeeBigInt(amount: bigint): this;
    /**
     * Gets signature
     */
    getSignature(): ByteArray;
    /**
     * Sets signature
     */
    setSignature(sig: ByteArray): this;
    /**
     * Gets previous block hash
     */
    getPblockhash(): ByteArray;
    /**
     * Gets current block hash
     */
    getCblockhash(): ByteArray;
    /**
     * Parses capabilities from datagram
     */
    static parseCapabilities<D extends Set<Capability>>(datagram: Datagram, destination: D): D;
    /**
     * Gets route as weight
     */
    static getRouteAsWeight<R extends string[]>(route: R): ByteArray;
    /**
     * Parses transaction IPs from datagram
     */
    static parseTxIps<D extends Set<string>>(datagram: Datagram, destination: D): D;
    /**
     * Gets transaction buffer length
     */
    getTransactionBufferLength(): number;
    /**
     * Sets transaction buffer length
     */
    setTransactionBufferLength(length: number): this;
    /**
     * Checks if should add to peer list
     */
    isAddToPeerList(): boolean;
    /**
     * Sets add to peer list flag
     */
    setAddToPeerList(value: boolean): this;
    /**
     * Gets version
     */
    getVersion(): number;
    /**
     * Creates a clone of this datagram
     */
    clone(): Datagram;
    /**
     * Creates datagram from bytes
     */
    static of(data: ByteArray): Datagram;
}
