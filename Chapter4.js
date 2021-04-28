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
    else if ( nextScenarioId == 75 ){
        window.location.href = "Companion.html"
    }
    else if ( nextScenarioId == 100 ){
        window.location.href = "EasterEgg.html"
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
                nextScenario: 2
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
        text: "You don’t have anything to cut the chains so you must find another way in the building. You have a look around the side and see a rock that you could use to smash one of the windows. You pick up the rock and chuck it at the window, then proceed to climb through it. On your way in through the window a shard of glass gets lodged into your arm and as you fall into the room it slides down your arm cutting further. You start to bleed heavily, but at least you’re inside.",
        options: [
            {
                text: "Bandage Up",
                nextScenario: 3,
                requiredInventory: (currentInventory) => currentInventory.Bandages,
                setInventory: {Bandages:false}
            },
            {
                text: "Run",
                nextScenario: 4

            }
        ]
    },
    {
        index: 3,
        text:"You pull out the bandages to fix your arm up. You pull the shard out quickly dropping it on the floor and wrapping your arm up. The bleeding stops, you’re lucky you had these with you, you lost a lot of blood and are feeling a weak. Maybe you will find something to help you gain a bit of energy around this hospital, even some painkillers would be useful. ",
        options: [
            {
                text: "Evaluate the Situation",
                nextScenario: 11
            }
        ]
    },
    {
        index: 4,
        text: "You panic seeing all the blood squirting out of your arm, there’s a trail of blood as you run out the door looking for a first aid box. With all the panicking you don’t realise how much noise you’re making swinging the doors and stumbling down the hall holding onto your arm. You start to feel dizzy but must keep moving, then you hear something. As if your heart wasn’t beating fast enough it speeds up, you turn around and see a pack of the creatures sprinting towards you full force. Then you get hit from behind and feel the teeth digging into your shoulder. Everything goes blurry and your eyes shut.",
        options: [
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },
    {
        index: 5,
        text: "You notice the chains on the door and realise you don’t have anything to cut the chains with. There could be some useful supplies in here. As you start to search for another way you hear a crunch noise behind you. You spin around to see Tony pull the front door open the chains on the ground.",
        options: [
            {
                text: "Step Inside",
                nextScenario: 6,
                setInventory: {Team: false, Lone: true}
            }
        ]
    },
    {
        index: 6,
        text: "As you step inside you realise your companions are behind a bit sketchy and whispering between one another. You continue down the hallway but as you get to the first door on your left you feel a push from behind you and fall into the room. You land on the ground, and look around to see the three standing around you. \n “You really thought we would let you come with us?” Velez says chuckling down at you. \n “Tony, finish the boy off and lets get out of here before the swarm appears” Velez orders then walks out with Smith. \n “I’m really sorry about this man” Tony says softly looking down at you as he pulls out one of his pistols.",
        options: [
            {
                text: "Close your Eyes",
                nextScenario: 7
            },
            {
                text: "Beg for your Life",
                nextScenario: 8
            }
        ]
    },
    {
        index: 7,
        text: "You shut your eyes tight knowing what is coming. \n BANG \n Everything goes dark.",
        options: [
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },
    {
        index: 8,
        text: "“Please, you don’t have to do this Tony.” You beg for your life.\n He hesitates, you can see that he is considering it. \n “hmm, well how about I leave you a gun and a nasty wound and I will tell the lads you escaped? If you survive the stab you live” Tony murmurs. \n “yes, deal” You say nodding whilst handing him the army knife. \n He passes you one of his pistols with bullets already in it. \n “I can’t spare you any more bullets you have what’s in that pistol there”  Tony takes a deep breath. He shoots the gun to miss you and smash the window so they can hear it outside then stabs the knife into your arm. \n Tony gives you a quick nod then runs out the room. You hear him telling the other two that you're making a run for it with his gun and then they run away.",
        options: [
            {
                text: "Bandage Up",
                nextScenario: 9,
                requiredInventory: (currentInventory) => currentInventory.Bandages,
                setInventory: {Bandages: false, Gun: true}
            },
            {
                text: "Pull the Knife out",
                nextScenario: 10
            }
        ]
    },
    {
        index: 9,
        text: "You pull out the bandages to fix your arm up. You pull the knife out quickly dropping it on the floor and wrapping your arm up. The bleeding stops, you’re lucky you had these with you, you lost a lot of blood and are feeling a weak. Maybe you will find something to help you gain a bit of energy around this hospital, even some painkillers would be useful. ",
        options: [
            {
                text: "Evaluate the Situation",
                nextScenario: 11
            }
        ]
    },
    {
        index: 10,
        text: "You pull the knife and panic seeing all the blood squirting out. Maybe it wasn’t the best idea to pull it out without something to wrap it with. You scramble around the room desperate for something to patch it up with, but the cut was deep and you’re losing blood quickly without a bandage. You fall over a chair on the floor and knock your head putting you unconscious. You proceed to bleed out whilst unconscious.",
        options: [
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },
    {
        index: 11,
        text: "“Well at least I’m patched up now” You think to yourself whilst looking at your bandaged arm. You think to yourself about how that wasn’t your smartest idea and how your number one priority now is to find some painkillers, then get the hell out of this place",
        options: [
            {
                text: "Leave the Room",
                nextScenario: 12
            },
            {
                text: "Search the room",
                nextScenario: 13

            }
        ]
    },
    {
        index: 12,
        text: "You leave the room into the hallway; the front door is situated behind you. You’re walking down the hallway when the front door bursts open. How? You think to yourself, but before dwelling on it too long you start running down the hallway. These creatures are right on your tail, there’s around 6 of them. You end up in a room with no other escape and before you can change direction, they’re on top of you feasting on your flesh.",
        options: [
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },
    {
        index: 13,
        text: "You start to search the room. You start with the cupboards pulling everything out and looking for anything useful to take with you. You grab some basic medical supplies and shove them in your bag. The next cupboard you find a bottle of painkillers in. \n You take 2 Pain Killers. \n You put the rest of the bottle in your bag in case you need them again later and head to the door. \n You look through the window in the door into the hallway trying to figure out where you want to go next. You notice a sign on the wall opposite you saying Basement and pointing to the right. There must be some stairs over there, I wonder if there’s anything useful down there. \n \n Should you investigate further or leave for the safe camp?",
        options: [
            {
                text: "Leave",
                nextScenario: 14
            },
            {
                text: "Investigate Further",
                nextScenario: 15
            }
        ]
    },
    {
        index: 14,
        text: "You decide its safer if you leave now. You have some basic supplies, and you found the pain killers you needed. Maybe coming in here wasn’t the best idea and you should just head to the safe camp before it gets too late.  \n You grab a rug of the floor to cover the window ledge, so you don’t cut yourself, and climb back out. \n You head for the camp, you are near-by now so it shouldn’t take you too long. Maybe a couple hours of walking.",
        options: [
            {
                text: "The Finale",
                nextScenario: -1
            }
        ] 
    },
    {
        index: 15,
        text: "You decide that you may as well go down to the basement, otherwise you just came into this building for nothing. Maybe you’ll find something of use for when you reach the camp. \n You slowly open the door and head to the right; you pass two other rooms on your way down. One looks like a bathroom and the other you aren’t sure as there’s no signs. \n You get to the basement and look around. It looks like an office and you can see that whoever was here left in a hurry. In fact, there is a Top-Secret file still sitting on the table.",
        options: [
            {
                text: "Read the File",
                nextScenario: 16,
                setInventory: {File: true}
            },
            {
                text: "Leave the File",
                nextScenario: 17
            }
        ]
    },
    {
        index: 16,
        text: "You open the file and skim over it reading the following main points: \n •	Known as a Zombie \n •	They are highly intelligent creatures that understand the importance of roaming in numbers \n •	They are very rarely found alone \n •	They were created in the lab \n •	The virus was injected into the corona virus vaccine and given out to the whole of the United Kingdom \n •	virus only infected a specific blood type \n •	 Infections can be spread via bite \n \n You shove the file in your bag. You see some dog treats on the way out, do you take them?",
        options: [
            {
                text: "Take the Treats",
                nextScenario: 17,
                setInventory: {Treats: true}
            },
            {
                text: "Leave the treats",
                nextScenario: 17
            }
        ]
    },
    {
        index: 17,
        text: "You get to the top of the stairs and then a group of zombies burst through the front door. Do you Run for it or attack?",
        options: [
            {
                text: "Fight",
                nextScenario: 18,
                requiredInventory: (currentInventory) => currentInventory.Gun,
            },
            {
                text: "Run for it",
                nextScenario: 21
            }
        ]
    },
    {
        index: 18,
        text: "You pull out your pistol. What should you do?",
        options: [
            {
                text: "Open Fire on the Zombies",
                nextScenario: 19
            },
            {
                text: "Shoot the Closest Zombie and back up",
                nextScenario: 20,
            }
        ]
    },
    {
        index: 19,
        text: "You start shooting the zombies, but run out of bullets. You should've used your bullets more wisely. At least the first ones definietly dead, you think as it lays on the floor with 5 bullets in it. The remaining zombies run at you. One of them jumps, lunging at you and you both go flying down the stairs. Before you know it youre a pile of zombie food. ",
        options: [
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },
    {
        index: 20,
        text: "You shoot the Closest zombie right between the eyes. It falls down collapsing on the ground. You run back down the stairs at take cover behind the counter. The zombies run after you follow you down the stairs.",
        options: [
            {
                text: "Run for it",
                nextScenario: 21,
            },
            {
                text: "Stay Hidden",
                nextScenario: 25,
                requiredInventory: (currentInventory) => currentInventory.File
            },
            {
                text: "Start Shooting",
                nextScenario: 27,
                requiredInventory: (currentInventory) => (currentInventory.Perspective & currentInventory.Gun)
            }
        ]
    },
    {
        index: 21,
        text: "You make a run for it, pushing the zombies out the way. One of them grabs onto to you.",
        options: [
            {
                text: "Stab it",
                nextScenario: 22,
                requiredInventory: (currentInventory) => currentInventory.Knife
            },
            {
                text: "Push the Zombie",
                nextScenario: 23,
                setInventory: {Bite: true}
            }
        ]
    },
    {
        index: 22,
        text: "You stab the knife into the zombie making it release its grip. Then you continue to run",
        options: [
            {
                text: "Run",
                nextScenario: 24
            }
        ]
    },
    {
        index: 23,
        text: "The zombie bites into you. You push it off and keep running, till you've lost the zombies. You find yourself in the woods. You settle look down at your arm and see the bite marks. You try to hide it and continue on your way. Whilst walking, you fall to the ground and start to Seize up. Everything goes dark. Is this the bite? ",
        options: [
            {
                text: "Unlock Easter Egg",
                nextScenario: 100,
                requiredInventory: (currentInventory) => currentInventory.Bite
            },
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },
    {
        index: 24,
        text: "You make it out of the building and lose the rest of the zombies in the woods. You keep walking, not far until the camp now",
        options: [
            {
                text: "The Finale",
                nextScenario: -1
            }
        ]
    },
    {
        index: 25,
        text: "You take deep breaths, trying to be as silent as you can. You remember the file saying that these Zombie-like creatures are very intelligent, but you think you have more chance of hidding than you do running. You need to think of a plan and quickly before more turn up. You remember something in the file about them being drawn to noises.",
        options: [
            {
                text: "Climb inside a cuboard",
                nextScenario: 26
            },
            {
                text: "Start Shooting",
                nextScenario: 27,
                requiredInventory: (currentInventory) => (currentInventory.Perspective & currentInventory.Gun)
            }
        ]
    },
    {
        index: 26,
        text: "You climb inside the cupboard and stay there. An hour passes and more zombies have shown up and are all roaming about the room. You start to lose your balance and fall out the cupboard. The zombies swarm around you and feast on your flesh",
        options: [
            {
                text: "Home Page",
                nextScenario: 50
            }
        ]
    },
    {
        index: 27, 
        text: "You start shooting the zombies whilst taking cover behind the counter. You hit all the zombies in the head and they fall to the ground. You dont want to stick around to find out if more show up and start running, heading outside and into the woods. You start heading to the camp.",
        options: [
            {
                text: "Notice a Dog",
                nextScenario: 28,
                requiredInventory: (currentInventory) => currentInventory.Whistle
            },
            {
                text: "The Finale",
                nextScenario: -1
            }
        ]
    },
    {
        index: 28,
        text: "You notice a dog in the woods. It looks familiar, you whistle and the dog tilts its head then runs over to you. It sits in front of you.",
        options: [
            {
                text: "Pet the dog and Keep Walking",
                nextScenario: -1
            },
            {
                text: "Give the Dog a Treat",
                nextScenario: 29,
                requiredInventory: (currentInventory) => currentInventory.Treats
            }
        ]
    },
    {
        index: 29,
        text: "You pull out the treats you found earlier and feed one to the dog. The dog wags its tail and runs off. It returns with a rope, you attack the rope to the dog as a leash. Looks like you've made a friend.",
        options: [
            {
                text: "The Finale",
                nextScenario: 75
            }
        ]
    }
]

startGame()