import { CREATE, RETRIEVE, RETRIEVEONE, UPDATE, DELETE } from "../contants/actionTypes";
import FoodCategoryServices from "../HttpTransport/Services/FoodCategoryServices";


import Cookies from 'universal-cookie';

const cookies = new Cookies();
let token = cookies.get('token');

export const handleInputAction = (inputField)=>{
    return{
        type    : "UPDATE_INPUT",
        payload : {'field_name':inputField.name,'field_value':inputField.value}
    }
}

export const createTodo = (title, body) => async (dispatch) => {
    try {
        const res = await FoodCategoryServices.create({ title, body });

        dispatch({
            type: CREATE,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveAll = (id) => async (dispatch) => {
    try {
        const res = await FoodCategoryServices.getAll();
        dispatch({
            type: RETRIEVE,
            payload: res.data,
        });
    } catch (err) {
        console.log('err');
        console.log(err);
    }
};

export const retrieveOne = (id, history) => async (dispatch) => {
    try {

        console.log('history');
        console.log(history);

        const res = await FoodCategoryServices.get(id);
        dispatch({
            type: RETRIEVEONE,
            payload: res.data,
        });

        history.push("/edit-food-category/"+id);

    } catch (err) {
        console.log('err');
        console.log(err);
    }
};

export const updateTodo = (id, data) => async (dispatch) => {
    console.log(id)
    try {
        const res = await FoodCategoryServices.update(id, data);

        dispatch({
            type: UPDATE,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteTodo = (id) => async (dispatch) => {
    try {
        const res = await FoodCategoryServices.remove(id);

        dispatch({
            type: DELETE,
            // payload: { id },
            payload : res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const findTutorialsByTitle = (title) => async (dispatch) => {
    try {
        const res = await FoodCategoryServices.findByTitle(title);

        dispatch({
            type: RETRIEVE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};




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
            url = "http://localhost:8081/admin/add-food-category";
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

        const data = await fetch(url,{
            method: methodType,
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: formData 
        });
        const response = await data.json();
        dispatch({
            type    : 'FORM_SUBMIT',
            payload : response
        });

        history.push("/all-food-categories");
    }
}