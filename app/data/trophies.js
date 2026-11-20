// Trophy data for the Leonida Trophy Guide. Generated from trophies.json, which is the
// canonical copy the gate reads; this module is what the page imports so that a static file
// opened from disk needs no fetch at run time.
export const GAME = "Grand Theft Auto VI";
export const PLATFORM = "PlayStation 5";
export const VERIFIED_AT = "2026-11-21";
export const STAGES = [
{
"id": 0,
"title": "Chapter 1-4 story",
"note": "The unmissable spine. Play it, and note that Chapter 2 is where the clock starts on everything missable."
},
{
"id": 1,
"title": "The finale",
"note": "The final mission. Everything in stages 2-8 belongs before it."
},
{
"id": 2,
"title": "Front-loaded missions",
"note": "Single-mission trophies that arrive while the story runs. Unmissable, listed so the roadmap reads in order."
},
{
"id": 3,
"title": "100% completion",
"note": "The long gold. Work from the in-game checklist, not from this list."
},
{
"id": 4,
"title": "Activities & skill gates",
"note": "The breadth of the state: stunts, ranges, races, meditation, arcade. Grind-friendly, never missable."
},
{
"id": 5,
"title": "Stranger strands",
"note": "Companion and stranger strands. These are the missable ones: finish each in the chapter it opens."
},
{
"id": 6,
"title": "Collectibles & coverage",
"note": "Card sets, WAiNK locations, vehicles, map coverage. Route them district by district."
},
{
"id": 7,
"title": "Heists & robberies",
"note": "Banks, trucks, shops, gangs. The escapes are part of the requirement."
},
{
"id": 8,
"title": "Economy & decisions",
"note": "Money loops, property and the hidden decision trophies. Last, because they need cash."
},
{
"id": 9,
"title": "The platinum",
"note": "The receipt: it arrives when the other fifty-four do."
}
];
export const TROPHIES = [
{
"id": 1,
"name": "Vice Got a Price!",
"description": "Congratulations! You're a Leonida Legend.",
"grade": "platinum",
"kind": "meta",
"stage": 9,
"missable": false,
"hidden": false,
"guide": "The platinum, and the only trophy that cannot be chased directly: it unlocks when the other fifty-four have unlocked, in any order. Treat it as the receipt for the whole list rather than a task, and read the roadmap instead of this entry when planning. Two trophies decide the length — A Long Road asks for 100% completion, and You Gotta Know When to Get Off asks for the final mission — so the platinum always arrives after both. Because the game lists no online trophies, nothing here can be locked out by a server shutting down, which makes this a single-player completion rather than a schedule problem.",
"steps": [
"Unlock the other 54 trophies.",
"The platinum pops on the last one, wherever it happens."
],
"sources": [
"PlayStation trophy description (official)",
"PSNProfiles trophy list"
]
},
{
"id": 2,
"name": "Just Like Paradise",
"description": "Complete Gone Fishing.",
"grade": "bronze",
"kind": "story",
"stage": 0,
"missable": false,
"hidden": false,
"guide": "The opening mission, Gone Fishing, and the first trophy most players will see. It is a story mission, so it cannot be missed: the chapter structure gates everything behind it. Play it at whatever pace suits, but do not skip the tutorial prompts inside it — the driving and shooting handholds it teaches are the same ones the stunt and Combat Focus trophies assume later.",
"steps": [
"Play the story mission Gone Fishing.",
"The trophy pops on the mission-complete screen."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 3,
"name": "Paradise Lost",
"description": "Complete Chapter 1.",
"grade": "bronze",
"kind": "story",
"stage": 0,
"missable": false,
"hidden": false,
"guide": "Awarded for finishing Chapter 1 as a whole, not one mission inside it. Chapter completions are the game's spine, so this is unmissable while the story is being played. If the trophy has not appeared after the chapter's closing cutscene, the chapter epilogue mission is usually still outstanding — the game counts the epilogue as part of the chapter.",
"steps": [
"Complete every mission in Chapter 1, epilogue included.",
"The trophy pops when the chapter closes."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 4,
"name": "T**s Ass Drug Money",
"description": "Complete Chapter 2.",
"grade": "bronze",
"kind": "story",
"stage": 0,
"missable": false,
"hidden": false,
"guide": "The Chapter 2 completion trophy, and the first one whose PlayStation name is partly censored. Like the other chapter trophies it is unmissable on a story playthrough. Chapter 2 is where the state opens up, so this is also the point at which the side content in the later roadmap stages becomes reachable — worth noting, because a few of those are missable and Chapter 2 is where the clock starts.",
"steps": [
"Complete every mission in Chapter 2.",
"The trophy pops when the chapter closes."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 5,
"name": "Vice City, Baby!",
"description": "Complete Chapter 3.",
"grade": "bronze",
"kind": "story",
"stage": 0,
"missable": false,
"hidden": false,
"guide": "Chapter 3 completion. Unmissable, and the midpoint of the story. By this point every activity type the activity trophies name should have appeared at least once, which is what makes Master of None and the Shooting Range trophies convenient to finish here rather than after the story.",
"steps": [
"Complete every mission in Chapter 3.",
"The trophy pops when the chapter closes."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 6,
"name": "Top Of The World, Ma",
"description": "Complete Chapter 4.",
"grade": "bronze",
"kind": "story",
"stage": 0,
"missable": false,
"hidden": false,
"guide": "Chapter 4 completion, the last of the chapter trophies. Unmissable. Everything missable in the list is missable before or during this chapter, so if the plan is to finish the story first and clean up after, this is the chapter to slow down in.",
"steps": [
"Complete every mission in Chapter 4.",
"The trophy pops when the chapter closes."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 7,
"name": "You Gotta Know When to Get Off",
"description": "Complete the final mission.",
"grade": "gold",
"kind": "story",
"stage": 1,
"missable": false,
"hidden": false,
"guide": "One of the two gold trophies, and the story's endpoint: complete the final mission. It is unmissable in the sense that the story ends with it, but it is the point past which several companion and stranger trophies can no longer be earned, so it belongs late on the roadmap, not early. Everything in stages 2 to 8 should be done before it.",
"steps": [
"Finish every mission the story requires before the finale.",
"Complete the final mission."
],
"sources": [
"PlayStation trophy description (official)",
"PSNProfiles trophy list"
]
},
{
"id": 8,
"name": "Trust",
"description": "Complete Breakfast Run.",
"grade": "bronze",
"kind": "story",
"stage": 2,
"missable": false,
"hidden": false,
"guide": "A single named story mission, Breakfast Run, rather than a chapter. Unmissable while the story is being played, and it arrives early enough that it is a useful marker: if Breakfast Run has not appeared, the story has not reached the chapter it sits in.",
"steps": [
"Play the story mission Breakfast Run.",
"The trophy pops on completion."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 9,
"name": "Break the Bank",
"description": "Complete The Cartel Heist.",
"grade": "bronze",
"kind": "heist",
"stage": 2,
"missable": false,
"hidden": false,
"guide": "A named heist mission, The Cartel Heist. Story-gated and unmissable, but it is also the tutorial for the heist shape the robbery trophies later reuse: approach, crew, escape. Learn the escape route here — the Bank Vault and Armored Truck trophies both require escaping, and the habits carry over.",
"steps": [
"Play the story mission The Cartel Heist.",
"Complete it, escape included."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 10,
"name": "Family Matters",
"description": "Complete Child's Play.",
"grade": "bronze",
"kind": "story",
"stage": 2,
"missable": false,
"hidden": false,
"guide": "A named story mission, Child's Play. Unmissable. Nothing to plan around beyond playing the story; it is listed on the roadmap at stage 2 so that the mission-by-mission trophies are visibly front-loaded compared with the grind later on.",
"steps": [
"Play the story mission Child's Play.",
"The trophy pops on completion."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 11,
"name": "DWNFALL",
"description": "Complete Headliners.",
"grade": "bronze",
"kind": "story",
"stage": 2,
"missable": false,
"hidden": false,
"guide": "A named story mission, Headliners. Unmissable while the story runs. Like the other single-mission trophies it is a progress marker more than a task.",
"steps": [
"Play the story mission Headliners.",
"The trophy pops on completion."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 12,
"name": "Hi-Jacked",
"description": "Complete VCIA Takedown.",
"grade": "bronze",
"kind": "story",
"stage": 2,
"missable": false,
"hidden": false,
"guide": "A named story mission, VCIA Takedown. Unmissable. It sits in the back half of the story and is one of the missions whose setting — the airport — is reused by the unscheduled-departure trophy, so the layout learned here is worth keeping.",
"steps": [
"Play the story mission VCIA Takedown.",
"The trophy pops on completion."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 13,
"name": "Snow Storm",
"description": "Complete Operation Savage Glory.",
"grade": "bronze",
"kind": "story",
"stage": 2,
"missable": false,
"hidden": false,
"guide": "A named story mission, Operation Savage Glory. Unmissable, and the last of the single-mission story trophies before the finale. Nothing here can be lost, but it is a natural checkpoint for the roadmap: anything missable still outstanding should be cleared before the story moves past it.",
"steps": [
"Play the story mission Operation Savage Glory.",
"The trophy pops on completion."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 14,
"name": "A Long Road",
"description": "Attain 100% Completion.",
"grade": "gold",
"kind": "meta",
"stage": 3,
"missable": false,
"hidden": false,
"guide": "The second gold trophy, and the longest single item on the list: reach 100% completion. This is not the same as finishing the story — the game's completion meter sums story progress with activities, collectibles, races, properties and challenges, and the last few percent are usually one obscure activity rather than a mission. Work from the in-game completion checklist, not from this list, and expect the trophy to arrive well after the final mission.",
"steps": [
"Open the in-game completion checklist and note every category at less than its maximum.",
"Clear each category, finishing with the one the checklist shows short.",
"The trophy pops the moment the meter reads 100%."
],
"sources": [
"PlayStation trophy description (official)",
"PSNProfiles trophy list"
]
},
{
"id": 15,
"name": "Cunning Stunts",
"description": "Complete 250 Stunts.",
"grade": "silver",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Complete 250 stunts. A pure volume trophy and the one that most rewards planning: stunts are the jumps, rolls and trick lines scattered across Leonida, and the game counts 250 of them, so repeating one does not advance the counter. Find a vehicle that handles the type of stunt comfortably and work region by region so that a completed area can be forgotten. It is not missable and not time-limited, which makes it good filler between missions.",
"steps": [
"Identify the stunt type the counter accepts (the game names it in the activity list).",
"Work region by region so no stunt is repeated.",
"Keep going to 250 distinct completions."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 250
},
{
"id": 16,
"name": "Master of None",
"description": "Try each type of activity once.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Try each type of activity once. The cheapest trophy in the list if approached deliberately, and the most annoying if left to chance: it needs one completion of every activity type the game offers — races, stunt runs, shooting range, hunting, fishing, arcade games, drone races, meditations and the rest — but only one of each. Keep the activity list open and tick types off; the total is small even though the breadth is wide.",
"steps": [
"Read the in-game activity list and count the types.",
"Complete one of each type, ticking them off.",
"The trophy pops on the last new type, not on the last completion."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 17,
"name": "The Shootist",
"description": "Earn a gold medal in all Shooting Range challenges.",
"grade": "silver",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Earn a gold medal in every Shooting Range challenge. Gold, not silver: each challenge is scored, and the trophy wants the top score on all of them. This is a skill gate rather than a grind, so it is worth doing early while the controls are fresh. Challenges that allow a specific weapon should be retried with it rather than brute-forced, because the gold thresholds assume it.",
"steps": [
"Find the Shooting Range activity and list its challenges.",
"Earn gold on each challenge, retrying with the intended weapon.",
"The trophy pops when the last gold is banked."
],
"sources": [
"PlayStation trophy description (official)",
"PSNProfiles trophy list"
]
},
{
"id": 18,
"name": "Top Fun",
"description": "Win a Top Fun Drone Race at every location.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Win a Top Fun Drone Race at every location. The trophy is per-location, not per-race: each Top Fun site has to be won at least once, and coming second at a site leaves that site outstanding. Locations unlock across the state, so the practical order is to win each one as it appears rather than returning later.",
"steps": [
"Open the activity map and list every Top Fun location.",
"Win a race at each one.",
"The trophy pops when the last location is won."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 19,
"name": "Earn Cash, Not Kudos",
"description": "Win 20 different races.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Win 20 different races. Different is the operative word — the same race won twice counts once. Twenty distinct race events, of any discipline the game counts as a race, is a modest number spread across the map, and the variety means no single vehicle class has to be mastered.",
"steps": [
"List the race events on the map.",
"Win twenty distinct ones.",
"The trophy pops on the twentieth distinct win."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 20,
"name": "Baited My Tackle",
"description": "Beat Cal in a fishing challenge.",
"grade": "bronze",
"kind": "side",
"stage": 5,
"missable": true,
"hidden": false,
"guide": "Beat Cal in a fishing challenge. Tied to a named character, which is what makes it missable in practice: Cal's strand has to be reached and the challenge accepted while it is available. Win the challenge rather than merely complete it — the description says beat, so a draw or a loss does not count and the rematch may not be offered indefinitely.",
"steps": [
"Reach Cal's stranger strand and accept the fishing challenge.",
"Beat his catch.",
"The trophy pops on the win."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 21,
"name": "Stick Fiddler",
"description": "Complete an arcade game.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Complete an arcade game. One cabinet, played to the end — the description says complete, so a high score is not the requirement. Arcade cabinets are interior props, so this is a five-minute trophy that is easy to walk past; note where one is and finish it in a single sitting, since leaving resets the run.",
"steps": [
"Find an arcade cabinet.",
"Play the game to its end without leaving.",
"The trophy pops on completion."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 22,
"name": "Road to Rehabilitation",
"description": "Complete the final mission for Andy.",
"grade": "bronze",
"kind": "side",
"stage": 5,
"missable": true,
"hidden": false,
"guide": "Complete the final mission for Andy. One of five trophies that share a shape: finish a named companion's mission strand. The words final mission mean the strand has to be played to its end, and strands close as the story advances, so these are the trophies that punish a story-first playthrough. Do Andy's strand when it appears, and finish it rather than sampling its first mission.",
"steps": [
"Find Andy's strand and start it.",
"Play every mission in the strand.",
"The trophy pops on the strand's final mission."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 23,
"name": "This Was No Boat Accident",
"description": "Complete the final mission for Kenton.",
"grade": "bronze",
"kind": "side",
"stage": 5,
"missable": true,
"hidden": false,
"guide": "Complete the final mission for Kenton, in the same shape as Andy's strand: a named companion's missions played through to the end rather than sampled. Kenton's missions are available in a window rather than forever, so treat the strand as time-sensitive and finish it in the chapter where it opens.",
"steps": [
"Start Kenton's strand.",
"Play the strand through to its final mission.",
"The trophy pops on that final mission."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 24,
"name": "The Lone Rider",
"description": "Complete the final mission for Billy.",
"grade": "bronze",
"kind": "side",
"stage": 5,
"missable": true,
"hidden": false,
"guide": "Complete the final mission for Billy, the last of the Andy, Kenton and Billy strands: each one wants the end of a named mission line, not a single mission. Billy's is the one most often left half-finished because its middle missions are spread out; the trophy only cares about the last one, so track the strand's progress in the mission log.",
"steps": [
"Start Billy's strand.",
"Complete every mission in it.",
"The trophy pops on the final mission."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 25,
"name": "Strangers & Freaks",
"description": "Complete 8 mission strands for strangers across the state of Leonida.",
"grade": "silver",
"kind": "side",
"stage": 5,
"missable": false,
"hidden": false,
"guide": "Complete 8 mission strands for strangers across the state of Leonida. The breadth trophy for stranger content: eight separate strands, each finished. Strangers appear as map markers and their strands vary in length, so eight is a matter of picking eight markers and seeing each through rather than a fixed route. Not missable as a whole — plenty of strands exist — but individual strands can close.",
"steps": [
"Collect stranger markers as they appear.",
"Finish eight whole strands, tracking which are done.",
"The trophy pops on the eighth completed strand."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 8
},
{
"id": 26,
"name": "Supply & Demand",
"description": "Complete the final mission for Randy.",
"grade": "bronze",
"kind": "side",
"stage": 5,
"missable": true,
"hidden": false,
"guide": "Complete the final mission for Randy. Fifth of the companion-strand trophies, and missable for the same reason: Randy's strand closes with the story. Finish it in the chapter it opens.",
"steps": [
"Start Randy's strand.",
"Complete the strand to its final mission.",
"The trophy pops on that mission."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 27,
"name": "Spin On This!",
"description": "Complete the final mission for Tyrone.",
"grade": "bronze",
"kind": "side",
"stage": 5,
"missable": true,
"hidden": false,
"guide": "Complete the final mission for Tyrone. The last of the five companion strands, with the same requirement and the same risk. If any of the five is left unfinished, this is the group to check before the story's final mission.",
"steps": [
"Start Tyrone's strand.",
"Complete it to the final mission.",
"The trophy pops on that mission."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 28,
"name": "Positive Mental Attitude",
"description": "Meditate at every spot across Leonida.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Meditate at every spot across Leonida. A collectible-shaped activity with a fixed list: each meditation spot has to be used once, and the trophy wants all of them. The spots are quiet map locations rather than hidden objects, so the work is travel; sweeping them region by region alongside the exploration trophies saves a pass over the map.",
"steps": [
"Get the meditation spot list from the activity map.",
"Meditate at each one.",
"The trophy pops at the last spot."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 29,
"name": "Fair Game",
"description": "Hunt a unique animal for Bret.",
"grade": "bronze",
"kind": "side",
"stage": 5,
"missable": true,
"hidden": false,
"guide": "Hunt a unique animal for Bret. Tied to Bret's strand and to a single unique animal, which makes it missable if the strand is passed over. The animal is unique, so there is one correct target rather than any animal of a species; the hunt starts from Bret's request, not from free roaming.",
"steps": [
"Take Bret's hunting request.",
"Track and kill the unique animal it names.",
"The trophy pops on the kill."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 30,
"name": "Don't Touch My Deck",
"description": "Complete 3 Collectible Card sets.",
"grade": "silver",
"kind": "collectible",
"stage": 6,
"missable": false,
"hidden": false,
"guide": "Complete 3 Collectible Card sets. The state's card sets are grouped collections; the trophy counts completed sets, not individual cards, so three sets finished in full is the target. Cards come from shops and pickups across the map, and finishing a set usually means buying the last few — budget for that, and finish one set at a time rather than spreading pickups across all of them.",
"steps": [
"List the card sets and their card counts.",
"Complete one set at a time, buying the stragglers.",
"The trophy pops on the third completed set."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 3
},
{
"id": 31,
"name": "You WAiNKer!",
"description": "WAiNK It at 100 locations.",
"grade": "silver",
"kind": "collectible",
"stage": 6,
"missable": false,
"hidden": false,
"guide": "WAiNK It at 100 locations. A location-count collectible: the WAiNK action has to be performed at one hundred distinct places, and repeats do not count. The count is large enough that a route matters — sweep district by district and mark each location as used, because the game will not tell you which one you missed.",
"steps": [
"Map the districts that hold WAiNK locations.",
"Perform WAiNK at each, district by district, marking them off.",
"The trophy pops at the hundredth location."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 100
},
{
"id": 32,
"name": "One Last Thing",
"description": "Complete 50 Challenges.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Complete 50 Challenges. Challenges are the game's rotating objectives — timed runs, kill counts, delivery jobs — and the trophy wants fifty completions from that pool, not fifty distinct types. They appear as the map is played in, so this fills naturally while the other trophies are being chased; it is the one grind that does not need a dedicated session.",
"steps": [
"Accept challenges as they appear while playing other content.",
"Complete fifty of them.",
"The trophy pops on the fiftieth."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 50
},
{
"id": 33,
"name": "Hot Together",
"description": "Lose a 4 star Wanted Level with your partner and escape the heat.",
"grade": "bronze",
"kind": "heist",
"stage": 7,
"missable": true,
"hidden": false,
"guide": "Lose a 4 star Wanted Level with your partner and escape the heat. This one is a sequence rather than a task: reach four stars with the partner present, then lose the level entirely. Dying or being arrested resets it, and the partner has to be along for the whole thing, so it belongs to the partner's strand and can be lost when that strand closes.",
"steps": [
"Bring the partner along and raise the wanted level to four stars.",
"Break line of sight and let the level decay to zero without dying.",
"The trophy pops when the level clears."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 34,
"name": "Retail Therapy",
"description": "Rob 3 shops back-to-back with your partner without losing your Wanted Level.",
"grade": "bronze",
"kind": "heist",
"stage": 7,
"missable": true,
"hidden": false,
"guide": "Rob 3 shops back-to-back with your partner without losing your Wanted Level. Back-to-back is the strict part: the wanted level has to be held from the first robbery through the third, so the three shops need to be close together and the escape between them has to be clean. Plan a three-shop cluster before starting, because a single clean getaway mid-run breaks the chain.",
"steps": [
"Pick three shops close enough to reach while wanted.",
"Rob the first, keep the level, rob the second, then the third.",
"The trophy pops on the third robbery with the level still held."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 35,
"name": "Whip It Good",
"description": "Discover 100 vehicles.",
"grade": "bronze",
"kind": "collectible",
"stage": 6,
"missable": false,
"hidden": false,
"guide": "Discover 100 vehicles. A discovery count rather than a purchase count: the game registers a vehicle the first time it is seen or driven, so the trophy is about variety of exposure. Driving different traffic, visiting dealerships and the garage properties all feed it. It arrives naturally during the other trophies, and pairing it with the garage-property trophy means the same trips count twice.",
"steps": [
"Drive and inspect a wide spread of vehicles rather than one favourite.",
"Visit dealerships and garages to register stocked models.",
"The trophy pops at the hundredth distinct vehicle."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 100
},
{
"id": 36,
"name": "Gunslinger",
"description": "Take down 5 enemies in a single use of Combat Focus.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Take down 5 enemies in a single use of Combat Focus. Combat Focus is the game's slow-time shooting ability, and the requirement is one activation, five kills. Five in one window needs a cluster of enemies rather than a running fight, so pick a set-piece with grouped opponents and activate with all five in view. A failed attempt costs nothing but the cooldown.",
"steps": [
"Find a fight with at least five enemies grouped together.",
"Activate Combat Focus with them all in view.",
"Take all five down before the ability ends."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 37,
"name": "Catch Me If You Can",
"description": "Make an unscheduled departure at VCIA.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Make an unscheduled departure at VCIA. A specific, deliberate act at the airport: leave on something that is not a booked flight. The mission VCIA Takedown teaches the airport's layout, so this is straightforward afterwards — reach the apron, take an aircraft, and leave without clearance.",
"steps": [
"Go to VCIA and reach the apron or a parked aircraft.",
"Take off without using a scheduled departure.",
"The trophy pops once airborne and clear of the airport."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 38,
"name": "Challenging Tank",
"description": "Kinda hot in these Rhinos.",
"grade": "bronze",
"kind": "activity",
"stage": 7,
"missable": false,
"hidden": false,
"guide": "Kinda hot in these Rhinos. A hidden trophy whose description is a joke, and the joke names the mechanic: a Rhino is the game's tank, so the requirement involves one. The reliable way to find the exact trigger is to steal and use the tank the military content provides — the trophy fires on the act the description winks at, not on owning the vehicle.",
"steps": [
"Get hold of the Rhino the military content provides.",
"Perform the act the description alludes to while driving it.",
"The trophy pops on the trigger."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 39,
"name": "Sneakthief",
"description": "Rob a jewelry store without being detected.",
"grade": "bronze",
"kind": "heist",
"stage": 7,
"missable": true,
"hidden": false,
"guide": "Rob a jewelry store without being detected. A stealth requirement inside a robbery: no alarm, no witness, no wanted level. That makes it a one-shot-per-attempt puzzle — plan the entry, the safe and the exit before going in, and reload the approach rather than fighting out of a failed attempt. It is missable only in the loose sense that the store becomes harder to approach cleanly later.",
"steps": [
"Case the jewelry store's entrances and the safe.",
"Enter and take the contents without raising an alarm.",
"The trophy pops once the robbery completes undetected."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 40,
"name": "Maximum Withdrawal",
"description": "Rob 5 Bank Vaults and escape.",
"grade": "silver",
"kind": "heist",
"stage": 7,
"missable": false,
"hidden": false,
"guide": "Rob 5 Bank Vaults and escape. Five separate vaults, each ending in an escape — the escape is part of the requirement, so a vault robbed and then died on does not count. Bank vaults are the largest robberies in the game and each needs an approach; treat them as five set-pieces rather than a chain.",
"steps": [
"Identify the five bank vaults.",
"Rob each and escape cleanly.",
"The trophy pops on the fifth escape."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 5
},
{
"id": 41,
"name": "A Classic Blitz Play",
"description": "Rob an Armored Truck and escape.",
"grade": "bronze",
"kind": "heist",
"stage": 7,
"missable": false,
"hidden": false,
"guide": "Rob an Armored Truck and escape. The smallest of the robbery trophies and a good rehearsal for the bank vaults: intercept a truck, take the cargo, break the pursuit. The escape is again part of the requirement.",
"steps": [
"Intercept an armored truck.",
"Take the cargo and escape the pursuit.",
"The trophy pops once clear."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 42,
"name": "The Goodtime State",
"description": "Explore all of Leonida.",
"grade": "bronze",
"kind": "collectible",
"stage": 6,
"missable": false,
"hidden": false,
"guide": "Explore all of Leonida. A coverage trophy: every region of the state has to be visited, which the map tracks as fog clearing. It fills while the other trophies are chased, and the only risk is one corner of the map never being entered — check the map for fog before assuming it is done.",
"steps": [
"Open the map and look for regions still fogged.",
"Drive or fly through each until the fog clears.",
"The trophy pops when the last region is uncovered."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 43,
"name": "Pest Control",
"description": "Rob an Illegal Operation belonging to each gang.",
"grade": "bronze",
"kind": "heist",
"stage": 7,
"missable": false,
"hidden": false,
"guide": "Rob an Illegal Operation belonging to each gang. Per-gang, not per-robbery: the state's gangs each run an illegal operation, and every gang's has to be robbed once. The set is fixed and finite, so this is a checklist of gangs rather than a count — note which gang each operation belongs to, because the game does not label the outstanding one.",
"steps": [
"Identify each gang and the illegal operation it runs.",
"Rob one operation per gang, tracking which gangs are done.",
"The trophy pops on the last gang's operation."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 44,
"name": "In The Beginning…",
"description": "Enjoy a cocktail with a view on Ocean Beach.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": true,
"hidden": false,
"guide": "Enjoy a cocktail with a view on Ocean Beach. A small, missable moment: a specific venue on Ocean Beach with a view. Because it is tied to a place and a state of the story rather than a mission, it is easy to walk past; do it the first time Ocean Beach is reachable.",
"steps": [
"Go to Ocean Beach and find the bar with the view.",
"Order and finish a cocktail there.",
"The trophy pops on the drink."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 45,
"name": "Capital Offense",
"description": "Smash your way out of a vehicle showroom in classic style.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Smash your way out of a vehicle showroom in classic style. A deliberate stunt at a showroom: drive through the glass rather than out of the door. Any showroom works, and the trophy is about the exit, not the vehicle, so a cheap car is fine.",
"steps": [
"Drive a vehicle into a showroom.",
"Leave by smashing through the frontage.",
"The trophy pops on the break-out."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 46,
"name": "Let’s Go Bowling",
"description": "Follow-through at the Kolt & Associates' bowling alley.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": true,
"hidden": false,
"guide": "Follow-through at the Kolt & Associates' bowling alley. A bowling trophy at one named venue. Follow through is the bowling term the description puns on, so the requirement is a completed game at that alley — the trophy is tied to the location, which is what makes it easy to leave undone.",
"steps": [
"Go to the Kolt & Associates bowling alley.",
"Bowl a full game to the end.",
"The trophy pops on the last frame."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 47,
"name": "Personal Best",
"description": "A partnership with mass appeal.",
"grade": "bronze",
"kind": "story",
"stage": 8,
"missable": true,
"hidden": false,
"guide": "A partnership with mass appeal. A hidden story trophy whose description is deliberately oblique; it fires on a story beat involving the partnership between the leads. Because it is a story trigger rather than a task, there is nothing to do but play the story — and because it is a trigger, it cannot be repeated once the story has passed it.",
"steps": [
"Play the story.",
"The trophy pops on the beat it is tied to."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 48,
"name": "Actions Speak Louder",
"description": "Choices made (for better or worse).",
"grade": "bronze",
"kind": "story",
"stage": 8,
"missable": true,
"hidden": false,
"guide": "Choices made (for better or worse). A hidden story trophy tied to a decision. The parenthetical is the hint: the trophy acknowledges a choice rather than judging it, so either branch counts. It fires once, at the decision, and cannot be re-earned in the same playthrough.",
"steps": [
"Play the story to the decision it is tied to.",
"Make the choice; either branch counts.",
"The trophy pops at the decision."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 49,
"name": "Bad Luck, I Guess",
"description": "Second time's the charm.",
"grade": "bronze",
"kind": "story",
"stage": 8,
"missable": true,
"hidden": false,
"guide": "Second time's the charm. A hidden story trophy that fires on a repeat: something attempted twice, with the second attempt succeeding. Derived from the description alone, the requirement is to reach that beat rather than to fail deliberately — it is scripted, not a challenge.",
"steps": [
"Play the story to the repeat attempt it is tied to.",
"The trophy pops on the second attempt."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 50,
"name": "The Truth Is Out There",
"description": "What the hell just happened?",
"grade": "bronze",
"kind": "story",
"stage": 8,
"missable": true,
"hidden": false,
"guide": "What the hell just happened? A hidden story trophy, and the most cryptic description in the list: a reaction, not an instruction. It fires on a story moment that is meant to be confusing. Nothing to plan beyond reaching it.",
"steps": [
"Play the story.",
"The trophy pops on the moment it names."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 51,
"name": "Ten Pin",
"description": "Bowl 'em over with a melee drive-by.",
"grade": "bronze",
"kind": "activity",
"stage": 4,
"missable": false,
"hidden": false,
"guide": "Bowl 'em over with a melee drive-by. A combat bowling pun: a melee attack delivered from a moving vehicle. Any vehicle and any melee weapon work; the trophy is about the combination, and it is easiest in traffic rather than at speed.",
"steps": [
"Get a vehicle and a melee weapon.",
"Hit a pedestrian with the melee weapon from the moving vehicle.",
"The trophy pops on the hit."
],
"sources": [
"PlayStation trophy description (official)"
]
},
{
"id": 52,
"name": "Dime on the Dollar",
"description": "Earn $250,000 laundering Marked Bills through your contacts.",
"grade": "bronze",
"kind": "economy",
"stage": 8,
"missable": false,
"hidden": false,
"guide": "Earn $250,000 laundering Marked Bills through your contacts. The money is earned through the laundering loop rather than picked up: Marked Bills are the game's dirty cash, and the contacts convert them. The threshold is cumulative, so the trophy is about running the loop enough times rather than one big score.",
"steps": [
"Collect Marked Bills from robberies and jobs.",
"Launder them through contacts, repeatedly.",
"The trophy pops once $250,000 has been laundered in total."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 250000
},
{
"id": 53,
"name": "Treat Yo Self",
"description": "Spend $100,000 across all shops.",
"grade": "bronze",
"kind": "economy",
"stage": 8,
"missable": false,
"hidden": false,
"guide": "Spend $100,000 across all shops. Cumulative spending, counted across every shop the game has: clothes, weapons, food, vehicle mods. Nothing needs to be bought twice, and nothing needs to be useful — the trophy counts the total, so spreading purchases is as good as one large one.",
"steps": [
"Buy from shops of every kind as the map is played.",
"Keep spending until the cumulative total passes $100,000.",
"The trophy pops on the purchase that crosses it."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 100000
},
{
"id": 54,
"name": "Little Boxes",
"description": "Purchase all garage properties.",
"grade": "bronze",
"kind": "economy",
"stage": 8,
"missable": false,
"hidden": false,
"guide": "Purchase all garage properties. A fixed property list, bought outright: every garage the game sells has to be owned. The cost is the gate, not the difficulty, so this belongs after the money trophies — and it pairs with the vehicle-discovery trophy, since garages stock models worth registering.",
"steps": [
"List every garage property for sale.",
"Buy them all.",
"The trophy pops on the last purchase."
],
"sources": [
"PlayStation trophy description (official)",
"Rockstar Newswire"
]
},
{
"id": 55,
"name": "On the Spot",
"description": "Register 10 vehicles to the Scooter Bros app.",
"grade": "bronze",
"kind": "economy",
"stage": 8,
"missable": false,
"hidden": false,
"guide": "Register 10 vehicles to the Scooter Bros app. A small in-game app task: ten vehicles registered through it, one at a time. Registration is free or cheap, so the requirement is just to remember the app exists — pair it with vehicle discovery so the same vehicles count for both.",
"steps": [
"Open the Scooter Bros app in the in-game phone.",
"Register ten vehicles.",
"The trophy pops on the tenth registration."
],
"sources": [
"PlayStation trophy description (official)"
],
"count": 10
}
];
export default TROPHIES;
