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
    relocation(nextScenarioId)
    showScenario(nextScenarioId)
    
}

function relocation(nextScenarioId){
    if ( nextScenarioId <= 0 ) {
        window.location.href = "index.html"
    }
    else{
        return null
    }
}

var ScenarioIndexes = [
    {
        index: 1,
        text: "To be continued... \n \n This text adventure game was created for my Web Technologies University module. \n The story is incomplete, but will be completed at a later date. \n \n Thank you for playing. I hope you enjoyed.",
        options: [
            {
                text: "Home Page",
                nextScenario: -1
            }
        ]
    }
]

startGame()