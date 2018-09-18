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
	"sotw-human": {
		"m": ["Tashbaan"],
		"f": ["Anna", "Elsa", "Laura", "Vanessa", "Sandra", "Francesca", "Eleonora", "Anastasia", "Angela", "Diana"]
	},
	"sotw-gnome": {
		"m": [],
		"f": ["Zoe", "Leah", "Jade", "Mara", "Dara", "Amalia", "Kate", "Corinne", "Talullah"]
	},
	"sotw-dwarf": {
		"m": [],
		"f": ["Hilde", "Hilda"]
	},
	"sotw-elf": {
		"m": [],
		"f": ["Nissa", "Angelina", "Eva", "Masha", "Irina", "Katya", "Liliya"]
	},
	"sotw-woodelf": {
		"m": [],
		"f": ["Lesya", "Maha", "Anfisa", "Esfir", "Manya", "Agafya", "Alyona"]
	},
	"sotw-irve": {
		"m": [],
		"f": ["Sila", "Siri", "Gala", "Inna", "Krina", "Luba"]
	},
	"sotw-goblin": {
		"m": ["Lugdash"],
		"f": []
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
	$('#dnd5-xp-chlevel1, #dnd5-xp-chlevel2, #dnd5-xp-chlevel3, #dnd5-xp-chlevel4, #dnd5-xp-chlevel5, #dnd5-xp-chlevel6').append('<option value="' + i + '">' + (i === 0 ? '-' : i) + '</option>');
}

$('#dnd5-xp-chlevel1, #dnd5-xp-chlevel2, #dnd5-xp-chlevel3, #dnd5-xp-chlevel4, #dnd5-xp-chlevel5, #dnd5-xp-chlevel6').on('change', function () {
	var thresholds = {
		"1": [25, 50, 75, 100],
		"2": [50, 100, 150, 200],
		"3": [75, 150, 225, 400],
		"4": [125, 250, 375, 500],
		"5": [250, 500, 750, 1100],
		"6": [300, 600, 900, 1400],
		"7": [350, 750, 1100, 1700],
		"8": [450, 900, 1400, 2100],
		"9": [550, 1100, 1600, 2400],
		"10": [600, 1200, 1900, 2800],
		"11": [800, 1600, 2400, 3600],
		"12": [1000, 2000, 3000, 4500],
		"13": [1100, 2200, 3400, 5100],
		"14": [1250, 2500, 3800, 5700],
		"15": [1400, 2800, 4300, 6400],
		"16": [1600, 3200, 4800, 7200],
		"17": [2000, 3900, 5900, 8800],
		"18": [2100, 4200, 6300, 9500],
		"19": [2400, 4900, 7300, 10900],
		"20": [2800, 5700, 8500, 12700]
	};
	var chlevel1 = parseInt($('#dnd5-xp-chlevel1').val(), 10),
		chlevel2 = parseInt($('#dnd5-xp-chlevel2').val(), 10),
		chlevel3 = parseInt($('#dnd5-xp-chlevel3').val(), 10),
		chlevel4 = parseInt($('#dnd5-xp-chlevel4').val(), 10),
		chlevel5 = parseInt($('#dnd5-xp-chlevel5').val(), 10),
		chlevel6 = parseInt($('#dnd5-xp-chlevel6').val(), 10),
		easy = 0,
		medium = 0,
		hard = 0,
		lethal = 0;
	[chlevel1, chlevel2, chlevel3, chlevel4, chlevel5, chlevel6].forEach(function (level) {
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
	{ label: 'Challenge 1 (200 XP)', value: 200, options: ['Animated Armor', 'Brass Dragon Wyrmling', 'Brown Bear', 'Bugbear', 'Copper Dragon Wyrmling', 'Death Dog', 'Dire Wolf', 'Dryad', 'Duergar', 'Faerie Dragon (Young)', 'Fire Snake', 'Ghoul', 'Giant Eagle', 'Giant Hyena', 'Giant Octopus', 'Giant Spider', 'Giant Toad', 'Giant Vulture', 'Goblin Boss', 'Half-Ogre', 'Harpy', 'Hippogriff', 'Imp', 'Huo-Toa Whip', 'Lion', 'Quadrone', 'Quaggoth Spore Sevant', 'Quasit', 'Scarecrow', 'Specter', 'Spy', 'Swarm of Quippers', 'Thri-Kreen', 'Tiger', 'Yuan-Ti Pureblood'] }
].forEach(function (item) {
	if (!item.options) {
		$m_selects.append('<option value="' + item.value + '">' + item.label + '</option>');
	} else {
		var $optgroup = $('<optgroup label="' + item.label + '"></optgroup>');
		item.options.forEach(function (option) {
			$optgroup.append('<option value="' + item.value + '">' + option + '</option>');
		});
		$m_selects.append($optgroup);
	}
});

$('#dnd5-encounter-m1-type, #dnd5-encounter-m2-type, #dnd5-encounter-m3-type, #dnd5-encounter-m4-type, #dnd5-encounter-m5-type').on('change', function () {
	var characters = $('#dnd5-encounter-characters').val(),
		budget = parseInt($('#dnd5-encounter-budget').val(), 10),
		output_number
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
