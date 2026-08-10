import { useEffect, type ReactNode } from "react";
import { HiX } from "react-icons/hi";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="absolute inset-0 bg-charcoal/50"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative z-10 w-full max-w-md rounded-xl bg-white shadow-xl">
                {title && (
                    <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        <h2 className="text-lg font-semibold text-charcoal">{title}</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-charcoal/50 hover:text-charcoal"
                            aria-label="Close modal"
                        >
                            <HiX className="text-xl" />
                        </button>
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

export default Modal;