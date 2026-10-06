import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({ onClose }) {
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        if (userData) {
            onClose();
        }
    }, [userData, onClose]);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const modalContent = (
        <div 
            className='fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200'
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className='relative w-full max-w-lg my-auto animate-in zoom-in-95 duration-200'>
                <button 
                    onClick={onClose} 
                    className='absolute top-5 right-5 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs'
                    aria-label="Close modal"
                >
                    <FaTimes size={16} />
                </button>
                <Auth isModel={true} />
            </div>
        </div>
    );

    if (typeof document === 'undefined') return null;
    return createPortal(modalContent, document.body);
}

export default AuthModel;
