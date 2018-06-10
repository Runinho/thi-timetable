
function loadSessionFromLocalStorage() {
  return localStorage.getItem('session');
}

function loadUserFromLocalStorage() {
  const storage = localStorage.getItem('user')
  return (storage ? storage : '');
}
function loadAcceptFromLocalStorage() {
  const storage = localStorage.getItem('accept')
  return (storage ? storage : false);
}

export default (state={session: loadSessionFromLocalStorage(), username: loadUserFromLocalStorage(), password: '', accept: loadAcceptFromLocalStorage(), showLogin: true}, action) => {
  switch(action.type){
    case 'SHOW_LOGIN':
      return {...state, showLogin:action.payload}
      break;
    case 'CHANGE_PASSWORD':
      return {...state, password: action.payload};
    case 'CHANGE_USERNAME':
      return {...state, username: action.payload};
    case 'CHANGE_ACCEPT':
      return {...state, accept: action.payload};
    case 'SESSION_INVALID':
      localStorage.setItem('session', null);
      return {...state, session: null};
    case 'NEW_SESSION':
      const session = action.payload.session;
      const user = action.payload.user;
      console.log(session);
      localStorage.setItem('session', session);
      localStorage.setItem('user', user);
      localStorage.setItem('accept', true);
      return {...state, session: session, username:user,  showLogin:false};
    default: 
      return state
  }
  return state;
}