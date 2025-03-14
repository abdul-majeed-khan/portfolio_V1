'use client';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function ClientCursor() {
  useEffect(() => {
    // Wait for document to be fully loaded
    if (typeof window === 'undefined') return;

    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Glow trail elements
    const trailElements = [];
    const TRAIL_COUNT = 5;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = 1 - (i / TRAIL_COUNT);
      document.body.appendChild(trail);
      trailElements.push(trail);
    }

    // Position arrays for smooth trail effect
    const xPositions = Array(TRAIL_COUNT).fill(0);
    const yPositions = Array(TRAIL_COUNT).fill(0);

    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
    // Smoothly update main cursor
    gsap.to(cursor, {
        duration: 0.1,
        left: e.clientX,
        top: e.clientY,
        ease: "power2.out"
    });
    
    // Update positions array with delay
    xPositions.unshift(e.clientX);
    yPositions.unshift(e.clientY);
    xPositions.pop();
    yPositions.pop();
    
    // Update trail elements with increasing delay
    trailElements.forEach((trail, index) => {
        // Increasing delay for each trail element
        gsap.to(trail, {
        duration: 0.2,
        left: xPositions[Math.min(index, xPositions.length - 1)],
        top: yPositions[Math.min(index, yPositions.length - 1)],
        ease: "power2.out",
        delay: 0.03 * index // Incremental delay for each trail element
        });
    });
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Show default cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
      });
    });

    // Add ripple effect on click
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 700);
    });

    // Cleanup function to remove event listeners and elements
    return () => {
      document.removeEventListener('mousemove', null);
      document.removeEventListener('click', null);
      cursor.remove();
      trailElements.forEach(trail => trail.remove());
    };
  }, []);
  
  return null;
}