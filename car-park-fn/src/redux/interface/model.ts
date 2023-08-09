export interface AuthState {
    isAuth: boolean|null;
    role: "admin" | "staff" | "";
    username: string;
    jwt:string;
    // loading: boolean;
    // error: string | undefined;
}

export interface FormState{
    isLoading:boolean;
    formError:string;
}