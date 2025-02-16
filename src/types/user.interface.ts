export interface IUser {
    userId: string;
    name: string;
    email: string;
    role: "user" | "admin"
    exp?: number;
    hasShop?: boolean;
    iat?: number;
    isActive?: boolean;
}