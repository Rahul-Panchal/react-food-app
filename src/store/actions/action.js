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
            url = "http://localhost:8081/users/user-profile";
            methodType = "POST";
        }

        const formData = new FormData(e.target);
        // fetch(url, {
        // method: methodType,
        // body: data,
        // }).then(res => res.json()).then(res2 =>
        // this.props.history.push('/users-list')
        // );

        const data = await fetch(url,{method: methodType,body: formData });
        const response = await data.json();
        dispatch({
            type    : 'FORM_SUBMIT',
            payload : response
        });

        history.push("/users-list");
    }
}