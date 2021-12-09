export function getToken(){
    let token = localStorage.getItem('token');
    // console.log('userToken---', userToken)
    if(token){
        return true;
    }
    else{
        return false;
    }
}

export function setUserDetail(userDetail){
    localStorage.setItem('userDetail', userDetail);
    console.log('parse detail', JSON.parse(userDetail));
}

export function setUserToken(token){
    localStorage.setItem('token', token);
    console.log('token', token);
}

export function getUserToken(){
    return localStorage.getItem('token');
}

export function clearToken(){
    localStorage.clear()
}

// export function