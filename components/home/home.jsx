import { Component } from 'preact';
import { route } from 'preact-router';
import Button from 'preact-material-components/Button';
import LinearProgress from 'preact-material-components/LinearProgress';
import Dialog from 'preact-material-components/Dialog';
import Textfield from 'preact-material-components/Textfield';
import firebaseLoader from '../../scripts/firebase-loader.js';
import 'preact-material-components/LinearProgress/style.css';
import 'preact-material-components/Textfield/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';
import style from './home.css';
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      firebaseLoading: true,
      userName: '',
      isUserLoggingIn: false
    };
  }
  loginWithGoogle() {
    this.setState({
      isUserLoggingIn: true
    });
    this.initFirebase();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        localStorage.uname = result.user.displayName;
        route('/play');
      })
      .catch(err => {
        console.log('woops, cant get your profile!', err);
      });
  }
  componentDidMount() {
    if (localStorage.uname) {
      route('/play', true);
    } else {
      firebaseLoader.then(initFirebase => {
        this.initFirebase = initFirebase;
        this.setState({
          firebaseLoading: false
        });
      });
    }
  }
  render() {
    return (
      <div className={style.page}>
        <div className={style.logo + ' ' + style.centerFlex}>
          <img src="/assets/logo.png" alt="logo" width="250" />
        </div>
        <div className={style.buttonsDiv + ' ' + style.centerFlex}>
          <div>
            <Button
              raised={true}
              ripple={true}
              onClick={() => {
                this.dialog.MDComponent.show();
              }}
            >
              {' '}Continue as guests
            </Button>
            <Dialog
              ref={dialog => {
                this.dialog = dialog;
              }}
            >
              <Dialog.Header>Please tell us your name</Dialog.Header>
              <Dialog.Body>
                <Textfield
                  placeholder="name"
                  required={true}
                  fullwidth={true}
                  value={this.state.userName}
                  onChange={e => {
                    this.setState({
                      userName: e.target.value
                    });
                  }}
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.FooterButton cancel={true}>Cancel</Dialog.FooterButton>
                <Dialog.FooterButton
                  primary={true}
                  accept={true}
                  onClick={() => {
                    if (this.state.userName.trim()) {
                      localStorage.uname = this.state.userName.trim();
                      route('/play');
                    }
                  }}
                >
                  OK
                </Dialog.FooterButton>
              </Dialog.Footer>
            </Dialog>
          </div>
          <div>
            <div className="inline-block">
              <Button
                className={style.googleLogin}
                raised={true}
                ripple={true}
                primary={true}
                disabled={
                  this.state.firebaseLoading || this.state.isUserLoggingIn
                }
                onClick={() => {
                  this.loginWithGoogle();
                }}
              >
                {' '}Login with Google
              </Button>
              {this.state.firebaseLoading &&
                <LinearProgress indeterminate={true} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
