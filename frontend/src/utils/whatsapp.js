export const generateWhatsAppBill = (orderDetails, customerDetails, items, totals) => {
  const shopName = "PANDEY STORE";
  const ownerWhatsAppNumber = "918877002297"; 
  
  let message = `*${shopName} (Wholesale & Retail)* %0A`;
  message += `Hi Pandey Store, I want to place an order: %0A%0A`;
  
  message += `*CUSTOMER DETAILS:* %0A`;
  message += `Name: ${customerDetails.name} %0A`;
  message += `Phone: ${customerDetails.phone} %0A`;
  message += `Address: ${customerDetails.address}, ${customerDetails.landmark}, ${customerDetails.pincode} %0A`;
  message += `Delivery Option: ${orderDetails.deliveryType} %0A%0A`;

  message += `*ORDERED ITEMS:* %0A`;
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.weightOption || 'Standard'}) x ${item.qty} = ₹${item.price * item.qty} %0A`;
  });
  
  message += `%0A*BILLING SUMMARY:* %0A`;
  message += `Subtotal: ₹${totals.itemsPrice} %0A`;
  message += `Delivery Fee: ₹${totals.shippingPrice} %0A`;
  if (totals.discount > 0) {
    message += `Discount: -₹${totals.discount} %0A`;
  }
  message += `*Total Order Value: ₹${totals.totalPrice}* %0A%0A`;
  
  message += `Payment Preference: Cash on Delivery / UPI %0A%0A`;
  message += `Please confirm my order delivery!`;

  const whatsappURL = `https://wa.me/${ownerWhatsAppNumber}?text=${message}`;
  
  window.open(whatsappURL, '_blank');
};

export const generateWhatsAppFeedback = (feedbackDetails) => {
  const shopName = "PANDEY STORE";
  const ownerWhatsAppNumber = "918877002297"; 
  
  let message = `*${shopName} - CUSTOMER FEEDBACK / INQUIRY* %0A%0A`;
  
  message += `*Feedback / Query:* %0A${feedbackDetails.liked} %0A%0A`;
  message += `*Suggestions / Products Requested:* %0A${feedbackDetails.addProducts || 'None'} %0A%0A`;

  const whatsappURL = `https://wa.me/${ownerWhatsAppNumber}?text=${message}`;
  
  window.open(whatsappURL, '_blank');
};
