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
                `<h1>Igrači</h1><div class="container" style="margin-top: 40px;">
                <ul id = "listOfPlayers" >`
                

            this.db.forEach(element => {
                let data = element.val();
                const li = 
            `<li id="${data.fifaid}">
            
            <div class="tooltip collapsible">
             
            ${data.name +' '+  data.surname}
            </div>
            <div class="content">
            <table>
            <tr>
                <td>Fifa id:${data.fifaid}</td> 
            </tr>
            <tr>
                <td>Position:${data.position}</td>
                
            </tr>
            <tr>
                <td>Scores:${data.scores}</td>
                
            </tr>
            <tr>
                <td>Red cards active:${data.cards.red.active}</td>
            </tr>
            <tr>
                <td>Yellow cards active:${data.cards.yellow.active}</td>
                
            </tr>
            </table>
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
