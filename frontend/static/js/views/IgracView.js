import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params,user) {
        super(params,user);
        this.setTitle("Jedan Igrac");
    }

    async getHtml() {
        console.log(this.params.id);
        return `
            <h1>Igraci</h1>
            <p>Na ovoj stranici mooguc je pregled igraca vašeg nogometnog kluba ukoliko ste ulogirani.</p>
            <p>
                <a href="/pocetna" data-link>Ulogirajte se</a>
            </p>
        `;
    }
} 