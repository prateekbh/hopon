import {Component} from 'preact';
import style from './stage.css';
export default class Stage extends Component {
  constructor(){
    super();
  }
	componentDidMount(){

	}
  render(){
    return (
      <div className={style.page}>
				<canvas className={style.stage}/>
      </div>
    )
  }
}