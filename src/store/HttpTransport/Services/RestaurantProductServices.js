import http from "../FoodApp.Transport";

const getAll = () => {
    return http.get("/restaurant-detail/restaurant-list");
};

const get = id => {
    return http.get(`/restaurant-detail/restaurant-list/${id}`);
};

const getAllFoodProducts = id => {
    return http.get(`/restaurant-detail/restaurant-product-list/${id}`);
};

const create = data => {
    return http.post("/restaurant-detail/add-restaurant-product", data);
};

const update = (id, data) => {
    return http.put(`/restaurant-detail/update-restaurant/${id}`, data);
};

const remove = id => {
    return http.delete(`/restaurant-detail/delete-restaurant-product/${id}`);
};

const findByTitle = title => {
    return http.get(`/todo?title=${title}`);
};

const RestaurantProductServices = {
    getAll,
    get,
    getAllFoodProducts,
    create,
    update,
    remove,
    findByTitle
};

export default RestaurantProductServices;