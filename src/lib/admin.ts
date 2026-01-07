export const ADMIN_EMAILS = [
    'admin@bereket.market', // Placeholder - add your email here
    // 'your.email@example.com' 
];

export function isAdmin(userEmail?: string | null): boolean {
    if (!userEmail) return false;
    return ADMIN_EMAILS.includes(userEmail);
}
