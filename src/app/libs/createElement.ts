export default function createElement(tagName: string, className: string) {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}
