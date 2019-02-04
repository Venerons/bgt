(function () {
	'use strict';

	var DND5 = Object.create(null);

	DND5.challenge_rating_xp = {
		'0': 10,
		'1/8': 25,
		'1/4': 50,
		'1/2': 100,
		'1': 200,
		'2': 450,
		'3': 700,
		'4': 1100,
		'5': 1800,
		'6': 2300,
		'7': 2900,
		'8': 3900,
		'9': 5000,
		'10': 5900,
		'11': 7200,
		'12': 8400,
		'13': 10000,
		'14': 11500,
		'15': 13000,
		'16': 15000,
		'17': 18000,
		'18': 20000,
		'19': 22000,
		'20': 25000,
		'21': 33000,
		'22': 41000,
		'23': 50000,
		'24': 62000,
		'30': 155000
	};

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
		var art_objects_set = DND5.art_objects[gp_value.toString()];
		return art_objects_set[dice(1, Object.keys(art_objects_set).length).toString()] + ' (' + gp_value + ' GP)';
	};

	DND5.random_art_objects = function (num, gp_value) {
		var art_objects = [];
		for (var i = 0; i < num; ++i) {
			art_objects.push(DND5.random_art_object(gp_value));
		}
		return art_objects;
	};

	DND5.magic_items = {
		'A': {
			'01-50': 'Potion of healing',
			'51-60': 'Spell scroll (cantrip)',
			'61-70': 'Potion of climbing',
			'71-90': 'Spell scroll (1st level)',
			'91-94': 'Spell scroll (2nd level)',
			'95-98': 'Potion of greater healing',
			'99': 'Bag of holding',
			'100': 'Driftglobe'
		},
		'B': {
			'01-15': 'Potion of greater healing',
			'16-22': 'Potion of fire breath',
			'23-29': 'Potion of resistance',
			'30-34': 'Ammunition, +1',
			'35-39': 'Potion of animal friendship',
			'40-44': 'Potion of hill giant strength',
			'45-49': 'Potion of growth',
			'50-54': 'Potion of water breathing',
			'55-59': 'Spell scroll (2nd level)',
			'60-64': 'Spell scroll (3rd leve l)',
			'65-67': 'Bag of holding',
			'68-70': 'Keoghtom\'s ointment',
			'71-73': 'Oil of slipperiness',
			'74-75': 'Dust of disappearance',
			'76-77': 'Dust of dryness',
			'78-79': 'Dust of sneezing and choking',
			'80-81': 'Elemental gem',
			'82-83': 'Philter of love',
			'84': 'Alchemy jug',
			'85': 'Cap of water breathing',
			'86': 'Cloak of the manta ray',
			'87': 'Driftglobe',
			'88': 'Goggles of night',
			'89': 'Helm of comprehending languages',
			'90': 'Immovable rod',
			'91': 'Lantern of revealing',
			'92': 'Mariner\'s armor',
			'93': 'Mithral armor',
			'94': 'Potion of poison',
			'95': 'Ring of swimming',
			'96': 'Robe of useful items',
			'97': 'Rope of climbing',
			'98': 'Saddle of the cavalier',
			'99': 'Wand of magic detection',
			'100': 'Wand of secrets'
		},
		'C': {
			'01-15': 'Potion of superior healing',
			'16-22': 'Spell scroll (4th level)',
			'23-27': 'Ammunition, +2',
			'28-32': 'Potion of clairvoyance',
			'33-37': 'Potion of diminution',
			'38-42': 'Potion of gaseous form',
			'43-47': 'Potion of frost giant strength',
			'48-52': 'Potion of stone giant strength',
			'53-57': 'Potion of heroism',
			'58-62': 'Potion of invulnerability',
			'63-67': 'Potion of mind reading',
			'68-72': 'Spell scroll (5th level)',
			'73-75': 'Elixir of health',
			'76-78': 'Oil of etherealness',
			'79-81': 'Potion of fire giant strength',
			'82-84': 'Quaal\'s feather token',
			'85-87': 'Scroll of protection',
			'88-89': 'Bag of beans',
			'90-91': 'Bead of force',
			'92': 'Chime of opening',
			'93': 'Decanter of endless water',
			'94': 'Eyes of minute seeing',
			'95': 'Folding boat',
			'96': 'Heward\'s handy haversack',
			'97': 'Horseshoes of speed',
			'98': 'Necklace of fireballs',
			'99': 'Periapt of health',
			'100': 'Sending stones'
		},
		'D': {
			'01-20': 'Potion of supreme healing',
			'21-30': 'Potion of invisibility',
			'31-40': 'Potion of speed',
			'41-50': 'Spell scroll (6th level)',
			'51-57': 'Spell scroll (7th level)',
			'58-62': 'Ammunition, +3',
			'63-67': 'Oil of sharpness',
			'68-72': 'Potion of fl yi ng',
			'73-77': 'Potion of cloud giant strength',
			'78-82': 'Potion of longevity',
			'83-87': 'Potion of vitality',
			'88-92': 'Spell scroll (8th le vel)',
			'93-95': 'Horseshoes of a zephyr',
			'96-98': 'Nolzur\'s marvelous pigments',
			'99': 'Bag of devouring',
			'100': 'Portable hole'
		},
		'E': {
			'01-30': 'Spell scroll (8th level)',
			'31-55': 'Potion of storm giant strength',
			'56-70': 'Potion of supreme healing',
			'71-85': 'Spell scroll (9th level)',
			'86-93': 'Universal solvent',
			'94-98': 'Arrow of slaying',
			'99-100': 'Sovereign glue'
		},
		'F': {
			'01-15': 'Weapon, +1',
			'16-18': 'Shield,+ 1',
			'19-21': 'Sentinel shield',
			'22-23': 'Amulet of proof against detection and location',
			'24-25': 'Boots of elvenkind',
			'26-27': 'Boots of striding and springing',
			'28-29': 'Bracers of archery',
			'30-31': 'Brooch of shielding',
			'32-33': 'Broom of flying',
			'34-35': 'Cloak of elvenkind',
			'36-37': 'Cloak of protection',
			'38-39': 'Gauntlets of ogre power',
			'40-41': 'Hat of disguise',
			'42-43': 'Javelin of lightning',
			'44-45': 'Pearl of power',
			'46-47': 'Rod of the pact keeper, + 1',
			'48-49': 'Slippers of spider climbing',
			'50-51': 'Staff of the adder',
			'52-53': 'Staff of the python',
			'54-55': 'Sword of vengeance',
			'56-57': 'Trident of fish command',
			'58-59': 'Wand of magic missiles',
			'60-61': 'Wand of the war mage, + 1',
			'62-63': 'Wand of web',
			'64-65': 'Weapon of warning',
			'66': 'Adamantine armor (chain mail)',
			'67': 'Adamantine armor (chain shirt)',
			'68': 'Adamantine armor (scale mail)',
			'69': 'Bag of tricks (gray)',
			'70': 'Bag of tricks (rust)',
			'71': 'Bag of tricks (tan)',
			'72': 'Boots of the winterlands',
			'73': 'Circlet of blasting',
			'74': 'Deck of illusions',
			'75': 'Eversmoking bottle',
			'76': 'Eyes of charming',
			'77': 'Eyes of the eagle',
			'78': 'Figurine of wondrous power (silver raven)',
			'79': 'Gem of brightness',
			'80': 'Gloves of missile snaring',
			'81': 'Gloves of swimming and climbing',
			'82': 'Gloves of thievery',
			'83': 'Headband of intellect',
			'84': 'Helm of telepathy',
			'85': 'Instrument of the bards (Doss lute)',
			'86': 'Instrument of the bards (Fochlucan bandore)',
			'87': 'Instrument of the bards (Mac-Fuimidh cittern)',
			'88': 'Medallion of thoughts',
			'89': 'Necklace of adaptation',
			'90': 'Periapt of wound closure',
			'91': 'Pipes of haunting',
			'92': 'Pipes of the sewers',
			'93': 'Ring of jumping',
			'94': 'Ring of mind shielding',
			'95': 'Ring of warmth',
			'96': 'Ring of water walking',
			'97': 'Quiver of Ehlonna',
			'98': 'Stone of good luck',
			'99': 'Wind fan',
			'100': 'Winged boots'
		},
		'G': {
			'01-11': 'Weapon, +2',
			'12-14': 'Figurine of wondrous power (roll 1d8)',
			'15': 'Adamantine armor (breastplate)',
			'16': 'Adamantine armor (splint)',
			'17': 'Amulet of health',
			'18': 'Armor of vulnerability',
			'19': 'Arrow-catching shield',
			'20': 'Belt of dwarvenkind',
			'21': 'Belt of hill giant strength',
			'22': 'Berserker axe',
			'23': 'Boots of levitation',
			'24': 'Boots of speed',
			'25': 'Bowl of commanding water elementals',
			'26': 'Bracers of defense',
			'27': 'Brazier of commanding fire elementals',
			'28': 'Cape of the mountebank',
			'29': 'Censer of controlling air elementals',
			'30': 'Armor, +1 chain mail',
			'31': 'Armor of resistance (chain mail)',
			'32': 'Armor,+ 1 chain shirt',
			'33': 'Armor of resistance (chain shirt)',
			'34': 'Cloak of displacement',
			'35': 'Cloak of the bat',
			'36': 'Cube afforce',
			'37': 'Daern\'s instant fortress',
			'38': 'Dagger of venom',
			'39': 'Dimensional shackles',
			'40': 'Dragon slayer',
			'41': 'Elven chain',
			'42': 'Flame tongue',
			'43': 'Gem of seeing',
			'44': 'Giant slayer',
			'45': 'Clamoured studded leather',
			'46': 'Helm of teleportation',
			'47': 'Horn of blasting',
			'48': 'Horn of Valhalla (silver or brass)',
			'49': 'Instrument of the bards (Canaith mandolin)',
			'50': 'Instrument of the bards (Ciilyre)',
			'51': 'Ioun stone (awareness)',
			'52': 'Ioun stone (protection)',
			'53': 'Ioun stone (reserve)',
			'54': 'Ioun stone (sustenance)',
			'55': 'Iron bands of Bilarro',
			'56': 'Armor, + 1 leather',
			'57': 'Armor of resistance (leather)',
			'58': 'Mace of disruption',
			'59': 'Mace of smiting',
			'60': 'Mace of terror',
			'61': 'Mantle of spell resistance',
			'62': 'Necklace of prayer beads',
			'63': 'Periapt of proof against poison',
			'64': 'Ring of animal influence',
			'65': 'Ring of evasion',
			'66': 'Ring of feather falling',
			'67': 'Ring of free action',
			'68': 'Ring of protection',
			'69': 'Ring of resistance',
			'70': 'Ring of spell storing',
			'71': 'Ring of the ram',
			'72': 'Ring of X-ray vision',
			'73': 'Robe of eyes',
			'74': 'Rod of rulership',
			'75': 'Rod of the pact keeper, +2',
			'76': 'Rope of entanglement',
			'77': 'Armor, +1 scale mail',
			'78': 'Armor of resistance (scale mail)',
			'79': 'Shield, +2',
			'80': 'Shield of missile attraction',
			'81': 'Staff of charming',
			'82': 'Staff of healing',
			'83': 'Staff of swarming insects',
			'84': 'Staff of the woodlands',
			'85': 'Staff of withering',
			'86': 'Stone of controlling earth elementals',
			'87': 'Sun blade',
			'88': 'Sword of life stealing',
			'89': 'Sword of wounding',
			'90': 'Tentacle rod',
			'91': 'Vicious weapon',
			'92': 'Wand of binding',
			'93': 'Wand of enemy detection',
			'94': 'Wand of fear',
			'95': 'Wand of fireballs',
			'96': 'Wand of lightning bolts',
			'97': 'Wand of paralysis',
			'98': 'Wand of the war mage, +2',
			'99': 'Wand of wonder',
			'100': 'Wings of flying'
		},
		'H': {
			'01-10': 'Weapon, +3',
			'11-12': 'Amulet of the planes',
			'13-14': 'Carpet of flying',
			'15-16': 'Crystal ball (very rare version)',
			'17-18': 'Ring of regeneration',
			'19-20': 'Ring of shooting stars',
			'21-22': 'Ring of telekinesis',
			'23-24': 'Robe of scintillating colors',
			'25-26': 'Robe of stars',
			'27-28': 'Rod of absorption',
			'29-30': 'Rod of alertness',
			'31-32': 'Rod of security',
			'33-34': 'Rod of the pact keeper, +3',
			'35-36': 'Scimitar of speed',
			'37-38': 'Shield, +3',
			'39-40': 'Staff of fire',
			'41-42': 'Staff of frost',
			'43-44': 'Staff of power',
			'45-46': 'Staff of striking',
			'47-48': 'Staff of thunder and lightning',
			'49-50': 'Sword of sharpness',
			'51-52': 'Wand of polymorph',
			'53-54': 'Wand of the war mage, +3',
			'55': 'Adamantine armor (half plate)',
			'56': 'Adamantine armor (plate)',
			'57': 'Animated shield',
			'58': 'Belt of fire giant strength',
			'59': 'Belt of frost (or stone) giant strength',
			'60': 'Armor, + 1 breastplate',
			'61': 'Armor of resistance (breastplate)',
			'62': 'Candle of invocation',
			'63': 'Armor, +2 chain mail',
			'64': 'Armor, +2 chain shirt',
			'65': 'Cloak of arachnida',
			'66': 'Dancing sword',
			'67': 'Demon armor',
			'68': 'Dragon scale mail',
			'69': 'Dwarven plate',
			'70': 'Dwarven thrower',
			'71': 'Efreeti bottle',
			'72': 'Figurine of wondrous power (obsidian steed)',
			'73': 'Frost brand',
			'74': 'Helm of brilliance',
			'75': 'Horn ofValhalla (bronze)',
			'76': 'Instrument of the bards (Anstruth harp)',
			'77': 'Ioun stone (absorption)',
			'78': 'Ioun stone (agility)',
			'79': 'Ioun stone (fortitude)',
			'80': 'Ioun stone (insight)',
			'81': 'Ioun stone (intellect)',
			'82': 'Ioun stone (leadership)',
			'83': 'Ioun stone (strength)',
			'84': 'Armor, +2 leather',
			'85': 'Manual of bodily health',
			'86': 'Manual of gainful exercise',
			'87': 'Manual of golems',
			'88': 'Manual of quickness of action',
			'89': 'Mirror of life trapping',
			'90': 'Nine lives stealer',
			'91': 'Oath bow',
			'92': 'Armor, +2 scale mail',
			'93': 'Spellguard shield',
			'94': 'Armor, + 1 splint',
			'95': 'Armor of resistance (splint)',
			'96': 'Armor, + 1 studded leather',
			'97': 'Armor of resistance (studded leather)',
			'98': 'Tome of clear thought',
			'99': 'Tome of leadership and influence',
			'100': 'Tome of understanding'
		},
		'I': {
			'01-05': 'Defender',
			'06-10': 'Hammer of thunderbolts',
			'11-15': 'Luck blade',
			'16-20': 'Sword of answering',
			'21-23': 'Holy avenger',
			'24-26': 'Ring of djinni summoning',
			'27-29': 'Ring of invisibility',
			'30-32': 'Ring of spell turning',
			'33-35': 'Rod of lordly might',
			'36-38': 'Staff of the magi',
			'39-41': 'Vorpal sword',
			'42-43': 'Belt of cloud giant strength',
			'44-45': 'Armor, +2 breastplate',
			'46-47': 'Armor, +3 chain mail',
			'48-49': 'Armor, +3 chain shirt',
			'50-51': 'Cloak of invisibility',
			'52-53': 'Crystal ball (legendary version)',
			'54-55': 'Armor, + 1 half plate',
			'56-57': 'Iron flask',
			'58-59': 'Armor, +3 leather',
			'60-61': 'Armor, +1 plate',
			'62-63': 'Robe of the archmagi',
			'64-65': 'Rod of resurrection',
			'66-67': 'Armor, +1 scale mail',
			'68-69': 'Scarab of protection',
			'70-71': 'Armor, +2 splint',
			'72-73': 'Armor, +2 studded leather',
			'74-75': 'Well of many worlds',
			'76': 'Magic armor (roll 1d12)',
			'77': 'Apparatus of Kwalish',
			'78': 'Armor of invulnerability',
			'79': 'Belt of storm giant strength',
			'80': 'Cubic gate',
			'81': 'Deck of many things',
			'82': 'Efreeti chain',
			'83': 'Armor of resistance (half plate)',
			'84': 'Horn ofValhalla (iron)',
			'85': 'Instrument of the bards (OIIamh harp)',
			'86': 'Ioun stone (greater absorption)',
			'87': 'Ioun stone (mastery)',
			'88': 'Ioun stone (regeneration)',
			'89': 'Plate armor of etherealness',
			'90': 'Plate armor of resistance',
			'91': 'Ring of air elemental command',
			'92': 'Ring of earth elemental command',
			'93': 'Ring of fire elemental command',
			'94': 'Ring of three wishes',
			'95': 'Ring of water elemental command',
			'96': 'Sphere of annihilation',
			'97': 'Talisman of pure good',
			'98': 'Talisman of the sphere',
			'99': 'Talisman of ultimate evil',
			'100': 'Tome of the stilled tongue'
		}
	};

	DND5.random_magic_item = function (table) {
		var magic_items_set = DND5.magic_items[table.toString()],
			d100 = dice(1, 100),
			item;
		Object.keys(magic_items_set).forEach(function (key) {
			var min = parseInt(key.split('-')[0], 10),
				max = parseInt(key.split('-')[1], 10);
			if (!isNaN(min) && d100 >= min) {
				if (isNaN(max) || !isNaN(max) && d100 <= max) {
					item = magic_items_set[key];
				}
			}
		});
		return item;
	};

	DND5.random_magic_items = function (num, table) {
		var magic_items = [];
		for (var i = 0; i < num; ++i) {
			magic_items.push(DND5.random_magic_item(table));
		}
		return magic_items;
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
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'A');
			} else if (d100 >= 45 && d100 <= 52) {
				// 2d4 (5) 25 GP art objects + Roll 1d6 times on Magic Item Table A
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'A');
			} else if (d100 >= 53 && d100 <= 60) {
				// 2d6 (7) 50 GP gems + Roll 1d6 times on Magic Item Table A
				output.gems = DND5.random_gems(dice(2, 6), 50);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'A');
			} else if (d100 >= 61 && d100 <= 65) {
				// 2d6 (7) 10 GP gems + Roll 1d4 times on Magic Item Table B
				output.gems = DND5.random_gems(dice(2, 6), 10);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'B');
			} else if (d100 >= 66 && d100 <= 70) {
				// 2d4 (5) 25 GP art objects + Roll 1d4 times on Magic Item Table B
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'B');
			} else if (d100 >= 71 && d100 <= 75) {
				// 2d6 (7) 50 GP gems + Roll 1d4 times on Magic Item Table B
				output.gems = DND5.random_gems(dice(2, 6), 50);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'B');
			} else if (d100 >= 76 && d100 <= 78) {
				// 2d6 (7) 10 GP gems + Roll 1d4 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(2, 6), 10);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'C');
			} else if (d100 >= 79 && d100 <= 80) {
				// 2d4 (5) 25 GP art objects + Roll 1d4 times on Magic Item Table C
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'C');
			} else if (d100 >= 81 && d100 <= 85) {
				// 2d6 (7) 50 GP gems + Roll 1d4 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(2, 6), 50);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'C');
			} else if (d100 >= 86 && d100 <= 92) {
				// 2d4 (5) 25 GP art objects + Roll 1d4 times on Magic Item Table F
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'F');
			} else if (d100 >= 93 && d100 <= 97) {
				// 2d6 (7) 50 GP gems + Roll 1d4 times on Magic Item Table F
				output.gems = DND5.random_gems(dice(2, 6), 50);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'F');
			} else if (d100 >= 98 && d100 <= 99) {
				// 2d4 (5) 25 GP art objects + Roll once on Magic Item Table G
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(1, 'G');
			} else if (d100 === 100) {
				// 2d6 (7) 50 GP gems + Roll once on Magic Item Table G
				output.gems = DND5.random_gems(dice(2, 6), 50);
				output.magic_items = DND5.random_magic_items(1, 'G');
			}
		} else if (cr === '5-10') {
			// 2d6 * 100 (700) CP + 2d6 * 1000 (7000) SP + 6d6 * 10 (2100) GP + 3d6 * 10 (105) PP
			output.cp = dice(2, 6) * 100;
			output.sp = dice(2, 6) * 1000;
			output.gp = dice(6, 6) * 10;
			output.pp = dice(3, 6) * 10;
			if (d100 >= 1 && d100 <= 4) {
				// nothing
			} else if (d100 >= 5 && d100 <= 10) {
				// 2d4 (5) 25 GP art objects
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
			} else if (d100 >= 11 && d100 <= 16) {
				// 3d6 (10) 50 GP gems
				output.gems = DND5.random_gems(dice(3, 6), 50);
			} else if (d100 >= 17 && d100 <= 22) {
				// 3d6 (10) 100 GP gems
				output.gems = DND5.random_gems(dice(3, 6), 100);
			} else if (d100 >= 23 && d100 <= 28) {
				// 2d4 (5) 250 GP art objects
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
			} else if (d100 >= 29 && d100 <= 32) {
				// 2d4 (5) 25 GP art objects + Roll 1d6 times on Magic Item Table A
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'A');
			} else if (d100 >= 33 && d100 <= 36) {
				// 3d6 (10) 50 GP gems + Roll 1d6 times on Magic Item Table A
				output.gems = DND5.random_gems(dice(3, 6), 50);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'A');
			} else if (d100 >= 37 && d100 <= 40) {
				// 3d6 (10) 100 GP gems + Roll 1d6 times on Magic Item Table A
				output.gems = DND5.random_gems(dice(3, 6), 100);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'A');
			} else if (d100 >= 41 && d100 <= 44) {
				// 2d4 (5) 250 GP art objects + Roll 1d6 times on Magic Item Table A
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'A');
			} else if (d100 >= 45 && d100 <= 49) {
				// 2d4 (5) 25 GP art objects + Roll 1d4 times on Magic Item Table B
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'B');
			} else if (d100 >= 50 && d100 <= 54) {
				// 3d6 (10) 50 GP gems + Roll 1d4 times on Magic Item Table B
				output.gems = DND5.random_gems(dice(3, 6), 50);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'B');
			} else if (d100 >= 55 && d100 <= 59) {
				// 3d6 (10) 100 GP gems + Roll 1d4 times on Magic Item Table B
				output.gems = DND5.random_gems(dice(3, 6), 100);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'B');
			} else if (d100 >= 60 && d100 <= 63) {
				// 2d4 (5) 250 GP art objects + Roll 1d4 times on Magic Item Table B
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'B');
			} else if (d100 >= 64 && d100 <= 66) {
				// 2d4 (5) 25 GP art objects + Roll 1d4 times on Magic Item Table C
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'C');
			} else if (d100 >= 67 && d100 <= 69) {
				// 3d6 (10) 50 GP gems + Roll 1d4 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(3, 6), 50);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'C');
			} else if (d100 >= 70 && d100 <= 72) {
				// 3d6 (10) 100 GP gems + Roll 1d4 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(3, 6), 100);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'C');
			} else if (d100 >= 73 && d100 <= 74) {
				// 2d4 (5) 250 GP art objects + Roll 1d4 times on Magic Item Table C
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'C');
			} else if (d100 >= 75 && d100 <= 76) {
				// 2d4 (5) 25 GP art objects + Roll once on Magic Item Table D
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(1, 'D');
			} else if (d100 >= 77 && d100 <= 78) {
				// 3d6 (10) 50 GP gems + Roll once on Magic Item Table D
				output.gems = DND5.random_gems(dice(3, 6), 50);
				output.magic_items = DND5.random_magic_items(1, 'D');
			} else if (d100 === 79) {
				// 3d6 (10) 100 GP gems + Roll once on Magic Item Table D
				output.gems = DND5.random_gems(dice(3, 6), 100);
				output.magic_items = DND5.random_magic_items(1, 'D');
			} else if (d100 === 80) {
				// 2d4 (5) 250 GP art objects + Roll once on Magic Item Table D
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(1, 'D');
			} else if (d100 >= 81 && d100 <=  84) {
				// 2d4 (5) 25 GP art objects + Roll 1d4 times on Magic Item Table F
				output.art_objects = DND5.random_art_objects(dice(2, 4), 25);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'F');
			} else if (d100 >= 85 && d100 <= 88) {
				// 3d6 (10) 50 GP gems + Roll 1d4 times on Magic Item Table F
				output.gems = DND5.random_gems(dice(3, 6), 50);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'F');
			} else if (d100 >= 89 && d100 <= 91) {
				// 3d6 (10) 100 GP gems + Roll 1d4 times on Magic Item Table F
				output.gems = DND5.random_gems(dice(3, 6), 100);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'F');
			} else if (d100 >= 92 && d100 <= 94) {
				// 2d4 (5) 250 GP art objects + Roll 1d4 times on Magic Item Table F
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'F');
			} else if (d100 >= 95 && d100 <= 96) {
				// 3d6 (10) 100 GP gems + Roll 1d4 times on Magic Item Table G
				output.gems = DND5.random_gems(dice(3, 6), 100);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'G');
			} else if (d100 >= 97 && d100 <= 98) {
				// 2d4 (5) 250 GP art objects + Roll 1d4 times on Magic Item Table G
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'G');
			} else if (d100 === 99) {
				// 3d6 (10) 100 GP gems + Roll once on Magic Item Table H
				output.gems = DND5.random_gems(dice(3, 6), 100);
				output.magic_items = DND5.random_magic_items(1, 'H');
			} else if (d100 === 100) {
				// 2d4 (5) 250 GP art objects + Roll once on Magic Item Table H
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(1, 'H');
			}
		} else if (cr === '11-16') {
			// 4d6 * 1000 (14000) GP + 5d6 * 100 (1750) PP
			output.gp = dice(4, 6) * 1000;
			output.pp = dice(5, 6) * 100;
			if (d100 >= 1 && d100 <= 3) {
				// nothing
			} else if (d100 >= 4 && d100 <= 6) {
				// 2d4 (5) 250 GP art objects
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
			} else if (d100 >= 7 && d100 <= 9) {
				// 2d4 (5) 750 GP art objects
				output.art_objects = DND5.random_art_objects(dice(2, 4), 750);
			} else if (d100 >= 11 && d100 <= 12) {
				// 3d6 (10) 500 GP gems
				output.gems = DND5.random_gems(dice(3, 6), 500);
			} else if (d100 >= 13 && d100 <= 15) {
				// 3d6 (10) 1000 GP gems
				output.gems = DND5.random_gems(dice(3, 6), 1000);
			} else if (d100 >= 16 && d100 <= 19) {
				// 2d4 (5) 250 GP art objects + Roll 1d4 times on Magic Item Table A and 1d6 times on Magic Item Table B
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'A').concat(DND5.random_magic_items(dice(1, 6), 'B'));
			} else if (d100 >= 20 && d100 <= 23) {
				// 2d4 (5) 750 GP art objects + Roll 1d4 times on Magic Item Table A and 1d6 times on Magic Item Table B
				output.art_objects = DND5.random_art_objects(dice(2, 4), 750);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'A').concat(DND5.random_magic_items(dice(1, 6), 'B'));
			} else if (d100 >= 24 && d100 <= 26) {
				// 3d6 (10) 500 GP gems + Roll 1d4 times on Magic Item Table A and 1d6 times on Magic Item Table B
				output.gems = DND5.random_gems(dice(3, 6), 500);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'A').concat(DND5.random_magic_items(dice(1, 6), 'B'));
			} else if (d100 >= 27 && d100 <= 29) {
				// 3d6 (10) 1000 GP gems + Roll 1d4 times on Magic Item Table A and 1d6 times on Magic Item Table B
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'A').concat(DND5.random_magic_items(dice(1, 6), 'B'));
			} else if (d100 >= 30 && d100 <= 35) {
				// 2d4 (5) 250 GP art objects + Roll 1d6 times on Magic Item Table C
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'C');
			} else if (d100 >= 36 && d100 <= 40) {
				// 2d4 (5) 750 GP art objects + Roll 1d6 times on Magic Item Table C
				output.art_objects = DND5.random_art_objects(dice(2, 4), 750);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'C');
			} else if (d100 >= 41 && d100 <= 45) {
				// 3d6 (10) 500 GP gems + Roll 1d6 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(3, 6), 500);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'C');
			} else if (d100 >= 46 && d100 <= 50) {
				// 3d6 (10) 1000 GP gems + Roll 1d6 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'C');
			} else if (d100 >= 51 && d100 <= 54) {
				// 2d4 (5) 250 GP art objects + Roll 1d4 times on Magic Item Table D
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'D');
			} else if (d100 >= 55 && d100 <= 58) {
				// 2d4 (5) 750 GP art objects + Roll 1d4 times on Magic Item Table D
				output.art_objects = DND5.random_art_objects(dice(2, 4), 750);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'D');
			} else if (d100 >= 59 && d100 <= 62) {
				// 3d6 (10) 500 GP gems + Roll 1d4 times on Magic Item Table D
				output.gems = DND5.random_gems(dice(3, 6), 500);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'D');
			} else if (d100 >= 63 && d100 <= 66) {
				// 3d6 (10) 1000 GP gems + Roll 1d4 times on Magic Item Table D
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'D');
			} else if (d100 >= 67 && d100 <= 68) {
				// 2d4 (5) 250 GP art objects + Roll once on Magic Item Table E
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(1, 'E');
			} else if (d100 >= 69 && d100 <= 70) {
				// 2d4 (5) 750 GP art objects + Roll once on Magic Item Table E
				output.art_objects = DND5.random_art_objects(dice(2, 4), 750);
				output.magic_items = DND5.random_magic_items(1, 'E');
			} else if (d100 >= 71 && d100 <= 72) {
				// 3d6 (10) 500 GP gems + Roll once on Magic Item Table E
				output.gems = DND5.random_gems(dice(3, 6), 500);
				output.magic_items = DND5.random_magic_items(1, 'E');
			} else if (d100 >= 73 && d100 <= 74) {
				// 3d6 (10) 1000 GP gems + Roll once on Magic Item Table E
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(1, 'E');
			} else if (d100 >= 75 && d100 <= 76) {
				// 2d4 (5) 250 GP art objects + Roll once on Magic Item Table F and 1d4 times on Magic Item Table G
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(1, 'F').concat(DND5.random_magic_items(dice(1, 4), 'G'));
			} else if (d100 >= 77 && d100 <= 78) {
				// 2d4 (5) 750 GP art objects + Roll once on Magic Item Table F and 1d4 times on Magic Item Table G
				output.art_objects = DND5.random_art_objects(dice(2, 4), 750);
				output.magic_items = DND5.random_magic_items(1, 'F').concat(DND5.random_magic_items(dice(1, 4), 'G'));
			} else if (d100 >= 79 && d100 <= 80) {
				// 3d6 (10) 500 GP gems + Roll once on Magic Item Table F and 1d4 times on Magic Item Table G
				output.gems = DND5.random_gems(dice(3, 6), 500);
				output.magic_items = DND5.random_magic_items(1, 'F').concat(DND5.random_magic_items(dice(1, 4), 'G'));
			} else if (d100 >= 81 && d100 <= 82) {
				// 3d6 (1 0) 1000 GP gems + Roll once on Magic Item Table F and 1d4 times on Magic Item Table G
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(1, 'F').concat(DND5.random_magic_items(dice(1, 4), 'G'));
			} else if (d100 >= 83 && d100 <= 85) {
				// 2d4 (5) 250 GP art objects + Roll 1d4 times on Magic Item Table H
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'H');
			} else if (d100 >= 86 && d100 <= 88) {
				// 2d4 (5) 750 GP art objects + Roll 1d4 times on Magic Item Table H
				output.art_objects = DND5.random_art_objects(dice(2, 4), 750);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'H');
			} else if (d100 >= 89 && d100 <= 90) {
				// 3d6 (10) 500 GP gems + Roll 1d4 times on Magic Item Table H
				output.gems = DND5.random_gems(dice(3, 6), 500);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'H');
			} else if (d100 >= 91 && d100 <= 92) {
				// 3d6 (10) 1000 GP gems + Roll 1d4 times on Magic Item Table H
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'H');
			} else if (d100 >= 93 && d100 <= 94) {
				// 2d4 (5) 250 GP art objects + Roll once on Magic Item Table I
				output.art_objects = DND5.random_art_objects(dice(2, 4), 250);
				output.magic_items = DND5.random_magic_items(1, 'I');
			} else if (d100 >= 95 && d100 <= 96) {
				// 2d4 (5) 750 GP art objects + Roll once on Magic Item Table I
				output.art_objects = DND5.random_art_objects(dice(2, 4), 750);
				output.magic_items = DND5.random_magic_items(1, 'I');
			} else if (d100 >= 97 && d100 <= 98) {
				// 3d6 (10) 500 GP gems + Roll once on Magic Item Table I
				output.gems = DND5.random_gems(dice(3, 6), 500);
				output.magic_items = DND5.random_magic_items(1, 'I');
			} else if (d100 >= 99 && d100 <= 100) {
				// 3d6 (10) 1000 GP gems + Roll once on Magic Item Table I
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(1, 'I');
			}
		} else if (cr === '17+') {
			// 12d6 * 1000 (42000) GP + 8d6 * 1000 (28000) PP
			output.gp = dice(12, 6) * 1000;
			output.pp = dice(8, 6) * 1000;
			if (d100 >= 1 && d100 <= 2) {
				// nothing
			} else if (d100 >= 3 && d100 <= 5) {
				// 3d6 (10) 1000 GP gems + Roll 1d8 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 8), 'C');
			} else if (d100 >= 6 && d100 <= 8) {
				// 1d10 (5) 2500 GP art objects + Roll 1d8 times on Magic Item Table C
				output.art_objects = DND5.random_art_objects(dice(1, 10), 2500);
				output.magic_items = DND5.random_magic_items(dice(1, 8), 'C');
			} else if (d100 >= 9 && d100 <= 11) {
				// 1d4 (2) 7500 GP art objects + Roll 1d8 times on Magic Item Table C
				output.art_objects = DND5.random_art_objects(dice(1, 4), 7500);
				output.magic_items = DND5.random_magic_items(dice(1, 8), 'C');
			} else if (d100 >= 12 && d100 <= 14) {
				// 1d8 (4) 5000 GP gems + Roll 1d8 times on Magic Item Table C
				output.gems = DND5.random_gems(dice(1, 8), 5000);
				output.magic_items = DND5.random_magic_items(dice(1, 8), 'C');
			} else if (d100 >= 15 && d100 <= 22) {
				// 3d6 (10) 1000 GP gems + Roll 1d6 times on Magic Item Table D
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'D');
			} else if (d100 >= 23 && d100 <= 30) {
				// 1d10 (5) 2500 GP art objects + Roll 1d6 times on Magic Item Table D
				output.art_objects = DND5.random_art_objects(dice(1, 10), 2500);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'D');
			} else if (d100 >= 31 && d100 <= 38) {
				// 1d4 (2) 7500 GP art objects + Roll 1d6 times on Magic Item Table D
				output.art_objects = DND5.random_art_objects(dice(1, 4), 7500);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'D');
			} else if (d100 >= 39 && d100 <= 46) {
				// 1d8 (4) 5000 GP gems + Roll 1d6 times on Magic Item Table D
				output.gems = DND5.random_gems(dice(1, 8), 5000);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'D');
			} else if (d100 >= 47 && d100 <= 52) {
				// 3d6 (10) 1000 GP gems + Roll 1d6 times on Magic Item Table E
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'E');
			} else if (d100 >= 53 && d100 <= 58) {
				// 1d10 (5) 2500 GP art objects + Roll 1d6 times on Magic Item Table E
				output.art_objects = DND5.random_art_objects(dice(1, 10), 2500);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'E');
			} else if (d100 >= 59 && d100 <= 63) {
				// 1d4 (2) 7500 GP art objects + Roll 1d6 times on Magic Item Table E
				output.art_objects = DND5.random_art_objects(dice(1, 4), 7500);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'E');
			} else if (d100 >= 64 && d100 <= 68) {
				// 1d8 (4) 5000 GP gems + Roll 1d6 times on Magic Item Table E
				output.gems = DND5.random_gems(dice(1, 8), 5000);
				output.magic_items = DND5.random_magic_items(dice(1, 6), 'E');
			} else if (d100 === 69) {
				// 3d6 (10) 1000 GP gems + Roll 1d4 times on Magic Item Table G
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'G');
			} else if (d100 === 70) {
				// 1d10 (5) 2500 GP art objects + Roll 1d4 times on Magic Item Table G
				output.art_objects = DND5.random_art_objects(dice(1, 10), 2500);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'G');
			} else if (d100 === 71) {
				// 1d4 (2) 7500 GP art objects + Roll 1d4 times on Magic Item Table G
				output.art_objects = DND5.random_art_objects(dice(1, 4), 7500);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'G');
			} else if (d100 === 72) {
				// 1d8 (4) 5000 GP gems + Roll 1d4 times on Magic Item Table G
				output.gems = DND5.random_gems(dice(1, 8), 5000);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'G');
			} else if (d100 >= 73 && d100 <= 74) {
				// 3d6 (10) 1000 GP gems + Roll 1d4 times on Magic Item Table H
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'H');
			} else if (d100 >= 75 && d100 <= 76) {
				// 1d10 (5) 2500 GP art objects + Roll 1d4 times on Magic Item Table H
				output.art_objects = DND5.random_art_objects(dice(1, 10), 2500);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'H');
			} else if (d100 >= 77 && d100 <= 78) {
				// 1d4 (2) 7500 GP art objects + Roll 1d4 times on Magic Item Table H
				output.art_objects = DND5.random_art_objects(dice(1, 4), 7500);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'H');
			} else if (d100 >= 79 && d100 <= 80) {
				// 1d8 (4) 5000 GP gems + Roll 1d4 times on Magic Item Table H
				output.gems = DND5.random_gems(dice(1, 8), 5000);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'H');
			} else if (d100 >= 81 && d100 <= 85) {
				// 3d6 (10) 1000 GP gems + Roll 1d4 times on Magic Item Table I
				output.gems = DND5.random_gems(dice(3, 6), 1000);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'I');
			} else if (d100 >= 86 && d100 <= 90) {
				// 1d10 (5) 2500 GP art objects + Roll 1d4 times on Magic Item Table I
				output.art_objects = DND5.random_art_objects(dice(1, 10), 2500);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'I');
			} else if (d100 >= 91 && d100 <= 95) {
				// ld4 (2) 7500 GP art objects + Roll 1d4 times on Magic Item Table I
				output.art_objects = DND5.random_art_objects(dice(1, 4), 7500);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'I');
			} else if (d100 >= 96 && d100 <= 100) {
				// 1d8 (4) 5000 GP gems + Roll 1d4 times on Magic Item Table I
				output.gems = DND5.random_gems(dice(1, 8), 5000);
				output.magic_items = DND5.random_magic_items(dice(1, 4), 'I');
			}
		}
		return output;
	};

	window.DND5 = DND5;
})();
