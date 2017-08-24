// jump animation
function getJumpAnimationKeys(gameSpeed) {
	const jumpAnimationKeys = [];
	jumpAnimationKeys.push({
		frame: 0,
		value: 0.7
	});
	jumpAnimationKeys.push({
		frame: Math.floor(gameSpeed / 2),
		value: 2
	});
	jumpAnimationKeys.push({
		frame: gameSpeed,
		value: 0.6
	});
	jumpAnimationKeys.push({
		frame: gameSpeed + 2,
		value: 0.5
	});
	jumpAnimationKeys.push({
		frame: 100,
		value: -10
	});
	return jumpAnimationKeys;
}

// opacity animation
const opacityAnimationKeys = [];
opacityAnimationKeys.push({
	frame: 0,
	value: 0
});
opacityAnimationKeys.push({
	frame: 20,
	value: 1
});

const droppingAnimationKeys = [];
droppingAnimationKeys.push({
	frame: 0,
	value: 3
});
droppingAnimationKeys.push({
	frame: 20,
	value: 0
});

export {getJumpAnimationKeys, opacityAnimationKeys, droppingAnimationKeys};
