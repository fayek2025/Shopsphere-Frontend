const express = require('express');
// const cors = require('cors');
const SSLCommerzPayment = require('sslcommerz-lts');

const app = express();

// Enable CORS to allow requests from React Native
// app.use(cors());

const store_id = 'csedu6781174baa85a';
const store_passwd = 'csedu6781174baa85a@ssl';
const is_live = false; // true for live, false for sandbox

const host = '192.168.0.105'; // Replace this with your Metro's IP
const port = 3030;
const baseUrl = `http://${host}:${port}`;

// SSLCommerz initialization route
app.get('/init', (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // Use unique tran_id for each API call
        success_url: `${baseUrl}/success`,
        fail_url: `${baseUrl}/fail`,
        cancel_url: `${baseUrl}/cancel`,
        ipn_url: `${baseUrl}/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data)
        .then((apiResponse) => {
            const GatewayPageURL = apiResponse.GatewayPageURL;
            if (GatewayPageURL) {
                res.status(200).json({ GatewayPageURL });
                console.log('SSLCommerz API Response:', apiResponse);
                console.log('Redirecting to:', GatewayPageURL);
            } else {
                res.status(500).json({ message: 'Failed to get GatewayPageURL' });
            }
        })
        .catch((error) => {
            console.error('SSLCommerz error:', error);
            res.status(500).json({ message: 'Payment initialization failed', error });
        });
});

// Start the server
app.listen(port, host, () => {
    console.log(`Example app listening at ${baseUrl}`);
});
