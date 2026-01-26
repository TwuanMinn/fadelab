import { useState, useEffect } from 'react';
import { Barber, Service, Booking } from '@/types';

export interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingState {
  selectedBarber: Barber | null;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  availableSlots: TimeSlot[];
  isBooking: boolean;
}

export function useBookingSystem() {
  const [state, setState] = useState<BookingState>({
    selectedBarber: null,
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
    availableSlots: [],
    isBooking: false,
  });

  const updateState = (updates: Partial<BookingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const selectBarber = (barber: Barber) => {
    updateState({ selectedBarber: barber, selectedTime: null, availableSlots: [] });
  };

  const selectService = (service: Service) => {
    updateState({ selectedService: service, selectedTime: null, availableSlots: [] });
  };

  const selectDate = async (date: Date) => {
    updateState({ selectedDate: date, selectedTime: null });

    if (state.selectedBarber && state.selectedService) {
      await fetchAvailableSlots(date, state.selectedBarber.id, state.selectedService.id);
    }
  };

  const fetchAvailableSlots = async (date: Date, barberId: number, serviceId: string) => {
    try {
      // Mock API call - replace with actual API
      const response = await fetch(`/api/availability?barberId=${barberId}&date=${date.toISOString()}&serviceId=${serviceId}`);
      const slots = await response.json();
      updateState({ availableSlots: slots });
    } catch (error) {
      console.error('Error fetching availability:', error);
      // Generate mock slots as fallback
      const mockSlots = generateMockTimeSlots();
      updateState({ availableSlots: mockSlots });
    }
  };

  const generateMockTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const isAvailable = Math.random() > 0.3; // 70% availability
      slots.push({
        time,
        available: isAvailable,
      });
    }

    return slots;
  };

  const selectTime = (time: string) => {
    updateState({ selectedTime: time });
  };

  const createBooking = async (customerInfo: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!state.selectedBarber || !state.selectedService || !state.selectedDate || !state.selectedTime) {
      return { success: false, error: 'Please complete all booking steps' };
    }

    updateState({ isBooking: true });

    try {
      const booking: Omit<Booking, 'id'> = {
        barberId: state.selectedBarber.id,
        serviceId: state.selectedService.id,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        date: state.selectedDate,
        time: state.selectedTime,
        datetime: new Date(`${state.selectedDate.toISOString().split('T')[0]}T${state.selectedTime}`),
        status: 'pending',
        notes: customerInfo.notes,
        total: state.selectedService.price,
        totalPrice: state.selectedService.price,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        updateState({
          selectedBarber: null,
          selectedService: null,
          selectedDate: null,
          selectedTime: null,
          availableSlots: [],
          isBooking: false,
        });
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      return { success: false, error: 'Booking failed. Please try again.' };
    } finally {
      updateState({ isBooking: false });
    }
  };

  return {
    ...state,
    selectBarber,
    selectService,
    selectDate,
    selectTime,
    createBooking,
  };
}