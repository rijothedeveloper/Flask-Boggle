// const input = document.getElementById("word-input");
// const submitButton = document.querySelector("button");
// const form = document.querySelector("#word_form");
// const correctWordSec = document.querySelector("ul");
// const scoreSec = document.getElementById("score-sec");
// let currentScore = 0;

// form.addEventListener("submit", async function(evt) {
//     evt.preventDefault();
//     input.value = "";
//     const word = input.value;
//     const data = await checkWordFromAPI(word);
//     console.log(data.result);
//     if (data.result === "ok" ) {
//         const li = document.createElement("li");
//         li.innerText = word;
//         correctWordSec.append(li);
//         updateScore(word.length);
//     }
    
// })

// async function checkWordFromAPI(word) {
//     const response = await axios.get("/valid_word", {params: {"word": word}});
//     return response.data
// }

// function updateScore(len) {
//     currentScore += len;
//     scoreSec.innerText = currentScore
// }

// async function resetGame() {
//     await axios.get("/game_end", {params: {"score": currentScore}})
//     window.location.reload();
// }

// setTimeout( () => resetGame(), 60000 );




class Game {
    constructor() {
        this.wordSet = new Set();
        this.input = document.getElementById("word-input");
        this.submitButton = document.querySelector("button");
        this.form = document.querySelector("#word_form");
        this.correctWordSec = document.querySelector("ul");
        this.scoreSec = document.getElementById("score-sec");
        this.message = document.querySelector(".message");
        this.currentScore = 0;
        this.listenForEvents();
        this.setGameTime();
    }
    
    listenForEvents() {
        this.form.addEventListener("submit", this.handleSubmit.bind(this) )
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        this.message.classList.add("message")
        const word = this.input.value;
        this.input.value = "";
        if (this.wordSet.has(word)) {
            this.message.classList.remove("message")
            return;
        } else {
            this.wordSet.add(word);
            const data = await this.checkWordFromAPI(word);
            console.log(data.result);
            if (data.result === "ok" ) {
                const li = document.createElement("li");
                li.innerText = word;
                this.correctWordSec.append(li);
                this.updateScore(word.length);
            }
        }
        
    }
    

    async checkWordFromAPI(word) {
        const response = await axios.get("/valid_word", {params: {"word": word}});
        return response.data
    }

    updateScore(len) {
        this.currentScore += len;
        this.scoreSec.innerText = this.currentScore
    }

    async resetGame() {
        await axios.get("/game_end", {params: {"score": this.currentScore}})
        window.location.reload();
    }

    setGameTime() {
        setTimeout( () => this.resetGame(), 60000 );
    }
    
}

const game = new Game();
