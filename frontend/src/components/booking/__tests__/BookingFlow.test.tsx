import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BookingFlow } from '@/components/booking/BookingFlow';
import { Barber, Service } from '@/types';

// Mock data
const mockBarbers: Barber[] = [
  {
    id: 1,
    name: 'John Doe',
    img: 'test-image.jpg',
    specialties: ['Haircuts', 'Beards'],
    rating: 4.8,
    status: 'Available'
  }
];

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Classic Cut',
    price: 50,
    duration: 45,
    description: 'Classic haircut',
    category: 'cut',
    features: ['Wash', 'Cut', 'Style']
  }
];

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('BookingFlow', () => {
  it('renders booking steps correctly', () => {
    renderWithQueryClient(<BookingFlow barbers={mockBarbers} services={mockServices} />);
    
    expect(screen.getByText('Select Barber')).toBeInTheDocument();
    expect(screen.getByText('Choose your preferred barber')).toBeInTheDocument();
  });

  it('displays barber selection step', () => {
    renderWithQueryClient(<BookingFlow barbers={mockBarbers} services={mockServices} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Haircuts, Beards')).toBeInTheDocument();
  });

  it('enables continue button when barber is selected', async () => {
    renderWithQueryClient(<BookingFlow barbers={mockBarbers} services={mockServices} />);
    
    const barberCard = screen.getByText('John Doe');
    const continueButton = screen.getByText('Continue');
    
    expect(continueButton).toBeDisabled();
    
    fireEvent.click(barberCard);
    
    await waitFor(() => {
      expect(continueButton).toBeEnabled();
    });
  });

  it('navigates through booking steps', async () => {
    renderWithQueryClient(<BookingFlow barbers={mockBarbers} services={mockServices} />);
    
    // Select barber
    fireEvent.click(screen.getByText('John Doe'));
    fireEvent.click(screen.getByText('Continue'));
    
    await waitFor(() => {
      expect(screen.getByText('Select Service')).toBeInTheDocument();
    });
  });

  it('validates form inputs in confirmation step', async () => {
    renderWithQueryClient(<BookingFlow barbers={mockBarbers} services={mockServices} />);
    
    // Navigate through all steps to confirmation
    fireEvent.click(screen.getByText('John Doe'));
    fireEvent.click(screen.getByText('Continue'));
    
    await waitFor(() => {
      expect(screen.getByText('Select Service')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Classic Cut'));
    fireEvent.click(screen.getByText('Continue'));
    
    await waitFor(() => {
      expect(screen.getByText('Select Date & Time')).toBeInTheDocument();
    });
    
    // Skip date/time selection for this test
    fireEvent.click(screen.getByText('Continue'));
    
    await waitFor(() => {
      expect(screen.getByText('Confirm Your Booking')).toBeInTheDocument();
    });
    
    const confirmButton = screen.getByText('Confirm Booking');
    expect(confirmButton).toBeDisabled();
  });
});