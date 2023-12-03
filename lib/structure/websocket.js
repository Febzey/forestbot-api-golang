import WebSocket from "ws";
import EventEmitter from "events";
/**
 * Websocket client for interacting with the ForestBot API.
 */
export default class ForestBotWebsocketClient extends EventEmitter {
    socket;
    apiKey;
    baseUrl;
    identifier;
    isConnected = false;
    /**
     * Creates a new instance of the ForestBotWebsocketClient class.
     *
     * @param apiKey The API key for authenticating with the ForestBot API.
     * @param baseUrl The base URL for the ForestBot API.
     * @param identifier An identifier for the client, such as the Minecraft server name.
     */
    constructor(config) {
        const { apiKey, baseUrl, identifier } = config;
        super();
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.identifier = identifier;
        this.authenticate();
    }
    send(data) {
        const message = JSON.stringify(data);
        this.socket.send(message);
    }
    ;
    /**
     * Authenticates with the ForestBot API via the websocket connection.
     */
    async authenticate() {
        this.socket = new WebSocket(this.baseUrl, {
            headers: {
                "x-api-key": this.apiKey,
                "client-type": "minecraft",
                "client-id": this.identifier,
            },
        });
        this.handleEvents();
    }
    /**
     * Handles events for the websocket connection.
     *
     * @param socket The WebSocket instance to handle events for.
     */
    async handleEvents() {
        this.socket.on("open", () => {
            this.emit("open");
            setInterval(() => {
                this.socket.ping("pingdata");
            }, 5000);
            this.isConnected = true;
        });
        this.socket.on("error", (error) => console.log(error));
        this.socket.on("close", async (reason) => {
            this.emit("closed", reason);
        });
        /**
         * Incoming data from ForestBot API
         */
        this.socket.on("message", (msg) => {
            const data = JSON.parse(msg.toString());
            if (data.action === "chat") {
                /**
                 * Emit an event when a chat message is received.
                 * @event ChatData
                 * @type {Object}
                 * @property {string} username - The username of the user who sent the chat message.
                 * @property {string} message - The chat message text.
                 */
                this.emit("chat", data.data);
                return;
            }
            /**
             * When the API has found that a user has changed their name.
             */
            if (data.data && data.data.name_changed) {
                const nameChangedData = data.data;
                /**
                 * Emit an event when a user changes their name.
                 * @event NameChangedData
                 * @type {Object}
                 * @property {string} new_name - The new username of the user.
                 * @property {string} old_name - The old username of the user.
                 */
                this.emit("nameChange", nameChangedData.new_name, nameChangedData.old_name);
                return;
            }
            /**
             * When the API has found that a new user has joined.
             */
            if (data.data && data.data.new_user) {
                /**
                 * Emit an event when a new user joins.
                 * @event NewUserData
                 * @type {Object}
                 * @property {string} username - The username of the new user.
                 */
                this.emit("newUser", data.data.username);
            }
        });
    }
    ;
}
;
