import axios from "axios";
import ForestBotWebsocketClient from "./websocket.js";
;
;
/**
 *
 * ForestBot API and websocket data handlers.
 * this is made for the minecraft bots, but can still be used for get requests.
 *
 */
export class ForestBotApiClient {
    Socket;
    baseUrl;
    apiKey;
    mc_server;
    constructor(options) {
        const { apiKey, baseUrl, useWebsocket, webSocket_url, mc_server } = options;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.mc_server = mc_server;
        if (useWebsocket && webSocket_url) {
            const fbWebsocketConfig = {
                apiKey: this.apiKey,
                baseUrl: `${webSocket_url}`,
                identifier: mc_server
            };
            this.Socket = new ForestBotWebsocketClient(fbWebsocketConfig);
        }
    }
    ;
    async sendRequest(endpoint) {
        const url = `${this.baseUrl}/${endpoint.url}`;
        const headers = { 'Content-Type': "application/json", "x-api-key": this.apiKey };
        const config = { method: endpoint.method, headers };
        if (endpoint.method === "POST" && endpoint.body) {
            config.data = endpoint.body;
        }
        ;
        try {
            const response = await axios(url, config);
            return response.data;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    ;
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
    async getPlaytime(username) {
        const res = await this.sendRequest({
            url: `playtime/${username}/${this.mc_server}`,
            method: "GET"
        });
        if (res && !res.playtime)
            return null;
        return res;
    }
    ;
    /**
     * Getting a users joindate.
     * @param username
     * @returns
     */
    async getJoindate(username) {
        const res = await this.sendRequest({
            url: `joindate/${username}/${this.mc_server}`,
            method: "GET",
        });
        if (res && !res.joindate)
            return null;
        return res;
    }
    ;
    /**
     * Getting a users total join count.
     * @param username
     * @returns
     */
    async getJoins(username) {
        const res = await this.sendRequest({
            url: `joins/${username}/${this.mc_server}`,
            method: "GET",
        });
        if (res && !res.joins)
            return null;
        return res;
    }
    ;
    /**
     * Getting users kills/deaths count.
     * @param username
     * @returns
     */
    async getKd(username) {
        const res = await this.sendRequest({
            url: `kd/${username}/${this.mc_server}`,
            method: "GET",
        });
        if (!res)
            return null;
        return res;
    }
    ;
    /**
     * Getting users last death with time of death.
     */
    async getLastdeath(username) {
        const res = await this.sendRequest({
            url: `lastdeath/${username}/${this.mc_server}`,
            method: "GET",
        });
        if (res && !res.death)
            return null;
        return res;
    }
    ;
    /**
     * Getting a users last sent message.
     * @param username
     * @returns
     */
    async getLastMessage(username) {
        const res = await this.sendRequest({
            url: `messages/${username}/${this.mc_server}/1/last`,
            method: "GET",
        });
        if (res && !res.data)
            return null;
        return res;
    }
    ;
    /**
     * Getting a users first sent message.
     * @param username
     * @returns
     */
    async getFirstMessage(username) {
        const res = await this.sendRequest({
            url: `messages/${username}/${this.mc_server}/1/first`,
            method: "GET",
        });
        if (res && !res.data)
            return null;
        return res;
    }
    ;
    /**
     * Getting when a user was lastseen.
     * @param username
     * @returns
     */
    async getLastSeen(username) {
        const res = await this.sendRequest({
            url: `lastseen/${username}/${this.mc_server}`,
            method: "GET",
        });
        if (res && !res.lastseen)
            return null;
        return res;
    }
    ;
    /**
     * Getting a users total message count.
     * @param username
     * @returns
     */
    async getMessageCount(username) {
        const res = await this.sendRequest({
            url: `messagecount/${username}/${this.mc_server}`,
            method: "GET",
        });
        if (res && !res.messagecount)
            return null;
        return res;
    }
    ;
    /**
     * Getting a user quote. A random message.
     * @param username
     * @returns
     */
    async getQuote(username) {
        const res = await this.sendRequest({
            url: `quote/${username}/${this.mc_server}`,
            method: "GET",
        });
        if (res && !res.message)
            return null;
        return res;
    }
    ;
    /**
     * Getting few top stats of specified statistic.
     * @param stat
     * @returns
     */
    async getTopStat(stat) {
        const res = await this.sendRequest({
            url: `topstat/${stat}/${this.mc_server}`,
            method: "GET",
        });
        if (res && !res.top_stat)
            return null;
        return res;
    }
    ;
    /**
     * Getting word occurence count for specified word.
     */
    async getWordOccurenceCount(username, word) {
        const res = await this.sendRequest({
            url: `wordcount/${word}/${username}/${this.mc_server}`,
            method: "GET",
        });
        if (res && !res.word_count)
            return null;
        return res;
    }
    ;
    /**
     * Getting a user's self submitted  "whois" description.
     * @param username
     * @returns
     */
    async getWhoIs(username) {
        const res = await this.sendRequest({
            url: `whois/${username}`,
            method: "GET",
        });
        if (res && !res.description)
            return null;
        return res;
    }
    ;
    /**
     * Geting closest name matches to the specified search.
     * @param username
     * @returns
     */
    async getNameFind(username) {
        const res = await this.sendRequest({
            url: `namefind/${username}/${this.mc_server}`,
            method: "GET",
        });
        if (res && !res.usernames)
            return null;
        return res;
    }
    ;
    /**
     * Getting all discord chat channels for live chat bridge for specified mc server.
     * @returns
     */
    async getDiscordChatChannels() {
        const res = await this.sendRequest({
            url: `getchannels/${this.mc_server}`,
            method: "GET",
        });
        if (res && res.data || !res.success)
            return null;
        return res;
    }
    ;
    /**
     * Ping api for status response.
     * @returns
     */
    async pingApi() {
        const res = await this.sendRequest({
            url: `ping`,
            method: "GET",
        });
        return res;
    }
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
    async postSavePlaytime(params) {
        await this.sendRequest({
            method: "POST",
            url: `saveplaytime`,
            body: { ...params }
        });
    }
    ;
    /**
     * Saving user self submitted descriptions.
     */
    async postSaveIamDescription(params) {
        await this.sendRequest({
            method: "POST",
            url: `iam`,
            body: { ...params }
        });
    }
    ;
    /**
     * Updating player list for specific server in api.
     * this is for updating tablist. send with ping and username in users param.
     */
    async postUpdatePlayerList(params) {
        await this.sendRequest({
            method: "POST",
            url: `updateplayerlist`,
            body: { ...params }
        });
    }
    ;
}
;
;
;
;
