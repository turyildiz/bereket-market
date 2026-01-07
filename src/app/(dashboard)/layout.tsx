/**
 * Dashboard Layout
 * 
 * This layout wraps all dashboard/protected pages.
 * Will include sidebar navigation and require authentication.
 */

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            {/* Sidebar navigation will go here */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
