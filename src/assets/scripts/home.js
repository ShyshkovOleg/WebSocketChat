let start = true;
window.user;
function User (name, color) {
    this.name = name;
    this.message = "";
    this.color = color;
    this.id = (function () {
        return this.id = Math.floor(Math.random() * 1000);
    })();
}

window.onload = function(){
    
    document.getElementById("submitName").addEventListener("click", function(){
        proccess();
    }); 
    document.addEventListener('keypress', function (e) {
        if (e.keyCode == 13 && start) {
            proccess();
        }
    }, false);
}

const proccess = () => {
    let name = document.getElementById("userName");
    user = new User(name.value, getRandomColor());
    
    name.value = '';
    document.getElementById("userNameForm").className = "hideForm"

    let chat= document.getElementById("chatContainer");
    chat.className = "showChat";
    start = false;
    // window.location.replace("ws://localhost:8080/ws");
    // document.location.href = '/ws'
    loadScript("/assets/scripts/wsclient.js", () => console.log("Script Loaded"));
}

// insert wsClient script
const loadScript = (url, callback) => {
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("body")[0].appendChild(script);
}

const getRandomColor = () => {
    const characters = "0123456789ABCDEF";
    let color = "#";
    const getRandomNumber = (low, high) => {
        const r = Math.floor(Math.random() * (high - low + 1)) + low;

        return r;
    };
    for (let i = 0; i < 6; i++) {
      color += characters[getRandomNumber(0, 15)];
    }

    return color;
}