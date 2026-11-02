import { Callback, Endpoint, ErrorCallback, HttpMethod, IRequestParams, RequestOptions, StatusCode } from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<RequestOptions>;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: IRequestParams,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        },
        onError?: ErrorCallback
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options, onError);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCode.Unauthorized || res.status === StatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(`${res.status} ${res.statusText}`.trim());
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: Endpoint): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]: [string, string | undefined]) => {
            if (value !== undefined) url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: Callback<T>,
        options: RequestOptions = {},
        onError?: ErrorCallback
    ): void {
        if (!this.baseLink) {
            this.handleError(new Error('API_URL is not defined. Copy .env.example to .env and restart'), onError);
            return;
        }

        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response): Response => this.errorHandler(res))
            .then((res: Response): Promise<T> => res.json())
            .then((data: T): void => callback(data))
            .catch((err: unknown): void => this.handleError(err, onError));
    }

    private handleError(err: unknown, onError?: ErrorCallback): void {
        const error: Error = err instanceof Error ? err : new Error(String(err));
        console.error(error);
        onError?.(error);
    }
}

export default Loader;
