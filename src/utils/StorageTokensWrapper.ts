import Storage from './Storage';

export enum Locals {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token'
}

export default class Tokens extends Storage<Locals> {
    private static instance?: Tokens;

    private constructor() {
        super();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Tokens();
        }
        return this.instance;
    }

    public getAccessToken(key: Locals) {
        return this.get(key);
    }

    public getRefreshToken(key: Locals) {
        return this.get(key);
    }

    public setAccessToken(key: Locals, accessToken: string) {
        this.set(key, accessToken);
    }

    public setRefreshToken(key: Locals, refreshToken: string) {
        this.set(key, refreshToken);
    }

    public removeAccessToken(accessToken: Locals) {
        this.removeItem(accessToken);
    }

    public removeRefreshToken(refreshToken: Locals) {
        this.removeItem(refreshToken);
    }

    public clearAccessTokens() {
        this.clearItems([Locals.ACCESS_TOKEN, Locals.REFRESH_TOKEN]);
    }
}