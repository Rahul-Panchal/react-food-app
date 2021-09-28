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
 * getAllRestaurantsList function is used to get all Restaurants list
 */
export const getAllRestaurantsList = ()=>{

    return async (dispatch) => {
        const data = await fetch("http://localhost:8081/restaurant-detail/restaurant-list", {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
        const response = await data.json();
        dispatch({
            type    : 'GET_ALL_RESTAURANT_LIST',
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
 * handleUserEdit function is used to get restaurant details for update
 * @param {*} restaurantId 
 */
 export const handleRestaurantEdit = (restaurantId, history) => {

    return async (dispatch) => {
        const cookies = new Cookies();
        let token = cookies.get('token');

        const data = await fetch('http://localhost:8081/restaurant-detail/restaurant-list/'+restaurantId,{
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
            type    : 'GET_RESTAURANT_DETAIL',
            payload : response
        });

        history.push("/edit-restaurant/"+restaurantId);
    }
}


/**
 * handleUserDelete function is used to delete any restaurant
 * @param {*} restaurantId 
 * @param {*} history 
 * @returns 
 */

export const handleRestaurantDelete = (restaurantId, history) => {

    return async (dispatch) => {
        const cookies = new Cookies();
        let token = cookies.get('token');

        const data = await fetch('http://localhost:8081/restaurant-detail/restaurant-list/'+restaurantId,{
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

        // history.push("/edit-user/"+restaurantId);
        history.push("/users-list");
    }
}


/**
 * handleSubmitAction used to submit restaurant details
 * 
 * @param {*} e 
 * @param {*} history 
 * @returns 
 */

export const handleSubmitAction = (e, history)=>{
    return async (dispatch, getState) => {

        e.preventDefault();

        const id = (getState().users.isReadyForEdit) ? getState().users.userDetails._id : null;
        console.log('id is ' + id);
        var url = null;
        var methodType = null;
        if (id!=null) {
            url = "http://localhost:8081/users/update-user-details/" + id;
            methodType = "PUT";
        } else {
            // url = "http://localhost:8081/users/save-user-details";
            // url = "http://localhost:8081/users/user-profile";
            url = "http://localhost:8081/register";
            methodType = "POST";
        }

        // const formData = new FormData(e.target);


        var formData = new URLSearchParams();

        for (const pair of new FormData(e.target)) {
            formData.append(pair[0], pair[1])
        }

        // fetch(url, {
        // method: methodType,
        // body: data,
        // }).then(res => res.json()).then(res2 =>
        // this.props.history.push('/users-list')
        // );

        const data = await fetch(url,{method: methodType,body: formData });
        const response = await data.json();
        dispatch({
            type    : 'USER_FORM_SUBMIT',
            payload : response
        });

        history.push("/all-users-list");
    }
}