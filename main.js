window.onerror = function (message, filename, lineno, colno, error) {
	if (error) {
		error.fileName = error.fileName || filename || null;
		error.lineNumber = error.lineNumber || lineno || null;
		error.columnNumber = error.columnNumber || colno || null;
		console.error(
			'ERROR: ' + message + ' [' + error.toString() + ']\n' +
			'\nName:\t\t' + (error.name || '-') +
			'\nMessage:\t' + (error.message || '-') +
			'\nFile:\t\t\t' + (error.fileName || '-') +
			'\nSource:\t\t' + ((error.toSource && error.toSource()) || '-') +
			'\nLine #:\t\t' + (error.lineNumber || '-') +
			'\nColumn #:\t' + (error.columnNumber || '-') +
			'\n\nStack:\n\n' + (error.stack || '-'));
	} else {
		console.error(
			'ERROR: ' + message + '\n' +
			'\nMessage:\t' + (message || '-') +
			'\nFile:\t\t\t' + (filename || '-') +
			'\nLine #:\t\t' + (lineno || '-') +
			'\nColumn #:\t' + (colno || '-'));
	}
};

var goToPage = function (pageID) {
	$('.page').hide();
	$('#' + pageID).show();
	if (pageID !== 'home') {
		$('#header-back').show();
	} else {
		$('#header-back').hide();
	}
};

$('#header-back').on('click', function () {
	goToPage('home');
});
$('#home-search').on('input', function () {
	var input = $(this).val().trim().toLowerCase();
	$('.list-item').each(function () {
		if (input !== '' && $(this).text().toLowerCase().indexOf(input) === -1) {
			$(this).hide();
		} else {
			$(this).show();
		}
	});
});
$('.list-item').each(function () {
	$(this).on('click', function () {
		goToPage($(this).data('page'));
	});
});

// DICE SIMULATOR

// example: 1d6 = dice(6)
// example: 1rps = dice(['rock', 'paper', 'scissors'])
var dice = function (values) {
	if (values instanceof Array) {
		return values[Math.floor(Math.random() * values.length)];
	} else {
		return Math.floor(Math.random() * values) + 1;
	}
};

// example: dice_expression('3d6+2+45d2')
var dice_expression = function (expression) {
	var result = 'Evaluation Error';
	try {
		result = eval(expression.replace(/[0-9]+d[0-9]+/g, function (a) {
			var tokens = a.split('d'),
				q = parseInt(tokens[0], 10),
				f = parseInt(tokens[1], 10),
				sum = 0;
			for (var i = 0; i < q; ++i) {
				sum += dice(f);
			}
			//console.log(a, q, f, sum);
			return sum;
		}));
	} catch (e) {
		console.error(e);
	}
	return result;
};

$('#generic-dice-classic').on('click', '.button', function () {
	var $this = $(this),
		n = parseInt($this.data('dice'), 10);
	$('#generic-dice-classic-output').text(dice(n));
});
$('#generic-dice-custom-execute').on('click', function () {
	$('#generic-dice-custom-output').text(dice_expression($('#generic-dice-custom-expression').val()));
});

// RANDOM CHARACTER NAME

var RCN = {
	'sotw-human': {
		m: [],
		f: []
	},
	'sotw-elf': {
		m: [],
		f: []
	},
	'sotw-irve': {
		m: [],
		f: []
	},
	'sotw-dwarf': {
		m: [],
		f: []
	},
	'sotw-goblin': {
		m: [],
		f: []
	},
	'sotw-orc': {
		m: [],
		f: []
	},
	'sotw-minotaur': {
		m: [],
		f: []
	},
	'sotw-centaur': {
		m: [],
		f: []
	},
	'sotw-dragonborn': {
		m: [],
		f: []
	},
	'sotw-tiefling': {
		m: [],
		f: []
	}
};

$('#character-name-button').on('click', function () {
	var nameset = $('#character-name-nameset').val(),
		gender = $('#character-name-gender').val();
	if (RCN[nameset] && RCN[nameset][gender] && RCN[nameset][gender].length > 0) {
		var firstname_values = RCN[nameset][gender],
			lastname_values = RCN[nameset][gender + 'l'],
			firstname = firstname_values[Math.floor(Math.random() * firstname_values.length)],
			lastname = lastname_values ? lastname_values[Math.floor(Math.random() * lastname_values.length)] : null;
		$('#character-name-output').text(firstname + (lastname ? lastname : ''));
	} else {
		$('#character-name-output').text('Invalid input');
	}
});

// D&D 5 Combat Encounter XP Thresholds

for (var i = 0; i <= 20; ++i) {
	$('#dnd5-xp .control').append('<option value="' + i + '">' + (i === 0 ? '-' : i) + '</option>');
}

$('#dnd5-xp').on('change', '.control', function () {
	var thresholds = {
		'1': [25, 50, 75, 100],
		'2': [50, 100, 150, 200],
		'3': [75, 150, 225, 400],
		'4': [125, 250, 375, 500],
		'5': [250, 500, 750, 1100],
		'6': [300, 600, 900, 1400],
		'7': [350, 750, 1100, 1700],
		'8': [450, 900, 1400, 2100],
		'9': [550, 1100, 1600, 2400],
		'10': [600, 1200, 1900, 2800],
		'11': [800, 1600, 2400, 3600],
		'12': [1000, 2000, 3000, 4500],
		'13': [1100, 2200, 3400, 5100],
		'14': [1250, 2500, 3800, 5700],
		'15': [1400, 2800, 4300, 6400],
		'16': [1600, 3200, 4800, 7200],
		'17': [2000, 3900, 5900, 8800],
		'18': [2100, 4200, 6300, 9500],
		'19': [2400, 4900, 7300, 10900],
		'20': [2800, 5700, 8500, 12700]
	};
	var easy = 0,
		medium = 0,
		hard = 0,
		lethal = 0;
	[1, 2, 3, 4, 5, 6].forEach(function (id) {
		var level = parseInt($('#dnd5-xp-chlevel' + id).val(), 10);
		if (level > 0) {
			easy += thresholds[level.toString()][0];
			medium += thresholds[level.toString()][1];
			hard += thresholds[level.toString()][2];
			lethal += thresholds[level.toString()][3];
		}
	});
	$('#dnd5-xp-output').text('Easy: ' + easy + ' XP - Medium: ' + medium + ' XP - Hard: ' + hard + ' XP - Lethal: ' + lethal + ' XP');
});

// D&D 5 Combat Encounter XP Budget

var $m_selects = $('#dnd5-encounter-m1-type, #dnd5-encounter-m2-type, #dnd5-encounter-m3-type, #dnd5-encounter-m4-type, #dnd5-encounter-m5-type');
[
	{ label: 'None', value: 0 },
	{ label: 'Challenge 0 (0-10 XP)', value: 10, options: ['Awakened Shrub', 'Baboon', 'Badger', 'Bat', 'Cat', 'Commoner', 'Crab', 'Crawling Claw', 'Deer', 'Eagle', 'Frog', 'Giant Fire Beetle', 'Goat', 'Hawk', 'Homunculus', 'Hyena', 'Jackal', 'Lemure', 'Lizard', 'Myconid Sprout', 'Octopus', 'Owl', 'Quipper', 'Rat', 'Raven', 'Scorpion', 'Sea Horse', 'Shrieker', 'Spider', 'Vulture', 'Weasel'] },
	{ label: 'Challenge 1/8 (25 XP)', value: 25, options: ['Blood Hawk', 'Camel', 'Cultist', 'Flumph', 'Flying Snake', 'Giant Crab', 'Giant Rat', 'Giant Weasel', 'Guard', 'Kobold', 'Manes', 'Mastiff', 'Merfolk', 'Monodrone', 'Mule', 'Noble', 'Poisonous Snake', 'Pony', 'Slaad Tadpole', 'Stirge', 'Tribal Warrior', 'Twig Blight'] },
	{ label: 'Challenge 1/4 (50 XP)', value: 50, options: ['Aarakocra', 'Acolyte', 'Axe Beak', 'Bling Dog', 'Boar', 'Bullywug', 'Constrictor Snake', 'Draft Horse', 'Dretch', 'Drow', 'Duodrone', 'Elk', 'Flying Sword', 'Giant Badger', 'Giant Bat', 'Giant Centipede', 'Giant Frog', 'Giant Lizard', 'Giant Owl', 'Giant Poisonous Snake', 'Giant Wolf Spider', 'Goblin', 'Grimlock', 'Kenku', 'Kuo-Toa', 'Mud Mephit', 'Needle Blight', 'Panther', 'Pixie', 'Pseudodragon', 'Pteranodon', 'Riding Horse', 'Skeleton', 'Smoke Mephit', 'Sprite', 'Steam Mephit', 'Swarm of Bats', 'Swarm of Rats', 'Swarm of Ravens', 'Troglodyte', 'Violet Fungus', 'Winged Kobold', 'Wolf', 'Zombie'] },
	{ label: 'Challenge 1/2 (100 XP)', value: 100, options: ['Ape', 'Black Bear', 'Cockatrice', 'Crocodile', 'Darkmantle', 'Deep Gnome', 'Dust Mephit', 'Gas Spore', 'Giant Goat', 'Giant Sea Horse', 'Giant Wasp', 'Gnoll', 'Gray Ooze', 'Hobgoblin', 'Ice Mephit', 'Jackalwere', 'Lizardfolk', 'Magma Mephit', 'Magmin', 'Myconid Adult', 'Orc', 'Piercer', 'Reef Shark', 'Rust Monster', 'Sahuagin', 'Satyr', 'Scout', 'Shadow', 'Swarm of Insects', 'Thug', 'Tridrone', 'Vine Blight', 'Warhorse', 'Warhorse Skeleton', 'Worg'] },
	{ label: 'Challenge 1 (200 XP)', value: 200, options: ['Animated Armor', 'Brass Dragon Wyrmling', 'Brown Bear', 'Bugbear', 'Copper Dragon Wyrmling', 'Death Dog', 'Dire Wolf', 'Dryad', 'Duergar', 'Faerie Dragon (Young)', 'Fire Snake', 'Ghoul', 'Giant Eagle', 'Giant Hyena', 'Giant Octopus', 'Giant Spider', 'Giant Toad', 'Giant Vulture', 'Goblin Boss', 'Half-Ogre', 'Harpy', 'Hippogriff', 'Imp', 'Huo-Toa Whip', 'Lion', 'Quadrone', 'Quaggoth Spore Sevant', 'Quasit', 'Scarecrow', 'Specter', 'Spy', 'Swarm of Quippers', 'Thri-Kreen', 'Tiger', 'Yuan-Ti Pureblood'] },
	{ label: 'Challenge 2 (450 XP)', value: 450, options: ['Allosaurus', 'Ankheg', 'Awakened Tree', 'Azer', 'Bandit Captain', 'Berserker', 'Black Dragon Wyrmling', 'Bronze Dragon Wyrmling', 'Carrion Crawler', 'Centaur', 'Cult Fanatic', 'Druid', 'Ettercap', 'Faerie Dragon (Old)', 'Gargoyle', 'Gelatinous Cube', 'Ghast', 'Giant Boar', 'Giant Constrictor Snake', 'Giant Elk', 'Gibbering Mouther', 'Githzerai Monk', 'Gnoll Pack Lord', 'Green Dragon Wyrmling', 'Grick', 'Griffon', 'Hunter Shark', 'Intellect Devourer', 'Lizardfolk Shaman', 'Merrow', 'Mimic', 'Minotaur Skeleton', 'Myconid Sovereign', 'Nothic', 'Ochre Jelly', 'Ogre', 'Ogre Zombie', 'Orc Eye of Gruumsh', 'Orog', 'Pegasus', 'Pentadrone', 'Peryton', 'Plesiosaurus', 'Polar Bear', 'Poltergeist (Specter)', 'Priest', 'Quaggoth', 'Rhinoceros', 'Rug of Smothering', 'Saber-toothed Tiger', 'Sahuagin Priestess', 'Sea Hag', 'Silver Dragon Wyrmling', 'Spined Devil', 'Swarm of Poisonous Snakes', 'Wererat', 'White Dragon Wyrmling', 'Will-o\'-wisp'] },
	{ label: 'Challenge 3 (700 XP)', value: 700, options: ['Ankylosaurus', 'Basilisk', 'Bearded Devil', 'Blue Dragon Wyrmling', 'Bugbear Chief', 'Displacer Beast', 'Doppelganger', 'Giant Scorpion', 'Githyanki Warrior', 'Gold Dragon Wyrmling', 'Green Hag', 'Grell', 'Hell Hound', 'Hobgoblin Captain', 'Hook Horror', 'Killer Whale', 'Knight', 'Kuo-Toa Monitor', 'Manticore', 'Minotaur', 'Mummy', 'Nightmare', 'Owlbear', 'Phase Spider', 'Quaggoth Thonot', 'Spectator', 'Veteran', 'Water Weird', 'Werewolf', 'Wight', 'Winter Wolf', 'Yeti Yuan-ti Malison'] },
	{ label: 'Challenge 4 (1100 XP)', value: 1100, options: ['Banshee', 'Black Pudding', 'Bone Naga', 'Chuul', 'Couatl', 'Elephant', 'Ettin', 'Flameskull', 'Ghost', 'Gnoll Fang of Yeenoghu', 'Helmed Horror', 'Incubus', 'Lamia', 'Lizard King/Queen', 'Orc War Chief', 'Red Dragon Wyrmling', 'Sea Hag (in coven)', 'Shadow Demon', 'Succubus', 'Wereboar', 'Weretiger'] },
	{ label: 'Challenge 5 (1800 XP)', value: 1800, options: ['Air Elemental', 'Barbed Devil', 'Barlgura', 'Beholder Zombie', 'Bulette', 'Cambion', 'Drow Elite Warrior', 'Earth Elemental', 'Fire Elemental', 'Flesh Golem', 'Giant Crocodile', 'Giant Shark', 'Gladiator', 'Gorgon', 'Green Hag (in coven)', 'Half-red Dragon Veteran', 'Hill Giant', 'Mezzoloth', 'Night Hag', 'Otyugh', 'Red Slaad', 'Revenant', 'Roper', 'Sahuagin Baron', 'Salamander', 'Shambling Mound', 'Triceratops', 'Troll', 'Umber Hulk', 'Unicorn', 'Vampire Spawn', 'Water Elemental', 'Werebear', 'Wraith', 'Xorn', 'Young Remorhaz'] },
	{ label: 'Challenge 6 (2300 XP)', value: 2300, options: ['Chasme', 'Chimera', 'Cyclops', 'Drider', 'Galeb Dhur', 'Githzerai Zerth', 'Hobgoblin Warlord', 'Invisible Stalker', 'Kuo-Toa Archpriest', 'Mage', 'Mammoth', 'Medusa', 'Vrock', 'Wyvern', 'Young Brass Dragon', 'Young White Dragon'] },
	{ label: 'Challenge 7 (2900 XP)', value: 2900, options: ['Blue Slaad', 'Drow Mage', 'Giant Ape', 'Grick Alpha', 'Mind Flayer', 'Night Hag (in coven)', 'Oni', 'Shield Guardian', 'Stone Giant', 'Young Black Dragon', 'Young Copper Dragon', 'Yuan-ti Abomination'] },
	{ label: 'Challenge 8 (3900 XP)', value: 3900, options: ['Assassin', 'Chain Devil', 'Cloaker', 'Drow Priestess of Lolth', 'Fomorian', 'Frost Giant', 'Githyanki Knight', 'Green Slaad', 'Hezrou', 'Hydra', 'Mind Flayer Arcanist', 'Spirit Naga', 'Tyrannosaurus Rex', 'Young Bronze Dragon', 'Young Green Dragon'] },
	{ label: 'Challenge 9 (5000 XP)', value: 5000, options: ['Abominable Yeti', 'Bone Devil', 'Clay Golem', 'Cloud Giant', 'Fire Giant', 'Glabrezu', 'Gray Slaad', 'Nycaloth', 'Treant', 'Young Blue Dragon', 'Young Silver Dragon'] },
	{ label: 'Challenge 10 (5900 XP)', value: 5900, options: ['Aboleth', 'Death Slaad', 'Deva', 'Guardian Naga', 'Stone Golem', 'Yochlol', 'Young Gold Dragon', 'Young Red Dragon'] },
	{ label: 'Challenge 11 (7200 XP)', value: 7200, options: ['Behir', 'Dao', 'Djinni', 'Efreeti', 'Gynosphinx', 'Horned Devil', 'Marid', 'Remorhaz', 'Roc'] },
	{ label: 'Challenge 12 (8400 XP)', value: 8400, options: ['Arcanaloth', 'Archmage', 'Erinyes'] },
	{ label: 'Challenge 13 (10000 XP)', value: 10000, options: ['Adult Brass Dragon', 'Adult White Dragon', 'Beholder (not in lair)', 'Nalfeshnee', 'Rakshasa', 'Storm Giant', 'Ultroloth', 'Vampire', 'Young Red Shadow Dragon'] },
	{ label: 'Challenge 14 (11500 XP)', value: 11500, options: ['Adult Black Dragon', 'Adult Copper Dragon', 'Beholder (in lair)', 'Death Tyrant (not in lair)', 'Ice Devil'] },
	{ label: 'Challenge 15 (13000 XP)', value: 13000, options: ['Adult Bronze Dragon', 'Adult Green Dragon', 'Death Tyrant (in lair)', 'Mummy Lord (not in lair)', 'Purple Worm', 'Vampire (Spellcaster)', 'Vampire (Warrior)'] },
	{ label: 'Challenge 16 (15000 XP)', value: 15000, options: ['Adult Blue Dragon', 'Adult Silver Dragon', 'Iron Golem', 'Marilith', 'Mummy Lord (in lair)', 'Planetar'] },
	{ label: 'Challenge 17 (18000 XP)', value: 18000, options: ['Adult Blue Dracolich', 'Adult Gold Dragon', 'Adult Red Dragon', 'Androsphinx', 'Death Knight', 'Dragon Turtle', 'Goristro'] },
	{ label: 'Challenge 18 (20000 XP)', value: 20000, options: ['Demilich (not in lair)'] },
	{ label: 'Challenge 19 (22000 XP)', value: 22000, options: ['Balor'] },
	{ label: 'Challenge 20 (25000 XP)', value: 25000, options: ['Ancient Brass Dragon', 'Ancient White Dragon', 'Demilich (in lair)', 'Pit Fiend'] },
	{ label: 'Challenge 21 (33000 XP)', value: 33000, options: ['Ancient Black Dragon', 'Ancient Copper Dragon', 'Lich (not in lair)', 'Solar'] },
	{ label: 'Challenge 22 (41000 XP)', value: 41000, options: ['Ancient Bronze Dragon', 'Ancient Green Dragon', 'Lich (in lair)'] },
	{ label: 'Challenge 23 (50000 XP)', value: 50000, options: ['Ancient Blue Dragon', 'Ancient Silver Dragon', 'Empyrean', 'Kraken'] },
	{ label: 'Challenge 24 (62000 XP)', value: 62000, options: ['Ancient Gold Dragon', 'Ancient Red Dragon'] },
	{ label: 'Challenge 30 (155000 XP)', value: 155000, options: ['Tarrasque'] }
].forEach(function (item) {
	if (!item.options) {
		$m_selects.append('<option value="' + item.value + '">' + item.label + '</option>');
	} else {
		var $optgroup = $('<optgroup label="' + item.label + '"></optgroup>');
		item.options.sort().forEach(function (option) {
			$optgroup.append('<option value="' + item.value + '">' + option + '</option>');
		});
		$m_selects.append($optgroup);
	}
});

$('#dnd5-encounter').on('change', '.control', function () {
	var characters = $('#dnd5-encounter-characters').val(),
		budget = parseInt($('#dnd5-encounter-budget').val(), 10),
		output_number = 0,
		output_xp = 0;
	['m1', 'm2', 'm3', 'm4', 'm5'].forEach(function (item) {
		var number = parseInt($('#dnd5-encounter-' + item + '-number').val(), 10),
			type = parseInt($('#dnd5-encounter-' + item + '-type').val(), 10);
		if (type !== 0) {
			output_number += number;
			output_xp += number * type;
		}
	});
	var multiplier = 1;
	if (characters === '1-2') {
		if (output_number === 1) {
			multiplier = 1.5;
		} else if (output_number === 2) {
			multiplier = 2;
		} else if (output_number >= 3 && output_number <= 6) {
			multiplier = 2.5;
		} else if (output_number >= 7 && output_number <= 10) {
			multiplier = 3;
		} else if (output_number >= 11) {
			multiplier = 4;
		}
	} else if (characters === '3-4-5') {
		if (output_number === 1) {
			multiplier = 1;
		} else if (output_number === 2) {
			multiplier = 1.5;
		} else if (output_number >= 3 && output_number <= 6) {
			multiplier = 2;
		} else if (output_number >= 7 && output_number <= 10) {
			multiplier = 2.5;
		} else if (output_number >= 11 && output_number <= 14) {
			multiplier = 3;
		} else if (output_number >= 15) {
			multiplier = 4;
		}
	} else if (characters === '6+') {
		if (output_number === 1) {
			multiplier = 0.5;
		} else if (output_number === 2) {
			multiplier = 1;
		} else if (output_number >= 3 && output_number <= 6) {
			multiplier = 1.5;
		} else if (output_number >= 7 && output_number <= 10) {
			multiplier = 2;
		} else if (output_number >= 11 && output_number <= 14) {
			multiplier = 2.5;
		} else if (output_number >= 15) {
			multiplier = 3;
		}
	}
	var output_xp_multiplier = output_xp * multiplier;
	$('#dnd5-encounter-output').text(output_xp + ' XP' + (output_xp_multiplier !== output_xp ? ' (' + output_xp_multiplier + ' XP after multiplier)' : '')).css({ color: output_xp_multiplier > budget ? 'crimson' : '' });
});
