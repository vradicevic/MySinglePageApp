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
                        <div class="group input-field">
                            <input type="text" id="fifaid" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="fifaid">Fifa ID:</label> 
                            
                            
                        </div>
                        <div class="group input-field">
                            <input type="text" id="name" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="name">Ime igraca:</label> 
                            
                            
                        </div>
                        <div class="group input-field">
                            
                            <input type="text" id="surname" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="surname">Prezimme igraca:</label> 
                        </div>
                        <div class="group input-field">
                            <label for="position">Pozicija igrača:</label><br>
                            <select id="position">
                                    <option selected="" value="P">Igrač</option>
                                    <option selected="" value="GK">Golman</option>
                                </select>
                            
                            
                            
                            
                        </div>

                        <div class="group input-field">
                            
                            <input type="number" step="0.01" min="0" id="equipment" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="equipment">Sredstva utrošena u igrača:</label>
                        </div>
                        
                        <div class="group input-field">
                            
                            <input type="number" id="totalred" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="totalred">Ukupno crvenih kartona:</label> 
                        </div>
                        <div class="group input-field">
                            
                            <input type="number" id="activered" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="activered">Aktivno crvenih kartona:</label> 
                        </div>
                        <div class="group input-field">
                             
                            <input type="number" id="totalyellow" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="totalyellow">Ukupno žutih kartona:</label>
                        </div>
                        <div class="group input-field">
                             
                            <input type="number" id="activeyellow" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="activeyellow">Aktivno žutih kartona:</label>
                        </div>

                        <div class="group input-field">
                             
                            <input type="number" id="scores" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label for="scores">Ukupno zabijenih golova</label>
                        </div>
                        <button class="btn yellow derkened-1 z-depth-0">Kreiraj</button>
                        <p class="error pink-text center-align"></p>
                    </form>
                </div>
            
        `;
    }
}