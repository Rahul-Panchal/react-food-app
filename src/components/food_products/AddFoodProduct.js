import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import DatePicker from "react-datepicker";

// import { getAllUsersList } from '../../store/actions/useraction';
// import { handleInputAction, validatePassword, getCountriesList, getStateList, getCitiesList, getStateCities, handleImageChange, handleDateChange, handleSubmitAction } from '../../store/actions/restaurantaction';

import { retrieveAll as getAllFoodCategories } from '../../redux/features/foodCategorySlice';
import { retrieveAll as getAllFoodSubCategories, foodSubCategoriesByCategoryId } from '../../redux/features/foodSubCategorySlice';

import { clearFormData, handleSubmitAction, updateInputDetails, handleImageChange, getFoodProductStatusList } from '../../redux/features/foodProductSlice';
import { useForm } from 'react-hook-form';


const AddFoodProduct = (props) => {

  const foodProductDetail = useSelector((state) => state.foodProduct.foodProductDetails)
  const isReadyForUpdate = useSelector((state) => state.foodProduct.isReadyForUpdate)

  const dispatch = useDispatch();
  const history = useHistory();

  const allFoodCategoreis = useSelector((state) => state.foodCategory.allFoodCategoreis);
  const allFoodSubCategories = useSelector((state) => state.foodSubCategory.allFoodSubCategories);
  const foodCategoryId = useSelector((state) => state.foodSubCategory.food_category_id);

  const foodProductStatusList = useSelector((state)=> state.foodProduct.foodProductStatusList);

  // const { id } = useParams();

  const { register, handleSubmit, reset, formState: { errors } } = useForm(
    {
      defaultValues: {
        '_id'                   : "",
        'food_category_id'      : "",
        'food_sub_category_id'  : "",
        'product_name'          : "",
       // 'product_taste_type'    : "",// [ Veg/Non Veg ]
        'product_description'   : "",
        //'product_price'         : "",
        //'product_disclaimer'    : "",
        'product_image'         : "",// [Array Object Multiple]
        //'product_weight_desc'   : "",// [Half Plate / Full Plate ( Need help Input text or create separate table ) ]
        'status'                : "",// [0/1]
        //'product_best_offer'    : "",// [0/1]
        //'product_top_selling'   : "",// [0/1]      },
      }
    }
  );

  useEffect(() => {

    console.log('userDetail Details')
    // console.log(userDetail);
    // console.log('id :: '+id);

    console.log('isReadyForUpdate :: ' + isReadyForUpdate);

    dispatch(getAllFoodCategories());
    dispatch(getAllFoodSubCategories());
    dispatch(getFoodProductStatusList());

    return () => {
      dispatch(clearFormData());
    }

  }, []);

  const onSubmit = async (data) => {
    console.log('userDetail submit form Details')
    console.log(data);
    await dispatch(handleSubmitAction(data));
    history.push("/all-food-products");
  };

  return (

    <div className="container-fluid">

      <div className="row">
        <div className="container">

          <form className="user" onSubmit={handleSubmit(onSubmit)}>

            <div class="form-header">
              {"Add Food Product"}
            </div>



            <div className="form-group row">
              
              <div className="col-sm-3"><label><b>Food Category</b></label></div>
              <div className="col-sm-3">
              
              {/* <select className="form-control" {...register('food_category_id', { required: true})}  name="food_category_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={foodProductDetail.food_category_id} required> */}
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
                <select className="form-control" {...register('food_sub_category_id', { required: true})}  name="food_sub_category_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={foodProductDetail.food_sub_category_id} required>
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
                <input type="text" className="form-control" placeholder="Product Name" {...register('product_name', { required: false})}  name="product_name" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={foodProductDetail.product_name} required />
              </div>
              
              <div className="col-sm-3"><label><b>Product Status</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" {...register('status', { required: false })} name="status" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={foodProductDetail.status}>
                  <option>Select Status</option>
                  {
                    (foodProductStatusList) ?
                      (foodProductStatusList.map((data) =>
                        // (user_type == data.id) ?
                        <option key={data.id} value={data.id} >{data.name}</option>
                        // :null
                      )) : null
                  }
                </select>
              </div>
            
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Product Description</b></label></div>
              <div className="col-sm-9">
                <textarea className="form-control" placeholder="Product Description" {...register('product_description', { required: false})} name="product_description" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={foodProductDetail.product_description} />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Product Image</b></label></div>
              <div className="col-sm-3">
                <div className="custom-file">
                  {/* <input type="file" className="custom-file-input" id="customFile" name="product_image" onChange={(e) => handleImageChange(e.target)} /> */}
                  <input type="file" className="custom-file-input" id="customFile" {...register('product_image', { required: true})} name="product_image" onChange={(e) => dispatch(handleImageChange({ [e.target.name]: e.target.files[0] }))} />
                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-info">{"Update"}</button>

          </form>
        </div>

      </div>
    </div>
  );

}

export default AddFoodProduct;