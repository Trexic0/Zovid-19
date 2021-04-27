var ScenarioText = document.getElementById("description")
var OptionButtons = document.getElementById("buttonOptions")

let InventoryM = JSON.parse(localStorage.getItem("InventoryString"))
var Inventory = {}

function startGame(){
    CheckVariable(InventoryM)
    showScenario(1)
}

function CheckVariable(InventoryM){
    if (InventoryM !== null){
        Inventory = InventoryM
        console.log(Inventory)
    }
    else{
        Inventory = {}
    }
    return Inventory
}

function showScenario(ScenarioIndex){
    var Scenario = ScenarioIndexes.find(Scenario => Scenario.index === ScenarioIndex)
    ScenarioText.innerText = Scenario.text
    
    while (OptionButtons.firstChild) {
        OptionButtons.removeChild(OptionButtons.firstChild)
    }

    Scenario.options.forEach(option => 
        {
        if ( option.requiredInventory == null || option.requiredInventory(Inventory) ) {
            var button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("button")
            button.addEventListener("click", () => selectOption(option))
            OptionButtons.appendChild(button)
        }
    })
    
}


function selectOption(option) {
    var nextScenarioId = option.nextScenario
    Inventory = Object.assign(Inventory, option.setInventory)
    relocation(nextScenarioId, Inventory)
    showScenario(nextScenarioId)
    
}

function relocation(nextScenarioId, Inventory){
    if ( nextScenarioId <= 0 ) {
        let InventoryString = JSON.stringify(Inventory)
        localStorage.setItem("InventoryString", InventoryString)
        window.location.href = "Chap4.html"
    }
    else if ( nextScenarioId == 50 ){
        window.location.href = "index.html"
    }
    else{
        return null
    }
}

var ScenarioIndexes = [
    {
        index: 1,
        text: "You find a hospital along the way, it’s quite small and the front door is chained shut with a padlock on it.",
        options: [
            {
                text:"Investigate",
                nextScenario: 2,
            },
            {
                text: "Break In (Recommened)",
                nextScenario: 5,
                requiredInventory: (currentInventory) => currentInventory.Team,
            }
        ]
    },
    {
        index: 2,
        text: "You don’t have anything to cut the chains so you must find another way in the building. You have a look around the side and see a rock that you could use to smash one of the windows. You pick up the rock and chuck it at the window, then proceed to climb through it. On your way in through the window a shard of glass gets lodged into your arm and as you fall into the room it slides down your arm cutting further. You start to bleed heavily, but at least you’re inside."
    }
]

startGame()