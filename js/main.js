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
};


$('body').on('click', '[data-page]', function () {
	goToPage($(this).data('page'));
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

	$('#generic-name-random').on('click', function () {
		var nameset = $('#generic-name-nameset').val(),
			gender = $('#generic-name-gender').val(),
			set = RCN[nameset];
		if (set) {
			var output = '';
			var name = [];
			if (set.neutral) {
				name = name.concat(set.neutral);
			}
			if (set[gender])  {
				name = name.concat(set[gender]);
			}
			output += name[Math.floor(Math.random() * name.length)];
			if (set.nickname) {
				output += ' "' + set.nickname[Math.floor(Math.random() * set.nickname.length)] + '"';
			}
			['surname', 'family', 'clan', 'tribe'].forEach(function (item) {
				if (set[item]) {
					output += ' ' + set[item][Math.floor(Math.random() * set[item].length)];
				}
			});
			if (set.virtue) {
				output += ', ' + set.virtue[Math.floor(Math.random() * set.virtue.length)];
			}
			$('#generic-name-output').text(output);
		} else {
			$('#generic-name-output').text('Invalid input');
		}
	});

	$('#generic-name-list').on('click', function () {
		var nameset = $('#generic-name-nameset').val(),
			gender = $('#generic-name-gender').val(),
			set = RCN[nameset];
		if (set) {
			var name = [];
			if (set.neutral) {
				name = name.concat(set.neutral);
			}
			if (set[gender])  {
				name = name.concat(set[gender]);
			}
			$('#generic-name-output').text(name.sort().join(', '));
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

	var cr_list = [];
	Object.keys(DND5_MONSTERS).forEach(function (monsterID) {
		var monster = DND5_MONSTERS[monsterID];
		if (cr_list.indexOf(monster.challenge_rating) === -1) {
			cr_list.push(monster.challenge_rating);
		}
	});
	var $challenge = $('#dnd5-monsters-challenge').empty().append('<option value="">-</option>');
	cr_list.sort(function (a, b) {
		return a < b ? -1 : 1;
	}).forEach(function (item) {
		var cr;
		if (item === 0.125) {
			cr = '1/8';
		} else if (item === 0.25) {
			cr = '1/4';
		} else if (item === 0.5) {
			cr = '1/2';
		} else {
			cr = item.toString();
		}
		$challenge.append('<option value="' + cr + '">' + cr + '</option>');
	});
	var $tbody = $('<tbody></tbody>');
	Object.keys(DND5_MONSTERS).sort(function (a, b) {
		var monster_a = DND5_MONSTERS[a],
			monster_b = DND5_MONSTERS[b];
		if (monster_a.challenge_rating < monster_b.challenge_rating) {
			return -1;
		} else if (monster_a.challenge_rating > monster_b.challenge_rating) {
			return 1;
		} else if (monster_a.name < monster_b.name) {
			return -1;
		} else if (monster_a.name < monster_b.name) {
			return -1;
		} else {
			return 0;
		}
	}).forEach(function (monsterID) {
		var monster = DND5_MONSTERS[monsterID],
			cr = monster.challenge_rating;
		if (cr === 0.125) {
			cr = '1/8';
		} else if (cr === 0.25) {
			cr = '1/4';
		} else if (cr === 0.5) {
			cr = '1/2';
		} else {
			cr = cr.toString();
		}
		$tbody.append(
			'<tr data-monster="' + monsterID + '" data-search="' + monster.name + (monster.name_it ? ' ' + monster.name_it : '') + '" data-challenge="' + cr + '">' +
				'<td>' + monster.name + '</td>' +
				'<td>' + (monster.name_it ? monster.name_it : '-') + '</td>' +
				'<td>' + cr + '</td>' +
				'<td>' + monster.source.join(', ') + '</td>' +
			'</tr>');
	});
	$('#dnd5-monsters-table').append($tbody).on('click', '[data-monster]', function () {
		var monsterID = $(this).data('monster');
		render_monster_stats(monsterID);
		goToPage('dnd5-monster-stats');
	});
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

// D&D 5 Monster Stats

(function () {
	'use strict';

	var render_monster_stats = function (monsterID) {
		var monster = DND5_MONSTERS[monsterID];
		if (monster) {
			var $page = $('#dnd5-monster-stats');
			$page.find('[data-field="name"]').text(monster.name || '-');
			$page.find('[data-field="size"]').text(monster.size || '-');
			$page.find('[data-field="type"]').text(monster.type || '-');
			$page.find('[data-field="alignment"]').text(monster.alignment || '-');
			$page.find('[data-field="armor_class"]').text(monster.armor_class || '-');
			$page.find('[data-field="hit_points"]').text(monster.hit_points || '-');
			$page.find('[data-field="speed"]').text(monster.speed || '-');
			$page.find('[data-field="strength"]').text(monster.strength ? monster.strength + ' (' + Math.floor((monster.strength - 10) / 2) + ')' : '-');
			$page.find('[data-field="dexterity"]').text(monster.dexterity ? monster.dexterity + ' (' + Math.floor((monster.dexterity - 10) / 2) + ')' : '-');
			$page.find('[data-field="constitution"]').text(monster.constitution ? monster.constitution + ' (' + Math.floor((monster.constitution - 10) / 2) + ')' : '-');
			$page.find('[data-field="intelligence"]').text(monster.intelligence ? monster.intelligence + ' (' + Math.floor((monster.intelligence - 10) / 2) + ')' : '-');
			$page.find('[data-field="wisdom"]').text(monster.wisdom ? monster.wisdom + ' (' + Math.floor((monster.wisdom - 10) / 2) + ')' : '-');
			$page.find('[data-field="charisma"]').text(monster.charisma ? monster.charisma + ' (' + Math.floor((monster.charisma - 10) / 2) + ')' : '-');
			$page.find('[data-field="damage_resistances"]').text(monster.damage_resistances || '-');
			$page.find('[data-field="damage_immunities"]').text(monster.damage_immunities || '-');
			$page.find('[data-field="condition_immunities"]').text(monster.condition_immunities || '-');
			$page.find('[data-field="senses"]').text(monster.senses || '-');
			$page.find('[data-field="languages"]').text(monster.languages || '-');
			var cr = monster.challenge_rating;
			if (cr === 0.125) {
				cr = '1/8';
			} else if (cr === 0.25) {
				cr = '1/4';
			} else if (cr === 0.5) {
				cr = '1/2';
			}
			$page.find('[data-field="challenge_rating"]').text(cr || '-');
			if (!monster.special_abilities) {
				$page.find('[data-field="special_abilities"]').empty().hide();
			} else {
				var $div = $page.find('[data-field="special_abilities"]').empty().show();
				monster.special_abilities.forEach(function (item) {
					$div.append('<p><strong><em>' + item.name + '.</em></strong> ' + item.desc + '</p>');
				});
			}
			if (!monster.actions) {
				$page.find('[data-header="actions"]').hide();
				$page.find('[data-field="actions"]').empty().hide();
			} else {
				$page.find('[data-header="actions"]').show();
				var $div = $page.find('[data-field="actions"]').empty().show();
				monster.actions.forEach(function (item) {
					$div.append('<p><strong><em>' + item.name + '.</em></strong> ' + item.desc + '</p>');
				});
			}
			if (!monster.legendary_actions) {
				$page.find('[data-header="legendary_actions"]').hide();
				$page.find('[data-field="legendary_actions"]').empty().hide();
			} else {
				$page.find('[data-header="legendary_actions"]').show();
				var $div = $page.find('[data-field="legendary_actions"]').empty().show();
				monster.legendary_actions.forEach(function (item) {
					$div.append('<p><strong><em>' + item.name + '.</em></strong> ' + item.desc + '</p>');
				});
			}
		}
	};

	window.render_monster_stats = render_monster_stats;
})();

// D&D 5 Combat Encounter

(function () {
	'use strict';

	var array = [
		{ label: 'None', value: 0 }
	];
	Object.keys(DND5.challenge_rating_xp).sort(function (a, b) {
		return DND5.challenge_rating_xp[a] < DND5.challenge_rating_xp[b] ? -1 : 1;
	}).forEach(function (item) {
		array.push({ label: 'CR ' + item + ' (' + DND5.challenge_rating_xp[item] + ' XP)', value: DND5.challenge_rating_xp[item] });
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

	var saveData = function (data) {
		return localforage.setItem('initiativetracker', data).then(function () {
			console.log('initiativetracker data successfully saved');
		}).catch(function (e) {
			console.error(e);
		});
	};

	var loadData = function () {
		return localforage.getItem('initiativetracker').then(function (value) {
			$('#dnd5-initiativetracker').data('data', value);
			console.log('initiativetracker data successfully loaded');
		}).catch(function (e) {
			$('#dnd5-initiativetracker').data('data', []);
			console.error(e);
		});
	};

	var renderData = function (data) {
		var $tbody = $('#dnd5-initiativetracker-table').empty();
		data.forEach(function (item) {
			$tbody.append(
				//'<tr style="background: ' + (item.type === 'character' ? '#39b54a75' : '#c4423075') + '">' +
				//'<tr style="box-shadow: -5px 0 0 0 ' + (item.type === 'character' ? '#39b54a' : '#c44230') + '">' +
				'<tr style="border-left: 5px solid ' + (item.type === 'character' ? '#39b54a' : '#c44230') + '">' +
					'<td><input data-id="' + item.id + '" data-field="initiative" type="number" min="0" step="1" value="' + item.initiative + '" class="input input-quiet control" style="width: 100%"></td>' +
					'<td><input data-id="' + item.id + '" data-field="label" type="text"' + (item.label ? ' value="' + item.label + '"' : '') + ' placeholder="' + (item.type === 'character' ? 'Character' : 'Monster') + '" class="input input-quiet control" style="width: 100%"></td>' +
					'<td><input data-id="' + item.id + '" data-field="ac" type="number" min="0" step="1" value="' + item.ac + '" class="input input-quiet control" style="width: 100%"></td>' +
					'<td><input data-id="' + item.id + '" data-field="perception" type="number" min="0" step="1" value="' + item.perception + '" class="input input-quiet control" style="width: 100%"></td>' +
					'<td><input data-id="' + item.id + '" data-field="hp" type="number" min="0" step="1" value="' + item.hp + '" class="input input-quiet control" style="width: 100%"></td>' +
					'<td class="flex-row flex-row-margins">' +
						'<button data-id="' + item.id + '" data-action="roll" class="button" style="flex: 1">Roll</button>' +
						'<button data-id="' + item.id + '" data-action="delete" class="button" style="flex: 1">Delete</button>' +
					'</td>' +
				'</tr>');
		});
	};

	$('#dnd5-initiativetracker-toolbar').on('click', 'button', function () {
		var action = $(this).data('action'),
			data = $('#dnd5-initiativetracker').data('data') || [];
		if (action === 'sort') {
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
			});
			saveData(data);
			renderData(data);
		} else {
			var type;
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
				label: null,
				initiative: 0,
				ac: 10,
				perception: 10,
				hp: 0
			});
			$('#dnd5-initiativetracker').data('data', data);
			saveData(data);
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
		saveData(data);
	}).on('click', '[data-action]', function () {
		var $this = $(this),
			action = $this.data('action'),
			id = parseInt($this.data('id'), 10),
			data = $('#dnd5-initiativetracker').data('data') || [];
		if (action === 'roll') {
			data.forEach(function (item) {
				if (item.id === id) {
					item.initiative = dice(1, 20);
				}
			});
			saveData(data);
			renderData(data);
		} else if (action === 'delete') {
			var index = null;
			data.forEach(function (item, data_index) {
				if (item.id === id) {
					index = data_index;
				}
			});
			if (index !== null) {
				var item = data[index];
				if (confirm('Are you sure to delete "' + (item.label ? item.label : (item.type === 'character' ? 'Character' : 'Monster')) + '"?')) {
					data.splice(index, 1);
					saveData(data);
					renderData(data);
				}
			}
		}
	});

	loadData().then(function () {
		renderData($('#dnd5-initiativetracker').data('data'));
	});
})();

// D&D 5 Individual Treasure

(function () {
	'use strict';

	$('#dnd5-individualtreasure-generate').on('click', function () {
		var treasure = DND5.individual_treasure($('#dnd5-individualtreasure-cr').val());
		var output = [];
		if (treasure.cp > 0) {
			output.push({ q: treasure.cp, l: '<span style="color: #b87333">CP</span>' });
		}
		if (treasure.sp > 0) {
			output.push({ q: treasure.sp, l: '<span style="color: silver">SP</span>' });
		}
		if (treasure.ep > 0) {
			output.push({ q: treasure.ep, l: '<span style="color: grey">EP</span>' });
		}
		if (treasure.gp > 0) {
			output.push({ q: treasure.gp, l: '<span style="color: gold">GP</span>' });
		}
		if (treasure.pp > 0) {
			output.push({ q: treasure.pp, l: '<span style="color: #7f7679">PP</span>' });
		}
		var tbody_html = '';
		output.forEach(function (item) {
			tbody_html += '<tr><td style="width: 5rem; text-align: right">' + item.q + '</td><td>' + item.l + '</td></tr>';
		});
		$('#dnd5-individualtreasure-output').html(tbody_html);
		var normalized = treasure.cp * 0.01 + treasure.sp * 0.1 + treasure.ep * 0.5 + treasure.gp + treasure.pp * 10;
		$('#dnd5-individualtreasure-output-normalized').html('<tr><td style="width: 5rem; text-align: right">' + normalized + '</td><td><span style="color: gold">GP</span></td></tr>');
	});
})();


// D&D 5 Treasure Hoard

(function () {
	'use strict';

	$('#dnd5-treasurehoard-generate').on('click', function () {
		var treasure = DND5.treasure_hoard($('#dnd5-treasurehoard-cr').val());
		var output = [];
		if (treasure.cp > 0) {
			output.push({ q: treasure.cp, l: '<span style="color: #b87333">CP</span>' });
		}
		if (treasure.sp > 0) {
			output.push({ q: treasure.sp, l: '<span style="color: silver">SP</span>' });
		}
		if (treasure.ep > 0) {
			output.push({ q: treasure.ep, l: '<span style="color: grey">EP</span>' });
		}
		if (treasure.gp > 0) {
			output.push({ q: treasure.gp, l: '<span style="color: gold">GP</span>' });
		}
		if (treasure.pp > 0) {
			output.push({ q: treasure.pp, l: '<span style="color: #7f7679">PP</span>' });
		}
		treasure.gems.concat(treasure.art_objects).concat(treasure.magic_items).forEach(function (item) {
			var found = false;
			for (var i = 0; i < output.length; ++i) {
				if (output[i].l === item) {
					output[i].q++;
					found = true;
					break;
				}
			}
			if (!found) {
				output.push({ q: 1, l: item });
			}
		});
		var tbody_html = '';
		output.forEach(function (item) {
			tbody_html += '<tr><td style="width: 5rem; text-align: right">' + item.q + '</td><td>' + item.l + '</td></tr>';
		});
		$('#dnd5-treasurehoard-output').html(tbody_html);
	});
})();

// 7th Sea Turn Tracker

(function () {
	'use strict';

	var renderData = function (data) {
		var $tbody = $('#7thsea-turntracker-table').empty();
		data.forEach(function (item) {
			var color;
			if (item.type === 'character') {
				color = '#39b54a';
			} else if (item.type === 'villain') {
				color = '#c44230';
			} else if (item.type === 'squad') {
				color = '#eda745';
			}
			$tbody.append(
				'<tr style="box-shadow: -5px 0 0 0 ' + color + '">' +
					'<td><input data-id="' + item.id + '" data-field="increments" type="number" min="0" step="1" value="' + item.increments + '" class="input input-quiet control" style="width: 100%"></td>' +
					'<td><input data-id="' + item.id + '" data-field="label" type="text"' + (item.label ? ' value="' + item.label + '"' : '') + ' placeholder="' + (item.type === 'character' ? 'Character' : (item.type === 'villain' ? 'Villain' : 'Squad')) + '" class="input input-quiet control" style="width: 100%"></td>' +
					'<td></td>' +
					'<td class="flex-row flex-row-margins">' +
						'<button data-id="' + item.id + '" data-action="add-increment" class="button" style="flex: 1">+</button>' +
						'<button data-id="' + item.id + '" data-action="remove-increment" class="button" style="flex: 1">-</button>' +
						'<button data-id="' + item.id + '" data-action="delete" class="button" style="flex: 1">Delete</button>' +
					'</td>' +
				'</tr>');
		});
	};

	$('#7thsea-turntracker-toolbar').on('click', 'button', function () {
		var action = $(this).data('action'),
			data = $('#7thsea-turntracker').data('data') || [];
		if (action === 'sort') {
			data.sort(function (a, b) {
				if (a.type === 'squad') {
					return 1;
				} else if (b.type === 'squad') {
					return -1;
				} else if (a.increments > b.increments) {
					return -1;
				} else if (a.increments < b.increments) {
					return 1;
				} else if (a.type === 'villain') {
					return -1;
				} else if (b.type === 'villain') {
					return 1;
				} else {
					return 0;
				}
			});
			renderData(data);
		} else {
			var type;
			if (action === 'add-character') {
				type = 'character';
			} else if (action === 'add-villain') {
				type = 'villain';
			} else if (action === 'add-squad') {
				type = 'squad';
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
				label: null,
				increments: 0
			});
			$('#7thsea-turntracker').data('data', data);
			renderData(data);
		}
	});

	$('#7thsea-turntracker-table').on('change', '.control', function () {
		var $this = $(this),
			id = parseInt($this.data('id'), 10),
			field = $this.data('field'),
			value = field === 'label' ? $this.val() : parseFloat($this.val()),
			data = $('#7thsea-turntracker').data('data') || [];
		data.forEach(function (item) {
			if (item.id === id) {
				item[field] = value;
			}
		});
	}).on('click', '[data-action]', function () {
		var $this = $(this),
			action = $this.data('action'),
			id = parseInt($this.data('id'), 10),
			data = $('#7thsea-turntracker').data('data') || [];
		if (action === 'add-increment') {
			data.forEach(function (item) {
				if (item.id === id) {
					item.increments++;
				}
			});
			renderData(data);
		} else if (action === 'remove-increment') {
			data.forEach(function (item) {
				if (item.id === id) {
					item.increments--;
				}
			});
			renderData(data);
		} else if (action === 'delete') {
			var index = null;
			data.forEach(function (item, data_index) {
				if (item.id === id) {
					index = data_index;
				}
			});
			if (index !== null) {
				var item = data[index];
				if (confirm('Are you sure to delete "' + (item.label ? item.label : (item.type === 'character' ? 'Character' : (item.type === 'villain' ? 'Villain' : 'Squad'))) + '"?')) {
					data.splice(index, 1);
					renderData(data);
				}
			}
		}
	});

	$('#7thsea-turntracker').data('data', []);
	renderData($('#7thsea-turntracker').data('data'));
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
