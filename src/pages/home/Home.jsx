import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import HeroSection from '../../components/herosection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productcard/ProductCard'
import Testimonial from '../../components/testimonial/Testimonial'
import { Link } from 'react-router-dom'


const Home = () => {
    
  return (
    <Layout>
       <HeroSection />
       <Filter />
       <ProductCard />
       <div className='flex justify-center -mt-10 mb-4'>
        <Link to={'/allproducts'} >
          <button className='bg-gray-300 px-5 py-2 rounded-xl'>See More</button>
        </Link>
       </div>
       <Testimonial />
    </Layout>
  )
}

export default Home