import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Star, ChevronRight, X } from "lucide-react";
import {
  BookingData,
  BookingStep,
  Service,
  StaffMember,
  TimeSlot,
} from "../types/booking";
import { bookingApiService } from "../services/bookingApiService";
import ServiceSelection from "./booking/ServiceSelection";
import StaffSelection from "./booking/StaffSelection";
import DateTimeSelection from "./booking/DateTimeSelection";
import CustomerInfoForm from "./booking/CustomerInfoForm";
import BookingConfirmation from "./booking/BookingConfirmation";
import BookingSummary from "./booking/BookingSummary";

const AppointmentBooking: React.FC = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<BookingStep>(
    BookingStep.SERVICE
  );
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bookingData, setBookingData] = useState<BookingData>({
    salonId: salonId || "",
    serviceId: null,
    staffId: null,
    date: null,
    time: null,
    customerInfo: {},
    specialRequests: "",
    totalPrice: 0,
  });

  // Mock salon data - in real app would come from API
  const salonInfo = {
    name: "Beauty Haven Salon",
    rating: 4.8,
    reviewCount: 324,
    address: "123 Main St, Downtown",
    phone: "(555) 123-4567",
    image: "/images/salon-hero.jpg",
  };

  // Load initial data
  useEffect(() => {
    if (salonId) {
      loadServices();
      loadStaff();
    }
  }, [salonId]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const servicesData = await bookingApiService.getServices(salonId!);
      setServices(servicesData);
    } catch (err) {
      setError("Failed to load services");
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStaff = async () => {
    try {
      const staffData = await bookingApiService.getStaff(salonId!);
      setStaff(staffData);
    } catch (err) {
      console.error("Error loading staff:", err);
    }
  };

  const loadAvailability = async (date: string, staffId?: string) => {
    if (!bookingData.serviceId) return;

    try {
      setLoading(true);
      const availability = await bookingApiService.getAvailability({
        salonId: salonId!,
        serviceId: bookingData.serviceId,
        date,
        staffId,
      });
      setTimeSlots(availability.timeSlots);
    } catch (err) {
      setError("Failed to load availability");
      console.error("Error loading availability:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < BookingStep.CONFIRMATION) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > BookingStep.SERVICE) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case BookingStep.SERVICE:
        return bookingData.serviceId !== null;
      case BookingStep.STAFF:
        return bookingData.staffId !== null;
      case BookingStep.DATETIME:
        return bookingData.date !== null && bookingData.time !== null;
      case BookingStep.CUSTOMER_INFO:
        const { customerInfo } = bookingData;
        return (
          customerInfo.firstName &&
          customerInfo.lastName &&
          customerInfo.email &&
          customerInfo.phone
        );
      default:
        return false;
    }
  };

  const getSelectedService = () =>
    services.find((s) => s.id === bookingData.serviceId);
  const getSelectedStaff = () =>
    staff.find((s) => s.id === bookingData.staffId);

  const calculateTotalPrice = () => {
    const service = getSelectedService();
    return service ? service.price : 0;
  };

  // Update total price when service changes
  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    updateBookingData({ totalPrice });
  }, [bookingData.serviceId]);

  const stepTitles = {
    [BookingStep.SERVICE]: "Select Service",
    [BookingStep.STAFF]: "Choose Stylist",
    [BookingStep.DATETIME]: "Pick Date & Time",
    [BookingStep.CUSTOMER_INFO]: "Your Information",
    [BookingStep.CONFIRMATION]: "Booking Confirmed",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/hair-salons")}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Salons</span>
              </button>
              <div className="h-6 w-px bg-white/20" />
              <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                {salonInfo.name}
              </h1>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-white/70 text-sm">
                Step {currentStep} of 4
              </span>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      step <= currentStep
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Salon Hero Section */}
      <div className="pt-20 pb-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40">
        <div className="container mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <img
                  src={salonInfo.image}
                  alt={salonInfo.name}
                  className="w-20 h-20 rounded-lg object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjOGI1Y2Y2IiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8dGV4dCB4PSI0MCIgeT0iNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM4YjVjZjYiIGZvbnQtc2l6ZT0iMTIiPkJlYXV0eTwvdGV4dD4KPC9zdmc+";
                  }}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {salonInfo.name}
                </h2>
                <div className="flex items-center space-x-4 text-white/70 mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{salonInfo.rating}</span>
                    <span>({salonInfo.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{salonInfo.address}</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <MapPin className="w-4 h-4" />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              {/* Step Header */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 border-b border-white/10">
                <h3 className="text-xl font-semibold text-white">
                  {stepTitles[currentStep]}
                </h3>
                <p className="text-white/70 mt-1">
                  {currentStep === BookingStep.SERVICE &&
                    "Choose the service you'd like to book"}
                  {currentStep === BookingStep.STAFF &&
                    "Select your preferred stylist"}
                  {currentStep === BookingStep.DATETIME &&
                    "Pick your preferred date and time"}
                  {currentStep === BookingStep.CUSTOMER_INFO &&
                    "Enter your contact information"}
                  {currentStep === BookingStep.CONFIRMATION &&
                    "Your appointment is confirmed!"}
                </p>
              </div>

              {/* Step Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {currentStep === BookingStep.SERVICE && (
                    <ServiceSelection
                      key="service"
                      services={services}
                      selectedServiceId={bookingData.serviceId}
                      onServiceSelect={(serviceId: string) =>
                        updateBookingData({ serviceId })
                      }
                      loading={loading}
                    />
                  )}

                  {currentStep === BookingStep.STAFF && (
                    <StaffSelection
                      key="staff"
                      staff={staff}
                      selectedStaffId={bookingData.staffId}
                      onStaffSelect={(staffId: string) =>
                        updateBookingData({ staffId })
                      }
                    />
                  )}

                  {currentStep === BookingStep.DATETIME && (
                    <DateTimeSelection
                      key="datetime"
                      selectedDate={bookingData.date}
                      selectedTime={bookingData.time}
                      timeSlots={timeSlots}
                      onDateSelect={(date: string) => {
                        updateBookingData({ date });
                        loadAvailability(
                          date,
                          bookingData.staffId || undefined
                        );
                      }}
                      onTimeSelect={(time: string, timeSlotId?: string) =>
                        updateBookingData({
                          time,
                          timeSlotId: timeSlotId || null,
                        })
                      }
                      loading={loading}
                      service={getSelectedService()}
                    />
                  )}

                  {currentStep === BookingStep.CUSTOMER_INFO && (
                    <CustomerInfoForm
                      key="customer"
                      customerInfo={bookingData.customerInfo}
                      specialRequests={bookingData.specialRequests}
                      onCustomerInfoChange={(customerInfo: any) =>
                        updateBookingData({ customerInfo })
                      }
                      onSpecialRequestsChange={(specialRequests: string) =>
                        updateBookingData({ specialRequests })
                      }
                    />
                  )}

                  {currentStep === BookingStep.CONFIRMATION && (
                    <BookingConfirmation
                      key="confirmation"
                      bookingData={bookingData}
                      salonInfo={salonInfo}
                      service={getSelectedService()}
                      staff={getSelectedStaff()}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              {currentStep !== BookingStep.CONFIRMATION && (
                <div className="flex justify-between items-center p-6 bg-white/5 border-t border-white/10">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === BookingStep.SERVICE}
                    className="flex items-center space-x-2 px-6 py-3 text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={nextStep}
                    disabled={!canProceedToNext()}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                  >
                    <span>
                      {currentStep === BookingStep.CUSTOMER_INFO
                        ? "Confirm Booking"
                        : "Continue"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              bookingData={bookingData}
              salonInfo={salonInfo}
              service={getSelectedService()}
              staff={getSelectedStaff()}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500/90 backdrop-blur-md text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <X className="w-4 h-4" />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-2 hover:bg-white/20 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
