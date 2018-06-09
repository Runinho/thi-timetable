import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { of, merge, tap, from } from 'rxjs';
import Axios from 'axios';
import 'rxjs/add/operator/do';
import querystring from 'querystring';

export const timetableEpic = (action$, store) =>
  merge(
    action$.ofType('INIT')
      .pipe(
        switchMap((action) => {
          const session = store.getState().login.session;
          const data = store.getState().data.data;
          const actions = [];
          if(session){
            actions.push(of({type: 'LOAD_TIMETABLE_DATA', payload: session}));
          }
          if(data){
            actions.push(of({type: 'TIMETABLE_DATA_LOADED', payload: data}));
          }
          if(actions. length > 0){
            return merge(...actions);
          }else{
            return of({type: 'NOACTION'})
          }
        })
      ),
    action$.ofType('LOAD_TIMETABLE_DATA')
      .pipe(
        switchMap((action) => {
          console.log('Try login with data:', action.payload);
          //TODO: read this string out of the data on login. sem might change...
          const state = store.getState();
          const session = state.login.session;
          const user = state.login.username;
          const currentDate = new Date();
          const date = (currentDate.getMonth() + 1).toString().padStart(2, "0") + 
            "/" +  currentDate.getDate().toString().padStart(2, "0") +
            "/" +  currentDate.getFullYear();
          return from(Axios.post('primuss/index.php?FH=fhin&Language=&sem=34&method=list', 
          querystring.stringify({
            showdate: date,
            viewtype:'week',
            timezone:'2',
            Session:session,
            User:user,
            mode:'calendar',
          })))
        }),
        switchMap((result) => {
          console.log(result);
          if(result.status === 200){
            if(result.request.responseURL.toString().includes('login.php?')){
              // need new session.
              return of({type: 'SESSION_INVALID'});
            }else{
              // merge events
              const data = result.data;
              const events = [];
              for(let key of Object.keys(data).filter((key) => key.startsWith('events'))){
                console.log(key);
                events.push(...data[key]);
                delete data[key];
              }
              data.events = events;
              return of({type: 'TIMETABLE_DATA_LOADED', payload: {timestamp: new Date(), data: data}});
            }
          } else {
            // something went wrong
            return of({type: 'HTTP_ERROR',
            payload: {message: 'error when loading table. Check Internet Connection.', 
              request: result}});
          }
        })
      )
      
  );