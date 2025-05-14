import React, { useState } from 'react';
import './PaymentForm.css';

const PaymentForm = ({ totalAmount, onPayment }) => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19); // Limit to 16 digits + spaces
      
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    // Format expiry date with slash
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Card Name validation
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    // Card Number validation
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardNumberDigits)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    // Expiry Date validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (
        (parseInt(year) < currentYear) || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Phone validation (optional but validate if provided)
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setProcessing(true);
    
    try {
      // In a real app, you'd integrate with a payment gateway
      // For demo purposes, we're simulating a payment process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the callback function after successful payment
      onPayment({
        success: true,
        transactionId: `TXN${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        amount: totalAmount
      });
      
    } catch (error) {
      setErrors({ 
        form: 'Payment processing failed. Please try again.' 
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Details</h2>
      <p className="total-amount">Total amount: ${totalAmount.toFixed(2)}</p>
      
      {errors.form && <div className="error-message">{errors.form}</div>}
      
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="cardName">Cardholder Name</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={processing}
          />
          {errors.cardName && <span className="field-error">{errors.cardName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            disabled={processing}
          />
          {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
        </div>
        
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="5"
              disabled={processing}
            />
            {errors.expiryDate && <span className="field-error">{errors.expiryDate}</span>}
          </div>
          
          <div className="form-group half">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength="4"
              disabled={processing}
            />
            {errors.cvv && <span className="field-error">{errors.cvv}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            disabled={processing}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone (optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            disabled={processing}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
        
        <button 
          type="submit" 
          className="pay-button"
          disabled={processing}
        >
          {processing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </form>
      
      <div className="secure-notice">
        <i className="fa fa-lock"></i> Your payment information is secure
      </div>
    </div>
  );
};

export default PaymentForm;