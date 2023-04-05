export interface Workspace {
  id:     number;
  name:   string;
  code:   string;
  admin:  Admin;
  domain: string;
  active: boolean;
}

export interface Admin {
  id:           number;
  personalMail: string;
  eduMail:      string;
}