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
          console.log('Try login');
          return zip(
            from(Axios.post('hiapi', 
              querystring.stringify({
                username:action.payload.username,
                passwd:action.payload.password,
                service:'session',
                method:'open',
                format:'json'
              }))),
              of(action.payload.username));
        }),
        switchMap(([result, user]) => {
          console.log('res:',result);
          if(result.status === 200){
            if(result.data.data && result.data.data != "Wrong credentials"){
              return of({type: 'NEW_SESSION', payload: {session: result.data.data[0], user: result.data.data[1]}});
            } else {
              return of({type: 'GET_SESSION_ERROR', payload: 'couldn\' t extract session. Username and Password wrong'});
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