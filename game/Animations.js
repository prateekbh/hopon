// jump animation
const jumpAnimationKeys = [];
jumpAnimationKeys.push({
	frame: 0,
	value: 0.7
});
jumpAnimationKeys.push({
	frame: 15,
	value: 2
});
jumpAnimationKeys.push({
	frame: 30,
	value: 0.5
});
jumpAnimationKeys.push({
	frame: 32,
	value: 0.5
});
jumpAnimationKeys.push({
	frame: 100,
	value: -10
});

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

export {jumpAnimationKeys, opacityAnimationKeys, droppingAnimationKeys};
