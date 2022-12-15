class App {
    private container: HTMLElement;

    constructor() {
        this.container = document.body;
    }

    run() {
        this.container.textContent = 'Online store';
    }
}

export default App;
