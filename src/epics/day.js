import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { of, merge, tap, from } from 'rxjs';
import Axios from 'axios';
import 'rxjs/add/operator/do';
import querystring from 'querystring';

export const dayEpic = (action$, store) =>
  merge(
    action$.ofType('TIMETABLE_DATA_LOADED')
      .pipe(
        switchMap((action) => {
          return of({type: 'NOACTION'})
        })
      ),
  );