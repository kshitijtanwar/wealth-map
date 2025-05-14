// src/lib/apiAuth.ts
import supabase from "./supabase";
import { v4 as uuidv4 } from "uuid";
import {
    type CompanyRegistrationData,
    type EmployeeInvitation,
    type EmployeeAccountSetup,
} from "@/types";
import { sendInvitationEmail } from "@/utils/emailService";
// import { sendEmail } from '@/lib/emailSender';

// Auth API object
export const authAPI = {
    /**
     * Register a new company and admin account
     */
    async registerCompanyAndAdmin(data: CompanyRegistrationData) {
        try {
            // First create the company
            const companyResponse = await supabase
                .from("companies")
                .insert({
                    name: data.name,
                    logo_url: data.logo,
                    industry: data.industry,
                    data_access_preferences: data.dataAccessPreferences || {},
                })
                .select()
                .single();

            if (companyResponse.error) throw companyResponse.error;

            const company = companyResponse.data;

            // const { data: existingEmployee } = await supabase
            //     .from('employees')
            //     .select('id')
            //     .eq('email', data.adminEmail)
            //     .single();

            // if (existingEmployee) {
            //     throw new Error('An account with this email already exists.');
            // }
            // Then create the admin user
            const { data: authData, error: authError } =
                await supabase.auth.signUp({
                    email: data.adminEmail,
                    password: data.adminPassword,
                    options: {
                        data: {
                            fullname: data.fullname,
                            company_logo: data.logo,
                            company_id: company.id,
                            company_name: data.name,
                            permission_level: "admin",
                        },
                    },
                });

            if (authError || !authData.user) {
                throw new Error(
                    "User creation failed: " +
                    (authError?.message || "Unknown error")
                );
            }

            // Create employee record first
            const { error: employeeError } = await supabase
                .from("employees")
                .insert({
                    id: authData.user.id,
                    email: data.adminEmail,
                    fullname: data.fullname,
                    is_active: true,
                    terms_accepted_at: new Date().toISOString(),
                });

            if (employeeError) {
                console.error("Employee creation error:", employeeError);
                throw new Error("Failed to create employee record");
            }

            // Then add the admin to the company_employees table
            const employeeResponse = await supabase
                .from("company_employees")
                .insert({
                    company_id: company.id,
                    employee_id: authData.user.id,
                    permission_level: "admin",
                    invitation_accepted_at: new Date().toISOString(),
                    is_active: true,
                });

            if (employeeResponse.error) {
                console.error(
                    "Company employee association error:",
                    employeeResponse.error
                );
                throw new Error("Failed to associate employee with company");
            }

            return {
                success: true,
                company,
                user: authData.user,
            };
        } catch (error) {
            console.error("Registration error:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Registration failed",
            };
        }
    },

    /**
     * Send employee invitation
     */
    async inviteEmployee(
        adminId: string,
        companyId: string,
        invitation: EmployeeInvitation
    ) {
        try {
            // Generate a unique token for the invitation
            const token = uuidv4();
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

            // Check if email already exists in employees
            const { data: existingEmployee, error: employeeError } =
                await supabase
                    .from("employees")
                    .select("id, email")
                    .eq("email", invitation.email)
                    .maybeSingle();

            if (employeeError) {
                console.error(
                    "Error checking existing employee:",
                    employeeError
                );
                throw new Error("Failed to check existing employee");
            }

            if (existingEmployee) {
                // Check if already associated with company
                const { data: existingAssociation, error: associationError } =
                    await supabase
                        .from("company_employees")
                        .select("*")
                        .eq("company_id", companyId)
                        .eq("employee_id", existingEmployee.id)
                        .maybeSingle();

                if (associationError) {
                    console.error(
                        "Error checking company association:",
                        associationError
                    );
                    throw new Error("Failed to check company association");
                }

                if (existingAssociation) {
                    throw new Error(
                        "This employee is already associated with your company"
                    );
                }
            }

            // Check for existing invitation
            const { data: existingInvitation } = await supabase
                .from("employee_invitations")
                .select("*")
                .eq("company_id", companyId)
                .eq("email", invitation.email)
                .single();

            let data;
            if (existingInvitation) {
                // Update existing invitation
                const { data: updatedInvitation, error: updateError } =
                    await supabase
                        .from("employee_invitations")
                        .update({
                            token,
                            expires_at: expiresAt.toISOString(),
                            is_used: false,
                            invited_by: adminId,
                            permission_level: invitation.permissionLevel,
                        })
                        .eq("id", existingInvitation.id)
                        .select(
                            `
                        *,
                        companies (
                            name
                        )
                    `
                        )
                        .single();

                if (updateError) throw updateError;
                data = updatedInvitation;
            } else {
                // Create new invitation
                const { data: newInvitation, error: insertError } =
                    await supabase
                        .from("employee_invitations")
                        .insert({
                            company_id: companyId,
                            email: invitation.email,
                            token,
                            permission_level: invitation.permissionLevel,
                            invited_by: adminId,
                            expires_at: expiresAt.toISOString(),
                            is_used: false,
                        })
                        .select(
                            `
                        *,
                        companies (
                            name
                        )
                    `
                        )
                        .single();

                if (insertError) throw insertError;
                data = newInvitation;
            }

            // Send invitation email
            const invitationLink = `${window.location.origin}/accept-invitation?token=${token}`;
            console.log("Sending invitation email with link:", invitationLink);

            const emailResponse = await sendInvitationEmail({
                to_email: invitation.email,
                to_name: invitation.email.split("@")[0],
                invitation_link: invitationLink,
                company_name: data.companies?.name || "Your Company",
                sender_name: data.companies?.name || "Admin",
                role: invitation.permissionLevel,
            });

            if (!emailResponse.success) {
                console.error(
                    "Email sending failed:",
                    emailResponse.error,
                    emailResponse.details
                );
                // Delete the invitation if email sending fails
                await supabase
                    .from("employee_invitations")
                    .delete()
                    .eq("id", data.id);
                throw new Error(
                    `Failed to send invitation email: ${emailResponse.error}`
                );
            }

            console.log("Invitation email sent successfully:", emailResponse);

            return {
                success: true,
                invitation: data,
                invitationLink,
            };
        } catch (error) {
            console.error("Invitation error:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Invitation failed",
            };
        }
    },
    /**
     * Get employee invitations
     */
    async getEmployeeInvitations(companyId: string) {
        try {
            const { data, error } = await supabase
                .from("employee_invitations")
                .select(`
                *,
                companies (
                    name
                )
            `)
                .eq("company_id", companyId)
                .eq("is_used", false)
                .gt("expires_at", new Date().toISOString());

            if (error) throw error;

            return {
                success: true,
                invitations: data,
            };
        } catch (error) {
            console.error("Error fetching invitations:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Failed to fetch invitations",
            };
        }
    },
    /**
 * Get active employees who have accepted invitations
 */
    async getActiveEmployees(companyId: string) {
        try {
            const { data, error } = await supabase
                .from("company_employees")
                .select(`
                id,
                permission_level,
                is_active,
                invitation_accepted_at,
                employees:employees!company_employees_employee_id_fkey (
                    id,
                    email,
                    fullname,
                    last_login,
                    created_at,
                    is_active
                ),
                companies (
                    name
                )
            `)
                .eq("company_id", companyId)
                .eq("is_active", true)
                .not("invitation_accepted_at", "is", null)
                .order("invitation_accepted_at", { ascending: false });

            if (error) throw error;

            return {
                success: true,
                employees: data,
            };
        } catch (error) {
            console.error("Error fetching active employees:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Failed to fetch active employees",
            };
        }
    },

    /**
     * Validate an invitation token
     */
    async validateInvitation(token: string) {
        try {
            const { data, error } = await supabase
                .from("employee_invitations")
                .select(
                    `
          *,
          companies (*)
        `
                )
                .eq("token", token)
                .eq("is_used", false)
                .gt("expires_at", new Date().toISOString())
                .single();

            if (error) throw error;
            if (!data) throw new Error("Invalid or expired invitation");

            return {
                success: true,
                invitation: data,
            };
        } catch (error) {
            console.error("Validation error:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Invalid invitation",
            };
        }
    },

    /**
     * Complete employee account setup
     */
    async completeEmployeeSetup(
        token: string,
        setupData: EmployeeAccountSetup
    ) {
        try {
            const validation = await this.validateInvitation(token);
            if (!validation.success) throw new Error(validation.error);

            const invitation = validation.invitation;

            // Check if email already exists
            const { data: existingUser } = await supabase
                .from("employees")
                .select("id, email, is_active")
                .eq("email", invitation.email)
                .maybeSingle();

            if (existingUser) {
                throw new Error("An account with this email already exists");
            }

            // Create new auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: invitation.email,
                password: setupData.password,
                options: {
                    data: {
                        fullname: setupData.fullname,
                        company_id: invitation.company_id,
                        company_name: invitation.companies?.name,
                        permission_level: invitation.permission_level,
                    },
                },
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error("User creation failed");

            const userId = authData.user.id;

            // Create employee record
            await supabase.from("employees").insert({
                id: userId,
                email: invitation.email,
                fullname: setupData.fullname,
                is_active: true,
                terms_accepted_at: setupData.acceptTerms
                    ? new Date().toISOString()
                    : null,
            });

            // Create company association
            await supabase.from("company_employees").insert({
                company_id: invitation.company_id,
                employee_id: userId,
                permission_level: invitation.permission_level,
                invited_by: invitation.invited_by,
                invitation_accepted_at: new Date().toISOString(),
                is_active: true,
            });

            // Mark invitation as used
            await supabase
                .from("employee_invitations")
                .update({
                    is_used: true,
                })
                .eq("id", invitation.id);

            // Create onboarding progress record
            await supabase.from("onboarding_progress").insert({
                employee_id: userId,
                steps_completed: [],
                current_step: "welcome",
            });

            // Sign in the user immediately after signup
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: invitation.email,
                password: setupData.password,
            });

            if (signInError) throw signInError;

            return {
                success: true,
                user: signInData.user,
                companyId: invitation.company_id,
            };
        } catch (error) {
            console.error("Account setup error:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Account setup failed",
            };
        }
    },

    /**
     * Revoke employee invitation
     */
    async revokeEmployeeInvitation(invitationId: string) {
        try {
            const { error } = await supabase
                .from("employee_invitations")
                .delete()
                .eq("id", invitationId);

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (err) {
            return { success: false, error: "Unexpected error occurred." };
        }
    },

    /**
     * Remove an employee from a company and clean up all associated data
     */
    async removeEmployee(companyId: string, employeeId: string, currentUserId: string) {
        try {
            if (currentUserId === employeeId) {
                throw new Error("You cannot remove your own account");
            }

            // First deactivate the employee
            const deactivateResponse = await this.deactivateEmployee(companyId, employeeId);
            if (!deactivateResponse.success) {
                throw new Error(deactivateResponse.error);
            }

            // 1. Remove activity logs
            const { error: activityError } = await supabase
                .from('employee_activity')
                .delete()
                .eq('company_id', companyId)
                .eq('employee_id', employeeId);
            if (activityError) throw activityError;

            // 2. Remove onboarding progress
            const { error: onboardingError } = await supabase
                .from('onboarding_progress')
                .delete()
                .eq('employee_id', employeeId);
            if (onboardingError) throw onboardingError;

            // 3. Remove from company_employees
            const { error: ceError } = await supabase
                .from('company_employees')
                .delete()
                .eq('company_id', companyId)
                .eq('employee_id', employeeId);
            if (ceError) throw ceError;

            // 4. Check if employee has other company associations
            const { data: otherCompanies, error: ocError } = await supabase
                .from('company_employees')
                .select('id')
                .eq('employee_id', employeeId);
            if (ocError) throw ocError;

            // 5. If no other companies, remove the employee completely
            if (!otherCompanies || otherCompanies.length === 0) {
                const { error: empError } = await supabase
                    .from('employees')
                    .delete()
                    .eq('id', employeeId);
                if (empError) throw empError;
            }

            return { success: true };
        } catch (error) {
            console.error("Error removing employee:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Failed to remove employee",
            };
        }
    },

    /**
     * Get current user's companies
     */
    async getUserCompanies(userId: string) {
        try {
            const { data, error } = await supabase
                .from("company_employees")
                .select(
                    `
          permission_level,
          companies (*)
        `
                )
                .eq("employee_id", userId)
                .eq("is_active", true);

            if (error) throw error;

            return {
                success: true,
                companies: data,
            };
        } catch (error) {
            console.error("Error fetching companies:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch companies",
            };
        }
    },

    /**
     * Get company employees
     */
    async getCompanyEmployees(companyId: string) {
        try {
            const { data, error } = await supabase
                .from("company_employees")
                .select(
                    `
          permission_level,
          is_active,
          employees (
            id,
            email,
            first_name,
            last_name,
            last_login
          )
        `
                )
                .eq("company_id", companyId);

            if (error) throw error;

            return {
                success: true,
                employees: data,
            };
        } catch (error) {
            console.error("Error fetching employees:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch employees",
            };
        }
    },

    /**
     * Update employee permissions
     */
    async updateEmployeePermissions(
        companyId: string,
        employeeId: string,
        permissionLevel: "admin" | "editor" | "viewer"
    ) {
        try {
            const { error } = await supabase
                .from("company_employees")
                .update({
                    permission_level: permissionLevel,
                })
                .eq("company_id", companyId)
                .eq("employee_id", employeeId);

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.error("Error updating permissions:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to update permissions",
            };
        }
    },

    /**
     * Deactivate employee
     */
    async deactivateEmployee(companyId: string, employeeId: string) {
        try {
            // Update company_employees association
            const { error: ceError } = await supabase
                .from("company_employees")
                .update({
                    is_active: false,
                })
                .eq("company_id", companyId)
                .eq("employee_id", employeeId);

            if (ceError) throw ceError;

            // Check if employee has other active company associations
            const { data: otherCompanies, error: ocError } = await supabase
                .from("company_employees")
                .select("id")
                .eq("employee_id", employeeId)
                .eq("is_active", true);

            if (ocError) throw ocError;

            // If no other active companies, deactivate the employee account
            if (otherCompanies && otherCompanies.length === 0) {
                await supabase
                    .from("employees")
                    .update({
                        is_active: false,
                    })
                    .eq("id", employeeId);
            }

            return { success: true };
        } catch (error) {
            console.error("Error deactivating employee:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to deactivate employee",
            };
        }
    },

    /**
     * Get employee activity
     */
    async getEmployeeActivity(companyId: string, limit = 100) {
        try {
            const { data, error } = await supabase
                .from("employee_activity")
                .select(
                    `
          id,
          activity_type,
          details,
          created_at,
          employees (
            id,
            first_name,
            last_name,
            email
          )
        `
                )
                .eq("company_id", companyId)
                .order("created_at", { ascending: false })
                .limit(limit);

            if (error) throw error;

            return {
                success: true,
                activities: data,
            };
        } catch (error) {
            console.error("Error fetching activity:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch activity",
            };
        }
    },

    // Standard auth functions
    async signIn(email: string, password: string) {
        try {
            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            console.log("Attempting sign in for email:", email);
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password.trim(),
            });

            if (error) {
                console.error("Sign in error:", error);
                return { success: false, error: error.message };
            }

            if (!data.user) {
                console.error("No user data returned");
                return { success: false, error: "Authentication failed" };
            }

            // Check if employee exists and is active
            const { data: employee, error: employeeError } = await supabase
                .from("employees")
                .select("id, is_active")
                .eq("id", data.user.id)
                .single();

            if (employeeError || !employee) {
                await supabase.auth.signOut();
                return { success: false, error: "Employee account not found" };
            }

            if (!employee.is_active) {
                await supabase.auth.signOut();
                return { success: false, error: "Your account has been deactivated" };
            }

            // Check if employee has any active company associations
            const { data: activeCompanies, error: companiesError } = await supabase
                .from("company_employees")
                .select("id")
                .eq("employee_id", data.user.id)
                .eq("is_active", true);

            if (companiesError || !activeCompanies || activeCompanies.length === 0) {
                await supabase.auth.signOut();
                return { success: false, error: "No active company associations found" };
            }

            // Update last login
            const { error: updateError } = await supabase
                .from("employees")
                .update({
                    last_login: new Date().toISOString(),
                })
                .eq("id", data.user.id);

            if (updateError) {
                console.error("Failed to update last login:", updateError);
            }

            return { success: true, user: data.user };
        } catch (error) {
            console.error("Sign in error:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Authentication failed",
            };
        }
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true };
    },

    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, session: data.session };
    },
};
