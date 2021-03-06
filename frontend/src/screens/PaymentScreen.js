import React, {useState} from 'react'
import {Button, Col, Form, FormCheck} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const PaymentScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()
    if(!shippingAddress){
        history.push("/shipping")
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <h1>Shipping</h1>
            <Form onSubmit ={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                
                <Col>
                    <FormCheck type='radio' label="PayPal or Credit Card" id='PayPal' name='paymentMethod' value ='PayPal' checked onChange ={(e) => setPaymentMethod(e.target.value)}></FormCheck>
                </Col>
                </Form.Group>
                <Button className = 'mt-3' type='submit' variant ='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
