export type ResponseStatus = 'ok' | 'error';

export type SourceCategory = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: SourceCategory;
    language: string;
    country: string;
}

export interface IArticle {
    source: Pick<ISource, 'name'> & { id: string | null };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

interface IBaseResponse {
    status: ResponseStatus;
}

export interface ISourcesResponse extends IBaseResponse {
    sources: ISource[];
}

export interface IEverythingResponse extends IBaseResponse {
    totalResults: number;
    articles: IArticle[];
}

export interface IErrorResponse extends IBaseResponse {
    code: string;
    message: string;
}

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    GET = 'GET',
}

export enum StatusCode {
    Unauthorized = 401,
    NotFound = 404,
}

export interface IApiOptions {
    apiKey: string;
    sources: string;
}

export type RequestOptions = Partial<IApiOptions>;

export interface IRequestParams {
    endpoint: Endpoint;
    options?: RequestOptions;
}

export type Callback<T> = (data: T) => void;

export type ErrorCallback = (error: Error) => void;
