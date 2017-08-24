import {Component} from 'preact';
import style from './stage.css';
export default class Stage extends Component {
  constructor(){
    super();
		this.state = {
			score: ''
		};
  }
	componentDidMount(){
		require.ensure('../../game/GameScene', (require) => {
			const GameScene = require('../../game/GameScene').default;
			this.scene = new GameScene(this.canvas, {
				onScore : ()=>{
					this.setState({
						score: this.state.score + 1,
					}, ()=>{
						if (this.state.score%10 === 0) {
							this.scene.increaseGameSpeed();
						}
					});
				},
				onInit : ()=>{
					this.setState({
						score: 0,
					});
				}
			});
		}, 'gameengine');
	}
  render(){
    return (
      <div className={style.page}>
				<div className={style.score + ' mdc-typography--display2'}>{this.state.score}</div>
				<canvas id="stage"
					className={style.stage}
					ref={canvas => this.canvas = canvas}/>
      </div>
    )
  }
}