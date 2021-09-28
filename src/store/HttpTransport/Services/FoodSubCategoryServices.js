import http from "../FoodApp.Transport";

const getAll = () => {
    return http.get("/admin/get-food-sub-categories");
};

const get = id => {
    return http.get(`/admin/get-food-sub-categories/${id}`);
};


const create = data => {
    return http.post("/admin/add-food-sub-category", data);
};

const update = (id, data) => {
    return http.put(`/admin/update-food-sub-category/${id}`, data);
};

const remove = id => {
    return http.delete(`/admin/delete-food-sub-category/${id}`);
};

const findByFoodCategoryId = id => {
    return http.get(`/admin/get-food-sub-categories-by-category-id/${id}`);
};

const findByTitle = title => {
    return http.get(`/todo?title=${title}`);
};

const FoodSubCategoryServices = {
    getAll,
    get,
    create,
    update,
    remove,
    findByFoodCategoryId,
    findByTitle
};

export default FoodSubCategoryServices;