const input = document.getElementById("word-input");
const submitButton = document.querySelector("button");
const form = document.querySelector("#word_form");
const correctWordSec = document.querySelector("ul");
const scoreSec = document.getElementById("score-sec");
let currentScore = 0;

form.addEventListener("submit", async function(evt) {
    evt.preventDefault();
    const word = input.value;
    const data = await checkWordFromAPI(word);
    console.log(data.result);
    if (data.result === "ok" ) {
        const li = document.createElement("li");
        li.innerText = word;
        correctWordSec.append(li);
        updateScore(word.length);
    }
    
})

async function checkWordFromAPI(word) {
    const response = await axios.get("/valid_word", {params: {"word": word}});
    return response.data
}

function updateScore(len) {
    currentScore += len;
    scoreSec.innerText = currentScore
}

function resetGame() {
    window.location.reload();
}

setTimeout( () => resetGame(), 60000 );