var ScenarioText = document.getElementById("description")
var OptionButtons = document.getElementById("buttonOptions")
var Inventory = {}

function startGame(){
    //makes sure inventory is empty 
    Inventory = {}
    //starts the game from index 1
    showScenario(1)
}


function showScenario(ScenarioIndex){
    /* searches the nested array ScenarioIndexes to make sure index value is same as variable ScenarioIndex
    Citation: (Toby, 2016)*/
    var Scenario = ScenarioIndexes.find(Scenario => Scenario.index === ScenarioIndex)
    ScenarioText.innerText = Scenario.text

    /* removes all the buttons by checking if theres a child
    Citation: (JavaScript Tutorial, 2020) */    
    while (OptionButtons.firstChild) {
        OptionButtons.removeChild(OptionButtons.firstChild)
    }

    // checks each option in the nested array
    Scenario.options.forEach(option => 
        {
        // checks if the user has the required item in their inventory to continue, if there is a required item
        if ( option.requiredInventory == null || option.requiredInventory(Inventory) ) {
            // created a button
            var button = document.createElement("button")
            // gives the button the text of indexed option
            button.innerText = option.text
            // adds the button to the button class to be styles
            button.classList.add("button")
            /* when the button is clicked goes to the function selectOption
            Citation: (W3schools.com, 2015) */
            button.addEventListener("click", () => selectOption(option))
            OptionButtons.appendChild(button)
        }
    })
    
}


function selectOption(option) {
    var nextScenarioId = option.nextScenario
    /* replaces old inventory with new
    Citation: (Mozilla.org, 2021)*/
    Inventory = Object.assign(Inventory, option.setInventory)
    relocation(nextScenarioId, Inventory)
    // calls the showScenario function
    showScenario(nextScenarioId)
    
}

function relocation(nextScenarioId, Inventory){
    //when index -1 takes to next chapter
    if ( nextScenarioId <= 0 ) {
        /* Sets the inventory as a string and saves it to the local storage
        Citation: (LogRocket Blog, 2020) */
        let InventoryString = JSON.stringify(Inventory)
        localStorage.setItem("InventoryString", InventoryString)
        /*Goes to the location for next chapter html page
        Citation: (Codegrepper.com, 2019)*/
        window.location.href = "chap3.html"
    }
    //checks if index is 50, which is the set value to dead for this chapter
    else if ( nextScenarioId == 50 ){
        window.location.href = "index.html"
    }
    else{
        return null
    }
}

// nested array holding all scenarios, their options and an index to call them by
var ScenarioIndexes = [
    {
        index: 1,
        text: "The door clicks as you lock it, and you fall back into your chair grabbing your phone. No signal. You look around your room, panicked and thinking quickly what to do next.",
        options: [
            {
                text: "Pick up the Rucksack",
                setInventory: {Rucksack: true, noTimeLimit: true },
                nextScenario: 3
            },
            {
                text: "Look Through Peep Hole in Door",
                nextScenario: 2
            }
        ]
    },

    {
        index: 2,
        text: "You look through the peep hole and see people running about panicking in crowds. You’ve never seen the hallway this busy before. People pile down the stairs when out of nowhere somebody slams, falling into the door. You get a fright and fall backwords, hitting your head of the table as you fall. \n Your vision goes blurry, and you lay your head on the ground feeling your head. You hit it hard, and the room starts to go dark. \n You start to wake up and look around you. You quickly stand up, realising that was a bad idea as you are a little bit dizzy. Standing still and regaining your balance you see the rucksack and grab it.",
        options: [ 
            {
            text: "continue",
            nextScenario: 3
        }
        ]
    },

    {
        index: 3,
        text: "You look around the house and think what you can grab. \n Where do you go first?",
        options: [
            {
                text: "The Kitchen",
                nextScenario: 4,
                setInventory: {Knife: true},
            },
            {
                text: "The Bathroom",
                nextScenario: 5,
                setInventory: {Bandages: true},
            }
        ]
    },

    {
        index: 4,
        text: "You head to the kitchen and grab a knife",
        options: [
            {
                text: "Go to the Bathroom",
                requiredInventory: (currentInventory) => currentInventory.noTimeLimit,
                setInventory: {noTimeLimit: false, Bandages: true},
                nextScenario: 5
            },
            {
                text: "Leave",
                nextScenario: 6
            }
        ]
        
    },
    
    {
        index: 5,
        text: "You search the bathroom and find some bandages",
        options: [
            {
                text: "Go to the Kitchen",
                requiredInventory: (currentInventory) => currentInventory.noTimeLimit,
                setInventory: {noTimeLimit: false, Knife: true},
                nextScenario: 4
            },
            {
                text: "Leave",
                nextScenario: 6
            }
        ]
    },

    {
        index: 6,
        text: "After filling your bag with some essential items like energy bars and bottled water, you head to the door. You listen and hear the hallway sounds less panicked. \n Quite some time has passed since the outbreak announcement. You look through the peep hole in the door and see the hall looks empty. Slowly, to avoid any loud noise, you turn the lock. \n You open the door and stick your head out looking about. There seems to be nobody around, maybe they already left? \n You can either head up to the roof top or make your way down the stairs. You weigh up the pros and cons of each and decide on",
        options:[
            {
                text: "Go to the Roof",
                nextScenario: 7
            },
            {
                text: "Head Down the Stairs",
                nextScenario: 8
            }
        ]
    },

    {
        index: 7,
        text: "The roof! Yes! After weighing up the pros and cons the roof seems like the best option. There won’t be any people up on the roof, unlike the busy streets filled with theses creatures, and you can try signal from help. Maybe the army will send helicopters over and you can signal one to pick you up. \n You pull your rucksack onto your back and tighten it. “Let’s do this!“ you whisper to yourself. (is this the first sign of going crazy?) \n You head over to the edge and look down. Before you can react a strong gust of wind makes you lose your balance, and you splat on the ground",
        options: [
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },

    {
        index: 8,
        text: "The stairs seem like the obvious option. At least if you head outside there’s multiple places you can go, if you were to go to the roof, you’re at a dead end. \n You pull your rucksack onto your back and tighten it. “Let’s do this!“ you whisper to yourself. (is this the first sign of going crazy?) \n You walk towards the staircase and slowly open the door. Peaking in you see its empty and make your way down 3 flights of stairs to the front door. ",
        options: [
            {
                text: "Take a Deep Breath",
                nextScenario: 9
            }
        ]
    },

    {
        index: 9,
        text: "You take a deep breath as you open the front door. \n The first thing you see as you open the door is a family of 3 running out of a small shop down the road. There is a group of these weird creatures that the news report was talking about near by them. The creatures almost look human, except the rotting shin, red eyes and weird walking patterns. Some of them seem to have limps, and others even have knives stuck into them. \n You turn to the left away from the people, but as you turn you hear a scream. You look back seeing the man pinned down by two of the creatures and the woman running your direction with a child. They shout to you for help, but before you can react the creatures are already lunging at them. ",
        options: [
            {
                text: "Chapter 3",
                nextScenario: -1
            }
        ]
    }
]

//calls startGame to begin
startGame()

