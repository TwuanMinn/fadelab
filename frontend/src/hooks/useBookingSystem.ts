'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  supabase,
  Barber,
  Service,
  TimeSlot,
  getAvailableSlots,
  getServices,
  getBarbers,
  createAppointment,
  subscribeToSlotUpdates
} from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

export interface BookingTimeSlot {
  time: string;
  endTime: string;
  available: boolean;
  slotId?: string;
}

interface BookingState {
  selectedBarber: Barber | null;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedSlotId: string | null;
  availableSlots: BookingTimeSlot[];
  isLoading: boolean;
  isBooking: boolean;
  error: string | null;
}

export function useBookingSystem() {
  const { user } = useAuth();
  const [state, setState] = useState<BookingState>({
    selectedBarber: null,
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
    selectedSlotId: null,
    availableSlots: [],
    isLoading: false,
    isBooking: false,
    error: null,
  });

  // Real-time subscription cleanup
  const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);

  const updateState = useCallback((updates: Partial<BookingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Subscribe to real-time slot updates when barber and date are selected
  useEffect(() => {
    // Cleanup previous subscription
    if (unsubscribe) {
      unsubscribe();
    }

    if (state.selectedBarber && state.selectedDate) {
      const dateStr = state.selectedDate.toISOString().split('T')[0];
      const barberId = state.selectedBarber.id;

      const cleanup = subscribeToSlotUpdates(barberId, dateStr, (slots: TimeSlot[]) => {
        // Transform Supabase slots to UI format
        const transformedSlots: BookingTimeSlot[] = slots.map(slot => ({
          time: slot.start_time,
          endTime: slot.end_time,
          available: !slot.is_booked,
          slotId: slot.id,
        }));
        updateState({ availableSlots: transformedSlots });
      });

      setUnsubscribe(() => cleanup);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [state.selectedBarber?.id, state.selectedDate]);

  const selectBarber = useCallback((barber: Barber) => {
    updateState({
      selectedBarber: barber,
      selectedTime: null,
      selectedSlotId: null,
      availableSlots: [],
      error: null,
    });
  }, [updateState]);

  const selectService = useCallback((service: Service) => {
    updateState({
      selectedService: service,
      selectedTime: null,
      selectedSlotId: null,
      error: null,
    });
  }, [updateState]);

  const selectDate = useCallback(async (date: Date) => {
    if (!state.selectedBarber) {
      updateState({ error: 'Please select a barber first' });
      return;
    }

    updateState({
      selectedDate: date,
      selectedTime: null,
      selectedSlotId: null,
      isLoading: true,
      error: null
    });

    try {
      const dateStr = date.toISOString().split('T')[0];
      const slots = await getAvailableSlots(state.selectedBarber.id, dateStr);

      const transformedSlots: BookingTimeSlot[] = slots.map(slot => ({
        time: slot.start_time,
        endTime: slot.end_time,
        available: !slot.is_booked,
        slotId: slot.id,
      }));

      updateState({ availableSlots: transformedSlots, isLoading: false });
    } catch (error) {
      console.error('Error fetching slots:', error);
      updateState({
        error: 'Failed to fetch available times. Please try again.',
        isLoading: false,
      });
    }
  }, [state.selectedBarber, updateState]);

  const selectTime = useCallback((time: string, slotId?: string) => {
    updateState({ selectedTime: time, selectedSlotId: slotId || null, error: null });
  }, [updateState]);

  const createBooking = useCallback(async (customerInfo: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  }): Promise<{ success: boolean; error?: string; appointmentId?: string }> => {
    // Validation
    if (!state.selectedBarber || !state.selectedService || !state.selectedDate || !state.selectedTime) {
      return { success: false, error: 'Please complete all booking steps' };
    }

    if (!user) {
      return { success: false, error: 'Please sign in to book an appointment' };
    }

    updateState({ isBooking: true, error: null });

    try {
      const dateStr = state.selectedDate.toISOString().split('T')[0];

      // Calculate end time based on service duration
      const [hours, minutes] = state.selectedTime.split(':').map(Number);
      const startDate = new Date(state.selectedDate);
      startDate.setHours(hours, minutes, 0, 0);
      const endDate = new Date(startDate.getTime() + (state.selectedService.duration * 60 * 1000));
      const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

      const appointmentData = {
        user_id: user.id,
        barber_id: state.selectedBarber.id,
        service_id: state.selectedService.id,
        date: dateStr,
        start_time: state.selectedTime,
        end_time: endTime,
        status: 'pending' as const,
        notes: customerInfo.notes || '',
        total_price: state.selectedService.price,
      };

      const result = await createAppointment(appointmentData);

      if (result.error) {
        updateState({ isBooking: false, error: result.error });
        return { success: false, error: result.error };
      }

      // Reset state after successful booking
      updateState({
        selectedBarber: null,
        selectedService: null,
        selectedDate: null,
        selectedTime: null,
        selectedSlotId: null,
        availableSlots: [],
        isBooking: false,
        error: null,
      });

      return { success: true, appointmentId: result.appointment?.id };
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = 'Booking failed. Please try again.';
      updateState({ isBooking: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, [state, user, updateState]);

  const resetBooking = useCallback(() => {
    if (unsubscribe) {
      unsubscribe();
    }
    setState({
      selectedBarber: null,
      selectedService: null,
      selectedDate: null,
      selectedTime: null,
      selectedSlotId: null,
      availableSlots: [],
      isLoading: false,
      isBooking: false,
      error: null,
    });
  }, [unsubscribe]);

  return {
    ...state,
    selectBarber,
    selectService,
    selectDate,
    selectTime,
    createBooking,
    resetBooking,
    isAuthenticated: !!user,
  };
}