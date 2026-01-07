export const ADMIN_EMAILS = [
    'admin@bereket.market',
    'turgay@berlin.com'
];

export function isAdmin(userEmail?: string | null): boolean {
    if (!userEmail) return false;
    return ADMIN_EMAILS.includes(userEmail);
}
