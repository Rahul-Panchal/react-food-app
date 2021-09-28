import Cookies from 'universal-cookie';

export const handleInputAction = (inputField)=>{
    return{
        type    : "UPDATE_INPUT",
        payload : {'field_name':inputField.name,'field_value':inputField.value}
    }
}

export const handleLogoutAction = (token)=>{
    return{
        type    : "LOGOUT",
        payload : token
    }
}


/**
 * using thunk with async and await
 */

export const handleLoginAction = (e, history)=>{
    return async (dispatch, getState) => {

        e.preventDefault();

        // const id = (getState().users.isReadyForEdit) ? getState().users.userDetails._id : null;

        var url = "http://localhost:8081/login";
        var methodType = "POST";


        // const formData = new FormData(e.target);

        var formData = new URLSearchParams();

        for (const pair of new FormData(e.target)) {
            formData.append(pair[0], pair[1])
        }

        console.log('formData')
        console.log(formData)

        // fetch(url, {
        // method: methodType,
        // body: data,
        // }).then(res => res.json()).then(res2 =>
        // this.props.history.push('/users-list')
        // );

        const result = await fetch(url,{method: methodType,body: formData });
        const response = await result.json();

        console.log('login-response')
        console.log(response)

        const cookies = new Cookies();
        cookies.set('token', response.token, { path: '/' });

        dispatch({
            type    : 'FORM_SUBMIT',
            payload : response
        });

        history.push("/welcome");
    }
}