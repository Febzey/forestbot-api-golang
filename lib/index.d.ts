export { ForestBotApiClient } from "./structure/api.js";
export interface ForestBotApiConfig {
    baseUrl: string;
    apiKey: string;
    mc_server: string;
    useWebsocket?: boolean;
    webSocket_url?: string;
}
