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
        getElement(document, '.sources', HTMLElement).addEventListener('click', (e: MouseEvent): void =>
            this.controller.getNews(e, (data: IEverythingResponse): void => this.view.drawNews(data))
        );
        this.controller.getSources((data: ISourcesResponse): void => this.view.drawSources(data));
    }
}

export default App;
