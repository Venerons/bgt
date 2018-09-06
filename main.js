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
