import News from './news/news';
import Sources from './sources/sources';
import { IArticle, IEverythingResponse, ISource, ISourcesResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Partial<IEverythingResponse>): void {
        const values: IArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<ISourcesResponse>): void {
        const values: ISource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    public showNewsLoading(): void {
        this.news.showLoading();
    }

    public highlightSource(sourceId: string): void {
        this.sources.setActive(sourceId);
    }

    public filterSources(query: string): void {
        this.sources.filter(query);
    }
}

export default AppView;
