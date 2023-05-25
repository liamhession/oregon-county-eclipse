exports.handler = async (event, context) => {
  const businessId = event.queryStringParameters.businessId;
  // TODO: Look up business details based on businessId

  const businessName = "Court Square Café"; // Replace with real business name
  const remainingOffers = 5; // Replace with real remaining offers

  return {
    statusCode: 200,
    body: JSON.stringify({
      businessName: businessName,
      remainingOffers: remainingOffers,
    }),
  };
};
