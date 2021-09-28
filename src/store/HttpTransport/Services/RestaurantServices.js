import http from "../FoodApp.Transport";

const getAll = () => {
    return http.get("/restaurant-detail/restaurant-list");
};

const get = id => {
    return http.get(`/restaurant-detail/restaurant-list/${id}`);
};

const create = data => {

    

    console.log('data at create call');


    //let contentType = 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW;';
    // let contentType = 'multipart/form-data';
    // http.defaults.headers.common['content-type'] = contentType

    // delete http.defaults.headers.common['content-type'];
    // http.defaults.headers.common['content-type'] = contentType;

    // data.banner_image = data.banner_image[0];

    console.log(data);

    return http.post("/restaurant-detail/add-restaurant", data);
};

const update = (id, data) => {
    return http.put(`/restaurant-detail/update-restaurant/${id}`, data);
};

const remove = id => {
    return http.delete(`/restaurant-detail/delete-restaurant/${id}`);
};

const findByTitle = title => {
    return http.get(`/todo?title=${title}`);
};

const RestaurantServices = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle
};

export default RestaurantServices;