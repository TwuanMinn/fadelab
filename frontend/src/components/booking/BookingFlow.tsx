"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingSystem } from '@/hooks/useBookingSystem';
import { Barber, Service } from '@/types';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { formatCurrency, formatDate } from '@/lib/utils';

interface BookingFlowProps {
  barbers: Barber[];
  services: Service[];
}

export function BookingFlow({ barbers, services }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const booking = useBookingSystem();

  const steps = [
    { id: 1, title: 'Select Barber', description: 'Choose your preferred barber' },
    { id: 2, title: 'Select Service', description: 'Choose your grooming service' },
    { id: 3, title: 'Pick Date & Time', description: 'Select appointment time' },
    { id: 4, title: 'Confirm Details', description: 'Review and confirm booking' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = async () => {
    const result = await booking.createBooking(customerInfo);
    if (result.success) {
      setCurrentStep(5); // Success step
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                currentStep >= step.id
                  ? 'bg-primary text-white'
                  : 'bg-surface-dark text-gray-400'
              }`}
            >
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-1 mx-2 transition-all ${
                  currentStep > step.id ? 'bg-primary' : 'bg-surface-dark'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-dark rounded-3xl p-8"
      >
        {currentStep === 1 && (
          <BarberSelection
            barbers={barbers}
            selectedBarber={booking.selectedBarber}
            onSelect={booking.selectBarber}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <ServiceSelection
            services={services}
            selectedService={booking.selectedService}
            onSelect={booking.selectService}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {currentStep === 3 && (
          <DateTimeSelection
            availableSlots={booking.availableSlots}
            selectedDate={booking.selectedDate}
            selectedTime={booking.selectedTime}
            onSelectDate={booking.selectDate}
            onSelectTime={booking.selectTime}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {currentStep === 4 && (
          <ConfirmationStep
            booking={booking}
            customerInfo={customerInfo}
            onCustomerInfoChange={setCustomerInfo}
            onConfirm={handleBooking}
            onPrev={handlePrev}
            isBooking={booking.isBooking}
          />
        )}

        {currentStep === 5 && (
          <BookingSuccess onNewBooking={() => setCurrentStep(1)} />
        )}
      </motion.div>
    </div>
  );
}

function BarberSelection({ barbers, selectedBarber, onSelect, onNext }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Choose Your Barber</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {barbers.map((barber: Barber) => (
          <motion.div
            key={barber.id}
            whileHover={{ y: -5 }}
            onClick={() => onSelect(barber)}
            className={`cursor-pointer rounded-2xl p-6 border-2 transition-all ${
              selectedBarber?.id === barber.id
                ? 'border-primary bg-primary/10'
                : 'border-white/10 bg-surface-darker hover:border-white/20'
            }`}
          >
            <OptimizedImage
              src={barber.img}
              alt={barber.name}
              width={100}
              height={100}
              className="rounded-xl mb-4"
            />
            <h3 className="text-lg font-bold text-white">{barber.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{barber.specialties?.join(', ')}</p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className="text-gray-300 text-sm">{barber.rating || 4.8}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!selectedBarber}
        className="bg-primary text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

function ServiceSelection({ services, selectedService, onSelect, onNext, onPrev }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Select Service</h2>
      <div className="space-y-4 mb-8">
        {services.map((service: Service) => (
          <motion.div
            key={service.id}
            whileHover={{ x: 5 }}
            onClick={() => onSelect(service)}
            className={`cursor-pointer rounded-xl p-6 border-2 transition-all ${
              selectedService?.id === service.id
                ? 'border-primary bg-primary/10'
                : 'border-white/10 bg-surface-darker hover:border-white/20'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">{service.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                <p className="text-gray-500 text-sm mt-2">{service.duration} minutes</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">{formatCurrency(service.price)}</p>
                {service.popular && (
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">Popular</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="bg-surface-darker text-white px-8 py-3 rounded-xl font-bold"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedService}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function DateTimeSelection({ availableSlots, selectedDate, selectedTime, onSelectDate, onSelectTime, onNext, onPrev }: any) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Select Date & Time</h2>
      
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Select Date</label>
        <input
          type="date"
          min={today.toISOString().split('T')[0]}
          max={maxDate.toISOString().split('T')[0]}
          onChange={(e) => onSelectDate(new Date(e.target.value))}
          className="w-full bg-surface-darker text-white rounded-xl p-4 border border-white/10"
        />
      </div>

      {availableSlots.length > 0 && (
        <div className="mb-8">
          <label className="block text-gray-400 mb-2">Available Times</label>
          <div className="grid grid-cols-4 gap-3">
            {availableSlots.map((slot: any) => (
              <button
                key={slot.time}
                onClick={() => onSelectTime(slot.time)}
                disabled={!slot.available}
                className={`p-3 rounded-xl font-medium transition-all ${
                  selectedTime === slot.time
                    ? 'bg-primary text-white'
                    : slot.available
                    ? 'bg-surface-darker text-white hover:bg-white/10'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="bg-surface-darker text-white px-8 py-3 rounded-xl font-bold"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function ConfirmationStep({ booking, customerInfo, onCustomerInfoChange, onConfirm, onPrev, isBooking }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Confirm Your Booking</h2>
      
      <div className="bg-surface-darker rounded-xl p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-4">Appointment Details</h3>
        <div className="space-y-2 text-gray-300">
          <p><span className="text-gray-500">Barber:</span> {booking.selectedBarber?.name}</p>
          <p><span className="text-gray-500">Service:</span> {booking.selectedService?.name}</p>
          <p><span className="text-gray-500">Date:</span> {booking.selectedDate && formatDate(booking.selectedDate)}</p>
          <p><span className="text-gray-500">Time:</span> {booking.selectedTime}</p>
          <p><span className="text-gray-500">Price:</span> {booking.selectedService && formatCurrency(booking.selectedService.price)}</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Your Name"
          value={customerInfo.name}
          onChange={(e) => onCustomerInfoChange({ ...customerInfo, name: e.target.value })}
          className="w-full bg-surface-darker text-white rounded-xl p-4 border border-white/10"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={customerInfo.email}
          onChange={(e) => onCustomerInfoChange({ ...customerInfo, email: e.target.value })}
          className="w-full bg-surface-darker text-white rounded-xl p-4 border border-white/10"
        />
        <input
          type="tel"
          placeholder="Your Phone"
          value={customerInfo.phone}
          onChange={(e) => onCustomerInfoChange({ ...customerInfo, phone: e.target.value })}
          className="w-full bg-surface-darker text-white rounded-xl p-4 border border-white/10"
        />
        <textarea
          placeholder="Special requests (optional)"
          value={customerInfo.notes}
          onChange={(e) => onCustomerInfoChange({ ...customerInfo, notes: e.target.value })}
          className="w-full bg-surface-darker text-white rounded-xl p-4 border border-white/10 h-24"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="bg-surface-darker text-white px-8 py-3 rounded-xl font-bold"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || isBooking}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBooking ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}

function BookingSuccess({ onNewBooking }: any) {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-white text-3xl">check</span>
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
      <p className="text-gray-400 mb-8">We've sent a confirmation email with your appointment details.</p>
      <button
        onClick={onNewBooking}
        className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
      >
        Book Another Appointment
      </button>
    </div>
  );
}