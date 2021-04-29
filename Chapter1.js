var ScenarioText = document.getElementById("description")
var OptionButtons = document.getElementById("buttonOptions")

function startGame(){
    showScenario(1)
}


function showScenario(ScenarioIndex){
    var Scenario = ScenarioIndexes.find(Scenario => Scenario.index === ScenarioIndex)
    ScenarioText.innerText = Scenario.text

    changeImage(Scenario)

    while (OptionButtons.firstChild) {
        OptionButtons.removeChild(OptionButtons.firstChild)
    }

    Scenario.options.forEach(option => 
        {
            var button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("button")
            button.addEventListener("click", () => selectOption(option))
            OptionButtons.appendChild(button)
    })

}

function changeImage(Scenario){
    id = Scenario.index
    // Citation: (Duckett, J., 2014)
    switch (id) {
        case 1: 
            document.getElementById("scene").src = "https://trexic0.github.io/Zovid-19/Images/TV.png"
            return
        case 2:
            document.getElementById("scene").src = "./Images/Announcement.png"
            // Citation: (W3schools.com, 2021)
            document.getElementById("scene").style.height = "80%"
            document.getElementById("scene").style.width = "80%"
            return
        case 3: 
            document.getElementById("scene").src = "./Images/LockedDoor.png"
            document.getElementById("scene").style.height = "40%"
            document.getElementById("scene").style.width = "50%"
            return
        }
}

function selectOption(option) {
    var nextScenarioId = option.nextScenario
    relocation(nextScenarioId)
    showScenario(nextScenarioId)
    
}

function relocation(nextScenarioId){
    if ( nextScenarioId <= 0 ) {
        window.location.href = "./chap2.html"
    }
    else{
        return null
    }
}


var ScenarioIndexes = [
    {
        index: 1,
        text: "It’s the year 2022, everyone has been vaccinated and the world has finally got a bit of normality about it \n You’re sitting watching TV when all of a sudden there is a news report interruption. \n “This is not a Drill! Stay inside your houses! Don’t let anybody else in and stay isolated.” \n You wonder if this is another Covid outbreak, but there are loads of people running about screaming behind the news reporter which confuses you. \n He continues to speak “don’t trust anyo..” and before he can finish somebody lunges at him pinning him down on the ground growling. The camera falls and cuts off with him screaming. \n The TV goes black and then it goes to an announcement screen. ",
        options: [
            {
                text: "Read the Anouncement",
                nextScenario: 2
            }
        ]
    },
    {
        index: 2,
        text: "",
        options: [
            {
                text: "Look out Window",
                nextScenario: 3
            }
        ]
    },
    {
        index: 3,
        text: "You read the screen thinking this must be a prank, then get up to look out your window from your flat. You make your way over and draw open your curtains to see the main city busy with people running about screaming trying to get to their cars. You look closely and see people lunging at others, flinging their full bodies on them, and biting into them. \n One person looks up at you, blood all over their mouth as they tilt their head at you jaw hanging open. You quickly pull your curtains shut again, heart racing as you run to lock your door stumbling over the furniture. ",
        options: [
            {
                text: "Chapter 2: The Scavenge",
                nextScenario: -1
            }
        ]
    }
]

startGame()
