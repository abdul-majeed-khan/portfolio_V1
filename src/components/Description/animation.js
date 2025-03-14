export const slideUp = {
  initial: {
    y: "100%",       
    opacity: 0,      
  },
  open: {
    y: "0%",         
    opacity: 1,       
    transition: {
      type: "spring",  
      stiffness: 100,  
      damping: 20,     
    },
  },
  closed: {
    y: "100%",        
    opacity: 0,       
    transition: {
      duration: 0.5,   
      ease: "easeOut", 
    },
  },
}

export const slideIn = {
    initial: {
      scale: 0.8,    
      opacity: 0,        
    },
    open: (i) => ({
      scale: 1,           
      opacity: 1,         
      transition: {
        type: "spring",   
        stiffness: 150,   
        damping: 15,      
        delay: 0.1 * i,   
      },
    }),
    closed: {
      y: "100%",         
      opacity: 0,         
      transition: {
        duration: 0.3,    
        ease: "easeOut",  
      },
    },
  }