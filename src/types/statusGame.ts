export interface IStatus {
  status: "welcome" | "start" | "choice" | "game";
  name: string | number;
  lang: string | null;
}
