import './sources.css';
import { ISource } from '../../../types';
import { getElement } from '../../../utils/getElement';

enum SourceClass {
    Container = 'sources',
    Item = 'source__item',
    Active = 'source__item--active',
}

class Sources {
    public draw(data: Readonly<ISource>[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getElement(document, '#sourceItemTemp', HTMLTemplateElement);

        data.forEach((item: Readonly<ISource>): void => {
            const sourceClone: DocumentFragment = document.importNode(sourceItemTemp.content, true);

            getElement(sourceClone, '.source__item-name', HTMLElement).textContent = item.name;
            getElement(sourceClone, `.${SourceClass.Item}`, HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement(document, `.${SourceClass.Container}`, HTMLElement).append(fragment);
    }

    public setActive(sourceId: string): void {
        this.getItems().forEach((item: HTMLElement): void => {
            item.classList.toggle(SourceClass.Active, item.getAttribute('data-source-id') === sourceId);
        });
    }

    public filter(query: string): void {
        const normalizedQuery: string = query.trim().toLowerCase();

        this.getItems().forEach((item: HTMLElement): void => {
            const name: string = item.textContent?.toLowerCase() ?? '';
            item.hidden = !name.includes(normalizedQuery);
        });
    }

    private getItems(): HTMLElement[] {
        return Array.from(document.querySelectorAll<HTMLElement>(`.${SourceClass.Item}`));
    }
}

export default Sources;
