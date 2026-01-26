import request from 'supertest';
import express from 'express';
const { sequelize } = require('../configs/db');
const { Booking, Barber, Service } = require('../models');

describe('Booking API', () => {
  let app: express.Application;
  let testBarber: any;
  let testService: any;

  beforeAll(async () => {
    // Setup test database
    await sequelize.sync({ force: true });
    
    // Create test data
    testBarber = await Barber.create({
      name: 'Test Barber',
      email: 'barber@test.com',
      specialties: ['Haircut'],
      rating: 4.8
    });

    testService = await Service.create({
      name: 'Test Service',
      description: 'Test Description',
      price: 50,
      duration: 30,
      category: 'cut'
    });

    // Setup express app for testing
    app = express();
    app.use(express.json());
    require('../routes/bookingRoutes')(app);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking with valid data', async () => {
      const bookingData = {
        barberId: testBarber.id,
        serviceId: testService.id,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '1234567890',
        datetime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        totalPrice: 50
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(bookingData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.customerName).toBe(bookingData.customerName);
      expect(response.body.data.barberId).toBe(bookingData.barberId);
    });

    it('should reject booking with invalid email', async () => {
      const bookingData = {
        barberId: testBarber.id,
        serviceId: testService.id,
        customerName: 'John Doe',
        customerEmail: 'invalid-email',
        customerPhone: '1234567890',
        datetime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        totalPrice: 50
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(bookingData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });

    it('should reject booking for past time', async () => {
      const bookingData = {
        barberId: testBarber.id,
        serviceId: testService.id,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '1234567890',
        datetime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        totalPrice: 50
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(bookingData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/bookings', () => {
    let testBooking: any;

    beforeEach(async () => {
      testBooking = await Booking.create({
        barberId: testBarber.id,
        serviceId: testService.id,
        customerName: 'Test Customer',
        customerEmail: 'test@example.com',
        customerPhone: '1234567890',
        datetime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        totalPrice: 50
      });
    });

    it('should return bookings for customer email', async () => {
      const response = await request(app)
        .get('/api/bookings?email=test@example.com')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].customerEmail).toBe('test@example.com');
    });
  });

  describe('PATCH /api/bookings/:id', () => {
    let testBooking: any;

    beforeEach(async () => {
      testBooking = await Booking.create({
        barberId: testBarber.id,
        serviceId: testService.id,
        customerName: 'Test Customer',
        customerEmail: 'test@example.com',
        customerPhone: '1234567890',
        datetime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        totalPrice: 50
      });
    });

    it('should update booking status', async () => {
      const response = await request(app)
        .patch(`/api/bookings/${testBooking.id}`)
        .send({ status: 'confirmed' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('confirmed');
    });

    it('should return 404 for non-existent booking', async () => {
      const response = await request(app)
        .patch('/api/bookings/non-existent-id')
        .send({ status: 'confirmed' })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});