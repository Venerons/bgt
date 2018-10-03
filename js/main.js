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
$('#header-info').on('click', function () {
	goToPage('info');
});
$('#home-search').on('input', function () {
	var input = $(this).val().trim().toLowerCase();
	$('#home-list').find('.list-item').each(function () {
		var $this = $(this);
		if (input !== '' && $this.text().toLowerCase().indexOf(input) === -1) {
			$this.hide();
		} else {
			$this.show();
		}
	});
});
$('#home-list').on('click', '.list-item', function () {
	goToPage($(this).data('page'));
});

// Generic Dice Simulator

(function () {
	'use strict';

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
})();

// Generic Random Character Name

(function () {
	'use strict';

	var RCN = {
		'dnd-human': {
			m: ['Alain', 'Alek', 'Benn', 'Brandis', 'Donn', 'Drew', 'Erik', 'Gregg', 'Jonn', 'Kris', 'Marc', 'Mikal', 'Pieter', 'Regdar', 'Quinn', 'Samm', 'Thom', 'Wil'],
			f: ['Ana', 'Cassi', 'Eliza', 'Gwenn', 'Jenn', 'Kat', 'Keira', 'Luusi', 'Mari', 'Mika', 'Miri', 'Stasi', 'Shawna', 'Zanne']
		},
		'dnd-human-calishite': {
			m: ['Aseir', 'Bardeid', 'Haseid', 'Khemed', 'Mehmen', 'Sudeiman', 'Zasheir'],
			f: ['Atala', 'Ceidil', 'Hama', 'Jasmal', 'Meilil', 'Seipora', 'Yasheira', 'Zasheida'],
			c: ['Basha', 'Dumein', 'Jassan', 'Khalid', 'Mostana', 'Pashar', 'Rein']
		},
		'dnd-human-chondathan': {
			m: ['Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm', 'Malark', 'Morn', 'Randal', 'Stedd'],
			f: ['Arveene', 'Esvele', 'Jhessail', 'Kerri', 'Lureene', 'Miri', 'Rowan', 'Shandri', 'Tessele'],
			c: ['Amblecrown', 'Buckman', 'Dundragon', 'Evenwood', 'Greycastle', 'Tallstag']
		},
		'dnd-human-damaran': {
			m: ['Bor', 'Fodel', 'Glar', 'Grigor', 'Igan', 'Ivor', 'Kosef', 'Mival', 'Orel', 'Pavel', 'Sergor'],
			f: ['Alethra', 'Kara', 'Katernin', 'Mara', 'Natali', 'Olma', 'Tana', 'Zora'],
			c: ['Bersk', 'Chernin', 'Dotsk', 'Kulenov', 'Marsk', 'Nemetsk', 'Shemov', 'Starag']
		},
		'dnd-human-illuskan': {
			m: ['Ander', 'Blath', 'Bran', 'Frath', 'Geth', 'Lander', 'Luth', 'Malcer', 'Stor', 'Taman', 'Urth'],
			f: ['Amafrey', 'Betha', 'Cefrey', 'Kethra', 'Mara', 'Olga', 'Silifrey', 'Westra'],
			c: ['Brightwood', 'Helder', 'Hornraven', 'Lackman', 'Stormwind', 'Windrivver']
		},
		'dnd-human-mulan': {
			m: ['Aoth', 'Bareris', 'Ehput-Ki', 'Kethoth', 'Mumed', 'Ramas', 'So-Kehur', 'Thazar-De', 'Urhur'],
			f: ['Arizima', 'Chathi', 'Nephis', 'Nulara', 'Murithi', 'Sefris', 'Thola', 'Umara', 'Zolis'],
			c: ['Ankhalab', 'Anskuld', 'Fezim', 'Hahpet', 'Nathandem', 'Sepret', 'Uuthrakt']
		},
		'dnd-human-rashemi': {
			m: ['Borivik', 'Faurgar', 'Jandar', 'Kanithar', 'Madislak', 'Ralmevik', 'Shaumar', 'Vladislak'],
			f: ['Fyevarra', 'Hulmarra', 'Immith', 'Imzel', 'Navarra', 'Shevarra', 'Tammith', 'Yuldra'],
			c: ['Chergoba', 'Dyernina', 'Iltazyara', 'Murnyethara', 'Stayanoga', 'Ulmokina']
		},
		'dnd-human-shou': {
			m: ['An', 'Chen', 'Chi', 'Fai', 'Jiang', 'Jun', 'Lian', 'Long', 'Meng', 'On', 'Shan', 'Shui', 'Wen'],
			f: ['Bai', 'Chao', 'Jia', 'Lei', 'Mei', 'Qiao', 'Shui', 'Tai'],
			c: ['Chien', 'Huang', 'Kao', 'Kung', 'Lao', 'Ling', 'Mei', 'Pin', 'Shin', 'Sum', 'Tan', 'Wan']
		},
		'dnd-human-turami': {
			m: ['Anton', 'Diero', 'Marcon', 'Pieron', 'Rimardo', 'Romero', 'Salazar', 'Umbero'],
			f: ['Balama', 'Dona', 'Faila', 'Jalana', 'Luisa', 'Marta', 'Quara', 'Selise', 'Vonda'],
			c: ['Agosto', 'Astorio', 'Calabra', 'Domine', 'Falone', 'Marivaldi', 'Pisacar', 'Ramondo']
		},
		'dnd-elf': {
			child: ['Ara', 'Bryn', 'Del', 'Eryn', 'Faen', 'Innil', 'Lael', 'Mella', 'Naill', 'Naeris', 'Phann', 'Rael', 'Rinn', 'Sai', 'Syllin', 'Thia', 'Vall'],
			m: ['Adran', 'Aelar', 'Aramil', 'Arannis', 'Aus', 'Beiro', 'Berrian', 'Carric', 'Dayereth', 'Enialis', 'Erdan', 'Erevan', 'Galinndan', 'Gennal', 'Hadarai', 'Heian', 'Himo', 'Immeral', 'Ivellios', 'Laucian', 'Mindartis', 'Paelias', 'Peren', 'Quarion', 'Riardon', 'Rolen', 'Soveliss', 'Thamior', 'Tharivol', 'Theren', 'Varis'],
			f: ['Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Bethrynna', 'Birel', 'Caelynn', 'Chaedi', 'Dara', 'Drusilia', 'Enna', 'Faral', 'Felosial', 'Irann', 'Ielenia', 'Jelenneth', 'Keyleth', 'Leshanna', 'Lia', 'Meriele', 'Mialee', 'Naivara', 'Quelenna', 'Quillathe', 'Sariel', 'Shanairra', 'Shava', 'Silaqui', 'Theirastra', 'Thia', 'Vadania', 'Valanthe', 'Valenae', 'Valna', 'Xanaphia'],
			c: ['Amakiir (Gemflower)', 'Amastacia (Starflower)', 'Galanodel (Moonwhisper)', 'Holimion (Diamonddew)', 'Ilphelkiir (Gemblossom)', 'Liadon (Silverfrond)', 'Meliamne (Oakenheel)', 'Nailo (Nightbreeze)', 'Siannodel (Moonbrook)', 'Xiloscient (Goldpetal)']
		},
		'dnd-dwarf': {
			m: ['Adrik', 'Alberich', 'Baern', 'Berend', 'Barendd', 'Brottor', 'Bruenor', 'Dain', 'Darrak', 'Delg', 'Eberk', 'Einkil', 'Fargrim', 'Flint', 'Gardain', 'Harbek', 'Kildrak', 'Morgran', 'Orsik', 'Oskar', 'Rangrim', 'Rurik', 'Taklinn', 'Thoradin', 'Thorfin', 'Thorin', 'Tordek', 'Traubon', 'Travok', 'Ulfgar', 'Veit', 'Vondal'],
			f: ['Amber', 'Artin', 'Audhil', 'Bardryn', 'Dagnal', 'Diesa', 'Eldeth', 'Falkrunn', 'Finellen', 'Gunnloda', 'Gurdis', 'Helja', 'Hlin', 'Kathra', 'Kristryd', 'Ilde', 'Liftrasa', 'Mardred', 'Riswynn', 'Sannl', 'Torbera', 'Torgga', 'Vistra'],
			c: ['Balderk', 'Battlehammer', 'Brawnanvil', 'Dankil', 'Fireforge', 'Frostbeard', 'Gorunn', 'Holderhek', 'Ironfist', 'Loderr', 'Lutgehr', 'Rumnaheim', 'Strakeln', 'Torunn', 'Ungart']
		},
		'dnd-halfling': {
			m: ['Alton', 'Ander', 'Cade', 'Corrin', 'Dannad', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lazam', 'Lindal', 'Lyle', 'Merric', 'Milo', 'Nebin', 'Ostran', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Shardon', 'Ulmo', 'Wenner', 'Wellby'],
			f: ['Andry', 'Bree', 'Callie', 'Chenna', 'Cora', 'Eida', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Lidda', 'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Tryn', 'Vani', 'Verna', 'Wella'],
			c: ['Brushgather', 'Goodbarrel', 'Greenbottle', 'High-hill', 'Hilltopple', 'Leagallow', 'Tealeaf', 'Thorngage', 'Tosscobble', 'Underbough']
		},
		'dnd-gnome': {
			nickname: ['Aleslosh', 'Ashhearth', 'Badger', 'Cloak', 'Doublelock', 'Filchbatter', 'Fnipper', 'Ku', 'Nim', 'Oneshoe', 'Pock', 'Sparklegem', 'Stumbleduck'],
			m: ['Alston', 'Alvyn', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon', 'Erky', 'Fonkin', 'Frug', 'Gerbo', 'Gimble', 'Glim', 'Jebeddo', 'Kellen', 'Namfoodle', 'Orryn', 'Roondar', 'Seebo', 'Sindri', 'Warryn', 'Wrenn', 'Zook'],
			f: ['Bimpnottin', 'Breena', 'Caramip', 'Carlin', 'Donella', 'Duvamil', 'Ella', 'Ellyjobell', 'Ellywick', 'Lilli', 'Loopmottin', 'Lorilla', 'Mardnab', 'Nissa', 'Nyx', 'Oda', 'Orla', 'Roywyn', 'Shamil', 'Tana', 'Waywocket', 'Zanna'],
			c: ['Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig', 'Ningel', 'Raulnor', 'Scheppen', 'Timbers', 'Turen']
		},
		'dnd-half-orc': {
			m: ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront', 'Shump', 'Thokk'],
			f: ['Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Sutha', 'Vola', 'Volen', 'Yevelda']
		},
		'dnd-dragonborn': {
			child: ['Climber', 'Earbender', 'Leaper', 'Pious', 'Shieldbiter', 'Zealous'],
			m: ['Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan', 'Kriv', 'Medrash', 'Mehen', 'Nadarr', 'Pandjed', 'Patrin', 'Rhogar', 'Shamash', 'Shedinn', 'Tarhun', 'Torinn'],
			f: ['Akra', 'Biri', 'Daar', 'Farideh', 'Harann', 'Flavilar', 'Jheri', 'Kava', 'Korinn', 'Mishann', 'Nala', 'Perra', 'Raiann', 'Sora', 'Surina', 'Thava', 'Uadjit'],
			c: ['Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Drachedandion', 'Fenkenkabradon', 'Kepeshkmolik', 'Kerrhylon', 'Kimbatuul', 'Linxakasendalor', 'Myastan', 'Nemmonis', 'Norixius', 'Ophinshtalajiir', 'Prexijandilin', 'Shestendeliath', 'Turnuroth', 'Verthisathurgiesh', 'Yarjerit']
		},
		'dnd-tiefling': {
			virtue: ['Art', 'Carrion', 'Chant', 'Creed', 'Despair', 'Excellence', 'Fear', 'Glory', 'Hope', 'Ideal', 'Music', 'Nowhere', 'Open', 'Poetry', 'Quest', 'Random', 'Reverence', 'Sorrow', 'Temerity', 'Torment', 'Weary'],
			m: ['Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados', 'Kairon', 'Leucis', 'Melech', 'Mordai', 'Morthos', 'Pelaios', 'Skamos', 'Therai'],
			f: ['Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea', 'Kallista', 'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia', 'Rieta']
		},
		'7thsea-avalon': {
			m: ['Aidan', 'Alan', 'Bran', 'Dwyer', 'Edward', 'Finn', 'Harold', 'Jerome', 'Keith', 'Liam', 'Luke', 'Malcolm', 'Michael', 'Morgan', 'Ossian', 'Quinn', 'Richard', 'Shawn', 'Thomas', 'Walter'],
			f: ['Aileen', 'Alison', 'Bridgit', 'Caroline', 'Denise', 'Elaine', 'Grace', 'Helen', 'Jane', 'Karen', 'Leila', 'Maeve', 'Mary', 'Pamela', 'Sabbina', 'Sybil', 'Teresa', 'Veronica']
		},
		'7thsea-inismore': {
			m: ['Abbán', 'Ádhamh', 'Aidan', 'Barrfind', 'Barrie', 'Brady', 'Carey', 'Ceallach', 'Donagh', 'Dónal', 'Dubhán', 'Enda', 'Ennis', 'Finn', 'Keelan', 'Lochlainn', 'Mannix', 'Riordan', 'Séaghdha', 'Teige', 'Torin', 'Uilleag'],
			f: ['Aideen', 'Aignéis', 'Bébhinn', 'Blaind', 'Brígh', 'Catlín', 'Clodagh', 'Dáríne', 'Deirdre', 'Éabha', 'Eavan', 'Ena', 'Fionnuala', 'Gobnait', 'Íde', 'Keelan', 'Léan', 'Maeve', 'Máirín', 'Mór', 'Neassa', 'Nóra', 'Órlaith', 'Siobhán']
		},
		'7thsea-the-highland-marches': {
			m: ['Aonghas', 'Aodhagán', 'Beathan', 'Blair', 'Cailean', 'Cairbre', 'Carson', 'Colin', 'Dugald', 'Ealair', 'Eoghan', 'Ewen', 'Fearchar', 'Fingall', 'Goraidh', 'Grier', 'Hamish', 'Kerr', 'Seumas', 'Sláine', 'Tam'],
			f: ['Aileen', 'Ailsa', 'Beileag', 'Blair', 'Caoimhe', 'Deóiridh', 'Ealasaid', 'Eimhir', 'Eithne', 'Fionnuala', 'Gormlaith', 'Isla', 'Lachina', 'Lilias', 'Máiri', 'Oighrig', 'Seona', 'Sheona', 'Síleas', 'Teárlag', 'Úna']
		},
		'7thsea-castille': {
			m: ['Alonso', 'Andrés', 'Baltasar', 'Benito', 'Carlos', 'Diego', 'Domingo', 'Esteban', 'Felipe', 'Gaspar', 'Héctor', 'Jaime', 'Juan', 'Lucas', 'Miguel', 'Rodrigo', 'Sancho', 'Sebastián', 'Tomás'],
			f: ['Andrea', 'Ángela', 'Beatriz', 'Catalina', 'Clara', 'Constantina', 'Cristina', 'Floriana', 'Francisca', 'Inés', 'Isabel', 'Juliana', 'Lucía', 'Luisa', 'María', 'Quiteria', 'Sancha', 'Susana', 'Úrsula', 'Yolanda']
		},
		'7thsea-eisen': {
			m: ['Adrian', 'Bernhard', 'Dirk', 'Erich', 'Gustav', 'Hans', 'Josef', 'Kurt', 'Lorenz', 'Max', 'Oliver', 'Philip', 'Reinhard', 'Rolf', 'Stefan', 'Volker', 'Wenzel', 'Willi', 'Xaver'],
			f: ['Anna', 'Cordula', 'Cornelia', 'Dora', 'Eva', 'Gabriele', 'Ingrid', 'Janina', 'Kirstin', 'Lena', 'Margrit', 'Mona', 'Nina', 'Ruth', 'Sigrid', 'Silvia', 'Tina', 'Ursula']
		},
		'7thsea-montaigne': {
			m: ['Ambroise', 'Blaise', 'Cédric', 'Daniel', 'Denis', 'Eugène', 'Félix', 'Gérard', 'Guy', 'Henri', 'Jacques', 'Jules', 'Luc', 'Marc', 'Martin', 'Pierre', 'Rémy', 'Sébastien', 'Victor', 'Zacharie'],
			f: ['Allette', 'Andrée', 'Arielle', 'Blanche', 'Camille', 'Cosette', 'Dominique', 'Estelle', 'Francine', 'Georgette', 'Henriette', 'Irène', 'Julie', 'Lydie', 'Nicole', 'Philippine', 'Roseline', 'Sylvie', 'Vivianne']
		},
		'7thsea-the-sarmatian-commonwealth': {
			m: ['Andrzej', 'Bartłomiej', 'Dawid', 'Gaweł', 'Ignacy', 'Jarosław', 'Lesław', 'Maciej', 'Przemysław', 'Roch', 'Zygmunt', 'Bronius', 'Darijus', 'Erikas', 'Herkus', 'Ignas', 'Jurgis', 'Kasparas', 'Mykolas', 'Nojus', 'Petras', 'Pilypas', 'Žydrūnas'],
			f: ['Adelajda', 'Czesława', 'Dorota', 'Eligia', 'Gracja', 'Hanna', 'Ignacja', 'Janina', 'Józefa', 'Mirosława', 'Urszula', 'Zyta', 'Agnė', 'Danutė', 'Emilija', 'Estera', 'Gabija', 'Jelena', 'Kamilė', 'Katrė', 'Laima', 'Lėja', 'Lilija', 'Svajonė', 'Ugnė', 'Viltautė']
		},
		'7thsea-ussura': {
			m: ['Aleksei', 'Alexandr', 'Boris', 'Dimitri', 'Danil', 'Erema', 'Fyodor', 'Georgi', 'Ignati', 'Ilya', 'Kiril', 'Mikhail', 'Nikita', 'Pyotyr', 'Sergei', 'Taras', 'Timofey', 'Vasily', 'Vladimir', 'Yevgeni'],
			f: ['Agafya', 'Anna', 'Avdotia', 'Darya', 'Ekaterina', 'Elizaveta', 'Galina', 'Irina', 'Ksenya', 'Larisa', 'Ludmila', 'Lyuba', 'Marya', 'Nina', 'Natalya', 'Natasha', 'Nastasya', 'Olga', 'Sofia', 'Tamara', 'Yelena', 'Yevpraskia', 'Zhanna']
		},
		'7thsea-vestenmennavenjar': {
			m: ['Alfgeir', 'Bragi', 'Brøn', 'Eldgrim', 'Gellir', 'Hägin', 'Hallbjørn', 'Hrafn', 'Jön', 'Ketil', 'Magnus', 'Olväld', 'Reinn', 'Serk', 'Sigurd', 'Solmünd', 'Thørfinn', 'Thrand', 'Ulf', 'Velëif'],
			f: ['Asgerd', 'Asny', 'Bera', 'Dalla', 'Grøa', 'Gudrid', 'Hrafnhild', 'Ingibjørg', 'Jofrid', 'Kadlin', 'Ljüfa', 'Osk', 'Rannvëig', 'Sæun', 'Sigrid', 'Thørhild', 'Ulfeid', 'Vigdis', 'Yngvild', 'Yr']
		},
		'7thsea-vodacce': {
			m: ['Alberto', 'Antonio', 'Carlo', 'Ernesto', 'Felice', 'Fortunato', 'Gianni', 'Giuseppe', 'Leon', 'Marco', 'Modesto', 'Pietro', 'Rinaldo', 'Rolando', 'Savino', 'Siro', 'Timeo', 'Toni', 'Umberto', 'Vito'],
			f: ['Alessia', 'Angelina', 'Clarissa', 'Crescenza', 'Elena', 'Fiora', 'Iolanda', 'Lea', 'Luisa', 'Miranda', 'Natalia', 'Paola', 'Penelope', 'Rachele', 'Rebecca', 'Regina', 'Sandra', 'Valeria', 'Veronica', 'Viola']
		},
		'7thsea-numa': {
			m: ['Acacius', 'Agapetus', 'Andreas', 'Basilius', 'Chares', 'Dareios', 'Epapharas', 'Heliodoros', 'Hyakinthos', 'Kleisthenes', 'Leontinus', 'Markus', 'Melanthios', 'Nicanor', 'Nikostratos', 'Paramonos', 'Phaedrus', 'Paton', 'Polykarpos', 'Solon', 'Sophos', 'Teocritus', 'Teodosius', 'Timo', 'Zeno'],
			f: ['Agape', 'Agathe', 'Ambrosia', 'Berenike', 'Charis', 'Corinna', 'Demeter', 'Elpis', 'Euthalia', 'Galene', 'Helene', 'Isidora', 'Kallisto', 'Ligeia', 'Lysandra', 'Lysistrata', 'Metrodora', 'Myrrine', 'Pelagia', 'Pherenike', 'Phile', 'Phoibe', 'Sappho', 'Sophia', 'Sostrate', 'Teodora', 'Teodosia', 'Tryphaina', 'Xanthe', 'Zenais']
		},
		'7thsea-rahuri': {
			m: ['Abey', 'Ameyro', 'Arieto', 'Aymaco', 'Batea', 'Cacimar', 'Colibri', 'Comerio', 'Guey', 'Juracan', 'Kaiman', 'Liren', 'Loquillo', 'Maboyas', 'Mucaro', 'Nasa', 'Ralay', 'Tabonuco', 'Yabisi', 'Yacahu'],
			f: ['Ana', 'Acindina', 'Anacaona', 'Aji', 'Aramana', 'Ayiti', 'Cajaya', 'Casguaya', 'Guama', 'Jadzia', 'Kakata', 'Karaya', 'Liani', 'Mayneri', 'Nimita', 'Tinima', 'Tonina', 'Xiomara', 'Yari', 'Zemi']
		},
		'7thsea-jaragua': {
			m: ['Adisa', 'Bamidele', 'Chukwuemeka', 'Dzigbode', 'Emeka', 'Fela', 'Gaddo', 'Hogan', 'Ikenna', 'Jawara', 'Kof', 'Lanre', 'Mamadou', 'Nnamdi', 'Okoro', 'Qwao', 'Senghor', 'Tomi', 'Uzochi', 'Yohance', 'Zebenjo'],
			f: ['Akosua', 'Bosede', 'Chidimma', 'Dada', 'Ebele', 'Funanya', 'Gbemisola', 'Ige', 'Kunto', 'Lumusi', 'Mojisola', 'Nkiruka', 'Oni', 'Simisola', 'Thema', 'Urbi', 'Zinsa'],
			neutral: ['Ayo', 'Baako', 'Chi', 'Dubaku', 'Ekundayo', 'Folami', 'Gameli', 'Hauhouot', 'Ime', 'Kayin', 'Lebene', 'Makafui', 'Ngozi', 'Opeyemi', 'Pereko', 'Quaco', 'Senyo', 'Temitope', 'Uzoma', 'Xoese', 'Yayra']
		}
	};

	$('#generic-name-button').on('click', function () {
		var nameset = $('#generic-name-nameset').val(),
			gender = $('#generic-name-gender').val(),
			set = RCN[nameset];
		if (set && set[gender]) {
			var output = set[gender][Math.floor(Math.random() * set[gender].length)];
			if (set.c) {
				output += ' ' + set.c[Math.floor(Math.random() * set.c.length)];
			}
			$('#generic-name-output').text(output);
		} else {
			$('#generic-name-output').text('Invalid input');
		}
	});
})();

// Generic Dungeon Designer

(function () {
	'use strict';

	var map_tilesize = parseInt($('#generic-dungeondesigner-size').val(), 10),
		map_tilewidth = parseInt($('#generic-dungeondesigner-width').val(), 10),
		map_tileheight = parseInt($('#generic-dungeondesigner-height').val(), 10),
		rows = [];
	for (var i = 0; i < map_tileheight; ++i) {
		var row = [];
		for (var j = 0; j < map_tilewidth; ++j) {
			row.push(0);
		}
		rows.push(row);
	}

	$('#generic-dungeondesigner').on('input change', '.control', function () {
		map_tilesize = parseInt($('#generic-dungeondesigner-size').val(), 10);
		map_tilewidth = parseInt($('#generic-dungeondesigner-width').val(), 10);
		map_tileheight = parseInt($('#generic-dungeondesigner-height').val(), 10);
		rows = [];
		for (var i = 0; i < map_tileheight; ++i) {
			var row = [];
			for (var j = 0; j < map_tilewidth; ++j) {
				row.push(0);
			}
			rows.push(row);
		}
	});

	var paper = new Palette('generic-dungeondesigner-canvas');
	var repaint = function (skip_grid) {
		paper.size(map_tilesize * map_tilewidth, map_tilesize * map_tileheight);
		paper.clear();
		paper.rect({ x: 0, y: 0, width: map_tilesize * map_tilewidth, height: map_tilesize * map_tileheight,  fill: '#ebd5b3' }); // #f6daaf
		rows.forEach(function (row, y) {
			row.forEach(function (content, x) {
				if (!skip_grid) {
					paper.rect({ x: x * map_tilesize, y: y * map_tilesize, width: map_tilesize, height: map_tilesize, stroke: '#000000', thickness: 1 });
				}
				if (content === 1) {
					paper.rect({ x: x * map_tilesize, y: y * map_tilesize, width: map_tilesize, height: map_tilesize, fill: '#ffe7d5', stroke: '#000000', thickness: 1 });
				}
			});
		});
	};
	repaint();

	// TODO read https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas

	var canvas = document.getElementById('generic-dungeondesigner-canvas'),
		canvas_mousedown = false,
		canvas_button = 0;
	canvas.addEventListener('contextmenu', function (e) { e.preventDefault() });
	/*
	canvas.addEventListener('mouseenter', function (e) {
		// nothing
	});
	canvas.addEventListener('mouseover', function (e) {
		// nothing
	});
	*/
	canvas.addEventListener('mousedown', function (e) {
		canvas_mousedown = true;
		canvas_button = e.button;
		var x = Math.floor((e.pageX - this.offsetLeft) / map_tilesize),
			y = Math.floor((e.pageY - this.offsetTop) / map_tilesize);
		if (canvas_button === 0) {
			rows[y][x] = 1;
		} else {
			rows[y][x] = 0;
		}
		repaint();
	});
	canvas.addEventListener('mouseup', function (e) {
		canvas_mousedown = false;
	});
	canvas.addEventListener('mousemove', function (e) {
		if (canvas_mousedown) {
			var x = Math.floor((e.pageX - this.offsetLeft) / map_tilesize),
				y = Math.floor((e.pageY - this.offsetTop) / map_tilesize);
			if (canvas_button === 0) {
				rows[y][x] = 1;
			} else {
				rows[y][x] = 0;
			}
			repaint();
		}
	});
	canvas.addEventListener('mouseleave', function () {
		mousedown = false;
	});
	canvas.addEventListener('mouseout', function () {
		mousedown = false;
	});

	$('#generic-dungeondesigner-exportpng').on('click', function () {
		repaint(true);
		paper.toBlob({ type: 'image/png' }, function (blob) {
			saveAs(blob, 'dungeon.png');
			repaint();
		});
	});

	$('#generic-dungeondesigner-exportjpeg').on('click', function () {
		repaint(true);
		paper.toBlob({ type: 'image/jpeg', quality: 1 }, function (blob) {
			saveAs(blob, 'dungeon.jpeg');
			repaint();
		});
	});

	$('#generic-dungeondesigner-exportwebp').on('click', function () {
		repaint(true);
		paper.toBlob({ type: 'image/webp', quality: 1 }, function (blob) {
			saveAs(blob, 'dungeon.webp');
			repaint();
		});
	});
})();

// D&D 5 Monsters Database

(function () {
	'use strict';

	var challenges = {};
	DND5_MONSTERS.forEach(function (monster) {
		if (!challenges[monster.challenge]) {
			challenges[monster.challenge] = monster.xp;
		}
	});
	var $challenge = $('#dnd5-monsters-challenge').empty().append('<option value="">-</option>');
	Object.keys(challenges).sort(function (a, b) {
		return challenges[a] < challenges[b] ? -1 : 1;
	}).forEach(function (item) {
		$challenge.append('<option value="' + item + '">' + item + ' (' + challenges[item] + ' XP)</option>');
	});
	var $tbody = $('<tbody></tbody>');
	DND5_MONSTERS.forEach(function (monster) {
		$tbody.append(
			'<tr data-search="' + monster.name.en + ' ' + monster.name.it + '" data-challenge="' + monster.challenge + '">' +
				'<td>' + monster.name.en + '</td>' +
				'<td>' + monster.name.it + '</td>' +
				'<td>' + monster.challenge + '</td>' +
				'<td>' + monster.xp + '</td>' +
				'<td>' + monster.reference.en + ', ' + monster.reference.it + '</td>' +
			'</tr>');
	});
	$('#dnd5-monsters-table').append($tbody);
	$('#dnd5-monsters').on('input change', '.control', function () {
		var search = $('#dnd5-monsters-search').val().trim().toLowerCase(),
			challenge = $('#dnd5-monsters-challenge').val();
		$('#dnd5-monsters-table > tbody').find('tr').each(function () {
			var $this = $(this),
				show = true;
			if (search !== '' && $this.data('search').toLowerCase().indexOf(search) === -1) {
				show = false;
			}
			if (challenge !== '' && $this.data('challenge').toString() !== challenge) {
				show = false;
			}
			if (show) {
				$this.show();
			} else {
				$this.hide();
			}
		});
	});
})();

// D&D 5 Combat Encounter Crafter

(function () {
	'use strict';

	var $ch_selects = $('#dnd5-encounter-chlevel1, #dnd5-encounter-chlevel2, #dnd5-encounter-chlevel3, #dnd5-encounter-chlevel4, #dnd5-encounter-chlevel5, #dnd5-encounter-chlevel6');
	for (var i = 0; i <= 20; ++i) {
		$ch_selects.append('<option value="' + i + '">' + (i === 0 ? '-' : i) + '</option>');
	}

	var tmp = {};
	DND5_MONSTERS.forEach(function (monster) {
		if (!tmp[monster.challenge]) {
			tmp[monster.challenge] = { label: 'Challenge ' + monster.challenge + ' (' + monster.xp + ' XP)', value: monster.xp, options: [] };
		}
		tmp[monster.challenge].options.push(monster.name.en + (monster.name.it !== monster.name.en ? ' (' + monster.name.it + ')' : ''));
	});
	var array = [
		{ label: 'None', value: 0 }
	];
	Object.keys(tmp).sort(function (a, b) {
		return tmp[a].value < tmp[b].value ? -1 : 1;
	}).forEach(function (item) {
		array.push(tmp[item]);
	});
	var $m_selects = $('#dnd5-encounter-m1-type, #dnd5-encounter-m2-type, #dnd5-encounter-m3-type, #dnd5-encounter-m4-type, #dnd5-encounter-m5-type');
	array.forEach(function (item) {
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

	$('#dnd5-encounter').on('change', '.control', function () {
		var characters = 0,
			easy = 0,
			medium = 0,
			hard = 0,
			lethal = 0;
		[1, 2, 3, 4, 5, 6].forEach(function (id) {
			var level = parseInt($('#dnd5-encounter-chlevel' + id).val(), 10);
			if (level > 0) {
				characters++;
				var tmp = thresholds[level.toString()];
				easy += tmp[0];
				medium += tmp[1];
				hard += tmp[2];
				lethal += tmp[3];
			}
		});
		$('#dnd5-encounter-thresholds').html('<span style="color: cornflowerblue">Easy: ' + easy + ' XP</span><span style="color: lightgreen">Medium: ' + medium + ' XP</span><span style="color: orange">Hard: ' + hard + ' XP</span><span style="color: crimson">Lethal: ' + lethal + ' XP</span>');
		var output_number = 0,
			output_xp = 0;
		[1, 2, 3, 4, 5].forEach(function (id) {
			var number = parseInt($('#dnd5-encounter-m' + id + '-number').val(), 10),
				type = parseInt($('#dnd5-encounter-m' + id + '-type').val(), 10);
			if (type !== 0) {
				output_number += number;
				output_xp += number * type;
			}
		});
		var multiplier = 1;
		if (characters <= 2) {
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
		} else if (characters >= 3 && characters <= 5) {
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
		} else if (characters >= 6) {
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
		var output_xp_multiplier = output_xp * multiplier,
			output;
		if (output_xp_multiplier < easy) {
			output = '<span style="color: cornflowerblue">Not an Encounter</span><br>';
		} else if (output_xp_multiplier >= easy && output_xp_multiplier < medium) {
			output = '<span style="color: cornflowerblue">Easy Encounter</span><br>';
		} else if (output_xp_multiplier >= medium && output_xp_multiplier < hard) {
			output = '<span style="color: lightgreen">Medium Encounter</span><br>';
		} else if (output_xp_multiplier >= hard && output_xp_multiplier < lethal) {
			output = '<span style="color: orange">Hard Encounter</span><br>';
		} else if (output_xp_multiplier >= lethal) {
			output = '<span style="color: crimson">Lethal Encounter</span><br>';
		}
		output += output_xp + ' XP<br>' + (output_xp_multiplier !== output_xp ? output_xp_multiplier + ' XP after multiplier' : '');
		$('#dnd5-encounter-output').html(output);
	});
})();
