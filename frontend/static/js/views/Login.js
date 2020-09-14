import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Login");
        
        
    }

    async getHtml() {
        return `
                <div class="container">
                    <h1>Prijava u sustav</h1>
                    <form id="login-form">
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

                        <button class="pure-material-button-contained">Prijava</button>
                        <p class="error pink-text center-align"></p>
                    </form>
                </div>
            
        `;
    }
}