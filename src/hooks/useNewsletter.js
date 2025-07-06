import { useState, useCallback } from "react"; 
import { EMAIL_REGEX, NEWSLETTER_MESSAGES } from "../data/footerData";

/**
 * Custom hook for newsletter subscription functionality
 * @returns {object} - An object containing the newsletter subscription state and functions
 */
export const useNewsletter = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: ''});
    
    /**
     * Validates email format
     * @param {string} email - The email to be validated
     * @returns {boolean} - True if the email is valid, false otherwise 
     */
    const isValidEmail = useCallback((email) => {
        return EMAIL_REGEX.test(email.trim());
    }, []);

    /**
     * handles email input changes
     * @param {Event} event - input change event
     */
    const handleEmailChange = useCallback((event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        if (message.text) {
            setMessage({ type: '', text: '' });
        }
    }, [message.text]);

    /**
     * Validates email and shows appropriate error message
     * @param {string} email - The email to be validated
     * @returns {boolean} - True if the email is valid, false otherwise
     */
    const validateEmail = useCallback((email) => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setMessage({
                type: "error",
                text: NEWSLETTER_MESSAGES.emailRequired,
            });
            return false;
        }

        if (!isValidEmail(trimmedEmail)) {
            setMessage({
                type: "error",
                text: NEWSLETTER_MESSAGES.emailInvalid,
            });
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
        // if (!validateEmail(email)) {
        //     return false;
        // }
        // Simulate API call
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

        const trimmedEmail = email.trim();

        if (!validateEmail(email)) {
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: ''});

        try {
            await subscribeToNewsletter(trimmedEmail);

            setMessage({
                type: "success",
                text: NEWSLETTER_MESSAGES.success
            });
            setEmail('');
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
    }, [email, validateEmail, subscribeToNewsletter]);

    /**
     * Resets the newsletter form state
     */
    const resetForm = useCallback(() => {
        setEmail('');
        setMessage({ type: '', text: '' });
        setIsLoading(false);
    }, []);
    /**
     * checks if the submit button shouldd be disabled
     * @returns {boolean} - true if the submit button should be disabled
     */

    const isSubmitDisabled = useCallback(() => {
        const trimmedEmail = email.trim();
        return isLoading || !trimmedEmail || !isValidEmail(trimmedEmail);
    }, [email, isLoading, isValidEmail]);

    return {
        email,
        isLoading,
        message,

        //handles
        handleEmailChange,
        handleSubmit,
        resetForm,

        //utilities
        isValidEmail,
        isSubmitDisabled: isSubmitDisabled(),

        setEmail,
        setIsLoading,
        setMessage
    };
};