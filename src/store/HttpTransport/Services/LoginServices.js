import http from "../FoodApp.Transport";

const getAll = () => {
    return http.get("/admin/get-food-categories");
};

const get = id => {
    return http.get(`/admin/get-food-categories/${id}`);
};


const create = data => {
    return http.post("/admin/add-food-category", data);
};

const update = (id, data) => {
    return http.put(`/todo/${id}`, data);
};

const remove = id => {
    return http.delete(`/admin/delete-food-category/${id}`);
};

const findByTitle = title => {
    return http.get(`/todo?title=${title}`);
};

const LoginService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle
};

export default LoginService;