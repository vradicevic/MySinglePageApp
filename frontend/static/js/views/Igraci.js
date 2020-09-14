import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params,user,db) {
        super(params,user);
        this.setTitle("Igraci");
        this.db= db;
        this.user=user;
        
        
    }

    async getHtml() {
        if(this.user){
            let html = 
                `<h1>Igraci</h1><div class="container" style="margin-top: 40px;">
                <ul id = "listOfPlayers" >`
                

            this.db.forEach(element => {
                let data = element.val();
                const li = 
            `<li id="${data.fifaid}">
            
            <div class="tooltip collapsible">
             
            ${data.name + data.surname}
            </div>
            <div class="content">
            Fifa id:${data.fifaid} | Position:${data.position} | Scores:${data.scores} | Red cards active:${data.cards.red.active} | Yellow cards active:${data.cards.yellow.active}
            </div>
            </li>`
            ;
                html += li;
            });
            html += `</ul></div>`
            return html;

        }else {
            return `
            <h1>Igraci</h1>
            <p>Na ovoj stranici mooguc je pregled igraca vašeg nogometnog kluba ukoliko ste ulogirani.</p>
            <p>
                <a href="/pocetna" data-link>Ulogirajte se</a>
            </p>
        `;
        }
    }
}
