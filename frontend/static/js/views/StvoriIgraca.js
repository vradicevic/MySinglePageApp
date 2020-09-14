import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params,user,db) {
        super(params,user,db);
        this.setTitle("Stvori igrača");
        this.user=user;
        this.db=db;


    }

    async getHtml() {
    
        
        return `
            <h1>Stvori igraca</h1>
            
                <div>
                    
                    <form id="create-form">
                        <div class="input-field">
                            <label for="fifaid">Fifa ID:</label> <br>
                            <input type="text" id="fifaid" required>
                            
                        </div>
                        <div class="input-field">
                            <label for="name">Ime igraca:</label> <br>
                            <input type="text" id="name" required>
                            
                        </div>
                        <div class="input-field">
                            <label for="surname">Prezimme igraca:</label> <br>
                            <input type="text" id="surname" required>
                            
                        </div>
                        <div class="input-field">
                            <label for="position">Pozicija igrača:</label> <br>
                            <select id="position">
                                <option selected="" value="P">Igrač</option>
                                <option selected="" value="GK">Golman</option>
                            </select>
                            
                        </div>

                        <div class="input-field">
                            <label for="equipment">Sredstva utrošena u igrača:</label> <br>
                            <input type="number" step="0.01" min="0" id="equipment" required>
                            
                        </div>
                        
                        <div class="input-field">
                            <label for="totalred">Ukupno crvenih kartona:</label> <br>
                            <input type="number" id="totalred" required>
                            
                        </div>
                        <div class="input-field">
                            <label for="activered">Aktivno crvenih kartona:</label> <br>
                            <input type="number" id="activered" required>
                            
                        </div>
                        <div class="input-field">
                            <label for="totalyellow">Ukupno žutih kartona:</label> <br>
                            <input type="number" id="totalyellow" required>
                            
                        </div>
                        <div class="input-field">
                            <label for="activeyellow">Aktivno žutih kartona:</label> <br>
                            <input type="number" id="activeyellow" required>
                            
                        </div>

                        <div class="input-field">
                        <label for="scores">Ukupno zabijenih golova</label> <br>
                            <input type="number" id="scores" required>
                            
                        </div>
                        <button class="btn yellow derkened-1 z-depth-0">Kreiraj</button>
                        <p class="error pink-text center-align"></p>
                    </form>
                </div>
            
        `;
    }
}