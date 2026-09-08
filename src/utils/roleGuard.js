import { supabase } from '../lib/supabaseClient'

/**
 * Fetch the authenticated user's role from the profiles table.
 * Returns 'admin' | 'staff' | null
 */
export async function getUserRole(userId) {
  if (!userId) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()
  if (error) return null
  return data?.role ?? null
}

/**
 * Check if the current user has at least the given role.
 * Role hierarchy: admin > staff
 */
export function hasRole(userRole, requiredRole) {
  const hierarchy = { admin: 2, staff: 1 }
  return (hierarchy[userRole] ?? 0) >= (hierarchy[requiredRole] ?? 99)
}
