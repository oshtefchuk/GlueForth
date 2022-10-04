export interface Login {
  grant_type: any;
  username: string;
  password: string;
}

export interface TokenInfo {
  "access_token": string,
  "token_type": string,
  "expires_in": number,
  ".issued": string,
  ".expires": string
}

