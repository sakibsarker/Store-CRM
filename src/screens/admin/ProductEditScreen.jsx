import React,{useEffect,useState} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom'
import {Button,Row,Col,Table,Form} from 'react-bootstrap';
import {FaTimes,FaEdit,FaTrash} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer'
import {useUpdateProductMutation,
    useGetProductDetailsQuery,
    useUploadProductImageMutation,
    useUploadBannerImageMutation,
    useUploadBannerImageTwoMutation,
    useUploadBannerImageThreeMutation} from '../../slices/productsApiSlice';

import { useSelector,useDispatch } from 'react-redux/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProductEditScreen = () => {
    const {id:productId}=useParams();


    const [name,setName]=useState('');
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState('');
    const [imagetwo,setImagetwo]=useState('');
    const [imagethree,setImagethree]=useState('');
    const [brand,setBrand]=useState('');
    const [titlebanner,setTitlebanner]=useState('');
    const [desbanner,setDesbanner]=useState('');
    const [bannerimg,setBannerimg]=useState('');
    const [titlebannertwo,setTitlebannertwo]=useState('');
    const [desbannertwo,setDesbannertwo]=useState('');
    const [bannerimgtwo,setBannerimgtwo]=useState('');
    const [titlebannerthree,setTitlebannerthree]=useState('');
    const [desbannerthree,setDesbannerthree]=useState('');
    const [bannerimgthree,setBannerimgthree]=useState('');
    const [specifications,setSpecifications]=useState('');
    const [detailspecifications,SetDetailspecifications]=useState('');
    const [materialtitle,setMaterialtitle]=useState('');
    const [materialdes,setMaterialdes]=useState('');
    const [included,setIncluded]=useState('');
    const [compatible,setCompatible]=useState('');
    const [category,setCategory]=useState('');
    const [countInStock,setCountInStock]=useState(0);
    const [description,setDescription]=useState('');

    const {data:product,isLoading,refetch,error} =useGetProductDetailsQuery(productId);

    const [updateProduct,{isLoading:loadingUpdating}] =useUpdateProductMutation();

    const [uploadProductImage,{isLoading:loadingUpload}] =useUploadProductImageMutation();

    const [uploadBannerImage,{isLoading:loadingBannerImg}] =useUploadBannerImageMutation();

    const [uploadBannerImageTwo,{isLoading:loadingBannerImgTwo}] =useUploadBannerImageTwoMutation();

    const [uploadBannerImageThree,{isLoading:loadingBannerImgThree}] =useUploadBannerImageThreeMutation();



    const navigate=useNavigate();

    useEffect(()=>{
        if(product){
           setName(product.name);
           setPrice(product.price);
           setImage(product.image);
           setImagetwo(product.imagetwo);
           setImagethree(product.imagethree);
           setBrand(product.brand);
           setTitlebanner(product.titlebanner);
           setDesbanner(product.desbanner);
           setBannerimg(product.bannerimg);
           setTitlebannertwo(product.titlebannertwo),
           setDesbannertwo(product.desbannertwo);
           setBannerimgtwo(product.bannerimgtwo);
           setTitlebannerthree(product.titlebannerthree);
           setDesbannerthree(product.desbannerthree);
           setBannerimgthree(product.bannerimgthree);
           setSpecifications(product.specifications);
           SetDetailspecifications(product.detailspecifications);
           setMaterialtitle(product.materialtitle);
           setMaterialdes(product.materialdes);
           setIncluded(product.included);
           setCompatible(product.compatible);
           setCategory(product.category);
           setCountInStock(product.countInStock);
           setDescription(product.description);
        }
    },[product]);

    const submitHandler=async(e)=>{
        e.preventDefault();
        const updatedProduct={
            productId,
            name,
            price,
            image,
            imagetwo,
            imagethree,
            titlebanner,
            desbanner,
            bannerimg,
            titlebannertwo,
            desbannertwo,
            bannerimgtwo,
            titlebannerthree,
            desbannerthree,
            bannerimgthree,
            specifications,
            detailspecifications,
            materialtitle,
            materialdes,
            included,
            compatible,
            brand,
            category,
            countInStock,
            description,
        };

        const result=await updateProduct(updatedProduct);
        if(result.error){
            toast.error(result.error);
        }else{
            toast.success('Product updated');
            navigate('/admin/productlist');
        }

    }

    const uploadFileHandler=async(e)=>{
        const formData=new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const res=await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error?.data?.message||error.error)
            
        }
    }

    const uploadBannerFileHandler=async(e)=>{
        const formData=new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const res=await uploadBannerImage(formData).unwrap();
            toast.success(res.message);
            setBannerimg(res.image);
        } catch (error) {
            toast.error(error?.data?.message||error.error)
            
        }
    }

    const uploadBannerTwoFileHandler=async(e)=>{
        const formData=new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const res=await uploadBannerImageTwo(formData).unwrap();
            toast.success(res.message);
            setBannerimgtwo(res.image);
        } catch (error) {
            toast.error(error?.data?.message||error.error)
            
        }
    }

    const uploadBannerThreeFileHandler=async(e)=>{
        const formData=new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const res=await uploadBannerImageThree(formData).unwrap();
            toast.success(res.message);
            setBannerimgthree(res.image);
        } catch (error) {
            toast.error(error?.data?.message||error.error)
            
        }
    }


  return (
    <>
    <Link to="/admin/productlist" className='btn btn-light my-3'>
    GO Back
    </Link>
    <FormContainer>
        <h2>Edit Product</h2>
        {loadingUpdating && <Loader/>}
        {
            isLoading?<Loader/>
            :error?<Message variant='danger'>{error}</Message>:(
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

{/* image */}
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e)=>setImage}
                        ></Form.Control>

                         <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadFileHandler}
                        ></Form.Control>
                    </Form.Group>
                    {loadingUpload && <Loader/>}

                    <Form.Group controlId='imageTwo'>
                        <Form.Label>Image Two</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image Two url'
                        value={imagetwo}
                        onChange={(e)=>setImagetwo}
                        ></Form.Control>

                        
                    </Form.Group>
                 


                    <Form.Group controlId='imageThree'>
                        <Form.Label>Image Three</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image Three url'
                        value={imagethree}
                        onChange={(e)=>setImagethree}
                        ></Form.Control>

                     
                    </Form.Group>
                    


                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e)=>setBrand(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='titlebanner'>
                        <Form.Label>Title Banner</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter titlebanner'
                        value={titlebanner}
                        onChange={(e)=>setTitlebanner(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='desbanner'>
                        <Form.Label>Description Banner</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter description banner'
                        value={desbanner}
                        onChange={(e)=>setDesbanner(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='bannerimg'>
                        <Form.Label>bannerimg</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter bannerimg url'
                        value={bannerimg}
                        onChange={(e)=>setBannerimg}
                        ></Form.Control>
                         <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadBannerFileHandler}
                        ></Form.Control>
                    </Form.Group>
                    {loadingBannerImg && <Loader/>}

                    <Form.Group controlId='titlebannertwo'>
                        <Form.Label>Title Banner two</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter title banner tow'
                        value={titlebannertwo}
                        onChange={(e)=>setTitlebannertwo(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='desbannertwo'>
                        <Form.Label>Description Banner two</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter description banner two'
                        value={desbannertwo}
                        onChange={(e)=>setDesbannertwo(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='bannerimgtwo'>
                        <Form.Label>bannerimgtwo</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter bannerimgtwo url'
                        value={bannerimgtwo}
                        onChange={(e)=>setBannerimgtwo}
                        ></Form.Control>
                    <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadBannerTwoFileHandler}
                        ></Form.Control>
                    </Form.Group>
                    {loadingBannerImgTwo && <Loader/>}

                    <Form.Group controlId='titlebannerthree'>
                        <Form.Label>Title Banner three</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter title banner three'
                        value={titlebannerthree}
                        onChange={(e)=>setTitlebannerthree(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='desbannerthree'>
                        <Form.Label>Description Banner three</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter description banner three'
                        value={desbannerthree}
                        onChange={(e)=>setDesbannerthree(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='bannerimgthree'>
                        <Form.Label>bannerimg three</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter bannerimg three url'
                        value={bannerimgthree}
                        onChange={(e)=>setBannerimgthree}
                        ></Form.Control>
                    <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadBannerThreeFileHandler}
                        ></Form.Control>
                    </Form.Group>
                    {loadingBannerImgThree && <Loader/>}

                    <Form.Group controlId='specifications'>
                        <Form.Label>Specifications</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter specifications'
                        value={specifications}
                        onChange={(e)=>setSpecifications(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='detailspecifications'>
                        <Form.Label>Detailspecifications</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter detailspecifications'
                        value={detailspecifications}
                        onChange={(e)=>SetDetailspecifications(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    
                    <Form.Group controlId='materialtitle'>
                        <Form.Label>Material title</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter materialtitle'
                        value={materialtitle}
                        onChange={(e)=>setMaterialtitle(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='materialdes'>
                        <Form.Label>Material description</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter materialdes'
                        value={materialdes}
                        onChange={(e)=>setMaterialdes(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='included'>
                        <Form.Label>Included</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter included'
                        value={included}
                        onChange={(e)=>setIncluded(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='compatible'>
                        <Form.Label>Compatible</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter compatible'
                        value={compatible}
                        onChange={(e)=>setCompatible(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='cetegory'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter cetegory'
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>CountInStock</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter countInStock'
                        value={countInStock}
                        onChange={(e)=>setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button style={{ backgroundColor: "#1967D2"}} type='submit' value='primary' className='my-2'>Update</Button>
                </Form>
            )
        }
    </FormContainer>
    </>
  )
}

export default ProductEditScreen