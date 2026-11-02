import './news.css';
import { IArticle } from '../../../types';
import { getElement } from '../../../utils/getElement';

const MAX_NEWS_COUNT: number = 10;
const PLACEHOLDER_IMAGE: string = 'img/news_placeholder.jpg';

class News {
    public draw(data: Readonly<IArticle>[]): void {
        const news: Readonly<IArticle>[] = data.slice(0, MAX_NEWS_COUNT);

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = getElement(document, '#newsItemTemp', HTMLTemplateElement);

        news.forEach((item: Readonly<IArticle>, idx: number): void => {
            const newsClone: DocumentFragment = document.importNode(newsItemTemp.content, true);

            if (idx % 2) getElement(newsClone, '.news__item', HTMLElement).classList.add('alt');

            getElement(newsClone, '.news__meta-photo', HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || PLACEHOLDER_IMAGE
            })`;
            getElement(newsClone, '.news__meta-author', HTMLElement).textContent = item.author || item.source.name;
            getElement(newsClone, '.news__meta-date', HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElement(newsClone, '.news__description-title', HTMLElement).textContent = item.title;
            getElement(newsClone, '.news__description-source', HTMLElement).textContent = item.source.name;
            getElement(newsClone, '.news__description-content', HTMLElement).textContent = item.description;
            getElement(newsClone, '.news__read-more a', HTMLAnchorElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer: HTMLElement = getElement(document, '.news', HTMLElement);
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
