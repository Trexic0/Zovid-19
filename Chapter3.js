var ScenarioText = document.getElementById("description")
var OptionButtons = document.getElementById("buttonOptions")

let InventoryM = JSON.parse(localStorage.getItem("InventoryString"))
var Inventory = {}

function startGame(){
    CheckVariable(InventoryM)
    showScenario(1)
}

function CheckVariable(InventoryM){
    /* Checks if the variable from localstorage has anything in it
    Citation: (Codegrepper.com, 2020) */
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
        window.location.href = "./Chap4.html"
    }
    else if ( nextScenarioId == 50 ){
        window.location.href = "./index.html"
    }
    else{
        return null
    }
}

var ScenarioIndexes = [
    {
        index: 1,
        text: "You sprint down the alleyway beside your apartment building, taking random turns just hoping the creatures aren’t following you. They looked so human, but also dead. How can the dead walk? This is crazy! \n You jog a few blocks, and before you know it, you’re running out of breath. You decide it is a good idea to slow down a bit, you should be careful you don’t run into any more of those weird human-like creatures as well. \n You start to walk through the streets, your number 1 goal is to get out of this horrible city. \n You still can’t get over the small family you just watched be devoured by the creatures, you don’t fancy your odds against one of those creatures right now.",
        options: [
            {
                text: "Keep Walking",
                nextScenario: 2
            }
        ]
    },
    {
        index: 2,
        text: "After an hour of walking, you finally reach the edge of the city. You never realised how big the city was until now. Usually, you would take a bus or cycle, never walk out of the city. \n You can either head over the bridge, or towards the coast. \n The bridge will take you further away from the city, but no cover whilst crossing it. \n The coast will take you through a woodland walk, this will be a less open space and might be easier to hide but could also lead to an ambush.",
        options:[
            {
                text: "Head Towards the Coast",
                nextScenario: 3
            },
            {
                text: "Head Over the Bridge",
                nextScenario: 6
            }
        ]
    },
    {
        index: 3,
        text: "You think the coast seems like a better option, yes you could get ambushed throughout the city,  but if there’s a boat you’re in luck. \n You head through a woodland walk towards the coast. \n You start to get tired, where should you rest for the night?",
        options: [
            {
                text: "The Lighthouse",
                nextScenario: 4
            },
            {
                text: "The Boat Shack",
                nextScenario: 5
            }
        ]
    },
    {
        index: 4,
        text: "You head to the light house and climb all the stairs to the top. You can see the whole city from up here. You lay down to rest your eyes. \n \n A few hours later… \n \n You wake up to a load noise. The banging continues to get closer coming up the stairs, you look outside and see nothing. Slowly you make your way to the stairs. \n A horde of these creatures burst up all lunging at you. You’re down on the ground, 6 of the creatures in a circle around you biting into your flesh as you scream.",
        options:[
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
        
    },
    {
        index: 5,
        text: "You decide to take cover in the little boat shack for the night. Its close to the ground, so if anything goes south should be an easier escape. You lay down to rest your eyes \n \n Some Time later... \n \n You wake up to the bang of the fragile wooden door caving in. A horde of creatures come piling in and are on top of you before you are fully awake. They devour your flesh and before you know it all thats left of your body is a pile of bones.",
        options:[
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },
    {
        index: 6,
        text: "You decide the bridge seems like the best option. You would rather see your attack coming and not be ambushed. \n You head towards the bridge; it takes you over a motorway. This road is a bypass to the other side without the trouble of a motorway, it’s a new road. Down below you can see loads of crashed cars and hoards of the creatures. \n You cross over, trying not to attract any attention from below and keep walking following the road. \n You have been travelling for weeks, resting in any un-occupied houses along the way and avoiding all contact with humans and creatures. You live off left-over food and are surviving by hiding from everything along the journey. This seems to be the new normal. You avoid all interactions with creatures and have found if there’s a horde of them outside as long as you stay out of site and silent, they don’t notice you in the houses.  ",
        options: [
            {
                text: "Keep heading North",
                nextScenario: 7
            }
        ]
    },
    {
        index: 7,
        text: "You’re a good bit out of the city now and heading North, you’re hoping there’s less creatures up that way. \n Out of nowhere a van appears and stops next to you. The back door slides open, and somebody pulls you in, before you can react a bag is over your head and you feel hands holding you still as the vehicle moves. Zip ties go around your wrists and you feel a hard force hit your head knocking you out.",
        options: [
            {
                text: "Wake Up",
                nextScenario: 8
            }
        ]
    },
    {
        index: 8,
        text: "When you wake up you no longer feel the movement of the vehicle. Its still dark, the bags still over your head, but you hear talking in the background. Then silence falls, and the bag comes off your head. Its blinding at first, so much light after being in the dark for who knows how long. Once your vision clears up you see 3 people in front of you; a shaggy looking man, a woman who looks like she knows how to wield the sword she has strapped to her back and a young man, maybe early twenties with two pistols holstered to his hips. ",
        options: [
            {
                text: "Stay Silent",
                nextScenario: 9,
                setInventory: {Perspective: true,}

            },
            {
                text: "Speak up",
                nextScenario: 10
            }
        ]
    },
    {
        index: 9,
        text: "You stay silent and look around investigating your surroundings. All 3 of the people are looking at you. You seem to be in a cabin, its wooden and looks old. There is a table in the middle of the room with a bunch of random things on it.",
        options: [
            {
                text: "Speak up",
                nextScenario: 10
            }
        ]
    },
    {
        index: 10,
        text: "“Hi? I’m Anders” you say in a confused tone. The 3 look at you. \n The shaggy man points at himself first, then the woman and lastly the other guy “Velez, Smith, and Tony” \n You nod “So you going to cut me loose?” you pull your hands up which are zip tied together.",
        options: [
            {
                text: "Wait",
                nextScenario : 11,
                setInventory: {Trust: true}
            },
            {
                text: "Get out Yourself",
                nextScenario: 12,
                setInventory: {Strength: true}
            }
        ]
    },
    {
        index: 11,
        text: "You shake your hands and Tony cuts the zip ties off you. “Thank you” you say whilst shaking your wrists and standing.",
        options: [
            {
                text: "Listen",
                nextScenario: 13
            }
        ]
    },
    {
        index: 12,
        text: "You pull your wrists down and snap the zip ties off, then proceed to stand. “I’ll do it myself then” you say, whilst standing. All three look at you and you shrug. “Want a picture?” \n Smith rolls her eyes, but they proceed anyway.",
        options: [
            {
                text: "Listen",
                nextScenario: 13
            }
        ]
    },
    {
        index: 13,
        text: "“You any good with a map?” Velez asked, and they step back revelling the map on the table. \n “We need to get to the Stadium in Pierre Town, there’s a safe camp there” Smith says. \n You look at her, then step forwards towards the map having a look. Velez stands by the door, whilst Tony and Smith stand by your side.",
        options: [
            {
                text: "Attack",
                nextScenario: 14
            },
            {
                text: "Look at the Map",
                nextScenario: 17
            }
        ]
    },
    {
        index: 14,
        text:"This is the best chance you are going to get to attack.",
        options: [
            {
                text: "Attack Tony First",
                nextScenario: 15
            },
            {
                text: "Attack Smith First (Recommended)",
                requiredInventory: (currentInventory) => (currentInventory.Knife & currentInventory.Perspective & currentInventory.Strength),
                nextScenario: 16
            }
        ]
    },
    {
        index: 15,
        text:"You pull Tony forwards by the neck, smacking his head against the table, he falls down unconscious and Smith pulls out her sword slicing your head clean off before you can react.",
        options: [
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },
    {
        index: 16,
        text: "You kick Smith in the back of the knees knocking her to the ground and stab Tony in the side of the neck. He falls bleeding out; you pull the knife out his neck and stab Smith through the chest pulling her up as a body shield to Velez’s gun fire. Then you throw her dead body at Velez and charge at him rugby tackling him to the floor. You punch him in the face and keep going till he’s knocked out. \n You stand up and look at the dead bodies around the room. I better get out here before the creatures appear, you think to yourself. You walk over the table and pick up the map and an army combat knife that in the table. This will do as a nice replacement; you place it in the strap pocket of your rucksack for easy reach and head towards the cabin door.",
        options: [
            {
                text: "Prepare",
                setInventory: {Knife: true, Lone: true},
                nextScenario: 19
            }
        ]
    },
    {
        index: 17,
        text: "You Look at the map. “Yeah, I can get you to Pierre Town” you say. \n “Show us the best route” Tony says. \n You think to yourself for a moment, you can steal the map and make a run for it, it sounds like they want you to give them directions not take them there. What’s going to happen to you once you give them what they want? If there is a safe camp you could easily get to it yourself. Can you even trust these people? They kidnapped you! \n But maybe I would have a better chance of reaching the safe camp if I travelled in numbers, I have no idea what those creatures outside are, plus these guys look armed and ready to use their weapons where needed.",
        options: [
            {
                text: "Steal the Map and Attack",
                nextScenario: 14
            },
            {
                text: "Ask to Join them",
                nextScenario: 18,
                requiredInventory: (currentInventory) => currentInventory.Trust,
                setInventory: {Knife: true, Team: true},
            }
        ]
    },
    {
        index: 18,
        text: "“Do I get to come with you?” You question, looking around the room. \n The three people glance at each other and Velez nods at the other two, to which they respond by nodding back. \n “You can join us” Velez says. \n “You’re in charge of the map, we will rest here tonight and head out sunrise” Velez says and points at the sofa. \n “That’s your bed” \n You scrunch your face up but take it as a win you’re still alive and they trust you. ",
        options: [
            {
                text: "Head to Sleep",
                nextScenario: 20
            }
        ]
    },
    {
        index: 19,
        text: "You drag all the bodies to the door and chuck the bodies in a pile outside. Then you lock the door and shove a chair wedging it closed just in case. You close all the blinds and lay on the bed. You better get some rest, its going to be a long day travelling tomorrow. You need to get as close to this safe camp as you can, and maybe grab some supplies along the way. \n The next morning you grab a tin of beans from the cupboard and eat them, preparing for your journey. Then you pull your rucksack on your back, making sure your knives still in the strap pocket and remove the chair, unlocking the door to head outside.",
        options: [
            {
                text: "Head Out",
                nextScenario: 20
            }
        ]
    },
    {
        index: 20,
        text: "With the sun just risen there should be plenty light to get quite far without needing to find somewhere to rest. You head off bright and early, filled with energy and ready for the journey. \n after a few hours of walking you see a dog in the distance. What do you do?",
        options: [
            {
                text: "Whistle",
                nextScenario: 21,
                setInventory: {Whistle: true}
            },
            {
                text: "Ignore it",
                nextScenario: 22
            }
        ]
    },
    {
        index: 21,
        text: "You whistle and the dog turns its head to look at you before disappearing into the woods.",
        options: [
            {
                text: "Continue Walking",
                nextScenario: 22
            }
        ]
    },
    {
        index: 22,
        text: "You continue on your journey to try get as far as you can whist the suns out.",
        options: [
            {
                text: "Chapter 4",
                nextScenario: -1
            }
        ]
    }
]

startGame()