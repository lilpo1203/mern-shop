import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js'
import Paginate from '../components/Paginate.js'
import ProductCarousel from '../components/ProductCarousel.js'
import Meta from '../components/Meta'


const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)

    const {loading, products, error,page,pages} = productList

    useEffect(() => {
        dispatch(listProducts(keyword,pageNumber))
    },[dispatch,keyword,pageNumber])

    return (
        <div>
            <Meta></Meta>
            {!keyword && <ProductCarousel></ProductCarousel>}
            <h1>Lastest Product</h1>
            {loading ? (<Loader/>) : error ? (<Message variant ='danger'>{error}</Message>) : (
            <div>
            <Row>
                {products.map((product)=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
            <Paginate pages={pages} page ={page} keyword={keyword ? keyword : ''}></Paginate>
            </div>
            )}
            
        </div>
    )
}

export default HomeScreen
