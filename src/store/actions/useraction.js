import Cookies from 'universal-cookie';

const cookies = new Cookies();
let token = cookies.get('token');

export const handleInputAction = (inputField)=>{
    return{
        type    : "UPDATE_INPUT",
        payload : {'field_name':inputField.name,'field_value':inputField.value}
    }
}

export const validatePassword = ()=>{
    return{
        type    : "COMPARE_PASSWORD"
    }
}


/**
 * using thunk with async and await
 */

 export const getUserTypesList = ()=>{
    return async (dispatch) => {
        // const data = await fetch("http://localhost:3000/js/state.json");
        // const response = await data.json();

        const userTypes = [
            { id: '1', name: 'Admin'},
            { id: '2', name: 'Restaurant Managers'},
            { id: '3', name: 'Field boy'},
            { id: '4', name: 'Customer'},
        ];

        dispatch({
            type    : 'GET_USER_TYPE_LIST',
            payload : userTypes
        });
    }
}

/**
 * using thunk with async and await
 */

 export const getUserStatusList = ()=>{
    return async (dispatch) => {
        // const data = await fetch("http://localhost:3000/js/state.json");
        // const response = await data.json();

        const userStatusList = [
            { id: true, name: 'Active'},
            { id: false, name: 'Not Active'},
        ];

        dispatch({
            type    : 'GET_USER_STATUS_LIST',
            payload : userStatusList
        });
    }
}

/**
 * using thunk with async and await
 */

export const getCountriesList = ()=>{
    return async (dispatch) => {
        // const data = await fetch("http://localhost:3000/js/state.json");
        // const response = await data.json();

        const countriesList = [
            {name: 'India', id: '1'}
        ];

        dispatch({
            type    : 'GET_COUNTRY_LIST',
            payload : countriesList
        });
    }
}

/**
 * using thunk with async and await
 */

export const getStateList = ()=>{
    return async (dispatch) => {
        const data = await fetch("http://localhost:3000/js/state.json");
        const response = await data.json();
        dispatch({
            type    : 'GET_STATE_LIST',
            payload : response
        });
    }
}

/**
 * getCitiesList function is used to get all cities
 */

export const getCitiesList = ()=>{
    return async (dispatch) => {
        const data = await fetch("http://localhost:3000/js/cities.json");
        const response = await data.json();
        dispatch({
            type    : 'GET_CITIES_LIST',
            payload : response
        });
    }
}

/**
 * using thunk with async and await
 */

export const getStateCities = (stateId)=>{
    return async (dispatch) => {
        const data = await fetch("http://localhost:3000/js/cities.json");
        const response = await data.json();
        dispatch({
            type    : 'GET_STATE_CITIES',
            payload : {'state_id': stateId, 'cities_list': response}
        });
    }
}

/**
 * getAllUsersList function is used to get all users list
 */
export const getAllUsersList = ()=>{

    return async (dispatch) => {
        const data = await fetch("http://localhost:8081/get-users-list", {
            method: 'get',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
        const response = await data.json();
        dispatch({
            type    : 'GET_ALL_USERS_LIST',
            payload : response
        });
    }
}


export const handleImageChange = (inputField)=>{
    return{
        type    : "IMAGE_UPLOAD",
        payload : {'field_name':inputField.name,'field_value':inputField.files[0]}
    }
}

export const handleDateChange = (seletedDate)=>{
    return{
        type    : "SET_DOB",
        payload : seletedDate
    }
}


/**
 * handleUserEdit function is used to get user details for update
 * @param {*} userId 
 */
export const handleUserEdit = (userId, history) => {

    return async (dispatch) => {
        const cookies = new Cookies();
        let token = cookies.get('token');

        const data = await fetch('http://localhost:8081/get-users-list/'+userId,{
        // const data = await fetch('http://localhost:8081/get-users-list',{
            method : "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })

        const response = await data.json();
        dispatch({
            type    : 'GET_USER_DETAIL',
            payload : response
        });

        history.push("/edit-user/"+userId);
    }
}


/**
 * handleUserDelete function is used to delete any user
 * @param {*} userId 
 * @param {*} history 
 * @returns 
 */

export const handleUserDelete = (userId, history) => {

    return async (dispatch) => {
        const cookies = new Cookies();
        let token = cookies.get('token');

        const data = await fetch('http://localhost:8081/delete-user-details/'+userId,{
        // const data = await fetch('http://localhost:8081/get-users-list',{
            method : "put",
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'x-access-token': token
            }
        })

        const response = await data.json();
        dispatch({
            type    : 'GET_ALL_USERS_LIST',
            payload : response
        });

        // history.push("/edit-user/"+userId);
        history.push("/users-list");
    }
}


export const handleSubmitAction = (e, history)=>{
    return async (dispatch, getState) => {

        e.preventDefault();

        const userId = (getState().users.isReadyForEdit) ? getState().users.userDetails._id : null;
        console.log('id is ' + userId);
        var url = null;
        var methodType = null;
        var formData = null;
        var result = null;
        if (userId!=null) {
            // url = "http://localhost:8081/update-user-details/" + userId;
            // methodType = "PUT";


            // formData = new URLSearchParams();

            // for (const pair of new FormData(e.target)) {
            //     formData.append(pair[0], pair[1])
            // }

            const formData = new FormData(e.target);

            const cookies = new Cookies();
            let token = cookies.get('token');

            result = await fetch('http://localhost:8081/update-user-details/'+userId,{
            // const data = await fetch('http://localhost:8081/get-users-list',{
                method : "PUT",
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: formData
            })


        } else {
            url = "http://localhost:8081/register";
            methodType = "POST";

            // formData = new URLSearchParams();

            // for (const pair of new FormData(e.target)) {
            //     formData.append(pair[0], pair[1])
            // }

            const formData = new FormData(e.target);

            result = await fetch(url,{method: methodType,body: formData });
        }

        // const formData = new FormData(e.target);
        // const data = await fetch(url,{method: methodType,body: formData });

        const response = await result.json();
        dispatch({
            type    : 'USER_FORM_SUBMIT',
            payload : response
        });

        history.push("/users-list");
    }
}