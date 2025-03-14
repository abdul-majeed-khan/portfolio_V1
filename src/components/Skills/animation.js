export const slideUp = {
    initial: {
      y: 100,
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };