import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params,user) {
        super(params,user);
        this.user=user;
        this.setTitle("Formacija");
        
    }

    async getHtml() {
        return `
            <h1>Formacija</h1>
            <p>Na ovoj stranici mooguc je pregled formacije vašeg nogometnog kluba ukoliko ste ulogirani.</p>
            <p>
                <a href="/pocetna" data-link>Ulogirajte se</a>
            </p>
        `;
    }
} 