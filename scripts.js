class Controller {

    constructor() {

        this._chronometerButtonEl = document.getElementById("chronometer");
        this._cont = 0;

        this._timerButtonEl = document.getElementById("timer");
        this._cont2 = 0;

        this._initEl = document.getElementById("init");
        this._contInit = "nothing";

        this._resetEl = document.getElementById("reset");

        this._validEl = document.getElementById("valid");

        this._secondsEl = document.getElementById("sec");
        this._minutesEl = document.getElementById("minutes");
        this._hourEl = document.getElementById("hour");

        this._myInterval = "";
        this._mySecInterval = "";

        this._seconds = 0;
        this._minutes = 0;
        this._hour = 0;

        this._verification = [];

        this.buttonEvents();

    }

    keys() {

        for (let i = 0; i <= 59; i++) {

            this._verification.push(i);
        }
    }

    addClickEvents(element, fn){

        let events = "click drag";

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false)
        })
    }

    addMouseEvents(element) {

        let events = "mouseup mousedown mouseover";

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn => {

                element.style.cursor = "pointer"

            }, false)
        })
    }

    removeCursor(element) {

        let events = "mouseup mousedown mouseover";
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn => {

                element.style.cursor = "initial"
            })
        })         
    }

    buttonEvents(){

        this.chronometerEvents();
        this.timerEvents();
        this.initEvents();
        this.resetEvents();
        this.cxSecEvents();
        this.cxMinEvents();
        this.cxHourEvents();
    }

    cxsEvents() {

        if (this._cont == 1 || this._contInit == "nothing") {

            window.alert("Só é possível editar o tempo na opção temporizador.")
        }

        else if (this._contInit == "running") {

            window.alert("Pause ou zere o temporizador para poder editar o tempo")
        }
    }

    cxHourEvents() {

        this.addClickEvents(this._hourEl, events => {
 
            this.cxsEvents()            
        })
    }

    cxMinEvents() {

        this.addClickEvents(this._minutesEl, events => {

            this.cxsEvents(); 
        })
    }

    cxSecEvents() {

        this.addClickEvents(this._secondsEl, events => {

            this.cxsEvents();        
        })
    }

    resetEvents() {

        this.addClickEvents(this._resetEl, events => {

            if (this._cont == 1) {

                if (this._contInit == "running") {

                    this._hour = 0;
                    this._hourEl.innerHTML = "00";
                    this._minutes = 0;
                    this._minutesEl.innerHTML = "00";
                    this._seconds = 0;
                    this._secondsEl.innerHTML = "00";
                }

                else if (this._contInit == "stop") {

                    this.activeCh();
                }
            }

            if (this._cont2 == 1) {

                this.activeTimer();         
            }
        })
    }

    start() {

        this.activeBtnReset(); 
        

        this._myInterval = setInterval(() => {

            if (this._seconds == -1){

                this._seconds = 0;
            }

            if (this._seconds == 60) {

                this._seconds = 0;
                this._minutes += 1;
            }

            if (this._minutes == 60) {

                this._seconds = 0;
                this._minutes = 0;
                this._hour += 1;
            }

            if (this._hour < 10) {

                let f = [];
                let j = "0" + this._hour;
                f.push(j);
                this._hourEl.innerHTML = f[0];
                
            }

            else{

                this._hourEl.innerHTML = this._hour;
                
            }

            if (this._minutes < 10) {

                let d = [];
                let e = "0" + this._minutes;
                d.push(e);
                this._minutesEl.innerHTML = d[0];
                
            }   

            else {

                this._minutesEl.innerHTML = this._minutes;
            }

            if (this._seconds < 10) {

                let b = [];
                let a = "0" + this._seconds;
                b.push(a);
                this._secondsEl.innerHTML = b[0];
                               
            }

            else {

                this._secondsEl.innerHTML = this._seconds;               
            } 

            this._seconds += 1;  

        }, 1000);

        
    }

    initEvents(){

        this.addMouseEvents(this._initEl);

        this.addClickEvents(this._initEl, event => {

            if (this._contInit == "nothing") {

                this.returnInit();
                this._validEl.innerHTML = "Por favor, selecione uma das 2 opções."         
            }

            else if (this._contInit == "selected") {

                if (this._cont == 1) {

                    this.running();
                    this.start();
                }

                else if (this._cont2 == 1) {
                    this.goZero();
                }
            }

            else if (this._contInit == "running") {

                this.stop();
                this._minutesEl.contentEditable = "true"
                this._hourEl.contentEditable = "true"
                this._secondsEl.contentEditable = "true";
            }

            else if (this._contInit == "stop") {

                if (this._cont == 1) {

                    this.running();
                    this.start();
                }

                else if (this._cont2 == 1) {

                    this.goZero();
                }
            }
        })
    }

    timerEvents(){

        this.addMouseEvents(this._timerButtonEl)

        this.addClickEvents(this._timerButtonEl, event => {

            if (this._contInit == "nothing") {

                this.setItemColorSelected(this._timerButtonEl);
                this.activeTimer();
            }
           
            else if (this._cont2 == 1) {

                this.setItemColorNotSelected(this._chronometerButtonEl);
                this.returnInit();                
            }

            else if (this._cont == 1) {

                this.setItemColorNotSelected(this._chronometerButtonEl);
                this.setItemColorSelected(this._timerButtonEl);
                this.activeTimer();
            }            
        })
    }

    chronometerEvents(){
        
        this.addMouseEvents(this._chronometerButtonEl);

        this.addClickEvents(this._chronometerButtonEl, event => {

            if (this._contInit == "nothing") {

                this.setItemColorSelected(this._chronometerButtonEl);
                this.activeCh();
            }

            else if (this._cont == 1) {

                this.setItemColorNotSelected(this._chronometerButtonEl);
                this.returnInit();
            }

            else if (this._cont2 == 1) {

                this.setItemColorNotSelected(this._timerButtonEl);
                this.setItemColorSelected(this._timerButtonEl);
                this.activeCh();
            }      
        })
    }

    activeBtnReset(){

        this.addMouseEvents(this._resetEl);    
    }

    stop() {

        this._initEl.innerHTML = "CONTINUAR";    
        this._contInit = "stop";

        clearInterval(this._myInterval);
        clearInterval(this._mySecInterval);   
    }

    running() {

        this._initEl.innerHTML = "PAUSAR";
        this._contInit = "running";
    }

    resetValid() {

        return this._validEl.innerHTML = "";
    }

    goZero() {

        this.keys();

        this._seconds = this._secondsEl.textContent;
        this._minutes = this._minutesEl.textContent;
        this._hour = this._hourEl.textContent;   

        let hourStatus = "denied";
        let minStatus = "denied";
        let secStatus = "denied";

        for (let i = 0; i <= 59; i++) {

            if (this._hour == this._verification[i]) {

                hourStatus = "open";
                break;
            }
        }

        for (let j = 0; j <= 59; j++) {

            if (this._minutes == this._verification[j]) {

                minStatus = "open";
            }
        }

        for (let z = 0; z <= 59; z++) {

            if (this._seconds == this._verification[z]) {
                secStatus = "open";
            }
        }

        if (secStatus == "open" && minStatus == "open" && hourStatus == "open") {
 
            if (this._hour < 1 && this._minutes < 1 && this._seconds < 1) {

                window.alert("Por favor, escolha um tempo de início para o temporizador. (edite nos espaços em branco)");
            }
    
            else{

                this._hourEl.contentEditable = "false";
                this._minutesEl.contentEditable = "false";
                this._secondsEl.contentEditable = "false";

                this.running();
                this.activeBtnReset();

                this._seconds = parseInt(this._seconds);
                this._hour = parseInt(this._hour);
                this._minutes = parseInt(this._minutes);
                
                this._mySecInterval = setInterval(() => {
    
                    if (this._seconds == -1) {
    
                        this._seconds = 59;
                        this._minutes -= 1;
                    }
    
                    if (this._minutes <= -1) {

                        this._minutes = 59;
                        this._seconds = 59;
                        this._hour -= 1;
                    }
    
                    if (this._hour < 10) {

                        let b = "";
                        b = "0" + this._hour;
                        this._hourEl.innerHTML = b;
                        
                    }
    
                    else {
     
                        this._hourEl.innerHTML = this._hour;  
                         
                    }
    
                    if (this._minutes < 10) {
    
                        let c = "";
                        c = "0" + this._minutes;
                        this._minutesEl.innerHTML = c;
                        
                    }
    
                    else {
    
                        this._minutesEl.innerHTML = this._minutes;        
                    }
    
                    if (this._seconds < 10) {
    
                        let e = "";
                        e = "0" + this._seconds;
                        this._secondsEl.innerHTML = e;
                    }
    
                    else {
    
                        this._secondsEl.innerHTML = this._seconds;
                    }
    
                    if (this._hour == 0 && this._minutes == 0 && this._seconds == 0) {
    
                        clearInterval(this._mySecInterval);
                        this.resetEvents();
                        
                        window.alert("TEMPO ESGOTADO!!");
    
                    }
               
                    this._seconds -= 1;
                    
                }, 1000)           
            }
        }

        else {

            window.alert("Por favor, selecione entradas válidas para o temporizador.");
        }
    }

    returnInit() {

        this._initEl.innerHTML = "INICIAR";
        this._contInit = "nothing";

        this._cont = 0;
        this._cont2 = 0;

        this.setItemColorNotSelected(this._chronometerButtonEl);
        this.setItemColorNotSelected(this._timerButtonEl);

        this.resetCounter();

        this._resetEl.cursor = "initial";

        this._hourEl.contentEditable = "false";
        this._minutesEl.contentEditable = "false";
        this._secondsEl.contentEditable = "false";

        this.removeCursor(this._resetEl);
    }

    activeCh(){

        this._cont = 1;
        this._cont2 = 0;

        this._contInit = "selected";
        this._initEl.innerHTML = "INICIAR";

        this.resetValid();

        this.resetCounter();

        this._hourEl.contentEditable = "false";
        this._minutesEl.contentEditable = "false";
        this._secondsEl.contentEditable = "false";

        this.removeCursor(this._resetEl);      
    }


    activeTimer(){

        this._hourEl.contentEditable = "true";
        this._minutesEl.contentEditable = "true";
        this._secondsEl.contentEditable = "true";

        this.resetCounter()

        this._cont2 = 1   

        this.removeCursor(this._resetEl); 

        this._initEl.innerHTML = "INICIAR";
        this._contInit = "selected";

        this.resetValid();

        this._cont = 0;
    }

    resetCounter() {

        this._hour = 0;
        this._minutes = 0;
        this._seconds = 0;

        clearInterval(this._myInterval);
        clearInterval(this._mySecInterval);

        this._minutesEl.innerHTML = "00";
        this._secondsEl.innerHTML = "00";
        this._hourEl.innerHTML = "00";
    }

    setItemColorSelected(item) {

        item.style.backgroundColor = "#fff";
        item.style.color = "black";
    }

    setItemColorNotSelected(item) {

        item.style.backgroundColor = "black";
        item.style.color = "#fff";

        let events = "mouseup mousedown mouseover";

        events.split(' ').forEach(event => {

            item.addEventListener(event, fn => {

                item.style.backgroundColor = "#fff";
                item.style.color = "#000";

            }, false);
        })

        item.addEventListener('mouseleave', () => {

            if (item == this._chronometerButtonEl && this._cont == 0) {

                item.style.backgroundColor = "black";
                item.style.color = "#fff";
            }

            if (item == this._timerButtonEl && this._cont2 == 0) {

                item.style.backgroundColor = "black";
                item.style.color = "#fff";
            }
             
        }) 
    }
}

let buttons = new Controller;