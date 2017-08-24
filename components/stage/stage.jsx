import {Component} from 'preact';
import {route} from 'preact-router';
import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import style from './stage.css';
export default class Stage extends Component {
  constructor(){
    super();
		this.state = {
			score: '',
			isPlaying: true
		};
  }
	componentDidMount(){
		if (!localStorage.uname) {
			route('/');
		} else {
			this.initGame();
		}
	}
	initGame() {
		this.setState({
			score: 0,
		});
		require.ensure('../../game/GameScene', (require) => {
			const GameScene = require('../../game/GameScene').default;
			this.scene = new GameScene(this.canvas, {
				onScore : () => {
					this.setState({
						score: this.state.score + 1,
					}, ()=>{
						if (this.state.score%20 === 0) {
							this.scene.increaseGameSpeed();
						}
					});
				},
				onInit : () => {
					this.setState({
						score: 0,
						isPlaying: true
					});
				},
				onFinish: () => {
					const highScore = 0 || localStorage.highscore;
					if(this.state.score > highScore) {
						localStorage.highscore = this.state.score;
					}
					this.setState({
						isPlaying: false
					});
				}
			});
		}, 'gameengine');
	}
  render(){
    return (
      <div className={style.page}>
				<div className={style.score + ' mdc-typography--display2'}>{this.state.score}</div>
				<Fab
					className={this.state.isPlaying? style.fab: style.fab+' '+style.appear}
					onClick={()=>{
						this.initGame();
					}}>
					<svg fill="#FFFFFF" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"/>
							<path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
					</svg>
				</Fab>
				<canvas id="stage"
					className={style.stage}
					ref={canvas => this.canvas = canvas}/>
      </div>
    )
  }
}