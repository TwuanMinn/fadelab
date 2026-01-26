const express = require('express');
const router = express.Router();
const { Booking, Barber, Service } = require('../models');

// Get availability for a specific barber and date
router.get('/', async (req, res) => {
  try {
    const { barberId, date, serviceId } = req.query;
    
    if (!barberId || !date) {
      return res.status(400).json({ 
        success: false, 
        error: 'Barber ID and date are required' 
      });
    }

    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    // Get existing bookings for the barber on that date
    const existingBookings = await Booking.findAll({
      where: {
        barberId: parseInt(barberId),
        datetime: {
          [require('sequelize').Op.between]: [startOfDay, endOfDay]
        },
        status: ['pending', 'confirmed']
      },
      include: [{ model: Service, as: 'service' }]
    });

    // Generate time slots (9 AM - 6 PM)
    const timeSlots = [];
    const startHour = 9;
    const endHour = 18;
    
    // Get service duration if provided
    let serviceDuration = 30; // default 30 minutes
    if (serviceId) {
      const service = await Service.findByPk(serviceId);
      if (service) {
        serviceDuration = service.duration;
      }
    }

    // Generate slots in 30-minute intervals
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = new Date(targetDate);
        slotTime.setHours(hour, minute, 0, 0);
        
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Check if slot conflicts with existing bookings
        const isAvailable = !existingBookings.some(booking => {
          const bookingStart = new Date(booking.datetime);
          const bookingEnd = new Date(bookingStart.getTime() + (booking.service?.duration || 30) * 60000);
          const slotEnd = new Date(slotTime.getTime() + serviceDuration * 60000);
          
          return (slotTime < bookingEnd && slotEnd > bookingStart);
        });

        // Don't show slots that are in the past for today
        const now = new Date();
        const isPast = targetDate.toDateString() === now.toDateString() && slotTime < now;

        if (!isPast) {
          timeSlots.push({
            time: timeString,
            available: isAvailable,
            appointmentId: isAvailable ? null : existingBookings.find(booking => {
              const bookingStart = new Date(booking.datetime);
              return Math.abs(bookingStart - slotTime) < 30 * 60000; // within 30 minutes
            })?.id
          });
        }
      }
    }

    res.json({ 
      success: true, 
      data: timeSlots,
      date: date,
      barberId: barberId
    });
  } catch (error) {
    console.error('Availability error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch availability' 
    });
  }
});

// Get all barbers with their general availability
router.get('/barbers', async (req, res) => {
  try {
    const barbers = await Barber.findAll({
      include: [{
        model: Booking,
        as: 'bookings',
        where: {
          datetime: {
            [require('sequelize').Op.gte]: new Date()
          },
          status: ['pending', 'confirmed']
        },
        required: false
      }]
    });

    const barbersWithAvailability = barbers.map(barber => {
      const todayBookings = barber.bookings?.filter(booking => {
        const bookingDate = new Date(booking.datetime);
        const today = new Date();
        return bookingDate.toDateString() === today.toDateString();
      }) || [];

      return {
        id: barber.id,
        name: barber.name,
        specialties: barber.specialties,
        rating: barber.rating,
        image: barber.image,
        status: todayBookings.length > 0 ? 'Busy' : 'Available',
        nextAvailable: todayBookings.length > 0 ? 
          Math.min(...todayBookings.map(b => new Date(b.datetime).getTime())) : null
      };
    });

    res.json({ 
      success: true, 
      data: barbersWithAvailability 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;