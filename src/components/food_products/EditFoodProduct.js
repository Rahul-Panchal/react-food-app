import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { retrieveAll as getAllFoodCategories } from '../../redux/features/foodCategorySlice';
import { retrieveAll as getAllFoodSubCategories, foodSubCategoriesByCategoryId } from '../../redux/features/foodSubCategorySlice';

import { clearFormData, handleUpdateAction, updateInputDetails, handleImageChange, comparePassword, retrieveAll, retrieveOne, removeOne, getCountriesList, getStateList, getStateCities, getCitiesList, getFoodProductStatusList, getUserTypesList } from '../../redux/features/foodProductSlice';
import { useForm } from 'react-hook-form';


const EditFoodProduct = (props) => {

  // const [product_image, setProductImage] = useState()
  const [preview, setPreview] = useState()

  const foodProductDetail = useSelector((state) => state.foodProduct.foodProductDetails)
  const foodCategoryId = useSelector((state) => state.foodProduct.food_category_id);
  const isReadyForUpdate = useSelector((state) => state.foodProduct.isReadyForUpdate)
  const isImageUploaded = useSelector((state) => state.foodProduct.foodProductDetails.isImageUploaded)
  const product_image = useSelector((state) => state.foodProduct.foodProductDetails.product_image)

  const dispatch = useDispatch();
  const history = useHistory();

  const { food_product_id } = useParams();

  const allFoodCategoreis = useSelector((state) => state.foodCategory.allFoodCategoreis);
  const allFoodSubCategories = useSelector((state) => state.foodSubCategory.allFoodSubCategories);
 

  const foodProductStatusList = useSelector((state)=> state.foodProduct.foodProductStatusList);

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

/*
const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        // setProductImage(undefined)
        return
    }

    // I've kept this example simple by using the first image instead of multiple
    setProductImage(e.target.files[0])
    // console.log('setProductImage(e.target.files[0])');
    // console.log(e.target.files[0]);

    // dispatch(handleImageChange({ [e.target.name]: e.target.files[0] }))

}
*/
  useEffect(() => {

    console.log('food Product Details')
    console.log(foodProductDetail);
    // console.log('id :: '+id);

    console.log('isReadyForUpdate :: ' + isReadyForUpdate);


    dispatch(getCountriesList());
    dispatch(getStateList());
    dispatch(getAllFoodCategories());
    dispatch(getAllFoodSubCategories());
    dispatch(getFoodProductStatusList());

    return () => {
      dispatch(clearFormData());
    }

  }, []);

  const onSubmit = async (data) => {
    console.log('restaurants update form Details')
    console.log(data);
    data['_id'] = food_product_id;
    await dispatch(handleUpdateAction(data));
    history.push("/all-food-products");
  };

  return (

    <div className="container-fluid">

      <div className="row">
        <div className="container">

          <form className="user" onSubmit={handleSubmit(onSubmit)}>

            <div class="form-header">
              {"Update Food Product"}
            </div>



            <div className="form-group row">
              
              <div className="col-sm-3"><label><b>Food Category</b></label></div>
              <div className="col-sm-3">
                {/* <select className="form-control" {...register('food_category_id', { required: true})}  name="food_sub_category_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={foodProductDetail.food_category_id} required> */}
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
              <div className="col-sm-3"><label><b>Update Product Image</b></label></div>
              <div className="col-sm-3">
                {/* <input type='file' {...register('product_image', { required: false})}  name="product_image" onChange={onSelectFile} /> */}
                <input type="file" className="form-control custom-file-input" id="customFile" {...register('product_image', { required: false})} name="product_image" onChange={(e) => dispatch(handleImageChange({ [e.target.name]: e.target.files[0] }))} />
                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
              </div>

              <div className="col-sm-3"><label><b>Product Image</b></label></div>
              <div className="col-sm-3">
                {isImageUploaded ? <img src={preview} alt={preview} width="75" height="75"/> : <img src={`http://localhost:8081/images/product_images/`+foodProductDetail.product_image}  alt={"No Image"} width="75" height="75"/> }
              </div>

            </div>


            <button type="submit" className="btn btn-info">{"Update"}</button>

          </form>
        </div>

      </div>
    </div>
  );

}

export default EditFoodProduct;