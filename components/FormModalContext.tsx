// context/FormModalContext.tsx
"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

type FormModalContextType = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

const FormModalContext = createContext<FormModalContextType | undefined>(undefined);

export function FormModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    // lock body scroll while the modal is open
    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    return (
        <FormModalContext.Provider value={{ isOpen, open, close }}>
            {children}
        </FormModalContext.Provider>
    );
}

export function useFormModal() {
    const ctx = useContext(FormModalContext);
    if (!ctx) throw new Error("useFormModal must be used inside FormModalProvider");
    return ctx;
}