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
        window.location.href = "TheEnd.html"
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
        text: "",
        options: [
            {
                text:"",
                nextScenario: 2
            },
            {
                text: "",
                nextScenario: 5,
                requiredInventory: (currentInventory) => currentInventory.Team,
            }
        ]
    },
    {
        index: 2,
        text: "",
        options: [
            {
                text: " "

            },
            {
                text: " ",
                nextScenario: 100
            }
        ]
    }
]

startGame()