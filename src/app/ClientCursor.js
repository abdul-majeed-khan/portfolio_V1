'use client';
import { useEffect } from 'react';

export default function CircleCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Create cursor container
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 99999999;
    `;
    document.body.appendChild(cursor);
    
    // Create main custom cursor for hover effects
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    customCursor.style.cssText = `
      position: fixed;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid white;
      pointer-events: none;
      z-index: 9999999;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, border-color 0.3s, box-shadow 0.3s;
    `;
    document.body.appendChild(customCursor);
    
    // Create circles
    const circles = [];
    const circleCount = 20;
    
    for (let i = 0; i < circleCount; i++) {
      const circle = document.createElement('div');
      circle.className = 'circle';
      circle.style.cssText = `
        height: 24px;
        width: 24px;
        border-radius: 24px;
        background-color: gray;
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 99999990;
      `;
      circle.x = 0;
      circle.y = 0;
      cursor.appendChild(circle);
      circles.push(circle);
    }
    
    // Track mouse coordinates
    const coords = { x: 0, y: 0 };
    
    function handleMouseMove(e) {
      coords.x = e.clientX;
      coords.y = e.clientY;
      
      // Update custom cursor position
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    }
    
    // Animation function for trailing circles
    function animateCircles() {
      let x = coords.x;
      let y = coords.y;
      
      circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        circle.style.scale = (circles.length - index) / circles.length;
        circle.x = x;
        circle.y = y;
        
        // Create trailing effect
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });
      
      requestAnimationFrame(animateCircles);
    }
    
    // Detect interactive elements for hover effect
    function setupHoverEffect() {
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          customCursor.classList.add('hovering');
          // Apply the exact CSS the user requested
          customCursor.style.width = '24px';
          customCursor.style.height = '24px';
          customCursor.style.borderColor = '#c1ff5d';
          customCursor.style.boxShadow = '0 0 15px #c1ff5d, 0 0 5px #fff';
        });
        
        el.addEventListener('mouseleave', () => {
          customCursor.classList.remove('hovering');
          // Reset styles
          customCursor.style.width = '24px';
          customCursor.style.height = '24px';
          customCursor.style.borderColor = 'white';
          customCursor.style.boxShadow = 'none';
        });
      });
    }
    
    // Start everything
    window.addEventListener("mousemove", handleMouseMove);
    animateCircles();
    setupHoverEffect();
    
    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      
      // Remove all event listeners from interactive elements
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', null);
        el.removeEventListener('mouseleave', null);
      });
      
      // Remove DOM elements
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      if (customCursor && customCursor.parentNode) {
        customCursor.parentNode.removeChild(customCursor);
      }
    };
  }, []);
  
  // No need to render anything - all elements created in JS
  return null;
}