const express = require('express');
const router = express.Router();
const { Booking, Barber, Service } = require('../models');
const { body, validationResult } = require('express-validator');

// Get all bookings for a user
router.get('/', async (req, res) => {
  try {
    const { userId, email } = req.query;
    const where = userId ? { userId } : email ? { customerEmail: email } : {};
    
    const bookings = await Booking.findAll({
      where,
      include: [
        { model: Barber, as: 'barber' },
        { model: Service, as: 'service' }
      ],
      order: [['datetime', 'DESC']]
    });
    
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new booking
router.post('/', [
  body('customerName').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('customerEmail').isEmail().withMessage('Valid email required'),
  body('customerPhone').isMobilePhone().withMessage('Valid phone number required'),
  body('barberId').isInt({ min: 1 }).withMessage('Valid barber ID required'),
  body('serviceId').isLength({ min: 1 }).withMessage('Valid service ID required'),
  body('datetime').isISO8601().withMessage('Valid date/time required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const bookingData = {
      ...req.body,
      datetime: new Date(req.body.datetime),
      status: 'pending',
      totalPrice: req.body.totalPrice || 0,
    };

    // Check if slot is still available
    const existingBooking = await Booking.findOne({
      where: {
        barberId: req.body.barberId,
        datetime: new Date(req.body.datetime),
        status: ['pending', 'confirmed']
      }
    });

    if (existingBooking) {
      return res.status(409).json({ 
        success: false, 
        error: 'This time slot is no longer available' 
      });
    }

    const booking = await Booking.create(bookingData);
    
    // Include related data in response
    const bookingWithDetails = await Booking.findByPk(booking.id, {
      include: [
        { model: Barber, as: 'barber' },
        { model: Service, as: 'service' }
      ]
    });

    res.status(201).json({ 
      success: true, 
      data: bookingWithDetails,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create booking' 
    });
  }
});

// Update booking status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByPk(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        error: 'Booking not found' 
      });
    }

    await booking.update({ status });
    res.json({ 
      success: true, 
      data: booking,
      message: 'Booking updated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        error: 'Booking not found' 
      });
    }

    // Only allow cancellation if booking is at least 2 hours in the future
    const bookingTime = new Date(booking.datetime);
    const now = new Date();
    const hoursDiff = (bookingTime - now) / (1000 * 60 * 60);
    
    if (hoursDiff < 2) {
      return res.status(400).json({ 
        success: false, 
        error: 'Bookings can only be cancelled at least 2 hours in advance' 
      });
    }

    await booking.update({ status: 'cancelled' });
    res.json({ 
      success: true, 
      message: 'Booking cancelled successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;