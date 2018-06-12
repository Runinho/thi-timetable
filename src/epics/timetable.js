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
          console.log('Try get data with data:', action.payload);
          //TODO: read this string out of the data on login. sem might change...
          const state = store.getState();
          const session = state.login.session;
          const user = state.login.username;
          const currentDate = new Date();
          const date = (currentDate.getMonth() + 1).toString().padStart(2, "0") + 
            "/" +  currentDate.getDate().toString().padStart(2, "0") +
            "/" +  currentDate.getFullYear();
          
          return from(Axios.post('hiapi', 
          querystring.stringify({
            service: 'thiapp',
            method:'stpl',
            format:'json',
            session:session,
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate().toString().padStart(2, "0"),
            year: currentDate.getFullYear(),
            details:'0',
          })))
        }),
        switchMap((result) => {
          console.log(result);
          if(result.status === 200){
            console.log('result.data.data ', result.data.data )
            if(result.data.data === "No Session"){
              // need new session.
              return of({type: 'SESSION_INVALID'});
            }else{
              // merge events
              const data = result.data;
              return merge(of({type: 'TIMETABLE_DATA_LOADED', payload: {timestamp: new Date(), data: data}}),
                of({type: 'SESSION_VALID'}));
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