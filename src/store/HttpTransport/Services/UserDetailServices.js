import http from "../FoodApp.Transport";

const getAll = () => {
    return http.get("/get-users-list");
};

const get = id => {
    return http.get(`/get-users-list/${id}`);
};

const create = data => {
    return http.post("/register", data);
};

const update = (id, data) => {
    return http.put(`/update-user-details/${id}`, data);
};

const remove = id => {
    return http.delete(`/delete-user-details/${id}`);
};

const findByTitle = title => {
    return http.get(`/todo?title=${title}`);
};

const UserDetailServices = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle
};

export default UserDetailServices;