import React, { useEffect, useRef, ReactNode } from 'react';

// Define prop types
interface ModalProps {
    children: ReactNode; // Can be any valid React child (string, element, etc.)
    isOpen: boolean;
    onClose: () => void;
}


const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {


    // This will be null until ref object is attached to a DOM element
    // Then this means the variable points to this DOM element
    const modalRef = useRef<HTMLDivElement>(null);



    // Close modal on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose(); // Close modal
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', 
        display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div ref={modalRef} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '.75rem' }}>
                {children}
            </div>
        </div>
    );
};

export default Modal;