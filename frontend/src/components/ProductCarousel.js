import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { useDispatch,useSelector } from 'react-redux'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {

    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const {error, loading, products} = productTopRated
    useEffect(() => {
        dispatch(listTopProducts())
    },[dispatch])

    return (
        <div>
            {loading ? <Loader></Loader> : error ? <Message>{error}</Message> : (
                <Carousel pause='hover' className='bg-dark'>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image className ='justify-content-center' src={product.image} alt={product.name} fluid></Image>
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>{product.name} ({product.price})</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    )
}

export default ProductCarousel
