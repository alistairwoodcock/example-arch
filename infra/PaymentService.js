class PaymentService {
    
    constructor() {
        // TODO: Some payment config in I guess
        //       maybe API keys?
    }

    // Braintree and stripe both just return a payment 'nonce' 
    // this is a key that gets form submitted to us after payment is handled
    // with their services
    processPayment(paymentKey, amount) {
        let success = true; //await paymentAPI.doPayment(paymentKey, amount);

        return success;
    }

}


module.exports = PaymentService;