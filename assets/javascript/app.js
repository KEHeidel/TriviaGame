$(document).ready(function() {

// Variables
var Questions=[{
    question: "To deny our own impulses is to deny the very thing that makes us human.", 
    guess: ["Die Hard", "Green Mile", "The Matrix", "Lethal Weapon"], 
    correct: 2, 
    img: "./assets/images/thematrix.jpg"
},
{
    question: "There's a time for daring and there's a time for caution, and a wise man understands which is called for.", 
    guess: ["Dead Poets Society", "The Good, the Bad and the Ugly", "Good Will Hunting", "Pay it Forward"], 
    correct: 0, 
    img: "./assets/images/deadpoetssociety.jpg"
},
{
    question: "You shall not pass!", 
    guess: ["The Hobbit", "The Two Towers", "The Return of the King", "The Fellowship of the Ring"], 
    correct: 3, 
    img: "./assets/images/fellowshipofthering.jpeg"
},
{
    question: "It takes a great deal of bravery to stand up to your enemies, but a great deal more to stand up to your friends.", 
    guess: ["Harry Potter and the Goblet of Fire", "Harry Potter and the Sorcerer's Stone ", "Harry Potter and the Order of the Phoenix", "Harry Potter and the Half-Blood Prince"], 
    correct: 1, 
    img: "./assets/images/harrypotter.jpg"
},
{
    question: "There should be no boundaries to human endeavor. We are all different. However bad life may seem, there is always something you can do, and succeed at. While there's life, there is hope.", 
    guess: ["The Imitation Game", "The Theory of Everything", "A Beautiful Mind", "Hearts in Atlantis"], 
    correct: 1, 
    img: "./assets/images/thetheoryofeverything.jpg"
},
{
    question: "The line must be drawn here! This far, no further! And I will make them pay for what they've done!", 
    guess: ["The Andromeda Strain", "Westworld", "Star Trek: First Contact", "Close Encounters of the Third Kind"], 
    correct: 2, 
    img: "./assets/images/startrek.png"
},
{
    question: "I had a dream my life would be so different from this hell I'm living!", 
    guess: ["Les Miserables", "Moulin Rouge", "Count of Monte Cristo", "Hunchback of Notre Dame"], 
    correct: 0, 
    img: "./assets/images/LesMiserables.jpg"
},
{
    question: "Get outta here! And don't come back for five to seven days!", 
    guess: ["Dirty Dancing", "Never Been Kissed", "Pretty Woman", "My Girl"], 
    correct: 3, 
    img: "./assets/images/mygirl.png"
},
{
    question: "Inconceivable! You keep using that word. I do not think it means what you think it means.", 
    guess: ["The Princess Bride", "Young Frankenstein", "Robin Hood: Men in Tights", "Blazing Saddles"], 
    correct: 0, 
    img: "./assets/images/princessbride.png"
},
{
    question: "Let me tell you something my friend. Hope is a dangerous thing. Hope can drive a man insane.", 
    guess: ["Pulp Fiction", "Fight Club", "The Shawshank Redemption", "Schindler's List"], 
    correct: 2, 
    img: "./assets/images/shawshank.png"
}
];
var Score= {
    correct: 0,
    incorrect: 0,
    unanswered: 0
}
var counter = 0

var qTimer= 30

var aTimer= 10

var answer= ""

var time= 0;

// Functions
// start game - resets score, counter, loads the quesstion and answer display
function startgame() {
    Score["correct"] = 0;
    Score["incorrect"] = 0;
    Score["unanswered"] = 0;
    counter = 0;
    displayQandA();
}

// advances the question counter to the next question, loads the score, timer for question and answer display
function advanceQuestion() {
    $("#guess1").append('<img class=answerImage width="250" height="250" src="' + Questions[counter]["img"] +'">').css("text-align", "center");
    counter++;
        if(counter < Questions.length) {
        clearInterval(time);
        setTimeout(displayQandA, 1000 * 5);
        }
        else {
            clearInterval(time);
            setTimeout(displayScore, 1000 * 5);
        }
}

// determines if answer is correct or incorrect
function checkAnswer(guessId) {
    var answerId= Questions[counter]["correct"]
    answer= Questions[counter]["guess"][answerId]
    if(Questions[counter]["correct"] == guessId) {
        $("#question").empty();
        $("#guess0").text("You got the correct answer").css("text-align", "center");
        Score["correct"]++;
        advanceQuestion();
    }
    else {
        $("#question").text("You guessed incorrectly").css("text-align", "center");
        $("#guess0").text("The correct answer is: ").append(answer).css("text-align", "center");
        Score["incorrect"]++;
        advanceQuestion();
    }
}

// loads the current question and starts countdown timer
function displayQandA() {
    qTimer= 30;
    var answerId= Questions[counter]["correct"]
    answer= Questions[counter]["guess"][answerId]
    $("#question").text(Questions[counter]["question"]).css("text-align", "center");
    $("#guess0").empty();
    $("#guess1").empty();
    for(var i = 0; i < Questions[counter]["guess"].length; i++) {
        $("#guess0").append('<h4 id=' + i + '>' + Questions[counter]["guess"][i] + '</h4>').css("text-align", "center").append('<br>');
        $("#" + i).on("click", function() {
        checkAnswer($(this).attr("id"));
        });
    }
    $("#timer").text("Time Remaining: ").append(qTimer).css("text-align", "center");
    time= setInterval(updateTimer, 1000);
}

// updates countdown timer and handles the display of the answer when time runs out and advances the question
function updateTimer() {
   
    if(qTimer == 0) {
        $("#question").text("Time's up").css("text-align", "center");
        $("#guess0").text("The correct answer is: ").append(answer).css("text-align", "center");
        Score["unanswered"]++;
        advanceQuestion();
    }

    else {
        qTimer--
        $("#timer").text("Time Remaining: ").append(qTimer).css("text-align", "center");
    }

}

// displays score and restart game button
function displayScore() {
    $("#timer").empty();
    $("#question").empty();
    $("#guess1").empty();
    $("#guess0").text("Number correct: ").append(Score["correct"]).css("text-align", "center").append('<br>');
    $("#guess0").append("Number incorrect: ").append(Score["incorrect"]).css("text-align", "center").append('<br>');
    $("#guess0").append("Number unanswered: ").append(Score["unanswered"]).css("text-align", "center").append('<br>');
    var start = $('<button>Restart Game</button>').click(function () {
        startgame();
    });
    $("#guess2").append(start).css("text-align", "center");
}

// initial start game button
var start = $('<button>Start</button>').click(function () {
    startgame();
});
$("#guess0").append(start).css("text-align", "center");



});