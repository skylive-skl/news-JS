import AppLoader from './appLoader';
import { Callback, Endpoint, ErrorCallback, IEverythingResponse, ISourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<ISourcesResponse>, onError?: ErrorCallback): void {
        super.getResp<ISourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback,
            onError
        );
    }

    public getNews(e: MouseEvent, callback: Callback<IEverythingResponse>, onError?: ErrorCallback): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) return;

        while (target instanceof HTMLElement && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<IEverythingResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback,
                        onError
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
