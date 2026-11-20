// Trophy data for the Leonida Trophy Guide, generated from app/data/trophies.json.
// That JSON is the canonical copy; edit it and run `node tools/build-data-module.mjs` rather than
// editing this module, which only exists so the page can import its data with no fetch.

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
    "guide": "The platinum has no objective of its own; it is the ledger closing on the other fifty-four. Build the run around A Long Road and the finale gold, because those two decide how long everything takes, then let the rest accumulate around them. There is no online component, so nothing outside your own save can void the attempt. Keep the tracker honest rather than trusting memory: the only way this trophy goes wrong is a missable you had already forgotten about.",
    "why": "There is no skill test here; the platinum is only as long as the fifty-four trophies underneath it.",
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
    "guide": "Gone Fishing is a story mission on the early chain, so the only work is reaching it and finishing it. Follow the markers at a normal pace instead of trying to speedrun the opening, since mission scripts sometimes wait for a scene to finish before an objective counts. Complete the last objective and let the results screen appear. Nothing inside the mission is optional, so the trophy cannot be failed once you start it.",
    "why": "A tutorial-grade story mission with no optional objective and nothing that can be missed.",
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
    "guide": "Chapter 1 closes only after its epilogue, so a player who stops at the last obvious job will sit with an unfinished chapter. Play every mission the chapter puts on the map, including the short follow-up that appears once the main arc resolves. The pause menu's chapter counter flips as soon as the boundary is crossed. The trophy is automatic at that point, and the same boundary is where Leonida's missable content starts its clock.",
    "why": "Cheap in difficulty but expensive in attention: the chapter boundary quietly closes the first missables.",
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
    "guide": "Chapter 2 is where the map widens and where most of the strands that can later close begin. Finish the chapter's missions in the order the game offers them, and treat every new strand marker as something to open before you push the plot forward. The trophy needs the chapter's mission set and nothing else. Let the closing scene play through, because the award arrives on the chapter transition.",
    "why": "Pure story progress; the only risk is treating the chapter as a place to stop and wander.",
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
    "guide": "By Chapter 3 the state is full of distractions, and the story is easy to leave sitting while you chase money. This trophy only wants the chapter's chain, so keep the main markers moving and clear the optional-feeling story jobs that appear beside them. Before the closing mission, check whether any strand you opened is still unfinished, since this boundary can erase one. The trophy arrives with the chapter transition.",
    "why": "Automatic, but the chapter boundary is where half-finished strands become unwinnable.",
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
    "guide": "Chapter 4 is the runway to the finale, and the right way to use it is as an audit rather than a sprint. Clear the story missions, then walk the roadmap for anything still open: a companion strand, a one-time social beat, a decision you meant to save for. Cross the boundary only when the list is clean, because the ending follows immediately and several windows shut behind it. The trophy itself asks for nothing beyond the chapter's missions.",
    "why": "The last chapter is easy; arriving here with an open strand is what costs the platinum.",
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
    "guide": "The last mission is a gold for what it represents rather than for the fight it offers. Use the mission screen as a pre-flight check: every missable strand closed, every decision trophy handled, and a manual save kept in case you want the other branch. Once you start, play to the credits without quitting, because the completion flag is written at the end of the epilogue. Skipping scenes is the one habit that can leave you with a finished story and no trophy.",
    "why": "A gold for the story ending rather than the mission: the real fight is clearing the map first.",
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
    "guide": "Breakfast Run is front-loaded story content that unlocks while the game is still introducing its cast. There is no setup, no optional objective and no branch to worry about, so follow the markers and finish what the mission asks. Let the final cutscene run instead of skipping, because the completion callback fires after it. The trophy appears on the completion screen and cannot be lost.",
    "why": "An early story mission that asks only that you play it.",
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
    "guide": "The Cartel Heist belongs to the story chain, which means it unlocks on schedule and cannot be started from free roam. Play the preparation missions the story hands you, then run the heist to the end, escape included. Leaving after the score but before the getaway does not count, so finish the job the way the objectives direct. The trophy pops on the job-complete screen.",
    "why": "Story-gated, so it is a scheduling trophy: you cannot start it early and you cannot skip the escape.",
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
    "guide": "Child's Play sits on the mid-game chain and needs nothing but patience. Complete it normally, including whatever chase or confrontation closes it, and let the scene after the last objective play. Restarting for a cleaner run only costs time, since there is no performance condition attached. The trophy appears on the completion screen.",
    "why": "A mid-story mission with no hidden condition.",
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
    "guide": "Headliners is one of the big mid-story set pieces and appears once the missions before it are cleared. Play the objectives as directed; there is no hidden requirement and no branching path that can void the award. When the final sequence starts, stay with it to the end rather than quitting out. The trophy lands on the mission-complete banner.",
    "why": "A set piece on the main chain: spectacle, not difficulty.",
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
    "guide": "VCIA Takedown unlocks when the story reaches the airport beat, so keep the main chain moving until the marker shows. Work through the full objective chain, including any section where the mission hands you a vehicle or a disguise, and avoid reloading a checkpoint after the last objective. The trophy is awarded at completion, which makes the epilogue scene part of the job. There is no alternate route to miss.",
    "why": "An airport story mission; the only trap is quitting before the final objective resolves.",
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
    "guide": "Operation Savage Glory is late-story content and stays locked until its predecessors are done. Treat it as a spectacle: use the cover the level provides, follow the objectives, and let the closing scenes run. There is no missable window inside the mission itself, so reaching the end is all that matters. The trophy lands on completion.",
    "why": "Late-story spectacle with no missable window inside the mission itself.",
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
    "guide": "Start from the in-game completion checklist rather than from a feeling of having seen everything, because the trophy reads that list and nothing else. Note every category below its maximum, then clear them one at a time; collectibles and activities are far faster when routed district by district instead of criss-crossing the state. The last percent is almost always a single straggler in a category you assumed was finished, so reopen the checklist before you start hunting. The gold appears the instant the meter reads 100%, and none of it requires another player.",
    "why": "The long gold: a checklist grind where the last two percent is a straggler, not a challenge.",
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
    "guide": "The counter accepts the specific stunt type the activity list names, so confirm what actually increments it before committing to a grind. Plan a loop of jumps in one region, land them cleanly, and keep a written tally, because repeating a jump you have already landed adds nothing. Two hundred and fifty is a test of patience more than of skill, so favour a route you can complete half-asleep over a flashy one you fail twice an hour. The trophy appears on the 250th counted completion.",
    "why": "Volume, not skill: 250 repetitions that reward a reliable route over a brave one.",
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
    "guide": "Read the activity list first and count the distinct types it contains, because the trophy measures breadth and not repetition. Try one of each type as you come across them, and tick them off so a second visit to the same pastime is not mistaken for a new one. Two similar activities are not necessarily two types, so trust the game's own categories. The trophy pops when the last new type is tried, even if the score was poor.",
    "why": "Breadth over depth: the trap is mistaking two similar activities for two types.",
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
    "guide": "List the Shooting Range challenges before you begin and treat each one as a small, solvable puzzle. Gold usually depends on the weapon the challenge was designed around and on not wasting the opening seconds, so learn the target pattern instead of spraying. A single silver blocks the trophy, which means replaying the weakest challenge is better than moving on. The award lands when the final gold medal is banked.",
    "why": "A real skill gate, and one silver in the set blocks the trophy until it is improved.",
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
    "guide": "The trophy counts locations rather than wins, so mark every Top Fun venue on the map before you start racing. Drone courses reward clean lines and early braking far more than top speed, and a practice lap costs nothing. Win once at each location, then ignore repeat wins at the same venue because they do not move the counter. The trophy pops when the last location falls.",
    "why": "A location count, not a win count: a single repeated course earns nothing.",
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
    "guide": "Different is the operative word: twenty wins on one circuit will not do. Open the map's race list, note the events you have not won, and work through them with a stable car suited to each discipline. Most races are decided at the first corner, so take a slow practice lap to learn the braking point before racing for the win. The trophy appears on the twentieth distinct victory.",
    "why": "Twenty distinct wins; repetition is the cheap mistake here.",
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
    "guide": "Cal's contest belongs to his stranger strand, so start the line and follow it until he proposes the fishing challenge. The contest rewards patience: cast where the water is marked as holding bigger fish and let the line settle instead of reeling constantly. Land one catch heavier than his and the contest is yours, and a loss can be retried without penalty. Do it in the chapter that opens the strand, because the whole line can close.",
    "why": "A patience contest against a named character, retryable, with no window beyond the strand itself.",
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
    "guide": "Any cabinet works, because the trophy only requires that one game be finished. Stay on the machine until the end screen: walking away resets progress and wastes the run. These games are short and pattern-based, so two or three attempts usually teach you enough to clear one. The trophy pops on the completion screen.",
    "why": "Cheap: one short pattern-based game, played to the end without leaving the cabinet.",
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
    "guide": "Andy's missions form a companion strand, and companion strands are exactly the content that disappears when the story advances too far. Start the line as soon as its marker appears and play it through without interleaving other activities, since some steps only trigger once the previous one is fully closed. The trophy sits on the strand's final mission, so a half-finished line is worth nothing. If the marker has vanished, you have probably crossed the chapter that gated it.",
    "why": "A missable strand: the difficulty is finishing it before the chapter moves on.",
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
    "guide": "Kenton's strand opens in a specific chapter and should be finished inside it. Run the missions back to back where the game allows, and if the next marker is delayed, use the phone or sleep to pass time in-world rather than leaving the area. The trophy is awarded on the final mission of the line. Missing it means a fresh playthrough, so treat the marker as urgent.",
    "why": "Missable companion content where the cost of delay is the trophy, not the missions.",
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
    "guide": "Billy's line is short, which makes it easy to postpone and easy to lose. Pick up the first mission the moment the marker shows and clear each step as it appears. Do not start a new chapter with one of Billy's jobs outstanding, because the window closes with the story. The final mission carries the trophy and the earlier ones count for nothing on their own.",
    "why": "A short strand with a closing window; the only hard part is starting it in time.",
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
    "guide": "Eight completed strands is an accounting problem: eight missions from eight different strangers will not satisfy it. Keep a list of every strand you open and mark it only when its final job is done. Short strands are the efficient first targets, while the longer companion lines can run in parallel. The trophy pops on the eighth completed strand.",
    "why": "Eight whole strands is an accounting problem more than a skill one.",
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
    "guide": "Randy's strand is missable, so the whole difficulty is timing. Start it in the chapter where it opens and finish each mission before accepting a main-story job that could push the chapter forward. The jobs are sequential, so there is nothing to gain from sampling them out of order. The trophy lands on the strand's final mission.",
    "why": "A short missable strand; urgency is the whole difficulty.",
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
    "guide": "Tyrone's line is another companion strand with a soft gate between missions. Take the marker as soon as it appears, complete each job as it is offered, and skip time in-game if the next one needs a day to trigger. Leaving the strand open across a chapter boundary is how players lose it. The trophy is awarded at the end of the line.",
    "why": "Missable strand content with a soft time gate between missions.",
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
    "guide": "The meditation spots are an activity with a list, so open that list and work from it rather than scanning the horizon for something that looks spiritual. Each location requires a full meditation: hold the input until the prompt completes, because a quick visit does not register. None of the spots can be missed, so this is a pleasant checklist to save for a quiet session. The trophy pops at the last location.",
    "why": "A sightseeing checklist with no fail state.",
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
    "guide": "Bret's request names one specific animal, so read the brief before you leave and do not improvise. Use the hunting sense to track it rather than driving around hoping for a sighting, and take a clean shot so the carcass still qualifies. The trophy pops on the kill, and because the request belongs to a strand, handle it when it appears instead of saving it. A ruined carcass usually means waiting for the request to come round again.",
    "why": "A single named animal; the strand window is the only thing that can close it.",
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
    "guide": "Each card set has a fixed list, and the final card is usually the one you have to buy rather than find. Finish one set at a time: note the gaps, then use shops, vendors and card packs to close them. Two complete sets plus a nearly complete third earns nothing, because the counter reads full sets only. The trophy pops on the third completion.",
    "why": "Collection luck plus shop money: three complete sets, and the last card is usually bought.",
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
    "guide": "WAiNK is location-based, so the efficient approach is district by district with the activity map open. Tick off each location as you finish it, since the counter wants distinct spots and repeat visits are wasted. Clear the districts you would otherwise skip early, because the last handful are usually in exactly those places. The trophy appears at the hundredth location.",
    "why": "A hundred locations is a routing grind, not a challenge.",
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
    "guide": "Challenges appear while you are busy with something else, so the real skill is saying yes instead of driving past the prompt. Fifty is a background grind best folded into collectible or activity runs rather than a dedicated session. Keep your own tally, because the game does not always surface the count during free roam. The trophy pops on the fiftieth completion.",
    "why": "Fifty opportunistic completions; the trap is driving past the prompt.",
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
    "guide": "This one needs a partner and a four-star level, so set it up deliberately instead of waiting for it to happen. Raise the level with your partner in the car, then break line of sight and let it decay all the way to zero without dying or being arrested. Tunnels, parking garages and storm drains are the dependable places to vanish. The trophy pops the moment the level clears.",
    "why": "Needs a partner and a clean four-star escape without dying.",
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
    "guide": "Choose three shops within a short drive of each other before you start, because the wanted level has to survive the whole streak. Rob the first, keep the police active, and drive straight to the second and third without shaking them. Fighting is optional and usually counterproductive: the requirement is the unbroken run, not the body count. The trophy pops on the third robbery with the level still live.",
    "why": "A routing test: three shops close enough to rob while the level stays hot.",
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
    "guide": "A vehicle is discovered when you drive or inspect it, so variety matters far more than ownership. Visit dealerships and garages to log the models on show, and swap cars during missions instead of staying loyal to one favourite. Keep a list by class so a resprayed sedan does not get counted twice in your head. The trophy pops at the hundredth distinct vehicle.",
    "why": "Variety grind: a hundred distinct vehicles, dealerships included.",
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
    "guide": "Find a fight with at least five enemies and let them group up before you trigger Combat Focus. Activate the ability with all five in view and take them down in one continuous flow, because reloading or losing sight of one usually ends the chain. Gang operations and story firefights are the natural places to attempt it. The trophy pops when the fifth drops before the meter empties.",
    "why": "A momentary skill check that needs five enemies clustered and one clean Combat Focus.",
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
    "guide": "Get airside at VCIA without following the scheduled departure route, either by boarding a parked aircraft or by driving through the service access. Once you are airborne and past the airport boundary, the game registers an unscheduled departure. Expect a wanted level on the way out, so pick a heading away from the runway before you lift off. The trophy pops in the air, not on the ground.",
    "why": "Cheap and funny: stealing a plane from VCIA, with a wanted level as the receipt.",
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
    "guide": "The Rhino comes from the military content, so reach that part of the story or activity before worrying about the trophy. Read the description literally: it is a joke about a specific act performed while driving the tank. Once you have the vehicle the trophy takes seconds, which makes it one of the cheapest in the set. The award lands the moment the act registers.",
    "why": "A joke trophy gated only by getting the Rhino.",
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
    "guide": "Case the jewelry store before you go in: note the back entrance, the safe, and where the staff stand during the day. Enter quietly, take the contents without touching an alarm, and leave the way you came rather than shooting your way out. Any alarm voids the attempt, so restart the robbery instead of improvising a rescue. The trophy pops when the job completes with detection still at zero.",
    "why": "The only stealth trophy in the set: a single alarm voids the attempt.",
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
    "guide": "Identify all five bank vaults first and treat each as its own small heist. Plan the exit before you enter, because the trophy requires a clean escape after every vault rather than just a successful robbery. Space the jobs out if the heat is high; a failed getaway only costs you that attempt. The trophy pops on the fifth clean escape.",
    "why": "Five clean vault escapes; planning the exit matters more than the robbery.",
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
    "guide": "Armored trucks run predictable routes, so wait at a junction instead of chasing one down the highway. Block it, take the cargo, and shake the escort before it regroups. One successful job is all the trophy needs, which makes a quiet stretch of road a better hunting ground than a busy one. The award appears once you are clear.",
    "why": "One armored truck and a clean getaway; route knowledge beats firepower.",
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
    "guide": "Open the map and look for the fogged regions, then travel through each until the fog lifts. Flying covers the far corners quickly, but driving fills in the road-level gaps the map actually counts. Save the islands and the state's edges for last, since they are the easiest to overlook. The trophy pops when the final region is uncovered.",
    "why": "Map coverage: the fog hides the last few regions rather than any difficulty.",
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
    "guide": "Identify each gang and the operation it runs, because the game tracks them as separate targets. Rob one operation per gang and keep a list: hitting the same gang twice does nothing for the trophy. Stealth is optional, though a quiet approach keeps the getaway short. The trophy pops on the last gang's operation.",
    "why": "One operation per gang; repeating the same gang is the trap.",
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
    "guide": "Go to Ocean Beach and find the bar with the view, which is a specific venue rather than any kiosk on the sand. Order a cocktail and finish it, because leaving with the glass half full does not count. The beat is tied to the story and can be lost once the venue closes later in the plot, so do it while it is open. The trophy pops on the drink.",
    "why": "A one-time social beat at a specific bar, missable when the story moves on.",
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
    "guide": "Drive a vehicle into a showroom, then leave by smashing through the frontage rather than reversing politely out of the door. The game wants the dramatic exit, so line the window up and commit to it. Expect attention afterwards, though the trophy does not care about your wanted level. The award lands on the break-out.",
    "why": "Cheap spectacle: drive in, smash out, no skill required.",
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
    "guide": "Go to the Kolt & Associates alley and bowl a complete game to the final frame. Do not quit halfway through, because the trophy checks the finished game rather than the score. Bring a companion if the game offers one, since the lane is a social activity. The trophy pops on the last frame.",
    "why": "A full bowling game: cheap, social, and easy to quit too early.",
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
    "guide": "This is a hidden story trophy tied to a partnership beat, so it cannot be farmed or chased from the map. Play the story and make the choice the scene presents, and keep a manual save beforehand because the other branch may not award it. The trophy sits on the beat itself rather than on any skill check. Once the choice is made the award appears automatically.",
    "why": "A hidden decision trophy: the branch you take decides whether it exists.",
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
    "guide": "The description points at choices made, and either branch satisfies it. Play to the scene, make the call instead of backing out, and let the consequences play out. If you are also collecting the other decision trophies, keep a manual save before the mission so you can return. The trophy pops at the decision.",
    "why": "Either branch counts, so the only cost is making the choice rather than backing out.",
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
    "guide": "The line about a second time being the charm is literal: the trophy is attached to a repeat attempt. Play the story to that beat and retry the way the scene intends instead of reloading to avoid the failure. Keep a save before the sequence, because a clean first attempt can otherwise skip the trigger. The trophy lands on the second attempt.",
    "why": "Tied to a deliberate second attempt, which is easy to skip by reloading.",
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
    "guide": "This hidden trophy is attached to a story moment rather than a task, so the only route is to play until you reach it. Let the scene play out fully instead of skipping the sequence it names. Because the trophy is hidden, the list will not tell you what it is until it appears. The award is granted at the moment itself.",
    "why": "A hidden story beat with no task attached; you either reach it or you do not.",
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
    "guide": "Get a vehicle and a melee weapon, then connect with a pedestrian from the moving car. Timing is the whole challenge: the weapon has to land while the vehicle is rolling, not from a standstill. A quiet street with a slow approach works better than heavy traffic, where the target moves unpredictably. The trophy pops on the hit.",
    "why": "A timing gag: the melee hit has to land from a moving car.",
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
    "guide": "Marked Bills come from robberies and jobs, and they only count once passed through your contacts. Launder in batches rather than hoarding, because the trophy measures the total that has gone through the contact and not the cash in your pocket. Repeat the loop whenever it becomes available and keep a running note. The trophy pops once $250,000 has been laundered in total.",
    "why": "A money loop, not a skill test: $250,000 laundered through contacts.",
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
    "guide": "Every purchase at every shop counts, which makes this a trophy you earn by playing normally with a spending habit. Buy useful things as you go instead of saving for one grand splash, and spread purchases across shops so you are not waiting on stock. Clothing, weapons and vehicle upgrades all contribute to the total. The trophy pops on the purchase that crosses $100,000.",
    "why": "Cumulative shopping; the only difficulty is remembering that every purchase counts.",
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
    "guide": "List every garage property on the market before buying anything, because the trophy checks the whole set and the last one is easy to miss. Garages are expensive, so treat this as an end-game purchase funded by heists and the money loops. Buy the cheapest ones early to spread the cost across the run. The trophy pops on the final purchase.",
    "why": "The most expensive checklist item: every garage property, funded by heists.",
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
    "guide": "Open the Scooter Bros app in the in-game phone and register ten vehicles. Anything you own counts, so a full garage clears the requirement in one sitting. The app is easy to forget, which is the only real obstacle here. The trophy pops on the tenth registration.",
    "why": "Ten app registrations: free, and only a matter of remembering the app exists.",
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
