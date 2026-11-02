import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IEverythingResponse, ISourcesResponse } from '../../types';
import { getElement } from '../../utils/getElement';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer: HTMLElement = getElement(document, '.sources', HTMLElement);
        const searchInput: HTMLInputElement = getElement(document, '.sources-search', HTMLInputElement);

        sourcesContainer.addEventListener('click', (e: MouseEvent): void => {
            const prevSourceId: string | null = sourcesContainer.getAttribute('data-source');
            this.controller.getNews(
                e,
                (data: IEverythingResponse): void => this.view.drawNews(data),
                (error: Error): void => {
                    sourcesContainer.removeAttribute('data-source');
                    this.view.showError(error);
                }
            );

            const activeSourceId: string | null = sourcesContainer.getAttribute('data-source');
            if (activeSourceId && activeSourceId !== prevSourceId) {
                this.view.highlightSource(activeSourceId);
                this.view.showNewsLoading();
            }
        });
        searchInput.addEventListener('input', (): void => this.view.filterSources(searchInput.value));
        this.controller.getSources(
            (data: ISourcesResponse): void => this.view.drawSources(data),
            (error: Error): void => this.view.showError(error)
        );
    }
}

export default App;
