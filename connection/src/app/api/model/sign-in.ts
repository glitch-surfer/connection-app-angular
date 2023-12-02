export interface SignIn {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  uid: string;
}

export interface Credentials extends SignInResponse {
  email: string;
}
