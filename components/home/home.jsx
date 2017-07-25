import {Component} from 'preact';
import Button from 'preact-material-components/Button';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';
import style from './home.css';
export default class Home extends Component {
  render(){
    return (
      <div className={style.page}>
        <div className={style.logo + ' ' + style.centerFlex}>
          <img src="/assets/logo.png" alt="logo" width="250"/>
        </div>
        <div className={style.buttonsDiv + ' ' +style.centerFlex}>
          <div>
            <Button raised={true} ripple={true}> Continue as guest</Button>
          </div>
          <div>
            <Button className={style.googleLogin} raised={true} ripple={true} primary={true} disabled={true}> Login with Google</Button>
          </div>
        </div>
      </div>
    )
  }
}