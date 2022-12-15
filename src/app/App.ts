import Header from './components/Header/Header';

class App {
    private container: HTMLElement;
    header = new Header('header', 'header');

    constructor() {
        this.container = document.body;
    }

    run() {
        this.container.append(this.header.render());
    }
}

export default App;
