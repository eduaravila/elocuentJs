let ilana = {
    address: { city: 'New York' }
  };
  let place = ilana.address;
  place = { city: 'Boulder' };
  let abbi = {
    address: place
  };
  
  console.log(ilana.address.city); // ???