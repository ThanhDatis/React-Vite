import { useState, useCallback } from "react"; 
import { EMAIL_REGEX, NEWSLETTER_MESSAGES } from "../data/footerData";

/**
 * Custom hook for newsletter subscription functionality
 * @returns {object} - An object containing the newsletter subscription state and functions
 */
export const useNewsletter = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showEmailError, setShowEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: ''});
    const [hasInteracted, setHasInteracted] = useState(false);
    
    /**
     * Validates email format
     * @param {string} email - The email to be validated
     * @returns {boolean} - True if the email is valid, false otherwise 
     */
    const isValidEmail = useCallback((email) => {
        return EMAIL_REGEX.test(email.trim());
    }, []);

    /**
     * Validates email and sets error message
     * @param {string} emailValue - The email to validate
     * @returns {string} - Error message if invalid, empty string if valid
     */
    const getEmailError = useCallback((emailValue) => {
        const trimmedEmail = emailValue.trim();

        if (!trimmedEmail && hasInteracted) {
            return NEWSLETTER_MESSAGES.emailRequired;
        }
        if (trimmedEmail && !isValidEmail(trimmedEmail)) {
            return NEWSLETTER_MESSAGES.emailInvalid;
        }
        return '';
    }, [isValidEmail, hasInteracted]);

    /**
     * handles email input changes
     * @param {Event} event - input change event
     */
    const handleEmailChange = useCallback((event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setHasInteracted(true);

        const error = getEmailError(newEmail)
        setEmailError(error);
        setShowEmailError(true);

        if (message.text) {
            setMessage({ type: '', text: '' });
        }
    }, [message.text, getEmailError]);

    /**
     * Handles email field focus
     */
    const handleEmailFocus = useCallback(() => {
        setHasInteracted(true);
        if (!email.trim()) {
            setEmailError(NEWSLETTER_MESSAGES.emailRequired);
            setShowEmailError(true);
        }
    }, [email]);

    /**
     * Handles email field blur
     */
    const handleEmailBlur = useCallback(() => {
        const error = getEmailError(email);
        setEmailError(error);
        setShowEmailError(Boolean(error));
    }, [getEmailError, email]);

    /**
     * Validates email for submission
     * @param {string} email - The email to be validated
     * @returns {boolean} - True if the email is valid, false otherwise
     */
    const validateEmailForSubmit = useCallback((email) => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setEmailError(NEWSLETTER_MESSAGES.emailRequired);
            setShowEmailError(true);
            return false;
        }
        
        if (!isValidEmail(trimmedEmail)) {
            setEmailError(NEWSLETTER_MESSAGES.emailInvalid);
            setShowEmailError(true);
            return false;
        }
        return true;
    }, [isValidEmail]);
    /**
     * Simulates API call for newsletter subscription
     * @param {string} email - The email to be subscribed
     * @returns {Promise} - A promise that resolves with the result of the API call
     */
    const subscribeToNewsletter = useCallback(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const random = Math.random();

        if (random > 0.9) {
            throw new Error("already subscribed");
        } else if (random > 0.8) {
            throw new Error("server error");
        }
        return { success: true , message: 'Subscription successful' };
    }, []);

    /**
     * handles form submission
     * @param {Event} event - The form submission event
     */
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        setHasInteracted(true);

        const trimmedEmail = email.trim();

        if (!validateEmailForSubmit(email)) {
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: ''});
        setEmailError('');
        setShowEmailError(false);

        try {
            await subscribeToNewsletter(trimmedEmail);

            setMessage({
                type: "success",
                text: NEWSLETTER_MESSAGES.success
            });
            setEmail('');
            setHasInteracted(false);
        } catch (error) {
            let errorMessage = NEWSLETTER_MESSAGES.subscriptionFailed;

            if (error.message === "already subscribed") {
                errorMessage = NEWSLETTER_MESSAGES.alreadySubscribed;
            }
            setMessage({
                type: "error",
                text: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    }, [email, validateEmailForSubmit, subscribeToNewsletter]);

    /**
     * Resets the newsletter form state
     */
    const resetForm = useCallback(() => {
        setEmail('');
        setEmailError('');
        setShowEmailError(false);
        setMessage({ type: '', text: '' });
        setIsLoading(false);
        setHasInteracted(false);
    }, []);
    /**
     * checks if the submit button should be disabled
     * @returns {boolean} - true if the submit button should be disabled
     */

    const isSubmitDisabled = useCallback(() => {
        const trimmedEmail = email.trim();
        return isLoading || !trimmedEmail || !isValidEmail(trimmedEmail);
    }, [email, isLoading, isValidEmail]);

    return {
        email,
        emailError,
        showEmailError,
        isLoading,
        message,

        handleEmailChange,
        handleEmailBlur,
        handleEmailFocus,
        handleSubmit,
        resetForm,

        isValidEmail,
        isSubmitDisabled: isSubmitDisabled(),

        setEmail,
        setEmailError,
        setShowEmailError,
        setIsLoading,
        setMessage
    };
};