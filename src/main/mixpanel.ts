import { Mixpanel } from "mixpanel";

export interface INineChroniclesMixpanel {
    track(eventName: string, properties?: object, callback?: () => void): void;
    alias(alias: string): void;
    login(): void;
    miningConfig(): void;
}

export class NineChroniclesMixpanel implements INineChroniclesMixpanel {
    private readonly _mixpanel: Mixpanel;
    private readonly _mixpanelUuid: string;
    private readonly _ip: string;
    private _login: boolean = false;
    private _miningConfig: boolean = false;

    constructor(mixpanel: Mixpanel, mixpanelUuid: string, ip: string) {
        this._mixpanel = mixpanel;
        this._mixpanelUuid = mixpanelUuid;
        this._ip = ip;
    }

    public track(event: string, properties?: object, callback?: () => void): void {
        this._mixpanel.track(event, {
            distinct_id: this._mixpanelUuid,
            ip: this._ip,
            login: this._login,
            miningConfig: this._miningConfig,
            ...properties
        }, callback);
    }

    public alias(alias: string): void {
        this._mixpanel.alias(this._mixpanelUuid, alias);
    }

    public login(): void {
        this._login = true;
    }

    public miningConfig(): void {
        this._miningConfig = true;
    }

}