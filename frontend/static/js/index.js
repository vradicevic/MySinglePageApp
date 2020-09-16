import Pocetna from "./views/Pocetna.js";
import Igraci from "./views/Igraci.js";
import Login from "./views/Login.js";
import Registracija from "./views/Registracija.js";
import StvoriIgraca from "./views/StvoriIgraca.js";




const loggedinLinks = document.querySelectorAll('.logged-in');
const loggedoutLinks = document.querySelectorAll('.logged-out');
const adminItems = document.querySelectorAll('.admin');


var currentUser = auth.user;
var database=null

auth.onAuthStateChanged(user => {
    if (user) {
        
        user.getIdTokenResult().then(getIdTokenResult => {
            if (typeof getIdTokenResult.claims.club=="undefined"){auth.signOut().then();}
            user.club= getIdTokenResult.claims.club;
            user.admin=getIdTokenResult.claims.admin;
            currentUser = user;
            db.ref(`clubs/${currentUser.club}/players`).on('value', function (snapshot) {
                database = snapshot;
            });
            navigateTo("/");
            setupUI(user);
        });
        
        

    } else {
        currentUser=auth.user;
        navigateTo("/")

        setupUI();
    };
});
var setupUI = function (user) {

    if (user) {
        loggedinLinks.forEach(
            item => { item.style.display = "block" }

        );
        loggedoutLinks.forEach(item => { item.style.display = "none" }
        );
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        } else {
            adminItems.forEach(item => item.style.display = 'none');
        }
    } else {
        /*  adminItems.forEach(item => item.style.display = 'none'); */

        loggedinLinks.forEach(
            item => { item.style.display = "none" }

        );
        loggedoutLinks.forEach(item => { item.style.display = "block" }
        );

    }
}

const pathToRegex = path=>new RegExp("^"+path.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)")+"$");
const getParams= match=>{
    const values= match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result=> result[1]);
    return  Object.fromEntries(keys.map((key, i)=>{
        return [key,values[i]];
    }));

};

const navigateTo = (url)=>{
    history.pushState(null,null,url);
    router();
};

const router = async ()=>{
    
    const routes=[
        {
            path: "/",
            view : Pocetna
        },
        {
            path: "/igraci",
            view: Igraci
        },
    
       
        {
            path: "/login",
            view: Login
        },
        {
            path: "/registracija",
            view: Registracija
        }
        , 
        {
            path: "/logout",
            view: Pocetna
        }
        ,
        {
            path: "/stvorigraca",
            view: StvoriIgraca
        }
    ];
    const potentialMatches = routes.map(route=>{
        return{
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    let match = potentialMatches.find(potentialMatch=>potentialMatch.result!==null)
    
    if(!match){
        match={
            route:routes[0],
            result: [location.pathname]
        };
    }
    
    const view = (match.route.view === Igraci) ? 
        new match.route.view(getParams(match), currentUser, database) 
        : 
        new match.route.view(getParams(match), currentUser, db)

    
    
    
    
    document.querySelector("#app").innerHTML = await view.getHtml();
    onViewsLoaded();
};


function onViewsLoaded() {
    if (document.querySelector('#login-form') !== null) {
        const loginForm = document.querySelector('#login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            auth.signInWithEmailAndPassword(loginForm['email'].value, loginForm['password'].value)
                .then(cred => {
                    loginForm.reset();
                });
        });
    }
    if(document.title==="Registracija"){
        const signupForm = document.querySelector('#signup-form');
        signupForm.addEventListener('submit',(e)=>{
            e.preventDefault();
            
            auth.createUserWithEmailAndPassword(signupForm['email'].value, signupForm['password'].value).then(cred=>{
                const addCustomClaims = functions.httpsCallable('addCustomClaims');
                const email = signupForm['email'].value;
                const club = signupForm['selectedClub'].value;
                addCustomClaims({
                    email: email,
                    club: club
                }
                ).then(result => {
                    navigateTo("/login");
                    window.alert("Uspješno ste se registrirali. Sada se prijavite!");
                    

                }).catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
                
            }).catch(
                function (error) {
                    
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    
                }
            );
            



        });
    }

    if (document.title == "Igraci") {
        var coll = document.getElementsByClassName("collapsible");
        var i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    }
    if (document.title === "Stvori Igrača") {
        const createForm = document.querySelector('#create-form');
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let  data = {
                fifaid: createForm['fifaid'].value,
                name: createForm['name'].value,
                surname: createForm['surname'].value,
                position: createForm['position'].value,
                equipment: createForm['equipment'].value,
                scores: createForm['scores'].value,
                cards:{
                    red:{
                        active: createForm['activered'].value,
                        total: createForm['totalred'].value
                    },
                    yellow: {
                        active: createForm['activeyellow'].value,
                        total: createForm['totalyellow'].value
                    }
                }
            }
            db.ref(`clubs/${currentUser.club}/players`).set(data).catch(function (error) {

                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Error");

            });
            createForm.reset();
            navigateTo("/stvoriigraca");

        });
    }

    if (document.querySelector('#admin-form') !== null) {
        const adminForm = document.querySelector('#admin-form');
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const addCustomClaims = functions.httpsCallable('addCustomClaims');//stvaranje reference na clou funkciju
            
            addCustomClaims({ email: adminForm['admin-email'].value }).then( result => {
                var info = document.getElementById('result');
                info.style.display="block";
                setTimeout(() => {
                    info.style.display = "none";
                    adminForm.reset();

                }, 1000);
            }).catch(function (error) {
                console.log(error);

            });
            
            
        });
    }
    
}


window.addEventListener("popstate",router);







document.addEventListener("DOMContentLoaded",(e)=>{
    
    

    document.body.addEventListener("click",e=>{
        
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    document.querySelector("#logout").addEventListener("click", e=>{
        currentUser = auth.user;
        database = null;
        auth.signOut().then(()=>
            {   
                currentUser=auth.user;
                database=null;
                
            }
        );
    });

    
    /* const auth = firebase.auth();
    var db = firebase.database();
    const functions = firebase.functions(); */


    router();
});







