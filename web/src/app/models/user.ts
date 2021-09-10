/**
 * Model User
 *
 * @author Jônatas Ramos
 */
export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  access_token?: string;
  expires_in?: number;
}
