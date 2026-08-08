import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Reveal({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = '' 
}) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}