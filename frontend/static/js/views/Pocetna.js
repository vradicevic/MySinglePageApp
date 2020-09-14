import AbstractView from "./AbstractView.js"

export default class extends AbstractView{
    constructor(params,user,db){
        super(params,user,db);
        this.user = user;
        this.db = db;
        
        this.setTitle("Početna");
    }

    async getHtml(){
        let info = null;
        
        let html=``;
        if(this.user){
            await db.ref(`clubs/${this.user.club}/info`).once('value', function (snapshot) {
                info = snapshot.val();
            });
            html +=`
                <h1>Dobrodošli na stranicu nogometnog kluba ${info.name}<img src=${info.logo} class="responsive" alt="logo kluba"></h1>
                <p id="description">${info.description}</p>
                <a href=${info.website}><img src="/static/img/facebookLogo.png" class="fb-logo" alt="fb stranica"></a>
                <p>
                    <a href="/igraci" data-link>Pogledajte popis igrača</a>
                <p/>
            ` 
            if(this.user.admin){
                html +=`
                <div>
                    <form class="center-align" id="admin-form" style="margin: 40px auto; max-width: 300px;">
                        <input type="email" placeholder="Korisnički mail" id="admin-email" required>
                        <button class="pure-material-button-contained">Učini adminom</button>
                    </form>
                </div>`

            }
        }
        else html += `<h1>Dobrodošli na stranicu nogometnog kluba</h1>
                <p>
                    <a href="/login" data-link>Da biste vidjeli informacije o svojem klubu prijavite se</a>
                <p/>
        `
        return html;
    }
}