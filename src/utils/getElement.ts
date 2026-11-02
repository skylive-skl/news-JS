type ElementConstructor<T extends Element> = { new (): T; prototype: T };

export function getElement<T extends Element>(parent: ParentNode, selector: string, type: ElementConstructor<T>): T {
    const element: Element | null = parent.querySelector(selector);

    if (!(element instanceof type)) {
        throw new Error(`Element "${selector}" of type ${type.name} not found`);
    }

    return element;
}
