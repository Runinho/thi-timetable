import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { of, merge, tap, from, zip } from 'rxjs';
import Axios from 'axios';
import 'rxjs/add/operator/do';
import querystring from 'querystring';
import { ENGINE_METHOD_ALL } from 'constants';

export const loginEpic = (action$, store) =>
  merge(
      action$.do((action) => console.log('action', action, 'state', store)).ofType('LOGIN_PRESSED')
        .pipe(
          switchMap((action) => {
            const state = store.getState();
            return of({ type: 'GET_SESSION', payload:{username: state.login.username, password: state.login.password}})
          })
        ),
      action$.ofType('GET_SESSION')
      .pipe(
        switchMap((action) => {
          console.log('Try login with data:', action.payload);
          return zip(
            from(Axios.post('primuss/login.php', 
              querystring.stringify({
                user:action.payload.username,
                pwd:action.payload.password,
                mode:'login',
                FH:'fhin',
                lang:'de',
                submitLogin:'Anmelden',
              }))),
              of(action.payload.username));
        }),
        switchMap(([result, user]) => {
          console.log(result);
          if(result.status === 200){
            // extract session id
            const regex = /<input type="hidden" id="session" name="Session" value="(.*)" \/>/g
            const match = regex.exec(result.data);
            if(match && match.length > 1 && match[1] != null && match[1].length > 0){
              console.log('session', match[1]);
              return of({type: 'NEW_SESSION', payload: {session: match[1], user: user}});
            } else {
              return of({type: 'GET_SESSION_ERROR', payload: 'couldn\' t extract session. Username and Password right?'});
            }
          }else{
            // something went wrong
            return of({type: 'HTTP_ERROR',
              payload: {message: 'error when loging in. Check Internet Connection.', 
                request: result}});
          }
        })
      ),
      action$.ofType('INIT')
        .pipe(
          switchMap((action) => {
            const hasSession = !!store.getState().login.session;
            const actions = [of({type: 'SHOW_LOGIN', payload: !hasSession})];
            if(!hasSession){
              actions.push(of({type: 'SESSION_INVALID'}));
            } 
            return merge(...actions);
          })
        ),
      action$.ofType('NEW_SESSION')
        .pipe(
          switchMap((action) => of({type: 'LOAD_TIMETABLE_DATA'}))
        )
    );