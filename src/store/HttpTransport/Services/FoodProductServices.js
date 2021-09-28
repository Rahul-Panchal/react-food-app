import http from "../FoodApp.Transport";

const getAll = () => {
    return http.get("/food-product/product-list");
};

const get = id => {
    return http.get(`/food-product/product-list/${id}`);
};


const create = data => {
    return http.post("/food-product/add", data);
};

const update = (id, data) => {
    return http.put(`/food-product/update-food-product/${id}`, data);
};

const remove = id => {
    return http.delete(`/food-product/delete-food-product/${id}`);
};

const findByTitle = title => {
    return http.get(`/todo?title=${title}`);
};

const FoodProductServices = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle
};

export default FoodProductServices;