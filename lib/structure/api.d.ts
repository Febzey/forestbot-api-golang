import ForestBotWebsocketClient from "./websocket.js";
export interface ForestBotApiConfig {
    baseUrl: string;
    apiKey: string;
    mc_server: string;
    useWebsocket?: boolean;
    webSocket_url?: string;
    webSocketAutoReconnect?: boolean;
}
/**
 *
 * ForestBot API and websocket data handlers.
 * this is made for the minecraft bots, but can still be used for get requests.
 *
 */
export declare class ForestBotApiClient {
    Socket: ForestBotWebsocketClient | undefined;
    private readonly baseUrl;
    private readonly apiKey;
    private readonly mc_server;
    constructor(options: ForestBotApiConfig);
    private sendRequest;
    /**
     *
     * @method GET
     * START OF GET REQUESTS.
     *
     */
    /**
     * Getting a users playtime.
     * @param username
     * @returns
     */
    getPlaytime(username: string): Promise<GetPlaytime | null>;
    /**
     * Getting a users joindate.
     * @param username
     * @returns
     */
    getJoindate(username: string): Promise<GetJoinDateResponse | null>;
    /**
     * Getting a users total join count.
     * @param username
     * @returns
     */
    getJoins(username: string): Promise<GetJoinCountResponse | null>;
    /**
     * Getting users kills/deaths count.
     * @param username
     * @returns
     */
    getKd(username: string): Promise<GetKdResponse | null>;
    /**
     * Getting users last death with time of death.
     */
    getLastdeath(username: string): Promise<GetLastDeathResponse | null>;
    /**
     * Getting a users last sent message.
     * @param username
     * @returns
     */
    getLastMessage(username: string): Promise<GetMessagesResponse | null>;
    /**
     * Getting a users first sent message.
     * @param username
     * @returns
     */
    getFirstMessage(username: string): Promise<GetMessagesResponse | null>;
    /**
     * Getting when a user was lastseen.
     * @param username
     * @returns
     */
    getLastSeen(username: string): Promise<GetLastSeenResponse | null>;
    /**
     * Getting a users total message count.
     * @param username
     * @returns
     */
    getMessageCount(username: string): Promise<GetMessageCountResponse | null>;
    /**
     * Getting a user quote. A random message.
     * @param username
     * @returns
     */
    getQuote(username: string): Promise<GetQuoteResponse | null>;
    /**
     * Getting few top stats of specified statistic.
     * @param stat
     * @returns
     */
    getTopStat(stat: string): Promise<GetTopStatsResponse | null>;
    /**
     * Getting word occurence count for specified word.
     */
    getWordOccurenceCount(username: string, word: string): Promise<GetWordOccurenceCountResponse | null>;
    /**
     * Getting a user's self submitted  "whois" description.
     * @param username
     * @returns
     */
    getWhoIs(username: string): Promise<GetWhoIsResponse | null>;
    /**
     * Geting closest name matches to the specified search.
     * @param username
     * @returns
     */
    getNameFind(username: string): Promise<GetNameFindResponse | null>;
    /**
     * Getting all discord chat channels for live chat bridge for specified mc server.
     * @returns
     */
    getDiscordChatChannels(): Promise<GetDiscordChatChannelsResponse | null>;
    /**
     * Ping api for status response.
     * @returns
     */
    pingApi(): Promise<any>;
    /**
     *
     *
     * END OF GET REQUESTS.
     *
     *
     */
    /**
     * ------------------------------------------------------------------------------
     */
    /**
     *
     * @method GET
     * START OF POST REQUESTS.
     *
     */
    /**
     * Saving a users playtime. this should be called every minute with a list of players.
     */
    postSavePlaytime(params: postSavePlaytimeParams): Promise<void>;
    /**
     * Saving user self submitted descriptions.
     */
    postSaveIamDescription(params: postSaveIamDescriptionParams): Promise<void>;
    /**
     * Updating player list for specific server in api.
     * this is for updating tablist. send with ping and username in users param.
     */
    postUpdatePlayerList(params: postUpdatePlayerListParams): Promise<void>;
}
declare type GetDiscordChatChannelsResponse = {
    success: boolean;
    data: [
        {
            guildName: string;
            guildID: string;
            channelID: string;
            setupBy: string;
            date: string;
            mc_server: string;
        }
    ];
};
declare type GetJoinCountResponse = {
    joins: number;
};
declare type GetJoinDateResponse = {
    joindate: string | number;
};
declare type GetKdResponse = {
    kills: number;
    deaths: number;
};
declare type GetLastDeathResponse = {
    death: string;
    time: number | string;
};
declare type GetLastSeenResponse = {
    lastseen: StringConstructor;
};
declare type GetMessageCountResponse = {
    messagecount: number;
};
declare type GetMessagesResponse = {
    success: boolean;
    data: {
        messages: [
            {
                name: string;
                message: string;
                date: null | string | number;
            }
        ];
        count: number;
        action: string;
    };
};
declare type GetNameFindResponse = {
    usernames: string[];
};
declare type GetPlaytime = {
    playtime: number | string;
};
declare type GetQuoteResponse = {
    message: string;
    date: string | number;
};
declare type GetTopStatsResponse = {
    top_stat: any[];
};
declare type GetWhoIsResponse = {
    username: string;
    description: string;
};
declare type GetWordOccurenceCountResponse = {
    word_count: number;
};
/**
 *
 * @method POST
 * post request types.
 */
interface postSavePlaytimeParams {
    players: string[];
    mc_server: string;
}
interface postSaveIamDescriptionParams {
    user: string;
    description: string;
}
interface postUpdatePlayerListParams {
    users: [{
        name: string;
        ping: number;
    }];
    mc_server: string;
}
export {};
