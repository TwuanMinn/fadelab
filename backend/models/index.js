const Barber = require('./Barber');
const Service = require('./Service');
const Booking = require('./Booking');

// Define associations
Barber.hasMany(Booking, { 
  foreignKey: 'barberId', 
  as: 'bookings' 
});
Booking.belongsTo(Barber, { 
  foreignKey: 'barberId', 
  as: 'barber' 
});

Service.hasMany(Booking, { 
  foreignKey: 'serviceId', 
  as: 'bookings' 
});
Booking.belongsTo(Service, { 
  foreignKey: 'serviceId', 
  as: 'service' 
});

module.exports = {
  Barber,
  Service,
  Booking
};