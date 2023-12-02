export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface SignInResponse {
  token: 'string';
  uid: 'string';
}
