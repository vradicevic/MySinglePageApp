import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params,user,db) {
        super(params);
        this.setTitle("Registracija");
        this.db=db;
    }

    async getHtml() {
        let html=``
        html += 
            `
                <div class="container" >
                <h1>Registracija</h1>
                    <form id="signup-form">
                        <div class="group">
                             
                            <input type="email" id="email" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="login-email">Email</label>
                            </div>

                        <div class="group">
                            
                            <input type="password" id="password" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="login-password">Password</label>
                        </div>
                        <div class="group">
                            <select id="selectedClub">
                            <option selected="">Odaberi klub</option>`

        await db.ref("/reggedclubs/").once('value', snapshot=>{
            snapshot.forEach(element => {
                let data = element.val()
                const option = `<option value="${data.id}"> ${data.name}</option>`;
                html += option;
            });
        });

        html += `</select >
            </div>
            <button class="pure-material-button-contained">Registriraj se</button>
            <p class="error pink-text center-align"></p>
                    </form >
                </div >`

        

        return html;
    }
}