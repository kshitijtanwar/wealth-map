// lib/apiAuth.js
import { supabase } from './supabase'
import { v4 as uuidv4 } from 'uuid'

export const AuthService = {
  // Admin Registration
  async registerAdminCompany({ companyName, logoUrl, adminEmail, adminPassword, adminFirstName, adminLastName }) {
    try {
      // Step 1: Create company
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert([{ name: companyName, logo_url: logoUrl }])
        .select()
        .single()

      if (companyError) throw new Error(`Company creation failed: ${companyError.message}`)

      // Step 2: Sign up admin user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          data: {
            first_name: adminFirstName,
            last_name: adminLastName,
            company_id: company.id,
            role: 'admin'
          }
        }
      })

      if (authError) throw new Error(`Admin registration failed: ${authError.message}`)

      // Step 3: Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: adminEmail,
        first_name: adminFirstName,
        last_name: adminLastName,
        company_id: company.id,
        role: 'admin',
        onboarding_completed: true
      })

      if (profileError) throw new Error(`Profile creation failed: ${profileError.message}`)

      return {
        company,
        user: authData.user,
        session: authData.session
      }
    } catch (error) {
      console.error('Admin registration error:', error)
      throw error
    }
  },

  // Employee Invitation
  async inviteEmployee({ adminId, companyId, employeeEmail, role }) {
    try {
      // Verify admin has permission
      const { data: adminProfile, error: adminError } = await supabase
        .from('profiles')
        .select('role, company_id')
        .eq('id', adminId)
        .single()

      if (adminError) throw new Error(`Admin verification failed: ${adminError.message}`)
      if (adminProfile.company_id !== companyId || adminProfile.role !== 'admin') {
        throw new Error('Unauthorized: Only company admins can invite employees')
      }

      // Create invitation token
      const token = uuidv4()
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7) // 7 days expiration

      // Store invitation
      const { data: invitation, error: inviteError } = await supabase
        .from('company_invitations')
        .insert([{
          company_id: companyId,
          email: employeeEmail,
          role,
          token,
          expires_at: expiresAt.toISOString(),
          created_by: adminId
        }])
        .select()
        .single()

      if (inviteError) throw new Error(`Invitation creation failed: ${inviteError.message}`)

      // TODO: Integrate with email service
      const invitationLink = `${import.meta.env.VITE_SITE_URL}/accept-invite?token=${token}`

      return {
        invitation,
        invitationLink
      }
    } catch (error) {
      console.error('Employee invitation error:', error)
      throw error
    }
  },

  // Accept Invitation
  async acceptInvitation({ token, password, firstName, lastName }) {
    try {
      // Verify invitation
      const { data: invitation, error: inviteError } = await supabase
        .from('company_invitations')
        .select('*')
        .eq('token', token)
        .gte('expires_at', new Date().toISOString())
        .single()

      if (inviteError) throw new Error(`Invitation lookup failed: ${inviteError.message}`)
      if (!invitation) throw new Error('Invalid or expired invitation')

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: invitation.email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            company_id: invitation.company_id,
            role: invitation.role
          }
        }
      })

      if (authError) throw new Error(`Account creation failed: ${authError.message}`)

      // Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: invitation.email,
        first_name: firstName,
        last_name: lastName,
        company_id: invitation.company_id,
        role: invitation.role
      })

      if (profileError) throw new Error(`Profile creation failed: ${profileError.message}`)

      // Mark invitation as used
      await supabase
        .from('company_invitations')
        .delete()
        .eq('id', invitation.id)

      return {
        user: authData.user,
        session: authData.session
      }
    } catch (error) {
      console.error('Invitation acceptance error:', error)
      throw error
    }
  },

  // Admin Management Functions
  async getCompanyEmployees({ adminId, companyId }) {
    try {
      // Verify admin has permission
      await this.verifyAdmin(adminId, companyId)

      const { data: employees, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('company_id', companyId)

      if (error) throw new Error(`Employee fetch failed: ${error.message}`)

      return employees
    } catch (error) {
      console.error('Get employees error:', error)
      throw error
    }
  },

  async updateEmployeePermissions({ adminId, companyId, employeeId, updates }) {
    try {
      // Verify admin has permission
      await this.verifyAdmin(adminId, companyId)

      const { data: employee, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', employeeId)
        .eq('company_id', companyId)
        .select()
        .single()

      if (error) throw new Error(`Permission update failed: ${error.message}`)

      return employee
    } catch (error) {
      console.error('Update permissions error:', error)
      throw error
    }
  },

  async revokeEmployeeAccess({ adminId, companyId, employeeId }) {
    try {
      // Verify admin has permission
      await this.verifyAdmin(adminId, companyId)

      // Delete the user from auth (admin privilege required in Supabase)
      const { error: authError } = await supabase.auth.admin.deleteUser(employeeId)
      if (authError) throw new Error(`Auth user deletion failed: ${authError.message}`)

      // Delete the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', employeeId)
        .eq('company_id', companyId)

      if (profileError) throw new Error(`Profile deletion failed: ${profileError.message}`)

      return { success: true }
    } catch (error) {
      console.error('Revoke access error:', error)
      throw error
    }
  },

  // Employee Onboarding
  async completeOnboarding(userId, onboardingData) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          notification_preferences: onboardingData.notificationPreferences || {}
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw new Error(`Onboarding completion failed: ${error.message}`)

      return profile
    } catch (error) {
      console.error('Onboarding error:', error)
      throw error
    }
  },

  // Helper Functions
  async verifyAdmin(adminId, companyId) {
    const { data: adminProfile, error } = await supabase
      .from('profiles')
      .select('role, company_id')
      .eq('id', adminId)
      .single()

    if (error) throw new Error(`Admin verification failed: ${error.message}`)
    if (adminProfile.company_id !== companyId || adminProfile.role !== 'admin') {
      throw new Error('Unauthorized: Admin privileges required')
    }

    return true
  },

  // Get Profile
  async getProfile(userId) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw new Error(`Profile fetch failed: ${error.message}`)
    return profile
  },

  // Session Management
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw new Error(`Session retrieval failed: ${error.message}`)
    return data.session
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw new Error(`Sign in failed: ${error.message}`)
    return data
  },

  async getUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw new Error(`User retrieval failed: ${error.message}`)
    return data.user
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(`Sign out failed: ${error.message}`)
    return { success: true }
  },

  // Password Reset
  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.VITE_SITE_URL}/update-password`
    })
    if (error) throw new Error(`Password reset failed: ${error.message}`)
    return data
  },

  async updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })
    if (error) throw new Error(`Password update failed: ${error.message}`)
    return data
  }
}

// Export a singleton instance
export const authService = Object.freeze(AuthService)