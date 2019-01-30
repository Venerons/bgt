(function () {
	'use strict';

	var DND5 = Object.create(null);

	DND5.encounter_xp_thresholds = {
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

	DND5.daily_xp_threshold = {
		'1': 300,
		'2': 600,
		'3': 1200,
		'4': 1700,
		'5': 3500,
		'6': 4000,
		'7': 5000,
		'8': 6000,
		'9': 7500,
		'10': 9000,
		'11': 10500,
		'12': 11500,
		'13': 13500,
		'14': 15000,
		'15': 18000,
		'16': 20000,
		'17': 25000,
		'18': 27000,
		'19': 30000,
		'20': 40000
	};

	DND5.party_xp_thresholds = function (players, level) {
		var th = DND5.encounter_xp_thresholds[level.toString()];
		var output = {
			easy: th[0] * players,
			medium: th[1] * players,
			hard: th[2] * players,
			deadly: th[3] * players,
			daily_budget: DND5.daily_xp_threshold[level.toString()] * players
		};
		return output;
	};

	DND5.gemstones = {
		'10': {
			'1': 'Azurite (opaque mottled deep blue)',
			'2': 'Banded agate (translucent striped brown, blue, white, or red)',
			'3': 'Blue quartz (transparent pale blue)',
			'4': 'Eye agate (translucent circles of gray, white, brown, blue, or green)',
			'5': 'Hematite (opaque gray-black)',
			'6': 'Lapis lazuli (opaque light and dark blue with yellow flecks)',
			'7': 'Malachite (opaque striated light and dark green)',
			'8': 'Moss agate (translucent pink or yellow-white with mossy gray or green markings)',
			'9': 'Obsidian (opaque black)',
			'10': 'Rhodochrosite (opaque light pink)',
			'11': 'Tiger eye (translucent brown with golden center)',
			'12': 'Turquoise (opaque light blue-green)'
		},
		'50': {
			'1': 'Bloodstone (opaque dark gray with red flecks)',
			'2': 'Carnelian (opaque orange to red-brown)',
			'3': 'Chalcedony (opaque white)',
			'4': 'Chrysoprase (translucent green)',
			'5': 'Citrine (transparent pale yellow-brown)',
			'6': 'Jasper (opaque blue, black, or brown)',
			'7': 'Moonstone (translucent white with pale blue glow)',
			'8': 'Onyx (opaque bands of black and white, or pure black or white)',
			'9': 'Quartz (transparent white, smoky gray, or yellow)',
			'10': 'Sardonyx (opaque bands of red and white)',
			'11': 'Star rose quartz (translucent rosy stone with white star-shaped center)',
			'12': 'Zircon (transparent pale blue-green)'
		},
		'100': {
			'1': 'Amber (transparent watery gold to rich gold)',
			'2': 'Amethyst (transparent deep purple)',
			'3': 'Chrysoberyl (transparent yellow-green to pale green)',
			'4': 'Coral (opaque crimson)',
			'5': 'Garnet (transparent red, brown-green, or violet)',
			'6': 'Jade (translucent light green, deep green , or white)',
			'7': 'Jet (opaque deep black)',
			'8': 'Pearl (opaque lustrous white, yellow, or pink)',
			'9': 'Spinel (transparent red, red-brown, or deep green)',
			'10': 'Tourmaline (transparent pale green , blue, brown, or red)'
		},
		'500': {
			'1': 'Alexandrite (transparent dark green)',
			'2': 'Aquamarine (transparent pale blue-green)',
			'3': 'Black pearl (opaque pure black)',
			'4': 'Blue spinel (transparent deep blue)',
			'5': 'Peridot (transparent rich olive green)',
			'6': 'Topaz (transparent golden yellow)'
		},
		'1000': {
			'1': 'Black opal (translucent dark green with black mottling and golden flecks)',
			'2': 'Blue sapphire (transparent blue-white to medium blue)',
			'3': 'Emerald (transparent deep bright green)',
			'4': 'Fire opal (translucent fiery red)',
			'5': 'Opal (translucent pale blue with green and golden mottling)',
			'6': 'Star ruby (translucent ruby with white star-shaped center)',
			'7': 'Star sapphire (translucent blue sapphire with white star-shaped center)',
			'8': 'Yellow sapphire (transparent fiery yellow or yellow-green)'
		},
		'5000': {
			'1': 'Black sapphire (translucent lustrous black with glowing highlights)',
			'2': 'Diamond (transparent blue-white, canary, pink, brown, or blue)',
			'3': 'Jacinth (transparent fiery orange)',
			'4': 'Ruby (transparent clear red to deep crimson)'
		}
	};

	DND5.random_gem = function (gp_value) {
		var gems_set = DND5.gemstones[gp_value.toString()];
		return gems_set[dice(1, Object.keys(gems_set).length).toString()] + ' (' + gp_value + ' GP)';
	};

	DND5.random_gems = function (num, gp_value) {
		var gems = [];
		for (var i = 0; i < num; ++i) {
			gems.push(DND5.random_gem(gp_value));
		}
		return gems;
	};

	DND5.art_objects = {
		'25': {
			'1': 'Silver ewer',
			'2': 'Carved bone statuette',
			'3': 'Small gold bracelet',
			'4': 'Cloth-of-gold vestments',
			'5': 'Black velvet mask stitched with silver thread',
			'6': 'Copper chalice with silver filigree',
			'7': 'Pair of engraved bone dice',
			'8': 'Small mirror set in a painted wooden frame',
			'9': 'Embroidered silk handkerchief',
			'10': 'Gold locket with a painted portrait inside'
		},
		'250': {
			'1': 'Gold ring set with bloodstones',
			'2': 'Carved ivory statuette',
			'3': 'Large gold bracelet',
			'4': 'Silver necklace with a gemstone pendant',
			'5': 'Bronze crown',
			'6': 'Silk robe with gold embroidery',
			'7': 'Large well-made tapestry',
			'8': 'Brass mug with jade inlay',
			'9': 'Box of turquoise animal figurines',
			'10': 'Gold bird cage with electrum filigree'
		},
		'750': {
			'1': 'Silver chalice set with moonstones',
			'2': 'Silver-plated steellongsword with jet set in hilt',
			'3': 'Carved harp of exotic wood with ivory inlay and zircon gems',
			'4': 'Small gold idol',
			'5': 'Gold dragon comb set with red garnets as eyes',
			'6': 'Bottle stopper cork embossed with gold leaf and set with amethysts',
			'7': 'Ceremonial electrum dagger wit~ a black pearl in the pommel',
			'8': 'Silver and gold brooch',
			'9': 'Obsidian statuette with gold'
		},
		'2500': {
			'1': 'Fine gold chain set with a fire opal',
			'2': 'Old masterpiece painting',
			'3': 'Embroidered silk and velvet mantle set with numerous moonstones',
			'4': 'Platinum bracelet set with a sapphire',
			'5': 'Embroidered glove set with jewel chips',
			'6': 'Jeweled anklet',
			'7': 'Gold music box',
			'8': 'Gold circlet set with four aquamarines',
			'9': 'Eye patch with a mock eye set in blue sapphire and moonstone',
			'10': 'A necklace string of small pink pearls'
		},
		'7500': {
			'1': 'Jeweled gold crown',
			'2': 'jeweled platinum ring',
			'3': 'Small gold statuette set with rubies',
			'4': 'Gold cup set with emeralds',
			'5': 'Gold jewelry box with platinum filigree',
			'6': 'Painted gold child\'s sarcophagus',
			'7': 'jade game board with solid gold playing pieces',
			'8': 'Bejeweled ivory drinking horn with gold filigree'
		}
	};

	DND5.random_art_object = function (gp_value) {
		var art_objects_set = DND5.art_object[gp_value.toString()];
		return art_objects_set[dice(1, Object.keys(art_objects_set).length).toString()] + ' (' + gp_value + ' GP)';
	};

	DND5.random_art_objects = function (num, gp_value) {
		var art_objects = [];
		for (var i = 0; i < num; ++i) {
			art_objects.push(DND5.random_art_object(gp_value));
		}
		return art_objects;
	};

	DND5.individual_treasure = function (cr) {
		var output = {
			cp: 0,
			sp: 0,
			ep: 0,
			gp: 0,
			pp: 0,
			gems: [],
			art_objects: [],
			magic_items: []
		};
		var d100 = dice(1, 100);
		if (cr === '0-4') {
			if (d100 >= 1 && d100 <= 30) {
				// 5d6 (17) CP
				output.cp = dice(5, 6);
			} else if (d100 >= 31 && d100 <= 60) {
				// 4d6 (14) SP
				output.sp = dice(4, 6);
			} else if (d100 >= 61 && d100 <= 70) {
				// 3d6 (10) EP
				output.ep = dice(3, 6);
			} else if (d100 >= 71 && d100 <= 95) {
				// 3d6 (10) GP
				output.gp = dice(3, 6);
			} else if (d100 >= 96 && d100 <= 100) {
				// 1d6 (3) PP
				output.pp = dice(1, 6);
			}
		} else if (cr === '5-10') {
			if (d100 >= 1 && d100 <= 30) {
				// 4d6 * 100 (1400) CP + 1d6 * 10 (35) EP
				output.cp = dice(4, 6) * 100;
				output.ep = dice(1, 6) * 10;
			} else if (d100 >= 31 && d100 <= 60) {
				// 6d6 * 10 (210) SP + 2d6 * 10 (70) GP
				output.sp = dice(6, 6) * 10;
				output.gp = dice(2, 6) * 10;
			} else if (d100 >= 61 && d100 <= 70) {
				// 3d6 * 10 (105) EP + 2d6 * 10 (70) GP
				output.ep = dice(3, 6) * 10;
				output.gp = dice(2, 6) * 10;
			} else if (d100 >= 71 && d100 <= 95) {
				// 4d6 * 10 (140) GP
				output.gp = dice(4, 6) * 10;
			} else if (d100 >= 96 && d100 <= 100) {
				// 2d6 * 10 (70) GP + 3d6 (10) PP
				output.gp = dice(2, 6) * 10;
				output.pp = dice(3, 6);
			}
		} else if (cr === '11-16') {
			if (d100 >= 1 && d100 <= 20) {
				// 4d6 * 100 (1400) SP + 1d6 * 100 (350) GP
				output.sp = dice(4, 6) * 100;
				output.gp = dice(1, 6) * 100;
			} else if (d100 >= 21 && d100 <= 35) {
				// 1d6 * 100 (350) EP + 1d6 * 100 (350) GP
				output.ep = dice(1, 6) * 100;
				output.gp = dice(1, 6) * 100;
			} else if (d100 >= 36 && d100 <= 75) {
				// 2d6 * 100 (700) GP + 1d6 * 10 (35) PP
				output.gp = dice(2, 6) * 100;
				output.pp = dice(1, 6) * 10;
			} else if (d100 >= 76 && d100 <= 100) {
				// 2d6 * 100 (700) GP + 2d6 * 10 (70) PP
				output.gp = dice(2, 6) * 100;
				output.pp = dice(2, 6) * 10;
			}
		} else if (cr === '17+') {
			if (d100 >= 1 && d100 <= 15) {
				// 2d6 * 1000 (7000) EP + 8d6 * 100 (2800) GP
				output.ep = dice(2, 6) * 1000;
				output.gp = dice(8, 6) * 100;
			} else if (d100 >= 16 && d100 <= 55) {
				// 1d6 * 1000 (3500) GP + 1d6 * 100 (350) PP
				output.gp = dice(1, 6) * 1000;
				output.pp = dice(1, 6) * 100;
			} else if (d100 >= 56 && d100 <= 100) {
				// 1d6 * 1000 (3500) GP + 2d6 * 100 (700) PP
				output.gp = dice(1, 6) * 1000;
				output.pp = dice(2, 6) * 100;
			}
		}
		return output;
	};

	DND5.treasure_hoard = function (cr) {
		var output = {
			cp: 0,
			sp: 0,
			ep: 0,
			gp: 0,
			pp: 0,
			gems: [],
			art_objects: [],
			magic_items: []
		};
		var d100 = dice(1, 100);
		if (cr === '0-4') {
			// 6d6 * 100 (2100) CP + 3d6 * 100 (1050) SP + 2d6 * 10 (70) GP
			output.cp = dice(6, 6) * 100;
			output.sp = dice(3, 6) * 100;
			output.gp = dice(2, 6) * 10;
			if (d100 >= 1 && d100 <= 6) {
				// nothing
			} else if (d100 >= 7 && d100 <= 16) {
				// 2d6 (7) 10 GP gems
				output.gems = DND5.random_gems(dice(2, 6), 10);
			} else if (d100 >= 17 && d100 <= 26) {
				// 2d4 (5) 25 GP art objects
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
			} else if (d100 >= 27 && d100 <= 36) {
				// 2d6 (7) 50 GP gems
				output.gems = DND5.random_gems(dice(2, 6), 50);
			} else if (d100 >= 37 && d100 <= 44) {
				// 2d6 (7) 10 GP gems + Roll 1d6 times on Magic Item Table A
				output.gems = DND5.random_gems(dice(2, 6), 10);
				// TODO
			} else if (d100 >= 45 && d100 <= 52) {
				// 2d4 (5) 25 GP art objects + Roll 1d6 times on Magic Item Table A
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				// TODO
			} else if (d100 >= 53 && d100 <= 60) {
				// 2d6 (7) 50 GP gems + Roll 1d6 times on Magic Item Table A
				output.gems = DND5.random_gems(dice(2, 6), 50);
				// TODO
			} else if (d100 >= 61 && d100 <= 65) {
				// 2d6 (7) 10 GP gems + Roll 1d4 times on Magic Item Table B
				output.gems = DND5.random_gems(dice(2, 6), 10);
				// TODO
			} else if (d100 >= 66 && d100 <= 70) {
				// 2d4 (5) 25 GP art objects + Roll 1d4 times on Magic Item Table B
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				// TODO
			} else if (d100 >= 71 && d100 <= 75) {
				// 2d6 (7) 50 GP gems + Roll 1d4 times on Magic Item Table B
				output.gems = DND5.random_gems(dice(2, 6), 50);
				// TODO
			} else if (d100 >= 76 && d100 <= 78) {
				// 2d6 (7) 10 GP gems + Roll 1d4 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(2, 6), 10);
				// TODO
			} else if (d100 >= 79 && d100 <= 80) {
				// 2d4 (5) 25 GP art objects + Roll 1d4 times on Magic Item Table C
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				// TODO
			} else if (d100 >= 81 && d100 <= 85) {
				// 2d6 (7) 50 GP gems + Roll 1d4 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(2, 6), 50);
				// TODO
			} else if (d100 >= 86 && d100 <= 92) {
				// 2d4 (5) 25 GP art objects + Roll 1d4 times on Magic Item Table F
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				// TODO
			} else if (d100 >= 93 && d100 <= 97) {
				// 2d6 (7) 50 GP gems + Roll 1d4 times on Magic Item Table F
				output.gems = DND5.random_gems(dice(2, 6), 50);
				// TODO
			} else if (d100 >= 98 && d100 <= 99) {
				// 2d4 (5) 25 GP art objects + Roll once on Magic Item Table G
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				// TODO
			} else if (d100 === 100) {
				// 2d6 (7) 50 GP gems + Roll once on Magic Item Table G
				output.gems = DND5.random_gems(dice(2, 6), 50);
				// TODO
			}
		} else if (cr === '5-10') {
			// 2d6 * 100 (700) CP + 2d6 * 1000 (7000) SP + 6d6 * 10 (2100) GP + 3d6 * 10 (105) PP
			output.cp = dice(2, 6) * 100;
			output.sp = dice(2, 6) * 1000;
			output.gp = dice(6, 6) * 10;
			output.pp = dice(3, 6) * 10;
			// TODO
		} else if (cr === '11-16') {
			// 4d6 * 1000 (14000) GP + 5d6 * 100 (1750) PP
			output.gp = dice(4, 6) * 1000;
			output.pp = dice(5, 6) * 100;
			// TODO
		} else if (cr === '17+') {
			// 12d6 * 1000 (42000) GP + 8d6 * 1000 (28000) PP
			output.gp = dice(12, 6) * 1000;
			output.pp = dice(8, 6) * 1000;
			// TODO
		}
		return output;
	};

	window.DND5 = DND5;
})();
