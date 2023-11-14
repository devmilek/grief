export type ClerkErrors =
  | "form_password_pwned"
  | "form_identifier_exists"
  | "form_password_incorrect"
  | "form_identifier_not_found"
  | "form_param_nil"
  | "form_code_incorrect";

export interface AcceptFilesType {
  [key: string]: string[];
}
