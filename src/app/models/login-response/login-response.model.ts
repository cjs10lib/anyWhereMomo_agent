
export interface LoginResponse {
    result?: {
        user?: {
            uid?: string;
            email?: string;
        }
    };
    error?: {
        code?: string;
        message?: string;
    };
}
