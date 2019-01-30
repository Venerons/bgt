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

// Functions

// example: 1d6 = dice(1, 6)
// example: 1rps = dice(1, ['rock', 'paper', 'scissors'])
var dice = function (num, values) {
	var result = [];
	for (var i = 0; i < num; ++i) {
		if (values instanceof Array) {
			result.push(values[Math.floor(Math.random() * values.length)]);
		} else {
			result.push(Math.floor(Math.random() * values) + 1);
		}
	}
	if (values instanceof Array) {
		if (result.length === 1) {
			result = result[0];
		}
	} else  {
		var sum = 0;
		result.forEach(function (value) {
			sum += value;
		});
		result = sum;
	}
	return result;
};

// example: dice_expression('3d6+2+45d2')
var dice_expression = function (expression) {
	var result = 'Evaluation Error';
	try {
		result = eval(expression.replace(/[0-9]+d[0-9]+/g, function (a) {
			var tokens = a.split('d'),
				q = parseInt(tokens[0], 10),
				f = parseInt(tokens[1], 10);
			return dice(q, f);
		}));
	} catch (e) {
		console.error(e);
	}
	return result;
};

// Generic Dice Simulator

(function () {
	'use strict';

	$('#generic-dice-classic').on('click', '.button', function () {
		var $this = $(this),
			n = parseInt($this.data('dice'), 10);
		$('#generic-dice-classic-output').text(dice(1, n));
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
			m: ['Adran', 'Aelar', 'Aramil', 'Arannis', 'Aus', 'Beiro', 'Berrian', 'Caladrel', 'Carric', 'Dayereth', 'Enialis', 'Erdan', 'Erevan', 'Galinndan', 'Gennal', 'Hadarai', 'Heian', 'Himo', 'Heldalel', 'Immeral', 'Ivellios', 'Laucian', 'Lanliss', 'Mindartis', 'Meirdrarel', 'Paelias', 'Peren', 'Quarion', 'Riardon', 'Rolen', 'Soveliss', 'Seldlon', 'Thamior', 'Tharivol', 'Talathel', 'Theren', 'Varis', 'Variel', 'Zordlon'],
			f: ['Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Amrunelara', 'Bethrynna', 'Birel', 'Caelynn', 'Chaedi', 'Dara', 'Drusilia', 'Dardlara', 'Enna', 'Faral', 'Felosial', 'Faunra', 'Irann', 'Ielenia', 'Jelenneth', 'Jathal', 'Keyleth', 'Leshanna', 'Lia', 'Meriele', 'Mialee', 'Merisiel', 'Naivara', 'Oparal', 'Quelenna', 'Quillathe', 'Sariel', 'Shanairra', 'Shava', 'Silaqui', 'Soumral', 'Theirastra', 'Thia', 'Tessara', 'Vadania', 'Valanthe', 'Valenae', 'Valna', 'Xanaphia', 'Yalandlara'],
			c: ['Amakiir (Gemflower)', 'Amastacia (Starflower)', 'Galanodel (Moonwhisper)', 'Holimion (Diamonddew)', 'Ilphelkiir (Gemblossom)', 'Liadon (Silverfrond)', 'Meliamne (Oakenheel)', 'Nailo (Nightbreeze)', 'Siannodel (Moonbrook)', 'Xiloscient (Goldpetal)']
		},
		'dnd-dwarf': {
			m: ['Adrik', 'Alberich', 'Baern', 'Berend', 'Barendd', 'Brottor', 'Bruenor', 'Dain', 'Darrak', 'Delg', 'Dolgrin', 'Eberk', 'Einkil', 'Fargrim', 'Flint', 'Gardain', 'Grunyar', 'Harbek', 'Harsk', 'Kazmuk', 'Kildrak', 'Morgran', 'Morgrym', 'Orsik', 'Oskar', 'Rangrim', 'Rurik', 'Rogar', 'Taklinn', 'Thoradin', 'Thorfin', 'Thorin', 'Tordek', 'Traubon', 'Travok', 'Ulfgar', 'Veit', 'Vondal'],
			f: ['Amber', 'Artin', 'Audhil', 'Agna', 'Bardryn', 'Bodill', 'Dagnal', 'Diesa', 'Eldeth', 'Falkrunn', 'Finellen', 'Gunnloda', 'Gurdis', 'Helja', 'Hlin', 'Kathra', 'Kristryd', 'Kotri', 'Ilde', 'Ingra', 'Liftrasa', 'Mardred', 'Riswynn', 'Rusilka', 'Sannl', 'Torbera', 'Torgga', 'Vistra', 'Yangrit'],
			c: ['Balderk', 'Battlehammer', 'Brawnanvil', 'Dankil', 'Fireforge', 'Frostbeard', 'Gorunn', 'Holderhek', 'Ironfist', 'Loderr', 'Lutgehr', 'Rumnaheim', 'Strakeln', 'Torunn', 'Ungart']
		},
		'dnd-halfling': {
			m: ['Alton', 'Antal', 'Ander', 'Boram', 'Beau', 'Cade', 'Corrin', 'Dannad', 'Evan', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Jamir', 'Kaleb', 'Lazam', 'Lem', 'Lindal', 'Lyle', 'Merric', 'Milo', 'Miro', 'Nebin', 'Ostran', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Shardon', 'Sumak', 'Ulmo', 'Wenner', 'Wellby'],
			f: ['Andry', 'Anafa', 'Amaryllis', 'Bellis', 'Bree', 'Callie', 'Chenna', 'Cora', 'Charmaine', 'Eida', 'Etune', 'Euphemia', 'Filiu', 'Jillian', 'Kithri', 'Lavinia', 'Lidda', 'Lissa', 'Marra', 'Merla', 'Nedda', 'Paela', 'Portia', 'Rillka', 'Seraphina', 'Shaena', 'Sistra', 'Tryn', 'Vani', 'Verna', 'Wella', 'Yamyra'],
			c: ['Brushgather', 'Goodbarrel', 'Greenbottle', 'Highhill', 'Hilltopple', 'Leagallow', 'Tealeaf', 'Thorngage', 'Tosscobble', 'Underbough']
		},
		'dnd-gnome': {
			nickname: ['Aleslosh', 'Ashhearth', 'Badger', 'Cloak', 'Doublelock', 'Filchbatter', 'Fnipper', 'Ku', 'Nim', 'Oneshoe', 'Pock', 'Sparklegem', 'Stumbleduck'],
			m: ['Alston', 'Alvyn', 'Abroshtor', 'Boddynock', 'Brocc', 'Bastargre', 'Burgell', 'Dimble', 'Eldon', 'Erky', 'Fonkin', 'Frug', 'Gerbo', 'Gimble', 'Glim', 'Halungalom', 'Jebeddo', 'Kellen', 'Krolmnite', 'Namfoodle', 'Orryn', 'Poshment', 'Roondar', 'Seebo', 'Sindri', 'Warryn', 'Wrenn', 'Zook', 'Zarzuket', '>atqualmie'],
			f: ['Bimpnottin', 'Breena', 'Besh', 'Caramip', 'Carlin', 'Donella', 'Duvamil', 'Ella', 'Ellyjobell', 'Ellywick', 'Fijit', 'Lini', 'Lilli', 'Loopmottin', 'Lorilla', 'Mardnab', 'Majet', 'Nissa', 'Nyx', 'Neji', 'Oda', 'Orla', 'Pai', 'Queck', 'Roywyn', 'Shamil', 'Tana', 'Trig', 'Waywocket', 'Zanna'],
			c: ['Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig', 'Ningel', 'Raulnor', 'Scheppen', 'Timbers', 'Turen']
		},
		'dnd-half-orc': {
			m: ['Ausk', 'Davor', 'Dench', 'Feng', 'Gell', 'Hakak', 'Henk', 'Holg', 'Imsh', 'Keth', 'Kizziar', 'Krusk', 'Makoa', 'Mhurren', 'Nesteruk', 'Ront', 'Shump', 'Thokk', 'Tsadok'],
			f: ['Baggi', 'Canan', 'Drogheda', 'Emen', 'Engong', 'Goruza', 'Kansif', 'Mazon', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Shirish', 'Sutha', 'Tevaga', 'Vola', 'Volen', 'Yevelda', 'Zeljka']
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
			n: ['Ayo', 'Baako', 'Chi', 'Dubaku', 'Ekundayo', 'Folami', 'Gameli', 'Hauhouot', 'Ime', 'Kayin', 'Lebene', 'Makafui', 'Ngozi', 'Opeyemi', 'Pereko', 'Quaco', 'Senyo', 'Temitope', 'Uzoma', 'Xoese', 'Yayra'],
			m: ['Adisa', 'Bamidele', 'Chukwuemeka', 'Dzigbode', 'Emeka', 'Fela', 'Gaddo', 'Hogan', 'Ikenna', 'Jawara', 'Kof', 'Lanre', 'Mamadou', 'Nnamdi', 'Okoro', 'Qwao', 'Senghor', 'Tomi', 'Uzochi', 'Yohance', 'Zebenjo'],
			f: ['Akosua', 'Bosede', 'Chidimma', 'Dada', 'Ebele', 'Funanya', 'Gbemisola', 'Ige', 'Kunto', 'Lumusi', 'Mojisola', 'Nkiruka', 'Oni', 'Simisola', 'Thema', 'Urbi', 'Zinsa']
		}
	};

	$('#generic-name-button').on('click', function () {
		var nameset = $('#generic-name-nameset').val(),
			gender = $('#generic-name-gender').val(),
			set = RCN[nameset];
		if (set) {
			var array = set.n ? set.n.concat(set[gender]) : set[gender],
				output = array[Math.floor(Math.random() * array.length)];
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

	var map = {
		theme: 'parchment',
		tilesize: 0,
		width: 0,
		height: 0,
		tiles: {}
	};

	var resize = function () {
		map.theme = $('#generic-dungeondesigner-theme').val();
		map.tilesize = parseInt($('#generic-dungeondesigner-size').val(), 10);
		map.width = parseInt($('#generic-dungeondesigner-width').val(), 10);
		map.height = parseInt($('#generic-dungeondesigner-height').val(), 10);
		for (var x = 0; x < map.height; ++x) {
			for (var y = 0; y < map.width; ++y) {
				var tileID = 'x' + x + 'y' + y;
				if (!map.tiles[tileID]) {
					var tile = Object.create(null);
					tile.x = x;
					tile.y = y;
					map.tiles[tileID] = tile;
				}
			}
		}
	};
	resize();

	var repaint = function (export_format) {
		var paper;
		if (!export_format) {
			paper = new Palette('#generic-dungeondesigner-canvas', { alpha: false });
			paper.canvas.style.width = (map.width * map.tilesize) + 'px';
			paper.canvas.style.height = (map.height * map.tilesize) + 'px';
		} else {
			paper = new Palette(document.createElement('canvas'), { alpha: false });
		}
		var dpr = window.devicePixelRatio || 1;
		paper.size(map.width * map.tilesize * dpr, map.height * map.tilesize * dpr);
		paper.context.scale(dpr, dpr);
		paper.clear();
		paper.rect({
			x: 0,
			y: 0,
			width: map.tilesize * map.width,
			height: map.tilesize * map.height,
			fill: map.theme === 'bw' ? '#ffffff' : '#ebd5b3' // #f6daaf
		});
		// editing grid
		if (!export_format) {
			Object.keys(map.tiles).forEach(function (tileID) {
				var tile = map.tiles[tileID],
					x_base = tile.x * map.tilesize,
					y_base = tile.y * map.tilesize,
					size = map.tilesize;
				paper.rect({
					x: x_base,
					y: y_base,
					width: size,
					height: size,
					stroke: map.theme === 'bw' ? '#000000' : '#c1af93',
					thickness: 1
				});
			});
		}
		// floor
		Object.keys(map.tiles).forEach(function (tileID) {
			var tile = map.tiles[tileID],
				x_base = tile.x * map.tilesize,
				y_base = tile.y * map.tilesize,
				size = map.tilesize;
			if (tile.floor) {
				paper.rect({
					x: x_base,
					y: y_base,
					width: size,
					height: size,
					fill: map.theme === 'bw' ? '#dddddd' : '#ffe7d5',
					stroke: map.theme === 'bw' ? '#000000' : '#c1af93',
					thickness: 1
				});
			}
		});
		// wall
		Object.keys(map.tiles).forEach(function (tileID) {
			var tile = map.tiles[tileID],
				x_base = tile.x * map.tilesize,
				y_base = tile.y * map.tilesize,
				size = map.tilesize;
			if (tile.wall) {
				var wall = {
					x: x_base,
					y: y_base,
					width: size,
					height: size,
					fill: map.theme === 'bw' ? '#cccccc' : '#ebd5b3',
					stroke: map.theme === 'bw' ? '#000000' : '#c1af93',
					thickness: 1
				};
				if (tile.wall === 1) {
					wall.y -= size * 0.125;
					wall.height = size * 0.25;
				} else if (tile.wall === 2) {
					wall.y += size * 0.375;
					wall.height = size * 0.25;
				} else if (tile.wall === 3) {
					wall.y += size - size * 0.125;
					wall.height = size * 0.25;
				} else if (tile.wall === 4) {
					wall.x -= size * 0.125;
					wall.width = size * 0.25;
				} else if (tile.wall === 5) {
					wall.x += size * 0.375;
					wall.width = size * 0.25;
				} else if (tile.wall === 6) {
					wall.x += size - size * 0.125;
					wall.width = size * 0.25;
				}
				paper.rect(wall);
			}
		});
		// door
		Object.keys(map.tiles).forEach(function (tileID) {
			var tile = map.tiles[tileID],
				x_base = tile.x * map.tilesize,
				y_base = tile.y * map.tilesize,
				size = map.tilesize;
			if (tile.door) {
				var door = {
					x: x_base,
					y: y_base,
					width: size,
					height: size,
					fill: map.theme === 'bw' ? '#cccccc' : '#a36223',
					stroke: map.theme === 'bw' ? '#000000' : '#865625',
					thickness: 2
				};
				if (tile.door === 1) {
					door.y -= size * 0.125;
					door.height = size * 0.25;
				} else if (tile.door === 2) {
					door.y += size * 0.375;
					door.height = size * 0.25;
				} else if (tile.door === 3) {
					door.y += size - size * 0.125;
					door.height = size * 0.25;
				} else if (tile.door === 4) {
					door.x -= size * 0.125;
					door.width = size * 0.25;
				} else if (tile.door === 5) {
					door.x += size * 0.375;
					door.width = size * 0.25;
				} else if (tile.door === 6) {
					door.x += size - size * 0.125;
					door.width = size * 0.25;
				}
				paper.rect(door);
			}
		});
		// column
		Object.keys(map.tiles).forEach(function (tileID) {
			var tile = map.tiles[tileID],
				x_base = tile.x * map.tilesize,
				y_base = tile.y * map.tilesize,
				size = map.tilesize;
			if (tile.column) {
				paper.circle({
					x: x_base + size * 0.5,
					y: y_base + size * 0.5,
					r: size * 0.25,
					fill: map.theme === 'bw' ? '#cccccc' : '#ebd5b3',
					stroke: map.theme === 'bw' ? '#000000' : '#c1af93',
					thickness: 2
				});
			}
		});
		// debris
		Object.keys(map.tiles).forEach(function (tileID) {
			var tile = map.tiles[tileID],
				x_base = tile.x * map.tilesize,
				y_base = tile.y * map.tilesize,
				size = map.tilesize;
			if (tile.debris) {
				paper.circle({
					x: x_base + size * 0.25,
					y: y_base + size * 0.25,
					r: size * 0.12,
					fill: map.theme === 'bw' ? '#cccccc' : '#ebd5b3',
					stroke: map.theme === 'bw' ? '#000000' : '#c1af93',
					thickness: 2
				});
				paper.circle({
					x: x_base + size * 0.75,
					y: y_base + size * 0.75,
					r: size * 0.2,
					fill: map.theme === 'bw' ? '#cccccc' : '#ebd5b3',
					stroke: map.theme === 'bw' ? '#000000' : '#c1af93',
					thickness: 2
				});
				paper.circle({
					x: x_base + size * 0.6,
					y: y_base + size * 0.3,
					r: size * 0.25,
					fill: map.theme === 'bw' ? '#cccccc' : '#ebd5b3',
					stroke: map.theme === 'bw' ? '#000000' : '#c1af93',
					thickness: 2
				});
				paper.circle({
					x: x_base + size * 0.3,
					y: y_base + size * 0.6,
					r: size * 0.12,
					fill: map.theme === 'bw' ? '#cccccc' : '#ebd5b3',
					stroke: map.theme === 'bw' ? '#000000' : '#c1af93',
					thickness: 2
				});
			}
		});
		// box
		Object.keys(map.tiles).forEach(function (tileID) {
			var tile = map.tiles[tileID],
				x_base = tile.x * map.tilesize,
				y_base = tile.y * map.tilesize,
				size = map.tilesize;
			if (tile.box) {
				paper.rect({
					x: x_base + size * 0.25,
					y: y_base + size * 0.25,
					width: size * 0.5,
					height: size * 0.5,
					fill: map.theme === 'bw' ? '#cccccc' : '#a36223',
					stroke: map.theme === 'bw' ? '#000000' : '#865625',
					thickness: 2
				});
				paper.line({
					x1: x_base + size * 0.25,
					y1: y_base + size * 0.25,
					x2: x_base + size * 0.25 + size * 0.5,
					y2: y_base + size * 0.25 + size * 0.5,
					stroke: map.theme === 'bw' ? '#000000' : '#865625',
					thickness: 2
				});
				paper.line({
					x1: x_base + size * 0.25 + size * 0.5,
					y1: y_base + size * 0.25,
					x2: x_base + size * 0.25,
					y2: y_base + size * 0.25 + size * 0.5,
					stroke: map.theme === 'bw' ? '#000000' : '#865625',
					thickness: 2
				});
			}
		});
		// text
		Object.keys(map.tiles).forEach(function (tileID) {
			var tile = map.tiles[tileID],
				x_base = tile.x * map.tilesize,
				y_base = tile.y * map.tilesize,
				size = map.tilesize;
			if (tile.text) {
				paper.text({
					text: tile.text,
					x: x_base + size * 0.5,
					y: y_base + size * 0.5,
					font: (size * 0.3) + 'px Helvetica',
					fill: '#000000',
					align: 'center',
					baseline: 'middle'
				});
			}
		});
		if (!export_format && canvas_tile_x && canvas_tile_y) {
			paper.rect({
				x: canvas_tile_x * map.tilesize,
				y: canvas_tile_y * map.tilesize,
				width: map.tilesize,
				height: map.tilesize,
				stroke: '#ff0000',
				thickness: 2,
				alpha: 0.5
			});
		}
		if (export_format === 'png') {
			paper.toBlob({ type: 'image/png' }, function (blob) {
				saveAs(blob, 'bgt_dungeon.png');
			});
		} else if (export_format === 'jpeg') {
			paper.toBlob({ type: 'image/jpeg', quality: 1 }, function (blob) {
				saveAs(blob, 'bgt_dungeon.jpeg');
			});
		} else if (export_format === 'webp') {
			paper.toBlob({ type: 'image/webp', quality: 1 }, function (blob) {
				saveAs(blob, 'bgt_dungeon.webp');
			});
		}
	};
	repaint();

	$('#generic-dungeondesigner').on('input change', '.control', function () {
		resize();
		repaint();
	});

	$('#generic-dungeondesigner-load').on('click', function () {
		$('#generic-dungeondesigner-load-input').click();
	});
	$('#generic-dungeondesigner-load-input').on('change', function () {
		var file = this.files[0];
		this.value = null;
		var reader = new FileReader();
		reader.onerror = function (event) {
			alert('Error while reading file.');
		};
		reader.onload = function (event) {
			map = JSON.parse(event.target.result);
			$('#generic-dungeondesigner-size').val(map.tilesize);
			$('#generic-dungeondesigner-width').val(map.width);
			$('#generic-dungeondesigner-height').val(map.height);
			repaint();
		};
		reader.readAsText(file);
	});

	$('#generic-dungeondesigner-save').on('click', function () {
		var blob = new Blob([JSON.stringify(map)], { type: 'application/json;charset=UTF-8', encoding: 'UTF-8' });
		saveAs(blob, 'bgt_dungeon.json');
	});

	$('#generic-dungeondesigner-exportpng').on('click', function () {
		repaint('png');
	});

	$('#generic-dungeondesigner-exportjpeg').on('click', function () {
		repaint('jpeg');
	});

	$('#generic-dungeondesigner-exportwebp').on('click', function () {
		repaint('webp');
	});

	$('#generic-dungeondesigner-element').on('change', function () {
		canvas_element = $(this).val();
	});

	var page_element = document.getElementById('generic-dungeondesigner'),
		canvas = document.getElementById('generic-dungeondesigner-canvas'),
		canvas_element = $('#generic-dungeondesigner-element').val(),
		canvas_tile_x = null,
		canvas_tile_y = null,
		canvas_mousedown = false,
		canvas_button = 0;

	var edit_tile = function (tile) {
		if (canvas_button === 0) {
			if (canvas_element === 'text') {
				var text = prompt('Insert Text:');
				if (text) {
					tile.text = text;
				}
			} else if (canvas_element === 'wall') {
				if (!tile.wall) {
					tile.wall = 0;
				}
				tile.wall++;
				if (tile.wall > 6) {
					tile.wall = 1;
				}
			} else if (canvas_element === 'door') {
				if (!tile.door) {
					tile.door = 0;
				}
				tile.door++;
				if (tile.door > 6) {
					tile.door = 1;
				}
			} else {
				tile[canvas_element] = 1;
			}
		} else {
			delete tile[canvas_element.split('_')[0]];
		}
	};

	canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
	canvas.addEventListener('mousedown', function (e) {
		canvas_mousedown = true;
		canvas_button = e.button;
		var x = Math.floor((e.pageX - this.offsetLeft + page_element.scrollLeft) / map.tilesize),
			y = Math.floor((e.pageY - this.offsetTop + page_element.scrollTop) / map.tilesize);
		var tileID = 'x' + x + 'y' + y,
			tile = map.tiles[tileID];
		if (tile) {
			edit_tile(tile);
			canvas_tile_x = x;
			canvas_tile_y = y;
			repaint();
		}
	});
	canvas.addEventListener('mousemove', function (e) {
		var x = Math.floor((e.pageX - this.offsetLeft + page_element.scrollLeft) / map.tilesize),
			y = Math.floor((e.pageY - this.offsetTop + page_element.scrollTop) / map.tilesize);
		if (canvas_mousedown) {
			var tileID = 'x' + x + 'y' + y,
				tile = map.tiles[tileID];
			if (tile) {
				edit_tile(tile);
			}
		}
		if (canvas_tile_x !== x || canvas_tile_y !== y) {
			canvas_tile_x = x;
			canvas_tile_y = y;
			repaint();
		}
	});
	canvas.addEventListener('mouseup', function (e) {
		canvas_mousedown = false;
	});
	/*
	canvas.addEventListener('mouseleave', function () {
		canvas_mousedown = false;
		canvas_tile_x = null;
		canvas_tile_y = null;
		repaint();
	});
	*/
	canvas.addEventListener('mouseout', function () {
		canvas_mousedown = false;
		canvas_tile_x = null;
		canvas_tile_y = null;
		repaint();
	});
})();

// D&D 5 Ability Scores

(function () {
	'use strict';

	$('#dnd5-abilityscores').on('input change', '.control', function () {
		var points = 0,
			max_points = 27,
			points_cost = { '8': 0, '9': 1, '10': 2, '11': 3, '12': 4, '13': 5, '14': 7, '15': 9 };
		['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(function (ability) {
			var base = parseInt($('#dnd5-abilityscores-' + ability + '-base').val(), 10),
				bonus = parseInt($('#dnd5-abilityscores-' + ability + '-bonus').val(), 10),
				output = base + bonus,
				mod = Math.floor((output - 10) / 2);
			points += points_cost[base.toString()];
			$('#dnd5-abilityscores-' + ability + '-output').text(output);
			$('#dnd5-abilityscores-' + ability + '-mod').text(mod < 0 ? mod : '+' + mod);
		});
		$('#dnd5-abilityscores-resume').text('Points: ' + points + ' / ' + max_points).css({ color: points > max_points ? 'crimson' : '' });
	});
})();

// D&D 5 Monsters

(function () {
	'use strict';

	var challenges = {};
	DND5_MONSTERS.forEach(function (monster) {
		if (!challenges[monster.cr]) {
			challenges[monster.cr] = monster.xp;
		}
	});
	var $challenge = $('#dnd5-monsters-challenge').empty().append('<option value="">-</option>');
	Object.keys(challenges).sort(function (a, b) {
		return challenges[a] < challenges[b] ? -1 : 1;
	}).forEach(function (item) {
		$challenge.append('<option value="' + item + '">' + item + '</option>');
	});
	var $tbody = $('<tbody></tbody>');
	DND5_MONSTERS.forEach(function (monster) {
		$tbody.append(
			'<tr data-search="' + monster.name.en + ' ' + monster.name.it + '" data-challenge="' + monster.cr + '">' +
				'<td>' + monster.name.en + '</td>' +
				'<td>' + monster.name.it + '</td>' +
				'<td>' + monster.cr + '</td>' +
				'<td>' + monster.source + '</td>' +
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

// D&D 5 Combat Encounter

(function () {
	'use strict';

	var tmp = {};
	DND5_MONSTERS.forEach(function (monster) {
		if (!tmp[monster.cr]) {
			tmp[monster.cr] = monster.xp;
		}
	});
	var array = [
		{ label: 'None', value: 0 }
	];
	Object.keys(tmp).sort(function (a, b) {
		return tmp[a] < tmp[b] ? -1 : 1;
	}).forEach(function (item) {
		array.push({ label: 'CR ' + item + ' (' + tmp[item] + ' XP)', value: tmp[item] });
	});
	var $m_selects = $('#dnd5-encounter-m1-cr, #dnd5-encounter-m2-cr, #dnd5-encounter-m3-cr');
	array.forEach(function (item) {
		$m_selects.append('<option value="' + item.value + '">' + item.label + '</option>');
	});

	$('#dnd5-encounter').on('change', '.control', function () {
		var players = parseInt($('#dnd5-encounter-players').val(), 10),
			level = parseInt($('#dnd5-encounter-level').val(), 10);
		var thresholds = DND5.party_xp_thresholds(players, level);
		$('#dnd5-encounter-thresholds').html(
			'<span style="background: cornflowerblue; color: white; padding: 0 1rem">Easy: ' + thresholds.easy + ' XP</span>' +
			'<span style="background: #39b54a; color: white; padding: 0 1rem">Medium: ' + thresholds.medium + ' XP</span>' +
			'<span style="background: #eda745; color: white; padding: 0 1rem">Hard: ' + thresholds.hard + ' XP</span>' +
			'<span style="background: #c44230; color: white; padding: 0 1rem">Deadly: ' + thresholds.deadly + ' XP</span>' +
			'<span style="background: whitesmoke; color: black; padding: 0 1rem">Daily Budget: ' + thresholds.daily_budget + ' XP</span>');
		var output_number = 0,
			output_xp = 0;
		[1, 2, 3].forEach(function (id) {
			var number = parseInt($('#dnd5-encounter-m' + id + '-number').val(), 10),
				type = parseInt($('#dnd5-encounter-m' + id + '-cr').val(), 10);
			if (type !== 0) {
				output_number += number;
				output_xp += number * type;
			}
		});
		var multiplier = 1;
		if (players <= 2) {
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
		} else if (players >= 3 && players <= 5) {
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
		} else if (players >= 6) {
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
		var output_xp_adjusted = output_xp * multiplier,
			output;
		if (output_xp_adjusted < thresholds.easy) {
			output = '<span style="background: cornflowerblue; color: white; padding: 0 2rem">Not an Encounter</span><br>';
		} else if (output_xp_adjusted >= thresholds.easy && output_xp_adjusted < thresholds.medium) {
			output = '<span style="background: cornflowerblue; color: white; padding: 0 2rem">Easy</span><br>';
		} else if (output_xp_adjusted >= thresholds.medium && output_xp_adjusted < thresholds.hard) {
			output = '<span style="background: #39b54a; color: white; padding: 0 2rem">Medium</span><br>';
		} else if (output_xp_adjusted >= thresholds.hard && output_xp_adjusted < thresholds.deadly) {
			output = '<span style="background: #eda745; color: white; padding: 0 2rem">Hard</span><br>';
		} else if (output_xp_adjusted >= thresholds.deadly) {
			output = '<span style="background: #c44230; color: white; padding: 0 2rem">Deadly</span><br>';
		}
		output += 'Total XP: ' + output_xp + (output_xp_adjusted !== output_xp ? '<br>Adjusted XP: ' + output_xp_adjusted : '');
		$('#dnd5-encounter-output').html(output);
	});
})();

// D&D 5 Initiative Tracker

(function () {
	'use strict';

	var renderData = function (data) {
		var $tbody = $('#dnd5-initiativetracker-table').empty();
		data.sort(function (a, b) {
			if (a.initiative > b.initiative) {
				return -1;
			} else if (a.initiative < b.initiative) {
				return 1;
			} else if (a.type === 'character') {
				return -1
			} else if (b.type === 'character') {
				return 1;
			} else {
				return 0;
			}
		}).forEach(function (item) {
			var input_style = 'width: 100%; color: whitesmoke; border: none; background: rgba(255, 255, 255, 0.1)';
			$tbody.append(
				'<tr style="background: ' + (item.type === 'character' ? '#39b54a75' : '#c4423075') + '">' +
					'<td><input  data-id="' + item.id + '" data-field="initiative" type="number" value="' + item.initiative + '" class="input control" style="' + input_style + '"></td>' +
					'<td><input  data-id="' + item.id + '" data-field="label" type="text" value="' + item.label + '" class="input control" style="' + input_style + '"></td>' +
					'<td><input  data-id="' + item.id + '" data-field="ac" type="number" value="' + item.ac + '" class="input control" style="' + input_style + '"></td>' +
					'<td><input  data-id="' + item.id + '" data-field="perception" type="number" value="' + item.perception + '" class="input control" style="' + input_style + '"></td>' +
					'<td><input  data-id="' + item.id + '" data-field="hp" type="number" value="' + item.hp + '" class="input control" style="' + input_style + '"></td>' +
					'<td><input  data-id="' + item.id + '" data-field="maxhp" type="number" value="' + item.maxhp + '" class="input control" style="' + input_style + '"></td>' +
					'<td><button  data-id="' + item.id + '" data-action="delete" class="button" style="width: 100%">Delete</button></td>' +
				'</tr>');
		});
	};

	$('#dnd5-initiativetracker-toolbar').on('click', 'button', function () {
		var action = $(this).data('action'),
			data = $('#dnd5-initiativetracker').data('data') || [];
		if (action === 'sort') {
			renderData(data);
		} else {
			var type, message;
			if (action === 'add-character') {
				type = 'character';
			} else if (action === 'add-monster') {
				type = 'monster';
			}
			var id = 0;
			data.forEach(function (item) {
				if (item.id >= id) {
					id = item.id + 1;
				}
			});
			data.push({
				id: id,
				type: type,
				label: type.toUpperCase(),
				initiative: 0,
				ac: 10,
				perception: 10,
				hp: 0,
				maxhp: 0
			});
			$('#dnd5-initiativetracker').data('data', data);
			renderData(data);
		}
	});

	$('#dnd5-initiativetracker-table').on('change', '.control', function () {
		var $this = $(this),
			id = parseInt($this.data('id'), 10),
			field = $this.data('field'),
			value = field === 'label' ? $this.val() : parseFloat($this.val()),
			data = $('#dnd5-initiativetracker').data('data') || [];
		data.forEach(function (item) {
			if (item.id === id) {
				item[field] = value;
			}
		});
	});

	$('#dnd5-initiativetracker-table').on('click', '[data-action]', function () {
		var $this = $(this),
			action = $this.data('action'),
			id = parseInt($this.data('id'), 10),
			data = $('#dnd5-initiativetracker').data('data') || [];
		if (action === 'delete') {
			var index = null;
			data.forEach(function (item, data_index) {
				if (item.id === id) {
					index = data_index;
				}
			});
			if (index !== null) {
				data.splice(index, 1);
				renderData(data);
			}
		}
	});
})();

// D&D 5 Individual Treasure

(function () {
	'use strict';

	$('#dnd5-individualtreasure-generate').on('click', function () {
		var treasure = DND5.individual_treasure($('#dnd5-individualtreasure-cr').val());
		var output = [];
		if (treasure.cp > 0) {
			output.push('<span style="color: #b87333">' + treasure.cp + ' CP</span>');
		}
		if (treasure.sp > 0) {
			output.push('<span style="color: silver">' + treasure.sp + ' SP</span>');
		}
		if (treasure.ep > 0) {
			output.push('<span style="color: grey">' + treasure.ep + ' EP</span>');
		}
		if (treasure.gp > 0) {
			output.push('<span style="color: gold">' + treasure.gp + ' GP</span>');
		}
		if (treasure.pp > 0) {
			output.push('<span style="color: #7f7679">' + treasure.pp + ' PP</span>');
		}
		var normalized = treasure.cp * 0.01 + treasure.sp * 0.1 + treasure.ep * 0.5 + treasure.gp + treasure.pp * 10;
		output.push('<hr>Normalized: <span style="color: gold">' + normalized + ' GP</span>');
		$('#dnd5-individualtreasure-output').html(output.join('<br>'));
	});
})();


// D&D 5 Treasure Hoard

(function () {
	'use strict';

	$('#dnd5-treasurehoard-generate').on('click', function () {
		var treasure = DND5.treasure_hoard($('#dnd5-treasurehoard-cr').val());
		var output = [];
		if (treasure.cp > 0) {
			output.push('<span style="color: #b87333">' + treasure.cp + ' CP</span>');
		}
		if (treasure.sp > 0) {
			output.push('<span style="color: silver">' + treasure.sp + ' SP</span>');
		}
		if (treasure.ep > 0) {
			output.push('<span style="color: grey">' + treasure.ep + ' EP</span>');
		}
		if (treasure.gp > 0) {
			output.push('<span style="color: gold">' + treasure.gp + ' GP</span>');
		}
		if (treasure.pp > 0) {
			output.push('<span style="color: #7f7679">' + treasure.pp + ' PP</span>');
		}
		treasure.gems.forEach(function (gem) {
			output.push(gem);
		});
		treasure.art_objects.forEach(function (art_object) {
			output.push(art_object);
		});
		treasure.magic_items.forEach(function (magic_item) {
			output.push(magic_item);
		});
		//var normalized = treasure.cp * 0.01 + treasure.sp * 0.1 + treasure.ep * 0.5 + treasure.gp + treasure.pp * 10;
		//output.push('<hr>Normalized: <span style="color: gold">' + normalized + ' GP</span>');
		$('#dnd5-treasurehoard-output').html(output.join('<br>'));
	});
})();

// 7th Sea Turn Tracker

(function () {
	'use strict';

	$('#7thsea-turntracker-toolbar').on('click', 'button', function () {
		var action = $(this).data('action');
		if (action === 'sort') {
			var array = [];
			$('#7thsea-turntracker-list > li[data-id]').each(function () {
				array.push($(this));
			});
			var $list = $('#7thsea-turntracker-list').empty();
			array.sort(function (a, b) {
				var a_type = a.data('type'),
					a_number = parseInt(a.find('.turn-row-number').text(), 10),
					b_type = b.data('type'),
					b_number = parseInt(b.find('.turn-row-number').text(), 10);
				if (a_number === 0) {
					return 1;
				} else if (b_number === 0) {
					return -1;
				} else if (a_type === 'squad') {
					return 1;
				} else if (b_type === 'squad') {
					return -1;
				} else if (a_number > b_number) {
					return -1;
				} else if (a_number < b_number) {
					return 1;
				} else if (a_type === 'villain') {
					return -1;
				} else if (b_type === 'villain') {
					return 1;
				} else {
					return 0;
				}
			}).forEach(function ($row) {
				$list.append($row);
			});
		} else {
			var type, message;
			if (action === 'add-character') {
				type = 'character';
				message = 'Character Name:';
			} else if (action === 'add-villain') {
				type = 'villain';
				message = 'Villain Name:';
			} else if (action === 'add-squad') {
				type = 'squad';
				message = 'Squad Name:';
			}
			var label = prompt(message);
			if (label) {
				var id = 0;
				$('#7thsea-turntracker-list > li[data-id]').each(function () {
					var value = parseInt($(this).data('id'), 10);
					if (value >= id) {
						id = value + 1;
					}
				});
				var background;
				if (type === 'character') {
					background = '#39b54a';
				} else if (type === 'villain') {
					background = '#c44230';
				} else if (type === 'squad') {
					background = '#eda745';
				}
				var $row = $(
					'<li data-id="' + id + '" data-type="' + type + '" class="flex-row flex-row-margins" style="margin: 0; padding: 1rem; background: ' + background + '">' +
						'<button data-action="add" class="button">+</button>' +
						'<button data-action="remove" class="button">-</button>' +
						'<button data-action="delete" class="button">Delete</button>' +
						'<div>' + label + '</div>' +
						'<div class="turn-row-number">0</div>' +
						'<div class="turn-row-increments flex-row flex-row-margins"></div>' +
					'</li>');
				$('#7thsea-turntracker-list').append($row);
			}
		}
	});
	$('#7thsea-turntracker-list').on('click', 'button', function () {
		var action = $(this).data('action'),
			$row = $('#7thsea-turntracker-list > li[data-id="' + $(this).parent().data('id') + '"]'),
			number = parseInt($row.find('.turn-row-number').text(), 10);
		if (action === 'add') {
			$row.find('.turn-row-number').text(number + 1);
			$row.find('.turn-row-increments').append('<div class="increment" style="width: 30px; height: 30px; border: 1px solid black; background: grey; border-radius: 4px"></div>');
		} else if (action === 'remove') {
			$row.find('.turn-row-number').text(Math.max(0, number - 1));
			$row.find('.turn-row-increments').find('.increment:first-child').remove();
		} else if (action === 'delete') {
			$row.remove();
		}
	});
})();

// Fate Dice Simulator

(function () {
	'use strict';

	var ratings = {
		'8': {
			en: 'Legendary',
			it: 'Leggendario'
		},
		'7': {
			en: 'Epic',
			it: 'Epico'
		},
		'6': {
			en: 'Fantastic',
			it: 'Fantastico'
		},
		'5': {
			en: 'Superb',
			it: 'Superbo'
		},
		'4': {
			en: 'Great',
			it: 'Ottimo'
		},
		'3': {
			en: 'Good',
			it: 'Buono'
		},
		'2': {
			en: 'Fair',
			it: 'Giusto'
		},
		'1': {
			en: 'Average',
			it: 'Medio'
		},
		'0': {
			en: 'Mediocre',
			it: 'Mediocre'
		},
		'-1': {
			en: 'Poor',
			it: 'Scarso'
		},
		'-2': {
			en: 'Terrible',
			it: 'Terribile'
		},
		'-3': {
			en: 'Terrible',
			it: 'Terribile'
		},
		'-4': {
			en: 'Terrible',
			it: 'Terribile'
		}
	};

	$('#fate-dice-toolbar').on('click', '.button', function () {
		var array = ['+', '+', '&nbsp;', '&nbsp;', '-', '-'],
			rolls = [dice(1, array), dice(1, array), dice(1, array), dice(1, array)],
			result = 0,
			output = '';
		rolls.forEach(function (roll) {
			if (roll === '+') {
				result++;
			} else if (roll === '-') {
				result--;
			}
			output += '<div style="display: inline-block; width: 3rem; height: 3rem; margin: 0.5rem; border-radius: 4px; text-align: center; line-height: 3rem; color: grey; background: whitesmoke">' + roll + '</div>';
		});
		console.log(result);
		var rating = ratings[result.toString()].en;
		output += '<br>' + rating + ' (' + (result > 0 ? '+' : '') + result + ')';
		$('#fate-dice-output').html(output);
	});
})();


// Songs of the Winterflame: Eventide Character
/*
(function () {
	'use strict';

	var SOTW = {
		races: {
			human: { initiative: 0, hp: 0, mp: 0, ap: 3 },
			elf: { initiative: 0, hp: 0, mp: 2, ap: 1 },
			irve: { initiative: 0, hp: 0, mp: 1, ap: 2 },
			dwarf: { initiative: 0, hp: 2, mp: 0, ap: 1 },
			goblin: { initiative: 0, hp: 2, mp: 1, ap: 0 },
			orc: { initiative: 0, hp: 3, mp: 0, ap: 0 },
			minotaur: { initiative: 0, hp: 3, mp: 0, ap: 0 },
			centaur: { initiative: 0, hp: 1, mp: 2, ap: 0 },
			dragonborn: { initiative: 0, hp: 2, mp: 0, ap: 1 },
			tiefling: { initiative: 0, hp: 1, mp: 1, ap: 1 }
		},
		classes: {
			warrior: {
				'1': { initiative: 2, hp: 8, mp: 1, ap: 1, weapon: ['light', 'medium', 'heavy'], armor: ['light', 'medium', 'heavy'], equip: [] },
				'2': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'3': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'4': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'5': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] }
			},
			berserker: {
				'1': { initiative: 5, hp: 8, mp: 2, ap: 1, weapon: ['light', 'medium', 'heavy'], armor: ['light', 'medium'], equip: [] },
				'2': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'3': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'4': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'5': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] }
			},
			rogue: {
				'1': { initiative: 4, hp: 6, mp: 2, ap: 1, weapon: ['light'], armor: ['light'], equip: [] },
				'2': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'3': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'4': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'5': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] }
			},
			hunter: {
				'1': { initiative: 3, hp: 6, mp: 2, ap: 1, weapon: ['light', 'medium'], armor: ['light', 'medium'], equip: [] },
				'2': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'3': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'4': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'5': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] }
			},
			shaman: {
				'1': { initiative: 2, hp: 4, mp: 1, ap: 1, weapon: ['light'], armor: ['light'], equip: [] },
				'2': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'3': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'4': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'5': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] }
			},
			bard: {
				'1': { initiative: 2, hp: 4, mp: 1, ap: 1, weapon: ['light'], armor: ['light'], equip: [] },
				'2': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'3': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'4': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'5': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] }
			},
			arcanist: {
				'1': { initiative: 1, hp: 2, mp: 1, ap: 1, weapon: ['light'], armor: ['light'], equip: [] },
				'2': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'3': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'4': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'5': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] }
			},
			healer: {
				'1': { initiative: 1, hp: 2, mp: 1, ap: 1, weapon: ['light'], armor: ['light'], equip: [] },
				'2': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'3': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'4': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] },
				'5': { initiative: 0, hp: 0, mp: 0, ap: 0, weapon: [], armor: [], equip: [] }
			}
		}
	};

	var render = function () {
		var output = {
			name: $('#sotweventide-character-name').val().trim(),
			race: $('#sotweventide-character-race').val(),
			class: $('#sotweventide-character-class').val(),
			level: parseInt($('#sotweventide-character-level').val(), 10),
			initiative: 0,
			hp: 0,
			mp: 0,
			ap: 0,
			weapon: $('#sotweventide-character-weapon').val(),
			armor: $('#sotweventide-character-armor').val(),
			equip: [],
			actions: []
		};

		if (SOTW.races[output.race]) {
			var r = SOTW.races[output.race];
			output.hp += r.hp;
			output.mp += r.mp;
			output.ap += r.ap;
		}
		if (SOTW.classes[output.class]) {
			if (SOTW.classes[output.class][output.level.toString()]) {
				var c = SOTW.classes[output.class][output.level.toString()];
				output.initiative += c.initiative;
				output.hp += c.hp;
				output.mp += c.mp;
				output.ap += c.ap;
			}
		}
		$('#sotweventide-character-output').text(JSON.stringify(output, null, 4));
	};
	render();

	$('#sotweventide-character').on('input change', '.control', function () {
		render();
	});
})();
*/
