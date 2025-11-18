import React from 'react';
import { motion } from 'framer-motion';
import { InstagramIcon, FacebookIcon, TwitterIcon, MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
export const Footer = () => {
  const socialLinks = [{
    icon: <InstagramIcon size={20} />,
    href: '#',
    label: 'Instagram'
  }, {
    icon: <FacebookIcon size={20} />,
    href: '#',
    label: 'Facebook'
  }, {
    icon: <TwitterIcon size={20} />,
    href: '#',
    label: 'Twitter'
  }];
  const contactInfo = [{
    icon: <MapPinIcon size={20} />,
    text: '123 Beauty Street, Salon City'
  }, {
    icon: <PhoneIcon size={20} />,
    text: '+1 (555) 123-4567'
  }, {
    icon: <MailIcon size={20} />,
    text: 'contact@beautysalon.com'
  }];
  return <footer className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/90 to-pink-900/90" />
      <div className="relative z-10 container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true,
        amount: 0.3
      }} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                BeautySalon
              </h3>
              <p className="text-white/70 mb-6 max-w-md">
                Discover premium beauty services across our network of top-rated
                salons. Book your appointment today and experience the
                difference.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => <motion.a key={index} href={link.href} aria-label={link.label} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1
              }} viewport={{
                once: true,
                amount: 0.3
              }} whileHover={{
                scale: 1.1,
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/90 border border-white/10 transition-all">
                    {link.icon}
                  </motion.a>)}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white/90">
                Contact Us
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => <motion.li key={index} initial={{
                opacity: 0,
                x: 20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1
              }} viewport={{
                once: true,
                amount: 0.3
              }} className="flex items-center text-white/70">
                    <span className="mr-3 text-white/90">{item.icon}</span>
                    {item.text}
                  </motion.li>)}
              </ul>
            </div>
          </div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.6
        }} viewport={{
          once: true,
          amount: 0.3
        }} className="mt-10 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} BeautySalon. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </footer>;
};