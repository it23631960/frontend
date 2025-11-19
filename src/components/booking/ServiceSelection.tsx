import React from "react";
import { motion } from "framer-motion";
import { Clock, Star, Sparkles } from "lucide-react";
import { Service } from "../../types/booking";

interface ServiceSelectionProps {
  services: Service[];
  selectedServiceId: string | null;
  onServiceSelect: (serviceId: string) => void;
  loading: boolean;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  services,
  selectedServiceId,
  onServiceSelect,
  loading,
}) => {
  // Derive categories from available services, ordered by a preferred list
  const preferredOrder = [
    "Haircut",
    "Coloring",
    "Styling",
    "Treatments",
    "Extensions",
    "Hair",
    "Nails",
    "Spa",
    "Makeup",
    "Waxing",
    "General",
  ] as const;
  const dynamicCategories = Array.from(
    new Set(services.map((s) => s.category))
  );
  const categories = [
    ...preferredOrder.filter((c) =>
      dynamicCategories.includes(c as unknown as string)
    ),
    ...dynamicCategories.filter(
      (c) =>
        !preferredOrder.includes(
          c as unknown as (typeof preferredOrder)[number]
        )
    ),
  ];

  const servicesByCategory = categories.reduce((acc, category) => {
    acc[category] = services.filter((service) => service.category === category);
    return acc;
  }, {} as Record<string, Service[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Haircut":
        return "✂️";
      case "Coloring":
        return "🎨";
      case "Styling":
        return "💫";
      case "Treatments":
        return "✨";
      case "Extensions":
        return "💄";
      case "Hair":
        return "💇";
      case "Nails":
        return "💅";
      case "Spa":
        return "🧖";
      case "Makeup":
        return "💋";
      case "Waxing":
        return "🕯️";
      case "General":
        return "⭐";
      default:
        return "💅";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={category} className="space-y-3">
            <div className="h-6 bg-white/10 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="h-32 bg-white/5 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {categories.map((category, categoryIndex) => {
        const categoryServices = servicesByCategory[category];
        if (categoryServices.length === 0) return null;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getCategoryIcon(category)}</span>
              <h4 className="text-xl font-semibold text-white">{category}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <div
                    onClick={() => onServiceSelect(service.id)}
                    className={`
                      relative p-6 rounded-xl cursor-pointer transition-all duration-300 
                      border-2 backdrop-blur-md
                      ${
                        selectedServiceId === service.id
                          ? "border-purple-400 bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20"
                          : "border-white/10 bg-white/5 hover:border-purple-400/50 hover:bg-white/10"
                      }
                      ${service.popular ? "ring-2 ring-yellow-400/30" : ""}
                    `}
                  >
                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Popular</span>
                      </div>
                    )}

                    {/* Selection Indicator */}
                    {selectedServiceId === service.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-white rounded-full"
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h5 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {service.name}
                        </h5>
                        <div className="text-right">
                          <div className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                            ${service.price}
                          </div>
                        </div>
                      </div>

                      <p className="text-white/70 text-sm line-clamp-2">
                        {service.description}
                      </p>

                      <div className="flex items-center justify-between text-white/60 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Sparkles className="w-4 h-4" />
                          <span>{service.includes.length} services</span>
                        </div>
                      </div>

                      {/* Service Includes */}
                      <div className="space-y-2">
                        <div className="text-xs text-white/50 uppercase tracking-wider">
                          Includes:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {service.includes.slice(0, 3).map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70"
                            >
                              {item}
                            </span>
                          ))}
                          {service.includes.length > 3 && (
                            <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">
                              +{service.includes.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add-ons Preview */}
                      {service.addOns && service.addOns.length > 0 && (
                        <div className="pt-2 border-t border-white/10">
                          <div className="text-xs text-white/50 uppercase tracking-wider mb-1">
                            Available Add-ons:
                          </div>
                          <div className="text-xs text-white/60">
                            {service.addOns.slice(0, 2).join(", ")}
                            {service.addOns.length > 2 &&
                              ` +${service.addOns.length - 2} more`}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {services.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-white/40 text-lg mb-2">
            No services available
          </div>
          <div className="text-white/60 text-sm">
            Please check back later or contact the salon directly.
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceSelection;
