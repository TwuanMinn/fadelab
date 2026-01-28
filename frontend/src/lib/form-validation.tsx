"use client";

import { useState, useCallback } from "react";

// Validation rules types
interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean;
    message: string;
}

interface FieldConfig {
    rules: ValidationRule[];
}

interface FormConfig {
    [key: string]: FieldConfig;
}

interface ValidationErrors {
    [key: string]: string | null;
}

interface TouchedFields {
    [key: string]: boolean;
}

// Common validation patterns
export const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    name: /^[a-zA-Z\s'-]{2,50}$/,
    zipCode: /^\d{5}(-\d{4})?$/,
};

// Validation hook
export function useFormValidation<T extends Record<string, string>>(
    initialValues: T,
    config: FormConfig
) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<TouchedFields>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = useCallback((name: string, value: string): string | null => {
        const fieldConfig = config[name];
        if (!fieldConfig) return null;

        for (const rule of fieldConfig.rules) {
            if (rule.required && !value.trim()) {
                return rule.message;
            }
            if (rule.minLength && value.length < rule.minLength) {
                return rule.message;
            }
            if (rule.maxLength && value.length > rule.maxLength) {
                return rule.message;
            }
            if (rule.pattern && !rule.pattern.test(value)) {
                return rule.message;
            }
            if (rule.custom && !rule.custom(value)) {
                return rule.message;
            }
        }
        return null;
    }, [config]);

    const validateAll = useCallback((): boolean => {
        const newErrors: ValidationErrors = {};
        let isValid = true;

        Object.keys(config).forEach((fieldName) => {
            const error = validateField(fieldName, values[fieldName as keyof T] || "");
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [config, validateField, values]);

    const handleChange = useCallback((name: keyof T, value: string) => {
        setValues((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (touched[name as string]) {
            const error = validateField(name as string, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    }, [touched, validateField]);

    const handleBlur = useCallback((name: keyof T) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name as string, values[name] || "");
        setErrors((prev) => ({ ...prev, [name]: error }));
    }, [validateField, values]);

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    const handleSubmit = useCallback(async (
        onSubmit: (values: T) => Promise<void> | void
    ) => {
        setIsSubmitting(true);

        // Mark all fields as touched
        const allTouched: TouchedFields = {};
        Object.keys(config).forEach((key) => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        if (validateAll()) {
            try {
                await onSubmit(values);
            } catch (error) {
                console.error("Form submission error:", error);
            }
        }

        setIsSubmitting(false);
    }, [config, validateAll, values]);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        validateAll,
        setValues,
    };
}

// Pre-configured form configs for common use cases
export const bookingFormConfig: FormConfig = {
    name: {
        rules: [
            { required: true, message: "Name is required" },
            { minLength: 2, message: "Name must be at least 2 characters" },
            { pattern: patterns.name, message: "Please enter a valid name" },
        ],
    },
    email: {
        rules: [
            { required: true, message: "Email is required" },
            { pattern: patterns.email, message: "Please enter a valid email" },
        ],
    },
    phone: {
        rules: [
            { required: true, message: "Phone number is required" },
            { pattern: patterns.phone, message: "Please enter a valid phone number" },
        ],
    },
    date: {
        rules: [
            { required: true, message: "Please select a date" },
            {
                custom: (value) => new Date(value) > new Date(),
                message: "Please select a future date"
            },
        ],
    },
    time: {
        rules: [
            { required: true, message: "Please select a time" },
        ],
    },
    service: {
        rules: [
            { required: true, message: "Please select a service" },
        ],
    },
    barber: {
        rules: [
            { required: true, message: "Please select a barber" },
        ],
    },
    notes: {
        rules: [
            { maxLength: 500, message: "Notes cannot exceed 500 characters" },
        ],
    },
};

export const contactFormConfig: FormConfig = {
    name: {
        rules: [
            { required: true, message: "Name is required" },
            { minLength: 2, message: "Name must be at least 2 characters" },
        ],
    },
    email: {
        rules: [
            { required: true, message: "Email is required" },
            { pattern: patterns.email, message: "Please enter a valid email" },
        ],
    },
    subject: {
        rules: [
            { required: true, message: "Subject is required" },
            { minLength: 5, message: "Subject must be at least 5 characters" },
        ],
    },
    message: {
        rules: [
            { required: true, message: "Message is required" },
            { minLength: 20, message: "Message must be at least 20 characters" },
            { maxLength: 1000, message: "Message cannot exceed 1000 characters" },
        ],
    },
};

export const newsletterFormConfig: FormConfig = {
    email: {
        rules: [
            { required: true, message: "Email is required" },
            { pattern: patterns.email, message: "Please enter a valid email" },
        ],
    },
};

// Input component with validation styling
interface ValidatedInputProps {
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
    error?: string | null;
    touched?: boolean;
    onChange: (value: string) => void;
    onBlur: () => void;
    className?: string;
    disabled?: boolean;
}

export function ValidatedInput({
    name,
    type = "text",
    value,
    placeholder,
    error,
    touched,
    onChange,
    onBlur,
    className = "",
    disabled = false,
}: ValidatedInputProps) {
    const hasError = touched && error;

    return (
        <div className="relative">
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                disabled={disabled}
                aria-invalid={hasError ? "true" : "false"}
                aria-describedby={hasError ? `${name}-error` : undefined}
                className={`
          w-full px-4 py-3 rounded-lg 
          bg-white/5 border text-white 
          placeholder-gray-500 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${hasError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/10 hover:border-white/20"
                    }
          ${className}
        `}
            />
            {hasError && (
                <p
                    id={`${name}-error`}
                    className="mt-1 text-sm text-red-400 flex items-center gap-1"
                    role="alert"
                >
                    <span className="material-symbols-outlined text-sm">error</span>
                    {error}
                </p>
            )}
        </div>
    );
}

// Textarea with validation
interface ValidatedTextareaProps extends Omit<ValidatedInputProps, "type"> {
    rows?: number;
    maxLength?: number;
}

export function ValidatedTextarea({
    name,
    value,
    placeholder,
    error,
    touched,
    onChange,
    onBlur,
    className = "",
    disabled = false,
    rows = 4,
    maxLength,
}: ValidatedTextareaProps) {
    const hasError = touched && error;

    return (
        <div className="relative">
            <textarea
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                aria-invalid={hasError ? "true" : "false"}
                aria-describedby={hasError ? `${name}-error` : undefined}
                className={`
          w-full px-4 py-3 rounded-lg 
          bg-white/5 border text-white 
          placeholder-gray-500 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-none transition-colors
          ${hasError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/10 hover:border-white/20"
                    }
          ${className}
        `}
            />
            <div className="flex justify-between mt-1">
                {hasError && (
                    <p
                        id={`${name}-error`}
                        className="text-sm text-red-400 flex items-center gap-1"
                        role="alert"
                    >
                        <span className="material-symbols-outlined text-sm">error</span>
                        {error}
                    </p>
                )}
                {maxLength && (
                    <p className={`text-xs ml-auto ${value.length > maxLength * 0.9 ? 'text-yellow-400' : 'text-gray-500'}`}>
                        {value.length}/{maxLength}
                    </p>
                )}
            </div>
        </div>
    );
}

// Select with validation
interface ValidatedSelectProps {
    name: string;
    value: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    error?: string | null;
    touched?: boolean;
    onChange: (value: string) => void;
    onBlur: () => void;
    className?: string;
    disabled?: boolean;
}

export function ValidatedSelect({
    name,
    value,
    options,
    placeholder = "Select an option",
    error,
    touched,
    onChange,
    onBlur,
    className = "",
    disabled = false,
}: ValidatedSelectProps) {
    const hasError = touched && error;

    return (
        <div className="relative">
            <select
                id={name}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                disabled={disabled}
                aria-invalid={hasError ? "true" : "false"}
                aria-describedby={hasError ? `${name}-error` : undefined}
                className={`
          w-full px-4 py-3 rounded-lg 
          bg-white/5 border text-white 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          appearance-none cursor-pointer transition-colors
          ${hasError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/10 hover:border-white/20"
                    }
          ${className}
        `}
            >
                <option value="" disabled className="bg-surface-dark text-gray-500">
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-surface-dark text-white"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <span className="material-symbols-outlined">expand_more</span>
            </span>
            {hasError && (
                <p
                    id={`${name}-error`}
                    className="mt-1 text-sm text-red-400 flex items-center gap-1"
                    role="alert"
                >
                    <span className="material-symbols-outlined text-sm">error</span>
                    {error}
                </p>
            )}
        </div>
    );
}
