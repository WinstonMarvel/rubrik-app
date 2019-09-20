import dispatcher from "_dispatcher";
import AppDataStore from '_store/AppDataStore';

export function checkToken(){
    console.log("checking token");
    dispatcher.dispatch({
        type: "LOADING_START"
    });
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("checking token", user);
    if(user && user.token && user.username){
        dispatcher.dispatch({
            type: "LOGIN",
                payload: {
                    email: user.username,
                    token: user.token
                }
        });
    }
    dispatcher.dispatch({
        type: "LOADING_COMPLETE"
    });
}

export function login(username, password, keepMeLoggedIn){
    dispatcher.dispatch({
        type: "LOADING_START"
    });
    if( username && password.toString() ){
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email" : username,
                "password" : password
            })
        };
        fetch('/api/login/', options)
        .then( res => {
            return res.json().then( data => ({ status: res.status, body: data }) )
        })
        .then( res => {
            console.log("login_action: ", res);
            if(res.status == 200){
                var user = {
                    username: username,
                    token: res.body.token
                };
                console.log(res);
                localStorage.setItem('user', JSON.stringify(user));
                dispatcher.dispatch({
                    type: "LOGIN",
                    payload: {
                        email: username,
                        token: res.body.token
                    }
                });
            }
            else{
                dispatcher.dispatch({
                    type: "APP_ERROR",
                    payload: {
                        error: "Incorrect Credentials"
                    }
                });
            }
            dispatcher.dispatch({
                type: "LOADING_COMPLETE"
            });
        }).catch((err) => {
            console.log("error: ", err);
            dispatcher.dispatch({
                type: "APP_ERROR",
                payload: {
                    error: err
                }
            });
            dispatcher.dispatch({
                type: "LOADING_COMPLETE"
            });
        });
    }
    else{
        dispatcher.dispatch({
            type: "APP_ERROR",
            payload: {
                error: "Username or Password cannot be empty"
            }
        });
    }
}

export function logout(){
    localStorage.clear();
    dispatcher.dispatch({
        type: "LOGOUT"
    });
}

export function resetApp(){
    dispatcher.dispatch({
        type: "APP_RESET"
    });
    dispatcher.dispatch({
        type: "RESET_POST"
    });
}

export function resetPassword(password){
    dispatcher.dispatch({
        type: "LOADING_START"
    });
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + AppDataStore.getToken()
        },
        body: JSON.stringify({
            "password" : password
        })
    };
    fetch('/api/reset-password/', options)
    .then( res => {
        return res.json().then( data => ({ status: res.status, body: data }) )
    })
    .then( res => {
        if(res.status == 200){
            console.log(res);
            dispatcher.dispatch({
                type: "LOGOUT"
            });
        }
        else{
            dispatcher.dispatch({
                type: "APP_ERROR",
                payload: {
                    error: `Error occured: ${res.status}`
                }
            });
        }
        dispatcher.dispatch({
            type: "LOADING_COMPLETE"
        });
    }).catch((err) => {
        console.log("error: ", err);
        dispatcher.dispatch({
            type: "APP_ERROR",
            payload: {
                error: err
            }
        });
        dispatcher.dispatch({
            type: "LOADING_COMPLETE"
        });
    });
}

export function newForm(form){
    dispatcher.dispatch({
        type: "NEW_FORM",
        payload: {
            formType: form
        }
    });
}