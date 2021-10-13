import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { retrieveAll as getAllFoodCategories } from '../../redux/features/foodCategorySlice';
import { retrieveAll as getAllFoodSubCategories, foodSubCategoriesByCategoryId } from '../../redux/features/foodSubCategorySlice';
import { retrieveAll as getAllRestaurantsList} from '../../redux/features/restaurantSlice';

import { retrieveOne as getFoodProductDetails , clearFormData as clearFoodProductData, getFoodProductPlateSize} from '../../redux/features/foodProductSlice';

import { clearFormData, handleUpdateAction, updateInputDetails, handleImageChange, retrieveAll, retrieveOne, removeOne, getFoodProductStatusList, getUserTypesList } from '../../redux/features/restaurantProductSlice';

import { useForm } from 'react-hook-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


const EditRestaurantFoodProduct = (props) => {

  // const [product_image, setProductImage] = useState()
  const [preview, setPreview] = useState()

  const restaurantFoodProductDetail = useSelector((state) => state.restaurantProduct.foodProductDetails);
  const foodCategoryId = useSelector((state) => state.restaurantProduct.food_category_id);
  const foodSubCategoryId = useSelector((state) => state.restaurantProduct.food_sub_category_id);
  const isReadyForUpdate = useSelector((state) => state.restaurantProduct.isReadyForUpdate);

  const foodProductDetail = useSelector((state) => state.foodProduct.foodProductDetails)

  // const foodCategoryId = useSelector((state) => state.foodProduct.food_category_id);
  const isImageUploaded = useSelector((state) => state.restaurantProduct.foodProductDetails.isImageUploaded)
  const product_image = useSelector((state) => state.restaurantProduct.foodProductDetails.product_image)

  const dispatch = useDispatch();
  const history = useHistory();

  // const { restaurant_id , food_product_id } = useParams();
  const {restaurant_food_product_id} =  useParams();

  const allFoodCategoreis = useSelector((state) => state.foodCategory.allFoodCategoreis);
  const allFoodSubCategories = useSelector((state) => state.foodSubCategory.allFoodSubCategories);
  const allRestaurantsList  = useSelector((state) => state.restaurant.allRestaurantsList);

  const foodProductStatusList = useSelector((state)=> state.restaurantProduct.foodProductStatusList);
  const foodProductPlateSize = useSelector((state)=> state.foodProduct.foodProductPlateSize);

  const { register, handleSubmit, reset, formState: { errors } } = useForm(
    {
      defaultValues: {
        _id                     : "",
        restaurant_detail_id    : "",
        food_product_id         : "",
        product_discount        : "",
        half_plate_price        : "",
        full_plate_price        : "",
        product_price           : "",
        product_image           : "",
        status                  : "", 
      }
    }
  );

  // <Route path="update-restaurant-food-product/:restaurant_food_product_id" component={EditRestaurantFoodProduct}/>


  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!isImageUploaded) {
        setPreview(undefined)
        return
    }

    console.log('product_image :: ' + product_image)
    console.log('isImageUploaded :: ' + isImageUploaded)


    const objectUrl = URL.createObjectURL(product_image)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [isImageUploaded])

  useEffect(() => {

    console.log('restaurant food Product Details form update form')
    console.log(restaurantFoodProductDetail);
    
    console.log( 'foodCategoryId  :: '+ foodCategoryId);
    console.log('isReadyForUpdate :: ' + isReadyForUpdate);


    dispatch(getAllFoodCategories());

    dispatch(getAllFoodSubCategories());

    dispatch(getFoodProductStatusList());
    dispatch(getAllRestaurantsList());
    dispatch(getFoodProductPlateSize());


  }, [isReadyForUpdate]);

  useEffect(() => {

    setTimeout(function(){
      if(foodCategoryId)
        dispatch(foodSubCategoriesByCategoryId(foodCategoryId));

    },500)
  }, [foodCategoryId]);



  const onSubmit = async (data) => {
    console.log('restaurants food product form Details')
    console.log(data);
    // data['restaurant_detail_id'] = restaurant_id;
    data['food_product_id'] = restaurantFoodProductDetail.food_product_id._id;
    console.log(data);
    data['_id'] = restaurant_food_product_id;
    dispatch(handleUpdateAction(data));

    await sleep(1000);

    history.push("/restaurant-product-list/"+restaurantFoodProductDetail.restaurant_detail_id);
  };

  return (

    <div className="container-fluid">

      <div className="row">
        <div className="container">

          <form className="user" onSubmit={handleSubmit(onSubmit)}>

            <div class="form-header">
              {"Update Food Product Within Restaurant"}
            </div>


            <div className="form-group row">
              <div className="col-sm-3"><label><b>Restaurant Name</b></label></div>
              <div className="col-sm-9">
                <select className="form-control" {...register('restaurant_detail_id', { required: true})}  name="restaurant_detail_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantFoodProductDetail.restaurant_detail_id} required>
                  <option>Select Restaurant</option>
                  {
                    (allRestaurantsList) ?
                      (allRestaurantsList.map((data) =>

                        <option key={data._id} value={data._id} >{data.restaurant_name}</option>
                      )) : null
                  }
                </select>
              </div>
            </div>

            <div className="form-group row">
              
              <div className="col-sm-3"><label><b>Food Category</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" {...register('food_category_id', { required: true})}  name="food_category_id" onChange={(e) => dispatch(foodSubCategoriesByCategoryId(e.target.value))} value={foodCategoryId} required>
                  <option>Select Food Category</option>
                  {
                    (allFoodCategoreis) ?
                      (allFoodCategoreis.map((data) =>

                        <option key={data._id} value={data._id} >{data.name}</option>
                      )) : null
                  }
                </select>
              </div>
              
              <div className="col-sm-3"><label><b>Food Sub Category</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" {...register('food_sub_category_id', { required: true})}  name="food_sub_category_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={(restaurantFoodProductDetail.food_product_id.food_sub_category_id) ? restaurantFoodProductDetail.food_product_id.food_sub_category_id._id:foodSubCategoryId} required>
                <option>Select Food Sub Category</option>
                  {
                    (allFoodSubCategories) ?
                      (allFoodSubCategories.map((data) =>

                        <option key={data._id} value={data._id} >{data.name}</option>
                      )) : null
                  }
                </select>
              </div>
            
            </div>

            <div className="form-group row">
              
              <div className="col-sm-3"><label><b>Product Name</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Product Name" {...register('product_name', { required: false})}  name="product_name" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantFoodProductDetail.food_product_id.product_name} required />
              </div>
              
              <div className="col-sm-3"><label><b>Product Status</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" {...register('status', { required: false })} name="status" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={restaurantFoodProductDetail.status}>
                  <option>Select Status</option>
                  {
                    (foodProductStatusList) ?
                      (foodProductStatusList.map((data) =>
                        <option key={data.id} value={data.id} >{data.name}</option>
                      )) : null
                  }
                </select>
              </div>
            
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Product Description</b></label></div>
              <div className="col-sm-9">
                <textarea className="form-control" placeholder="Product Description" {...register('product_description', { required: false})} name="product_description" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantFoodProductDetail.food_product_id.product_description} />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Product Plate Status</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" {...register('plate_status', { required: false })} name="plate_status" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={restaurantFoodProductDetail.food_product_id.plate_status}>
                  <option>Select Plate Status</option>
                  {
                    (foodProductPlateSize) ?
                      (foodProductPlateSize.map((data) =>
                        // (user_type == data.id) ?
                        <option key={data.id} value={data.id} >{data.name}</option>
                        // :null
                      )) : null
                  }
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Update Product Image</b></label></div>
              <div className="col-sm-3">
                {/* <input type='file' {...register('product_image', { required: false})}  name="product_image" onChange={onSelectFile} /> */}
                <input type="file" className="form-control custom-file-input" id="customFile" {...register('product_image', { required: false})} name="product_image" onChange={(e) => dispatch(handleImageChange({ [e.target.name]: e.target.files[0] }))} />
                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
              </div>

              <div className="col-sm-3"><label><b>Product Image</b></label></div>
              <div className="col-sm-3">
                {isImageUploaded ? <img src={preview} alt={preview} width="75" height="75"/> : <img src={`http://localhost:8081/images/restaurant_product_images/`+restaurantFoodProductDetail.product_image}  alt={"No Image"} width="75" height="75"/> }
              </div>

            </div>

            {
            (restaurantFoodProductDetail.food_product_id.plate_status) ? 

              <div>
                <div className="form-group row">
                  <div className="col-sm-3"><label><b>Half Plate Price</b></label></div>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" placeholder="Half Plate Price" {...register('half_plate_price', { required: false})}  name="half_plate_price" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantFoodProductDetail.half_plate_price} />
                  </div>
                  <div className="col-sm-3"><label><b>Full Plate Price</b></label></div>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" placeholder="Full Plate Price" {...register('full_plate_price', { required: false})}  name="full_plate_price" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantFoodProductDetail.full_plate_price} />
                  </div>
                </div>
                  
                <div className="form-group row">
                  <div className="col-sm-3"><label><b>Product Discount</b></label></div>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" placeholder="Product Discount" {...register('product_discount', { required: false})}  name="product_discount" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantFoodProductDetail.product_discount} />
                  </div>
                </div>
              </div>

            :

              <div className="form-group row">
                <div className="col-sm-3"><label><b>Product Price</b></label></div>
                <div className="col-sm-3">
                  <input type="text" className="form-control" placeholder="Product Price" {...register('product_price', { required: false})}  name="product_price" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantFoodProductDetail.product_price} />
                </div>
                <div className="col-sm-3"><label><b>Product Discount</b></label></div>
                <div className="col-sm-3">
                  <input type="text" className="form-control" placeholder="Product Discount" {...register('product_discount', { required: false})}  name="product_discount" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantFoodProductDetail.product_discount} />
                </div>
              </div>
            }


            <button type="submit" className="btn btn-info">{"Submit"}</button>

          </form>
        </div>

      </div>
    </div>
  );

}

export default EditRestaurantFoodProduct;