class controller {

    constructor() {

        this._chronometerEl = document.getElementById("chronometer")
        this._cont = 0

        this._timerEl = document.getElementById("timer")
        this._cont2 = 0

        this._initEl = document.getElementById("init")
        this._contInit = "nothing"

        this._resetEl = document.getElementById("reset")

        this._validEl = document.getElementById("valid")

        this._secondsEl = document.getElementById("cxsec")
        this._minutesEl = document.getElementById("cxminutes1")
        this._hourEl = document.getElementById("cxhour1")

        this._myInterval = ""
        this._mySecInterval = ""

        this._seconds = 0
        this._minutes = 0
        this._hour = 0

        this._verification = []

        this.buttonEvents()

        this.audio = new Audio('tictac.mp3')
    }

    keys() {

        for (let i = 0; i <= 59; i++) {

            this._verification.push(i)
        }
    }

    addClickEvents(element, fn){
        let a = "click drag"
        a.split(' ').forEach(event => {
            element.addEventListener(event, fn, false)
        })
    }

    addMouseEvents(element) {

        let a = "mouseup mousedown mouseover"
        a.split(' ').forEach(event => {
            element.addEventListener(event, fn => {
                element.style.cursor = "pointer"
            }, false)
        })
    }

    removeCursor(element) {

        let a = "mouseup mousedown mouseover"
        a.split(' ').forEach(event => {

            element.addEventListener(event, fn => {

                element.style.cursor = "initial"
            })
        })         
    }

    buttonEvents(){

        this.chronometerEvents()
        this.timerEvents()
        this.initEvents()
        this.resetEvents()
        this.cxSecEvents()
        this.cxMinEvents()
        this.cxHourEvents()
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

            this.cxsEvents() 
        })
    }

    cxSecEvents() {

        this.addClickEvents(this._secondsEl, events => {

            this.cxsEvents()        
        })
    }

    resetEvents() {

        this.addClickEvents(this._resetEl, events => {

            if (this._cont == 1) {

                if (this._contInit == "running") {

                    this._hour = 0
                    this._hourEl.innerHTML = "00"
                    this._minutes = 0
                    this._minutesEl.innerHTML = "00"
                    this._seconds = 0
                    this._secondsEl.innerHTML = "00"
                }

                else if (this._contInit == "stop") {

                    this.activeCh()
                }
            }

            if (this._cont2 == 1) {

                this.activeTimer()           
            }
        })
    }

    start() {

        this.activeBtnReset() 
        
        this._minutesEl.style.color = "green"
        this._secondsEl.style.color = "green"
        this._hourEl.style.color = "green"

        this._myInterval = setInterval(() => {

            this.audio.play()


            if (this._seconds == -1){
                this._seconds = 0
            }

            if (this._seconds == 60) {
                this._seconds = 0
                this._minutes += 1
            }

            if (this._minutes == 60) {
                this._seconds = 0
                this._minutes = 0
                this._hour += 1
            }

            if (this._hour < 10) {
                let f = []
                let j = "0" + this._hour
                f.push(j)
                this._hourEl.innerHTML = f[0]
            }

            else{

                this._hourEl.innerHTML = this._hour
            }

            if (this._minutes < 10) {
                let d = []
                let e = "0" + this._minutes
                d.push(e)
                this._minutesEl.innerHTML = d[0]
            }   

            else {

                this._minutesEl.innerHTML = this._minutes
            }

            if (this._seconds < 10) {
                let b = []
                let a = "0" + this._seconds
                b.push(a)
                this._secondsEl.innerHTML = b[0]                
            }

            else {

                this._secondsEl.innerHTML = this._seconds               
            } 

            this._seconds += 1  

        }, 1000)

        
    }

    initEvents(){

        this.addMouseEvents(this._initEl)

        this.addClickEvents(this._initEl, event => {

            if (this._contInit == "nothing") {

                this.returnInit()
                this._validEl.innerHTML = "Por favor, selecione uma das 2 opções."         
            }

            else if (this._contInit == "selected") {

                if (this._cont == 1) {

                    this.running()
                    this.start()
                }

                else if (this._cont2 == 1) {

                    this.goZero()
                }
            }

            else if (this._contInit == "running") {

                this.stop()  
                this._minutesEl.contentEditable = "true"
                this._hourEl.contentEditable = "true"
                this._secondsEl.contentEditable = "true" 
                this.audio.pause() 
            }

            else if (this._contInit == "stop") {

                if (this._cont == 1) {

                    this.running()
                    this.start()
                }

                else if (this._cont2 == 1) {

                    this.goZero()
                }
            }
        })
    }

    timerEvents(){

        this.addMouseEvents(this._timerEl)

        this.addClickEvents(this._timerEl, event => {

            if (this._contInit == "nothing") {

                this.activeTimer()
            }
           
            else if (this._cont2 == 1) {

                this.returnInit()                
            }

            else if (this._cont == 1) {

                this.activeTimer()
            }            
        })
    }

    chronometerEvents(){
        
        this.addMouseEvents(this._chronometerEl)

        this.addClickEvents(this._chronometerEl, event => {

            if (this._contInit == "nothing") {

                this.activeCh()
            }

            else if (this._cont == 1) {

                this.returnInit()
            }

            else if (this._cont2 == 1) {

                this.activeCh()
            }      
        })
    }

    activeBtnReset(){

        this.addMouseEvents(this._resetEl)
        this._resetEl.style.backgroundColor = "red"
        this._resetEl.style.color = "#000"       
    }

    stop() {

        this._initEl.innerHTML = "CONTINUAR"    
        this._contInit = "stop"

        clearInterval(this._myInterval)
        clearInterval(this._mySecInterval)

        this._minutesEl.style.color = "#000"
        this._secondsEl.style.color = "#000"
        this._hourEl.style.color = "#000"
    }

    running() {

        this._initEl.style.backgroundColor = "green"
        this._initEl.innerHTML = "PAUSAR"
        this._contInit = "running"
    }

    resetValid() {

        return this._validEl.innerHTML = ""
    }

    goZero() {

        this.keys()

        this._seconds = this._secondsEl.textContent
        this._minutes = this._minutesEl.textContent
        this._hour = this._hourEl.textContent

        let hourStatus = "denied"
        let minStatus = "denied"
        let secStatus = "denied"

        for (let i = 0; i <= 59; i++) {

            if (this._hour == this._verification[i]) {
                hourStatus = "open"
                break;
            }
        }

        for (let j = 0; j <= 59; j++) {

            if (this._minutes == this._verification[j]) {

                minStatus = "open"
            }
        }

        for (let z = 0; z <= 59; z++) {

            if (this._seconds == this._verification[z]) {
                secStatus = "open"
            }
        }

        if (secStatus == "open" && minStatus == "open" && hourStatus == "open") {
 
            if (this._hour < 1 && this._minutes < 1 && this._seconds < 1) {

                window.alert("Por favor, escolha um tempo de início para o temporizador. (edite nos espaços em branco)")
            }
    
            else{

                this._hourEl.contentEditable = "false"
                this._minutesEl.contentEditable = "false"
                this._secondsEl.contentEditable = "false"

                this._secondsEl.style.color = "green"
                this._minutesEl.style.color = "green"
                this._hourEl.style.color = "green"

                this.running()
                this.activeBtnReset()

                this._seconds = parseInt(this._seconds)
                this._hour = parseInt(this._hour)
                this._minutes = parseInt(this._minutes)
    
                this._mySecInterval = setInterval(() => {

                    this.audio.play()
    
                    if (this._seconds == -1) {
    
                        this._seconds = 59
                        this._minutes -= 1
                    }
    
                    if (this._minutes <= -1) {
                        this._minutes = 59
                        this._seconds = 59
                        this._hour -= 1
                    }
    
                    if (this._hour < 10) {
                        let b = ""
                        b = "0" + this._hour
                        this._hourEl.innerHTML = b
                    }
    
                    else {
     
                        this._hourEl.innerHTML = this._hour   
                    }
    
                    if (this._minutes < 10) {
    
                        let c = ""
                        c = "0" + this._minutes
                        this._minutesEl.innerHTML = c
                    }
    
                    else {
    
                        this._minutesEl.innerHTML = this._minutes 
                    }
    
                    if (this._seconds < 10) {
    
                        let e = ""
                        e = "0" + this._seconds
                        this._secondsEl.innerHTML = e
                    }
    
                    else {
    
                        this._secondsEl.innerHTML = this._seconds
                    }
    
                    if (this._hour == 0 && this._minutes == 0 && this._seconds == 0) {
    
                        clearInterval(this._mySecInterval)
                        this.resetEvents()

                        window.alert("TEMPO ESGOTADO!!")
    
                    }
               
                    this._seconds -= 1
      
                }, 1000)           
            }
        }

        else {
            window.alert("Por favor, selecione entradas válidas para o temporizador.")
        }
    }

    returnInit() {

        this._initEl.style.backgroundColor = "rgb(74, 74, 150)"
        this._initEl.innerHTML = "INICIAR"
        this._contInit = "nothing"

        this._cont = 0
        this._chronometerEl.style.backgroundColor = "rgb(74, 74, 150)"

        this._cont2 = 0
        this._timerEl.style.backgroundColor = "rgb(74, 74, 150)"

        this.resetCounter()

        this._resetEl.style.backgroundColor = "hsl(180, 11%, 64%)"
        this._resetEl.style.color =  "hsl(180, 11%, 64%)"
        this._resetEl.cursor = "initial"

        this._hourEl.contentEditable = "false"
        this._minutesEl.contentEditable = "false"
        this._secondsEl.contentEditable = "false"

        this.removeCursor(this._resetEl)
    }

    activeCh(){

        this._cont = 1
        this._chronometerEl.style.backgroundColor = "green"

        this._cont2 = 0
        this._timerEl.style.backgroundColor = "rgb(74, 74, 150)"

        this._contInit = "selected"
        this._initEl.innerHTML = "INICIAR"
        this._initEl.style.backgroundColor = "rgb(74, 74, 150)"

        this.resetValid()

        this.resetCounter()

        this._hourEl.contentEditable = "false"
        this._minutesEl.contentEditable = "false"
        this._secondsEl.contentEditable = "false"

        this._resetEl.style.backgroundColor = "hsl(180, 11%, 64%)"
        this._resetEl.style.color = "hsl(180, 11%, 64%)"
        this.removeCursor(this._resetEl)      
    }


    activeTimer(){

        this._hourEl.contentEditable = "true"
        this._minutesEl.contentEditable = "true"
        this._secondsEl.contentEditable = "true"

        this.resetCounter()

        this._timerEl.style.backgroundColor = "green"
        this._cont2 = 1   

        this._resetEl.style.backgroundColor = "hsl(180, 11%, 64%)"
        this._resetEl.style.color = "hsl(180, 11%, 64%)"
        this.removeCursor(this._resetEl)   

        this._initEl.innerHTML = "INICIAR"
        this._initEl.style.backgroundColor = "rgb(74, 74, 150)"
        this._contInit = "selected"

        this.resetValid()

        this._cont = 0
        this._chronometerEl.style.backgroundColor = "rgb(74, 74, 150)"
    }

    resetCounter() {

        this._hour = 0
        this._minutes = 0
        this._seconds = 0

        clearInterval(this._myInterval)
        clearInterval(this._mySecInterval)

        this._minutesEl.innerHTML = "00"
        this._secondsEl.innerHTML = "00"
        this._hourEl.innerHTML = "00"

        this._minutesEl.style.color = "#000"
        this._secondsEl.style.color = "#000"
        this._hourEl.style.color = "#000"
    }
}

let buttons = new controller