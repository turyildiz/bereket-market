export { }

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: 'admin' | 'shop_owner' | 'customer';
        };
    }
}
