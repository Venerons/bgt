(function () {
	'use strict';

	var SEVENTHSEA2 = Object.create(null);

	SEVENTHSEA2.traits = {
		'brawn': {
			label: 'Brawn',
			min: 2,
			max: 5
		},
		'finesse': {
			label: 'Finesse',
			min: 2,
			max: 5
		},
		'resolve': {
			label: 'Resolve',
			min: 2,
			max: 5
		},
		'wits': {
			label: 'Wits',
			min: 2,
			max: 5
		},
		'panache': {
			label: 'Panache',
			min: 2,
			max: 5
		}
	};

	SEVENTHSEA2.nations = {
		'avalon': {
			label: 'Avalon',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'inismore': {
			label: 'Inismore',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'the_highland_marches': {
			label: 'The Highland Marches',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'castille': {
			label: 'Castille',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'eisen': {
			label: 'Eisen',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'montaigne': {
			label: 'Montaigne',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'the_sarmatian_commonwealth': {
			label: 'The Sarmatian Commonwealth',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'ussura': {
			label: 'Ussura',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'vestenmennavenjar': {
			label: 'Vestenmennavenjar',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'vodacce': {
			label: 'Vodacce',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'numa': {
			label: 'Numa',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'rahuri': {
			label: 'Rahuri',
			traits: [],
			backgrounds: [],
			source: ''
		},
		'jaragua': {
			label: 'Jaragua',
			traits: [],
			backgrounds: [],
			source: ''
		}
	};

	SEVENTHSEA2.skills = {
		'aim': {
			label: 'Aim',
			min: 0,
			max: 5
		},
		'athletics': {
			label: 'Athletics',
			min: 0,
			max: 5
		},
		'brawl': {
			label: 'Brawl',
			min: 0,
			max: 5
		},
		'convince': {
			label: 'Convince',
			min: 0,
			max: 5
		},
		'empathy': {
			label: 'Empathy',
			min: 0,
			max: 5
		},
		'hide': {
			label: 'Hide',
			min: 0,
			max: 5
		},
		'intimidate': {
			label: 'Intimidate',
			min: 0,
			max: 5
		},
		'notice': {
			label: 'Notice',
			min: 0,
			max: 5
		},
		'perform': {
			label: 'Perform',
			min: 0,
			max: 5
		},
		'ride': {
			label: 'Ride',
			min: 0,
			max: 5
		},
		'sailing': {
			label: 'Sailing',
			min: 0,
			max: 5
		},
		'scholarship': {
			label: 'Scholarship',
			min: 0,
			max: 5
		},
		'tempt': {
			label: 'Tempt',
			min: 0,
			max: 5
		},
		'theft': {
			label: 'Theft',
			min: 0,
			max: 5
		},
		'warfare': {
			label: 'Warfare',
			min: 0,
			max: 5
		},
		'weaponry': {
			label: 'Weaponry',
			min: 0,
			max: 5
		},
	};

	SEVENTHSEA2.arcana = {
		'the_fool': {
			label: 'The Fool',
			virtue: 'Wily',
			hubris: 'Curious'
		},
		'the_road': {
			label: 'The Road',
			virtue: 'Friendly',
			hubris: 'Underconfident'
		},
		'the_magician': {
			label: 'The Magician',
			virtue: 'Willful',
			hubris: 'Ambitious'
		},
		'the_lovers': {
			label: 'The Lovers',
			virtue: 'Passionate',
			hubris: 'Star-Crossed'
		},
		'the_wheel': {
			label: 'The Wheel',
			virtue: 'Fortunate',
			hubris: 'Unfortunate'
		},
		'the_devil': {
			label: 'The Devil',
			virtue: 'Astute',
			hubris: 'Trusting'
		},
		'the_tower': {
			label: 'The Tower',
			virtue: 'Humble',
			hubris: 'Arrogant'
		},
		'the_beggar': {
			label: 'The Beggar',
			virtue: 'Insightful',
			hubris: 'Envious'
		},
		'the_witch': {
			label: 'The Witch',
			virtue: 'Intuitive',
			hubris: 'Manipulative'
		},
		'the_war': {
			label: 'The War',
			virtue: 'Victorious',
			hubris: 'Loyal'
		},
		'the_hanged_man': {
			label: 'The Hanged Man',
			virtue: 'Altruistic',
			hubris: 'Indecisive'
		},
		'coins': {
			label: 'Coins (for the Ferryman)',
			virtue: 'Adaptable',
			hubris: 'Relentless'
		},
		'the_thrones': {
			label: 'The Thrones',
			virtue: 'Comforting',
			hubris: 'Stubborn'
		},
		'the_moonless_night': {
			label: 'The Moonless Night',
			virtue: 'Subtle',
			hubris: 'Confusion'
		},
		'the_sun': {
			label: 'The Sun',
			virtue: 'Glorious',
			hubris: 'Proud'
		},
		'the_prophet': {
			label: 'The Prophet',
			virtue: 'Illuminating',
			hubris: 'Overzealous'
		},
		'reunion': {
			label: 'Reunion',
			virtue: 'Exemplary',
			hubris: 'Bitterness'
		},
		'the_hero': {
			label: 'The Hero',
			virtue: 'Courageous',
			hubris: 'Foolhardy'
		},
		'the_glyph': {
			label: 'The Glyph',
			virtue: 'Temperate',
			hubris: 'Superstitious'
		}
	};

	/*
	Backgrounds
		Basic
			Archaeologist
			Aristocrat
			Army Officer
			Artist
			Assassin
			Cavalry
			Courtier
			Crafter
			Criminal
			Doctor
			Duelist
			Engineer
			Explorer
			Farmkid
			Hunter
			Jenny
			Mercenary
			Merchant
			Naval
			Officer
			Orphan
			Performer
			Pirate
			Priest
			Professor
			Pugilist
			Quartermaster
			Sailor
			Scholar
			Servant
			Ship
			Captain
			Soldier
		Avalon
			Bard
			Knight Errant
			Privateer
			Unification Agent
			Puritan
		Inismore
			Bard
			Knight Errant
			Privateer
			Unification Agent
			Saoi (Wise One)
		The Highland Marches
			Bard
			Knight Errant
			Privateer
			Unification Agent
			Seanchaidh (Warrior-poet)
		Castille
			Alquimista
			Antropologo
			Diestro
			Mirabilis (Priest)
		Eisen
			Hexe
			Krieger (Warrior)
			Ungetumjager (Monster Hunter)
			Vitalienbruder (Pirate)
		Montaigne
			L'Ami du Roi (Courtier)
			Mousquetaire
			Revolutionnaire
			Sorcier Porte
		Sarmatia
			Posel (Envoy)
			Tremtis (Expatriate)
			Winged Hussar
			Zynys (Soothsayer)
		Ussura
			Cossack
			Progressivist
			Touched By Matushka
			Whaler
		Vestenmennavenjar
			Bearsark
			Guildmastaren
			Sjorover (Pirate)
			Skald

			var basic_backgrounds = [{name:"Archaeologist", quirk:"Earn a Hero Point when you turn an artifact of value over to a university, museum, or a publicly displayed site.", advantages:['Signature Item', 'Eagle Eyes'], skills:['Athletics', 'Convince', 'Notice', 'Scholarship', 'Theft']},

				{name:"Aristocrat", quirk:"Earn a Hero Point when you prove there is more to nobility than expensive clothes and attending court.", advantages:['Rich', 'Disarming Smile'], skills:['Aim', 'Convince', 'Empathy', 'Ride', 'Scholarship']},

				{name:"Army Officer", quirk:"Earn a Hero Point when you seize command during a moment of intense violence or extreme danger.", advantages:['Academy', 'Direction Sense'], skills:['Aim', 'Athletics', 'Intimidate', 'Ride', 'Warfare']},

				{name:"Artist", quirk:"Earn a Hero Point when you make a sacrifice in the hope of making Théah a more beautiful place.", advantages:['Patron', 'Fascinate'], skills:['Convince', 'Empathy', 'Perform', 'Ride', 'Tempt']},

				{name:"Assassin", quirk:"Earn a Hero Point when you go out of your way to avoid the death of an adversary or outright refuse a course of action because it could result in another person's death.", advantages:['Fencer', 'Psst, Over Here'], skills:['Athletics', 'Empathy', 'Hide', 'Intimidate', 'Weaponry']},

				{name:"Cavalry", quirk:"Earn a Hero Point when you apply your skills in horse riding to an uncommon situation.", advantages:['Bruiser', 'Indomitable Will'], skills:['Intimidate', 'Notice', 'Ride', 'Warfare', 'Weaponry']},

				{name:"Courtier", quirk:"Earn a Hero Point when you turn the tide of violence with charm and flair.", advantages:['An Honest Misunderstanding', 'Friend at Court'], skills:['Empathy', 'Perform', 'Ride', 'Tempt', 'Weaponry']},

				{name:"Crafter", quirk:"Earn a Hero Point when you use everyday crafting skills to solve a problem deemed too complex for such a simple solution.", advantages:['Masterpiece Crafter', 'Handy'], skills:['Athletics', 'Convince', 'Notice', 'Perform', 'Scholarship']},

				{name:"Criminal", quirk:"Earn a Hero Point when you break the law in the pursuit of a noble endeavor.", advantages:['Camaraderie', 'Streetwise'], skills:['Athletics', 'Empathy', 'Hide', 'Intimidate', 'Theft']},

				{name:"Doctor", quirk:"Earn a Hero Point when you tend to the injuries of a Villain or the innocents harmed by a Villain.", advantages:['Miracle Worker', 'Time Sense'], skills:['Convince', 'Empathy', 'Notice', 'Ride', 'Scholarship']},

				{name:"Duelist", quirk:"Earn a Hero Point when you resort to the edge of your blade to defend a noble ideal.", advantages:['Duelist Academy'], skills:['Athletics', 'Empathy', 'Intimidate', 'Perform', 'Weaponry']},

				{name:"Engineer", quirk:"Earn a Hero Point when you use your technological savvy to solve a problem.", advantages:['Masterpiece Crafter', 'Direction Sense', 'Time Sense'], skills:['Aim', 'Convince', 'Ride', 'Scholarship', 'Warfare']},

				{name:"Explorer", quirk:"Earn a Hero Point when you set your eyes upon a sight few, if any, Théans have ever seen before.", advantages:['Quick Reflexes', 'Second Story Work'], skills:['Athletics', 'Convince', 'Empathy', 'Ride', 'Sailing']},

				{name:"Farmkid", quirk:"Earn a Hero Point when you solve a complex problem in a simple, tried and true method from back on the farm.", advantages:['Legendary Trait', 'Survivalist'], skills:['Athletics', 'Convince', 'Empathy', 'Perform', 'Ride']},

				{name:"Hunter", quirk:"Earn a Hero Point when you use your hunter's acumen to save someone from danger.", advantages:['Sniper', 'Got It!'], skills:['Aim', 'Hide', 'Intimidate', 'Notice', 'Ride']},

				{name:"Jenny", quirk:"Earn a Hero Point when you resolve a conflict with seduction or sexual wiles.", advantages:['Dynamic Approach', 'Come Hither'], skills:['Aim', 'Athletics', 'Empathy', 'Perform', 'Tempt']},

				{name:"Mercenary", quirk:"Earn a Hero Point when you choose to ply your trade for a reason that's worth more to you than money.", advantages:['Hard to Kill', 'Cast Iron Stomach'], skills:['Athletics', 'Brawl', 'Intimidate', 'Notice', 'Weaponry']},

				{name:"Merchant", quirk:"Earn a Hero Point when you sell an item for far less than it's worth to someone who desperately needs it.", advantages:['Lyceum', 'Time Sense'], skills:['Convince', 'Empathy', 'Intimidate', 'Ride', 'Tempt']},

				{name:"Naval Officer", quirk:"Earn a Hero Point when you put the needs of the crew ahead of the needs of the mission.", advantages:['Perfect Balance', 'Barterer', 'Sea Legs'], skills:['Intimidate', 'Notice', 'Sailing', 'Warfare', 'Weaponry']},

				{name:"Orphan", quirk:"Earn a Hero Point when you put yourself in danger to ensure someone else doesn't have to be alone.", advantages:['Brush Pass', 'Reckless Takedown'], skills:['Athletics', 'Brawl', 'Empathy', 'Hide', 'Intimidate']},

				{name:"Performer", quirk:"Earn a Hero Point when you use your crowd-pleasing skills for something more than making a few coins.", advantages:['Virtuoso', 'Inspire Generosity'], skills:['Athletics', 'Empathy', 'Perform', 'Tempt', 'Theft']},

				{name:"Pirate", quirk:"Earn a Hero Point when you make a personal sacrifice to ensure the freedom of another.", advantages:['Deadeye', 'Indomitable Will'], skills:['Aim', 'Intimidate', 'Notice', 'Sailing', 'Theft']},

				{name:"Priest", quirk:"Earn a Hero Point when you set aside the rhetoric and take action to practice the virtues you preach.", advantages:['Ordained', 'Inspire Generosity'], skills:['Empathy', 'Perform', 'Ride', 'Scholarship', 'Tempt']},

				{name:"Professor", quirk:"Earn a Hero Point when you use knowledge from an obscure text to solve a complicated problem.", advantages:['Tenure', 'Team Player'], skills:['Convince', 'Empathy', 'Perform', 'Scholarship', 'Tempt']},

				{name:"Pugilist", quirk:"Earn a Hero Point when you drop what you're holding to fight with fists regardless of your opponent's weapon.", advantages:['Boxer', 'Staredown'], skills:['Athletics', 'Brawl', 'Convince', 'Empathy', 'Perform']},

				{name:"Quartermaster", quirk:"Earn a Hero Point when you solve a problem for your crew.", advantages:['Handy', 'Got It!', 'Sea Legs'], skills:['Aim', 'Brawl', 'Hide', 'Sailing', 'Warfare']},

				{name:"Sailor", quirk:"Earn a Hero Point when you put aside your personal desires to ensure the safety and comfort of your allies.", advantages:['Bar Fighter', 'Eagle Eyes'], skills:['Brawl', 'Notice', 'Sailing', 'Tempt', 'Weaponry']},

				{name:"Scholar", quirk:"Earn a Hero Point when you put yourself in harm's way in pursuit of knowledge.", advantages:['University', 'Linguist'], skills:['Convince', 'Empathy', 'Notice', 'Perform', 'Scholarship']},

				{name:"Servant", quirk:"Earn a Hero Point when you put yourself in danger to assist another character with a difficult task.", advantages:['Foul Weather Jack', 'Team Player'], skills:['Hide', 'Notice', 'Ride', 'Tempt', 'Theft']},

				{name:"Ship Captain", quirk:"Earn a Hero Point when you're the last one in your crew to safety.", advantages:['Married to the Sea', 'Leadership', 'Sea Legs'], skills:['Aim', 'Convince', 'Notice', 'Sailing', 'Warfare']},

				{name:"Soldier", quirk:"Earn a Hero Point when you stick to the plan regardless of the danger to yourself.", advantages:['Riot Breaker', 'Able Drinker'], skills:['Aim', 'Intimidate', 'Notice', 'Warfare', 'Weaponry']}];

			var nation_backgrounds = [[{name:"Bard", quirk:"Earn a Hero Point when you solve a problem by following an example set by a Legend.", advantages:['Barterer', 'Virtuoso', 'Able Drinker'], skills:['Aim', 'Convince', 'Empathy', 'Perform', 'Ride']},

				{name:"Knight Errant", quirk:"Earn a Hero Point when you uphold an ideal of knightly virtue in a way that gets you into trouble.", advantages:['Sorcery', 'Sorcery', 'Direction Sense'], skills:['Brawl', 'Intimidate', 'Ride', 'Warfare', 'Weaponry']},

				{name:"Privateer", quirk:"Earn a Hero Point when you defeat the enemies of the Crown of Avalon.", advantages:["The Devil's Own Luck", 'Perfect Balance'], skills:['Notice', 'Sailing', 'Tempt', 'Theft', 'Weaponry']},

				{name:"Unification Agent", quirk:"Earn a Hero Point when you ensure the stability of the Glamour Isles Unification.", advantages:['University', 'Survivalist'], skills:['Aim', 'Empathy', 'Notice', 'Scholarship', 'Tempt']},

				{name:"Puritan", quirk:"Earn a Hero Point when you expose corruption, hypocrisy, or ineffectiveness within the Vaticine Church.", advantages:['Dynamic Approach', 'Reputation'], skills:['Convince', 'Empathy', 'Intimidate', 'Ride', 'Scholarship']}],

				[{name:"Bard", quirk:"Earn a Hero Point when you solve a problem by following an example set by a Legend.", advantages:['Barterer', 'Virtuoso', 'Able Drinker'], skills:['Aim', 'Convince', 'Empathy', 'Perform', 'Ride']},

				{name:"Knight Errant", quirk:"Earn a Hero Point when you uphold an ideal of knightly virtue in a way that gets you into trouble.", advantages:['Sorcery', 'Sorcery', 'Direction Sense'], skills:['Brawl', 'Intimidate', 'Ride', 'Warfare', 'Weaponry']},

				{name:"Privateer", quirk:"Earn a Hero Point when you defeat the enemies of the Crown of Avalon.", advantages:["The Devil's Own Luck", 'Perfect Balance'], skills:['Notice', 'Sailing', 'Tempt', 'Theft', 'Weaponry']},

				{name:"Unification Agent", quirk:"Earn a Hero Point when you ensure the stability of the Glamour Isles Unification.", advantages:['University', 'Survivalist'], skills:['Aim', 'Empathy', 'Notice', 'Scholarship', 'Tempt']},

				{name:"Saoi (Wise One)", quirk:"Earn a Hero Point when you put yourself in harm's way to protect the artists of Théah.", advantages:['Team Player', 'Disarming Smile', 'Able Drinker'], skills:['Athletics', 'Convince', 'Empathy', 'Perform', 'Weaponry']}],

				[{name:"Bard", quirk:"Earn a Hero Point when you solve a problem by following an example set by a Legend.", advantages:['Barterer', 'Virtuoso', 'Able Drinker'], skills:['Aim', 'Convince', 'Empathy', 'Perform', 'Ride']},

				{name:"Knight Errant", quirk:"Earn a Hero Point when you uphold an ideal of knightly virtue in a way that gets you into trouble.", advantages:['Sorcery', 'Sorcery', 'Direction Sense'], skills:['Brawl', 'Intimidate', 'Ride', 'Warfare', 'Weaponry']},

				{name:"Privateer", quirk:"Earn a Hero Point when you defeat the enemies of the Crown of Avalon.", advantages:["The Devil's Own Luck", 'Perfect Balance'], skills:['Notice', 'Sailing', 'Tempt', 'Theft', 'Weaponry']},

				{name:"Unification Agent", quirk:"Earn a Hero Point when you ensure the stability of the Glamour Isles Unification.", advantages:['University', 'Survivalist'], skills:['Aim', 'Empathy', 'Notice', 'Scholarship', 'Tempt']},

				{name:"Seanchaidh (Warrior-poet)", quirk:"Earn a Hero Point when you enforce the ancient laws of your people.", advantages:['Riot Breaker', 'Linguist'], skills:['Convince', 'Notice', 'Perform', 'Ride', 'Weaponry']}],

				[{name:"Alquimista", quirk:"Earn a Hero Point when you improve another Théan's life through Alchemy.", advantages:['Alchemist', 'Cast Iron Stomach'], skills:['Empathy', 'Notice', 'Scholarship', 'Tempt', 'Theft']},

				{name:"Antropologo", quirk:"Earn a Hero Point when you solve a problem for a group of strangers.", advantages:['University', 'Linguist'], skills:['Athletics', 'Convince', 'Empathy', 'Notice', 'Scholarship']},

				{name:"Diestro", quirk:"Earn a Hero Point when you best a trained duelist at her own game.", advantages:['Fencer', 'Disarming Smile'], skills:['Athletics', 'Empathy', 'Intimidate', 'Scholarship', 'Weaponry']},

				{name:"Mirabilis (Priest)", quirk:"Earn a Hero Point when you give of yourself to demonstrate the warmth and compassion of the Vaticine Church.", advantages:['Ordained', 'Spark of Genius'], skills:['Convince', 'Empathy', 'Perform', 'Ride', 'Scholarship']}],

				[{name:"Hexe", quirk:"Earn a Hero Point when you go out of your way to ensure that the dead stay dead.", advantages:['Sorcery', 'Sorcery', 'Cast Iron Stomach'], skills:['Athletics', 'Intimidate', 'Notice', 'Tempt', 'Weaponry']},

				{name:"Krieger (Warrior)", quirk:"Earn a Hero Point when you choose to fight to defend the defenseless or prevent destruction.", advantages:['Staredown', 'Academy'], skills:['Aim', 'Athletics', 'Ride', 'Warfare', 'Weaponry']},

				{name:"Ungetumjager (Monster Hunter)", quirk:"Earn a Hero Point when you choose to hunt down an inhuman creature so it will never hurt anyone ever again.", advantages:["I Won't Die Here", 'Indomitable Will'], skills:['Aim', 'Athletics', 'Brawl', 'Notice', 'Weaponry']},

				{name:"Vitalienbruder (Pirate)", quirk:"Earn a Hero Point when you take from the rich to give to the poor.", advantages:['Leadership', 'Streetwise', 'Sea Legs'], skills:['Brawl', 'Hide', 'Sailing', 'Theft', 'Warfare']}],

				[{name:"L'Ami du Roi (Courtier)", quirk:"Earn a Hero Point when you leverage the King's favor to solve a problem.", advantages:['Connection', 'Friend at Court', 'Linguist'], skills:['Convince', 'Perform', 'Ride', 'Tempt', 'Weaponry']},

				{name:"Mousquetaire", quirk:"Earn a Hero Point when you take a serious injury to protect your comrades or King.", advantages:['Camaraderie', 'Quick Reflexes'], skills:['Aim', 'Intimidate', 'Notice', 'Ride', 'Weaponry']},

				{name:"Revolutionnaire", quirk:"Earn a Hero Point when you make a personal sacrifice for the sake of liberty.", advantages:['Joie de Vivre', 'Slip Free'], skills:['Hide', 'Notice', 'Ride', 'Theft', 'Weaponry']},

				{name:"Sorcier Porte", quirk:"Earn a Hero Point when you close a Blessure that a Villain ripped open.", advantages:['Sorcery', 'Sorcery', 'Time Sense'], skills:['Empathy', 'Hide', 'Ride', 'Scholarship', 'Tempt']}],

				[{name:"Posel (Envoy)", quirk:"Earn a Hero Point when you insist on democracy when it would be advantageous for you to not take a vote.", advantages:['Leadership', 'Lyceum'], skills:['Convince', 'Empathy', 'Intimidate', 'Perform', 'Tempt']},

				{name:"Tremtis (Expatriate)", quirk:"Earn a Hero Point when something from your past comes back to haunt you.", advantages:['Foreign Born', 'Streetwise', 'Connection'], skills:['Brawl', 'Empathy', 'Hide', 'Notice', 'Theft']},

				{name:"Winged Hussar", quirk:"Earn a Hero Point when you and your steed plunge headfirst into a battle or conflict, heedless of the danger.", advantages:['Together We Are Strong', 'Team Player'], skills:['Convince', 'Notice', 'Ride', 'Warfare', 'Weaponry']},

				{name:"Zynys (Soothsayer)", quirk:"Earn a Hero Point when you use something evil for good.", advantages:['Sorcery', 'Sorcery', 'Linguist'], skills:['Athletics', 'Convince', 'Perform', 'Scholarship', 'Weaponry']}],

				[{name:"Cossack", quirk:"Earn a Hero Point when you leave behind something important so you can travel light.", advantages:['Strength of Ten', 'Reckless Takedown'], skills:['Brawl', 'Intimidate', 'Notice', 'Ride', 'Weaponry']},

				{name:"Progressivist", quirk:"Earn a Hero Point when you risk life and limb to secure a piece of advanced technology.", advantages:['Extended Family', 'Handy', 'Connection'], skills:['Athletics', 'Convince', 'Empathy', 'Ride', 'Tempt']},

				{name:"Touched By Matushka", quirk:"Earn a Hero Point when you teach someone a lesson in a way that would make Matushka proud.", advantages:['Sorcery', 'Sorcery', 'Survivalist'], skills:['Athletics', 'Intimidate', 'Perform', 'Tempt', 'Theft']},

				{name:"Whaler", quirk:"Earn a Hero Point when you face a creature that could swallow a man whole.", advantages:['Able Drinker', 'Sea Legs', 'Patron'], skills:['Athletics', 'Brawl', 'Notice', 'Sailing', 'Weaponry']}],

				[{name:"Bearsark", quirk:"Earn a Hero Point when you let the Game Master choose your character's next action.", advantages:['Hard to Kill', 'Able Drinker'], skills:['Brawl', 'Intimidate', 'Sailing', 'Warfare', 'Weaponry']},

				{name:"Guildmastaren", quirk:"Earn a Hero Point when you use the vast resources of the Vendel League for something more noble than profit.", advantages:['Masterpiece Crafter', 'Rich'], skills:['Convince', 'Empathy', 'Ride', 'Scholarship', 'Tempt']},

				{name:"Sjorover (Pirate)", quirk:"Earn a Hero Point when put yourself in danger in order to ensure your place of honor at the Allfather's table.", advantages:["I'm Taking You With Me", 'Staredown'], skills:['Brawl', 'Intimidate', 'Notice', 'Sailing', 'Weaponry']},

				{name:"Skald", quirk:"Earn a Hero Point when you use your knowledge as a Seidr to help another Hero to solve a problem or thwart a Villain.", advantages:['Seidr', 'Sea Legs'], skills:['Brawl', 'Intimidate', 'Perform', 'Sailing', 'Weaponry']}]];

	var advantage_list = [{name:"Able Drinker", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Cast Iron Stomach", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Direction Sense", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Foreign Born", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Large", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Linguist", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Sea Legs", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Small", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Survivalist", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Time Sense", cost:1, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Barterer", cost:2, lessIf:0, lessCost:1, onlyIf:-1, multiple:false},
		{name:"Come Hither", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Connection", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Disarming Smile", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Eagle Eyes", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Extended Family", cost:2, lessIf:8, lessCost:1, onlyIf:-1, multiple:false},
		{name:"Fascinate", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Friend at Court", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Got It!", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Handy", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Indomitable Will", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Inspire Generosity", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Leadership", cost:2, lessIf:7, lessCost:1, onlyIf:-1, multiple:false},
		{name:"Married to the Sea", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Perfect Balance", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Poison Immunity", cost:2, lessIf:10, lessCost:1, onlyIf:-1, multiple:false},
		{name:"Psst, Over Here", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Reckless Takedown", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Reputation", cost:2, lessIf:-1, onlyIf:-1, multiple:true},
		{name:"Second Story Work", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Slip Free", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Sorcery", cost:2, lessIf:-1, onlyIf:-1, multiple:true},
		{name:"Staredown", cost:2, lessIf:5, lessCost:1, onlyIf:-1, multiple:false},
		{name:"Streetwise", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Team Player", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Valiant Spirit", cost:2, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"An Honest Misunderstanding", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Bar Fighter", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Boxer", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Bruiser", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Brush Pass", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Camaraderie", cost:3, lessIf:6, lessCost:2, onlyIf:-1, multiple:false},
		{name:"Deadeye", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Dynamic Approach", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Fencer", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Foul Weather Jack", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Masterpiece Crafter", cost:3, lessIf:9, lessCost:2, onlyIf:-1, multiple:false},
		{name:"Opportunist", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Ordained", cost:3, lessIf:4, lessCost:2, onlyIf:-1, multiple:false},
		{name:"Patron", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Quick Reflexes", cost:3, lessIf:-1, onlyIf:-1, multiple:true},
		{name:"Rich", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Signature Item", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Sniper", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Tenure", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Virtuoso", cost:3, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Academy", cost:4, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Alchemist", cost:4, lessIf:-1, onlyIf:4, multiple:false},
		{name:"Hard to Kill", cost:4, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Legendary Trait", cost:4, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Lyceum", cost:4, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Miracle Worker", cost:4, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Riot Breaker", cost:4, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Seidr", cost:4, lessIf:-1, onlyIf:9, multiple:false},
		{name:"Specialist", cost:4, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Trusted Companion", cost:4, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"University", cost:4, lessIf:-1, onlyIf:-1, multiple:false},
		{name:"Duelist Academy", cost:5, lessIf:-1, onlyIf:-1, multiple:true},
		{name:"I Won't Die Here", cost:5, lessIf:5, lessCost:3, onlyIf:-1, multiple:false},
		{name:"I'm Taking You With Me", cost:5, lessIf:9, lessCost:3, onlyIf:-1, multiple:false},
		{name:"Joie de Vivre", cost:5, lessIf:6, lessCost:3, onlyIf:-1, multiple:false},
		{name:"Spark of Genius", cost:5, lessIf:4, lessCost:3, onlyIf:-1, multiple:false},
		{name:"Strength of Ten", cost:5, lessIf:8, lessCost:3, onlyIf:-1, multiple:false},
		{name:"The Devil's Own Luck", cost:5, lessIf:0, lessCost:3, onlyIf:-1, multiple:false},
		{name:"Together We Are Strong", cost:5, lessIf:7, lessCost:3, onlyIf:-1, multiple:false},
		{name:"We're Not So Different...", cost:5, lessIf:10, lessCost:3, onlyIf:-1, multiple:false}];
	*/

	window.SEVENTHSEA2 = SEVENTHSEA2;
})();
