import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	constructor(){
		super();
		this.gridSize = 3;
	}
	makeGrid(){
		const ctx=this.stage.getContext('2d');
		const width = document.body.clientWidth;
		for (let lineIndex = 1; lineIndex < this.gridSize; lineIndex++) {
			const currentPoint = (width/this.gridSize)*lineIndex;
			// make column lines
			ctx.beginPath();
			ctx.moveTo(currentPoint, 0);
			ctx.lineTo(currentPoint, width);
			ctx.strokeStyle = 'white';
			ctx.stroke();

			// make row lines
			ctx.moveTo(0, currentPoint);
			ctx.lineTo(width, currentPoint);
			ctx.stroke();
		}
	}
	addCircles(ctx, matrix){
		console.log('hi');
	}
	addListeners(){
		const ctx=this.screen.getContext('2d');
		const width = document.body.clientWidth;
		this.screen.addEventListener('touchmove',(e) => {
			const cellSize = Math.floor(width/this.gridSize);
			const xPos = e.touches[0].clientX;
			const yPos = e.touches[0].clientY - 55;
			ctx.clearRect(0, 0, width, width);
			ctx.beginPath();
			ctx.arc(xPos, yPos , 15, 0, Math.PI * 2, false);
			ctx.strokeStyle = 'white';
			requestAnimationFrame(() => {
				ctx.closePath();
				ctx.stroke();
			});
			console.log(Math.floor(xPos/cellSize) + 1, Math.floor(yPos/cellSize) + 1);
		});
		this.screen.addEventListener('touchend',(e) => {
			console.log('up');
			ctx.clearRect(0, 0, width, width);
		});
	}
	componentDidMount(){
		this.makeGrid();
		this.addListeners();
	}
	render() {
		return (
			<div class={style.home}>
				<canvas
					className={style.stage}
					ref={( canvas ) => {
						this.stage = canvas;
					}}
					width={document.body.clientWidth} height={document.body.clientWidth} />
				<canvas
					className={style.screen}
					ref={( canvas ) => {
						this.screen = canvas;
					}}
					width={document.body.clientWidth} height={document.body.clientWidth} />
			</div>
		);
	}
}
