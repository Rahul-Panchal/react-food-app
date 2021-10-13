import React, { Component } from 'react';
import {useSelector} from 'react-redux';

import Leftside from './Leftside';
import ManagerLeftside from './ManagerLeftside';
import CustomerLeftside from './CustomerLeftside';
import FieldBoyLeftside from './FieldBoyLeftside';
import Header from './Header'
import Footer from './Footer'

import Navbar from './Navbar';

// import Home from '../Home' 

import Home from '../components/Home';

// import Home from '../components/Home';
import About from '../components/About';
import AddUser from '../components/users/AddUser';
import EditUser from '../components/users/EditUser';
// import UsersList from './components/users/UsersList';
import AllUsersList from '../components/users/AllUsersList';

import AllRestaurantsList from '../components/restaurant/AllRestaurantsList';
import AddRestaurant from '../components/restaurant/AddRestaurant';
import EditRestaurant from '../components/restaurant/EditRestaurant';
import RestaurantFoodProducts from '../components/restaurant/RestaurantFoodProducts';
import AddRestaurantFoodProduct from '../components/restaurant/AddRestaurantFoodProduct';
import EditRestaurantFoodProduct from '../components/restaurant/EditRestaurantFoodProduct';

import AddFoodCategory from '../components/food_categories/AddFoodCategory';
import AllFoodCategoriesList from '../components/food_categories/AllFoodCategoriesList';
import EditFoodCategory from '../components/food_categories/EditFoodCategory';

import AddFoodSubCategory from '../components/food_sub_categories/AddFoodSubCategory';
import EditFoodSubCategory from '../components/food_sub_categories/EditFoodSubCategory';
import AllFoodSubCategoriesList from '../components/food_sub_categories/AllFoodSubCategoriesList';

import AddFoodProduct from '../components/food_products/AddFoodProduct';
import EditFoodProduct from '../components/food_products/EditFoodProduct';
import AllFoodProducts from '../components/food_products/AllFoodProducts';
import SelectFoodProducts from '../components/food_products/SelectFoodProducts';




import Login from '../components/users/Login';
import Logout from '../components/users/Logout';
import Welcome from '../components/Welcome';


import {
    Route, Switch, Redirect
} from 'react-router-dom';
import { Form } from 'react-bootstrap/lib/Navbar';

const Layout = (props) => {

    // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    const token  = useSelector((state)=>state.login.token);
    const userType  = useSelector((state)=>state.login.loggedInUserDetails.user_type);
  
    const renderSwitch = (userType) => {
        switch(userType) {
            case '1':
                return <Leftside></Leftside>;
            case '2':
                return <ManagerLeftside></ManagerLeftside>;
            case '3':
                return <FieldBoyLeftside></FieldBoyLeftside>;
            case '4':
                return <CustomerLeftside></CustomerLeftside>;
            default:
                return <Leftside></Leftside>;
        }
    }

    return (
        <div>
            <div id="wrapper">
                {/* <Navbar/> */}


                

                {renderSwitch(userType)}

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header name={props.name} />

                        <Route exact path="/" component={Login} />
                        <Route path="/about" component={About} />
                        <Route exact path="/welcome" component={Welcome} />
                        <Route path="/logout" component={Logout} />

                        <Route exact path="/edit-user/:id" component={EditUser} />
                        {/* <Route exact path="/users/:id" component={Users}/> */}

                        <Route exact path="/add-user" component={AddUser} />
                        {/* <Route path="/users-list" component={UsersList}/> */}
                        <Route path="/users-list" component={AllUsersList} />
                        <Route path="/add-restaurant" component={AddRestaurant} />
                        <Route path="/restaurants-list" component={AllRestaurantsList} />
                        <Route exact path="/edit-restaurant/:id" component={EditRestaurant} />
                        <Route path="/restaurant-product-list/:restaurant_id" component={RestaurantFoodProducts} />

                        <Route path="/add-food-category" component={AddFoodCategory} />
                        <Route path="/all-food-categories" component={AllFoodCategoriesList} />
                        <Route exact path="/edit-food-category/:id" component={EditFoodCategory} />

                        <Route path="/add-food-sub-category" component={AddFoodSubCategory} />
                        <Route path="/add-food-sub-category/:food_category_id" component={AddFoodSubCategory} />
                        <Route path="/edit-food-sub-category/:sub_food_category_id" component={EditFoodSubCategory} />
                        <Route path="/all-food-sub-categories" component={AllFoodSubCategoriesList} />

                        <Route path="/add-food-product" component={AddFoodProduct} />
                        <Route path="/add-food-product/:sub_category_id" component={AddFoodProduct} />
                        <Route path="/edit-food-product/:food_product_id" component={EditFoodProduct} />
                        <Route path="/all-food-products" component={AllFoodProducts} />
                        {/* <Route path="/select-food-products" component={SelectFoodProducts} /> */}
                        <Route path="/select-food-products/:restaurant_id" component={SelectFoodProducts} />
                        <Route path="/add-restaurant-food-product/:restaurant_id/:food_product_id" component={AddRestaurantFoodProduct}/>
                        <Route path="/update-restaurant-food-product/:restaurant_food_product_id" component={EditRestaurantFoodProduct}/>

                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Layout;