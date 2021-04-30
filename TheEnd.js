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
    
    changeImage(Scenario)

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

function changeImage(Scenario){
    id = Scenario.index
    switch (id) {
        case 9:
            document.getElementById("scene").src = "https://trexic0.github.io/Zovid-19/Images/GameLogo.png"
            return
        case 10: 
            document.getElementById("scene").src = "https://trexic0.github.io/Zovid-19/Images/WoodenShack.png"
            return
        case 14:
            document.getElementById("scene").src = "https://trexic0.github.io/Zovid-19/Images/TheStands.png"
            return
        case 20:
            document.getElementById("scene").src = "https://trexic0.github.io/Zovid-19/Images/TheTents.png"
            return
        }

   
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
        text: "The sun starts to set as you reach the stadium. Its boarded up and theres an army guard at the front holding a riffle. \n You approach the guard. ",
        options: [
            {
                text: "Say Hi",
                nextScenario: 2
            },
            {
                text: "Pull out your gun",
                nextScenario: 3,
                requiredInventory: (currentInventory) => currentInventory.Gun
            }
        ]
    },
    {
        index: 2,
        text: "“Hi, Is this the safe camp?” you ask whilst walking towards the guard. He pulls his riffle to point at you. \n “Stop right where you are and put your hands up”",
        options: [
            {
                text: "Stop",
                nextScenario: 4

            },
            {
                text: "Keep Walking",
                nextScenario: 3
            }
        ]
    },
    {
        index: 3,
        text: "The man fires once, it straight through your skull and you fall to the ground.",
        options: [
            {
                text: "Home Page",
                nextScenario: -1
            }
        ]
    },
    {
        index: 4,
        text: "You stop and raise your hands above your head. “Im just looking for the safe camp” you explain. \n He raises an eyebrow looking at you and then shrugs. He lowers his weapon. \n “This is the camp, do you have anything of value for your entry?” He asks.",
        options: [
            {
                text: "No",
                nextScenario: 24
            },
            {
                text: "Yes, a gun",
                nextScenario: 5,
                requiredInventory: (currentInventory) => currentInventory.Gun ,
                setInventory: {Gun:false}
            },
            {
                text: "Yes, a secret file",
                nextScenario: 6,
                requiredInventory: (currentInventory) => currentInventory.File & !currentInventory.Gun
            }
        ]
    },
    {
        index: 5,
        text: "You pull your gun out to show him. The guard allows you to approach. He takes your gun off you and allows you to enter.",
        options: [
            {
                text: "Enter",
                nextScenario: 7
            }
        ]
    },
    {
        index: 6,
        text: "The guard allows you to approach. “Head on in then”",
        options: [
            {
                text: "Enter",
                nextScenario: 7
            }
        ]
    },
    {
        index: 7,
        text: "“Talk to some of the other survivors and make yourself of use” He says and pushes you inside before boarding the entrance back up. \n You look around the stadium. They have taken the chairs appart to make more room. Theres some tents set up and a couple wooden shacks that look self made. \n A man walks up to you, he looks important in full army gear and lots of medals. “Im in charge around here, you can call me Milo. Im going to need some men to help me set up defence posts. Theres a big group of those creatures heading our way. We are going to need all the help we can get” Milo tells you",
        options: [
            {
                text: "Listen",
                nextScenario: 8
            }
        ]
    },
    {
        index: 8,
        text: "“If you want to help with the defence you're going to need to show you're useful. Come back to me once you've helped 2 people” Milo says and sends you on your way",
        options: [
            {
                text: "I've helped 2 people",
                nextScenario: 23,
                requiredInventory: (currentInventory) => (currentInventory.Wood & currentInventory.Chairs) || (currentInventory.Wood & currentInventory.Doctor) || (currentInventory.Chairs & currentInventory.Doctor)
            },
            {
                text: "Look for people to help",
                nextScenario: 9
            }
        ]
    },
    {
        index: 9,
        text: "You look around and for people to help. Where should you go?",
        options: [
            {
                text: "The Wooden Shacks",
                nextScenario: 10,
                requiredInventory: (currentInventory) =>! currentInventory.Wood
            },
            {
                text: "The Stand",
                nextScenario: 14,
                requiredInventory: (currentInventory) =>! currentInventory.Chairs
            },
            {
                text: "The Tents",
                nextScenario: 18,
                requiredInventory: (currentInventory) =>! currentInventory.Doctor
            },
            {
                text: "Back to Milo",
                nextScenario: 8
            }
        ]
    },
    {
        index: 10,
        text: "You head over to the wooden shacks. Theres a shaggy looking man cutting up some wood. \n “Well hello there young man. Fancy giving me a hand building these shacks?” ",
        options: [
            {
                text: "Help",
                nextScenario: 11,
            },
            {
                text: "Find someone else",
                nextScenario: 9
            }
        ]
    },
    {
        index: 11,
        text: "You agree to help the man and head over to one of the wooden shacks he is currently building. \n \n The Piece of wood needs to be cut in half. Which measurement should you cut at?",
        options: [
            {
                text: "20",
                nextScenario: 12
            },
            {
                text: "35",
                nextScenario: 13
            },
            {
                text: "40",
                nextScenario: 12
            }
        ]
    },
    {
        index: 12,
        text: "You cut the wood in the wrong place and now it can be used. The man tells you to go away and come back once you've learnt how to count. You leave to see who else you can help",
        options: [
            {
                text: "Come Back Later",
                nextScenario: 9
            }
        ]
    },
    {
        index: 13,
        text: "You cut the wood perfectly and the old man thanks you for your help and lets you leave to help others.",
        options: [
            {
                text: "Go Help Others",
                nextScenario: 9,
                setInventory: {Wood:true}
            }
        ]
    },
    {
        index: 14,
        text: "You head over to the stands where people are removing the chairs to clear more space in the stadium. A women asks if you could help them with the chairs. \n What will you do?",
        options: [
            {
                text: "Come Back Later",
                nextScenario: 9
            },
            {
                text: "Help",
                nextScenario: 15
            }
        ]
    },
    {
        index: 15,
        text: "She asks you to count how many chairs are left. \n How many are there?",
        options: [
            {
                text: "15",
                nextScenario: 16
            },
            {
                text: "16",
                nextScenario: 17
            },
            {
                text: "17",
                nextScenario: 16
            }
        ]
    },
    {
        index: 16,
        text: "You tell her the wrong amount and she messes up organisation. She tells you to come back later when you learn to count. ",
        options: [
            {
                text: "Come Back Later",
                nextScenario: 9
            }
        ]
    },
    {
        index: 17,
        text: "She thanks you for the help and lets you get on with your day",
        options: [
            {
                text: "Go Help Others",
                nextScenario: 9,
                setInventory: {Chairs:true}
            }
        ]
    },
    {
        index: 18,
        text: "You head over to the tents to see whats doing on and meet a Doctor. “Hello, are you needing medical attention” He asks.",
        options: [
            {
                text: "No, I found this",
                nextScenario: 19,
                requiredInventory: (currentInventory) => currentInventory.File
            },
            {
                text: "No, I'm here to help",
                nextScenario: 20,
            },
            {
                text: "Ignore him and Leave",
                nextScenario: 9
            }
        ]
    },
    {
        index: 19,
        text: "You pull the file out your bag and hand it to him. He has a quick flick through the file and his eyes go wide. “This is amazing! Oh my word, where did you find this beauty?” He kisses the file and dances about the room. \n “This is going to help us against the creatures attacking, you might have just saved us all” \n The man runs out the tent",
        options: [
            {
                text: "Go Help Others",
                nextScenario: 9,
                setInventory: {Doctor:true, Advantage:true}
            }
        ]
    },
    {
        index: 20,
        text:"“Oh thats great, I have some documents over there that you could shread for me. Dont shred anything important!” He says and points you towards the shredder. It seems to be battery powered. \n Which document should you not shred? ",
        options: [
            {
                text: "A",
                nextScenario: 21,
            },
            {
                text: "B",
                nextScenario: 21
            },
            {
                text: "C",
                nextScenario: 22
            },
            {
                text: "D",
                nextScenario: 21
            }
        ]
    },
    {
        index: 21,
        text: "The shredder jams “Oh thank the heavens for that luck, get out of here and dont come back until you have some common sense!” He shouts",
        options: [
            {
                text: "Go Help the Others",
                nextScenario: 9
            }
        ]
    },
    {
        index: 22,
        text: "You shred the documents and hand the doctor the one that seemed important. He thanks you for you help and lets you leave to help the others",
        options: [
            {
                text: "Go Help the Others",
                nextScenario: 9,
                setInventory: {Doctor: true}
            }
        ]
    },
    {
        index: 23,
        text: "“Wow! You work fast” Milo says in amazement. He leads you inside the stadium and into the changing rooms. What once was a changing room is now an armoury. There's multiple weapons hanging on the lockers, anything from guns to axes. Theres a table in the middle with a map of the stadium layout. \n “Okay, so the creatures are due to swarm tomorrow sunrise according to the scouts we sent out. Hopefully they will get slowed down on their way here. We need to prepare if we have any chance of surving. Theres a lot of innocnet people in this stadium. Everyones helping out to prepare, but we dont really have a plan set up” \n \n What do you suggest? ",
        options: [
            {
                text: "The End",
                nextScenario: 24
            }
        ]
    },
    {
        index: 24,
        text: "To be continued... \n \n This text adventure game was created for my Web Technologies University module. \n The story is incomplete, but will be completed at a later date. \n \n Thank you for playing. I hope you enjoyed.",
        options: [
            {
                text: "Home Page",
                nextScenario: -1
            }
        ]
    },
]

startGame()