import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { of, merge, tap, from } from 'rxjs';
import Axios from 'axios';
import 'rxjs/add/operator/do';
import querystring from 'querystring';
import { STATUS_STATES } from './../reducers/status';

export const statusEpic = (action$, store) =>
  merge(
    action$.ofType('SESSION_INVALID')
      .pipe(
        switchMap((action) => {
          if(store.getState().status.dataState !== STATUS_STATES.DATA){
            return of({type: 'SHOW_LOGIN', payload: true})
          }
          return of({type: 'NOACTION'})
        })
      ),
  );