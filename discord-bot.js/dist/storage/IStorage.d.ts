export default interface IStorage {
    /**
     * Destroys the connection to the store, cleaning up any resources used by it.
     */
    destroy(): Promise<void>;
}
