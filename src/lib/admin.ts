

/**
 * Checks if a user has the admin role based on their metadata.
 * 
 * @param metadata The user's public metadata (from session claims or user object)
 * @returns true if the user has the 'admin' role
 */
export function isAdmin(metadata?: { role?: string }): boolean {
    return metadata?.role === 'admin';
}
