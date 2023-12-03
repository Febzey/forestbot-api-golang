/// <reference types="node" />
import EventEmitter from "events";
export interface ForestBotWebsocketConfig {
    apiKey: string;
    baseUrl: string;
    identifier: string;
}
/**
 * Websocket client for interacting with the ForestBot API.
 */
export default class ForestBotWebsocketClient extends EventEmitter {
    private socket;
    private readonly apiKey;
    private readonly baseUrl;
    private readonly identifier;
    isConnected: boolean;
    /**
     * Creates a new instance of the ForestBotWebsocketClient class.
     *
     * @param apiKey The API key for authenticating with the ForestBot API.
     * @param baseUrl The base URL for the ForestBot API.
     * @param identifier An identifier for the client, such as the Minecraft server name.
     */
    constructor(config: ForestBotWebsocketConfig);
    send(data: any): void;
    /**
     * Authenticates with the ForestBot API via the websocket connection.
     */
    authenticate(): Promise<void>;
    /**
     * Handles events for the websocket connection.
     *
     * @param socket The WebSocket instance to handle events for.
     */
    private handleEvents;
}
