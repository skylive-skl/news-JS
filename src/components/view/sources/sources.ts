import './sources.css';
import { ISource } from '../../../types';
import { getElement } from '../../../utils/getElement';

class Sources {
    public draw(data: Readonly<ISource>[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getElement(document, '#sourceItemTemp', HTMLTemplateElement);

        data.forEach((item: Readonly<ISource>): void => {
            const sourceClone: DocumentFragment = document.importNode(sourceItemTemp.content, true);

            getElement(sourceClone, '.source__item-name', HTMLElement).textContent = item.name;
            getElement(sourceClone, '.source__item', HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement(document, '.sources', HTMLElement).append(fragment);
    }
}

export default Sources;
