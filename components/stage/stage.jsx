import {Component} from 'preact';
import style from './stage.css';
export default class Stage extends Component {
  constructor(){
    super();
  }
	componentDidMount(){
		require.ensure('../../game/GameScene', (require) => {
			const GameScene = require('../../game/GameScene').default;
			this.scene = new GameScene(this.canvas);
		}, 'gameengine');
	}
  render(){
    return (
      <div className={style.page}>
				<canvas className={style.stage} ref={canvas => this.canvas = canvas}/>
      </div>
    )
  }
}