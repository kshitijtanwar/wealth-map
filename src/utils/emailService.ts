import emailjs from "@emailjs/browser";

interface InvitationEmailParams {
    to_email: string;
    to_name: string;
    invitation_link: string;
    company_name: string;
    sender_name: string;
    role: string;
}

export const sendInvitationEmail = async (params: InvitationEmailParams) => {
    try {
        console.log("Sending invitation email with params:", {
            ...params,
            serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            templateId: import.meta.env.VITE_EMAILJS_INVITATION_TEMPLATE_ID,
        });

        if (
            !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
            !import.meta.env.VITE_EMAILJS_INVITATION_TEMPLATE_ID ||
            !import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ) {
            throw new Error("Missing EmailJS configuration");
        }

        const response = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_INVITATION_TEMPLATE_ID,
            {
                to_email: params.to_email,
                to_name: params.to_name,
                invitation_link: params.invitation_link,
                company_name: params.company_name,
                sender_name: params.sender_name,
                role: params.role,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        console.log("to_email", params.to_email);
        console.log("to_name", params.to_name);
        console.log("invitation_link", params.invitation_link);
        console.log("company_name", params.company_name);
        console.log("sender_name", params.sender_name);
        console.log("role", params.role);
        console.log("EmailJS response:", response);

        return { success: true, response };
    } catch (error) {
        console.error("Failed to send invitation email:", error);
        return {
            success: false,
            error:
                error instanceof Error ? error.message : "Failed to send email",
            details: error,
        };
    }
};
