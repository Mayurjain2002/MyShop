import React, { useState,useEffect } from 'react'
import myContext from './myContext'
import { Timestamp,addDoc,doc,collection, deleteDoc, onSnapshot, orderBy, query, setDoc, getDoc, getDocs} from 'firebase/firestore';
import { toast } from 'react-toastify'
import { fireDB } from '../../firebase/Firbase';
import { QuerySnapshot } from 'firebase/firestore';

const MyState = (props) => {

  const [mode, setMode] = useState('light')
  const [loading,setLoading] = useState(false);

  const toggleMode = () =>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [products,setProducts] = useState({
    title:null,
    price:null,
    imageURL:null,
    category:null,
    description:null,
    time:Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
          month: "short",
          day: "2-digit",
          year: "numeric",
      }
    )
  })

  const addProduct = async () =>{
    setLoading(true)
    if (products.title == null || products.price == null || products.imageURL == null || products.category == null || products.description == null) {
      return toast.error("all fields are required")
    }
  
  try {
    const product = collection(fireDB,'products')
    await addDoc(product,products)
    toast.success("Add product succesfully")
    setTimeout(() =>{
      window.location.href = '/dashboard'
    },5000)
    getProducts();
    setLoading(false)
    
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}


    const [product,setProduct]= useState([]); 

    const getProducts = async () =>{

      setLoading(true)
      try {
        const q = query(
          collection(fireDB,'products'),
          orderBy('time')
        )

        const data = onSnapshot(q, (QuerySnapshot) =>{
        let productArray = [];
        QuerySnapshot.forEach((doc) =>{
          productArray.push({...doc.data(), id : doc.id})
        });
        setProduct(productArray)
        setLoading(false)
        });
        return () => data
      }
      
      catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    const edithandle = (item) =>{
      setProduct(item)
    }

    const updateProduct = async () =>{
      setLoading(true)
      try {
        await setDoc(doc(fireDB,'products',product.id),products)
        toast.success("updated successfully")
        getProducts()
        setTimeout(() =>{
          window.location.href = '/dashboard'
        },3000)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    const deleteProduct = async (item) =>{
      setLoading(true)
      try {
        await deleteDoc(doc(fireDB,'products',item.id))
        toast.success("deleted successfully")
        setLoading(false);
        getProducts()
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  const [order,setOrder] = useState([]);
  const getOrderData = async () => {
    setLoading(true)
    try {
      await getDocs(collection(fireDB, "orders"))
      .then((querySnapshot)=>{              
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
          setOrder(newData);                
         
      })
    } 
    // try {
    //   const q = query(
    //     collection(fireDB,'orders')
    //     // orderBy('time')
    //   )

    //   const data = onSnapshot(q, (QuerySnapshot) =>{
    //   let orderstArray = [];
    //   QuerySnapshot.forEach((doc) =>{
    //     orderstArray.push({...doc.data(), id : doc.id})
    //   });
    //   setOrder(orderstArray)
    //   setLoading(false)
    //   });
    //   return () => data();
    // }
    catch (error) {
        console.log(error)
        setLoading(false)
    }
}

   const [user,setUser] = useState([]);
   const getUserData = async () => {
    setLoading(true)
    try {
      await getDocs(collection(fireDB, "users"))
      .then((querySnapshot)=>{              
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
          setUser(newData);                
         
      })
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

const [searchkey, setSearchkey] = useState('')
const [filterType, setFilterType] = useState('')
const [filterPrice, setFilterPrice] = useState('')

    


    useEffect(() =>{
      getProducts();
      getOrderData();
      getUserData();
    },[])

  return (
    <myContext.Provider value={{mode,toggleMode,loading,setLoading,products,setProducts,addProduct,product
    ,edithandle,updateProduct,deleteProduct,order,user,searchkey,setSearchkey,filterPrice,filterType,setFilterPrice,setFilterType}}>
        {props.children}
    </myContext.Provider>
  )
}

export default MyState