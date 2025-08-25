export interface INotifierState {
  notifications: ICreateNotification[];
}

export type INotificationType = "info" | "success" | "error" | "warning";

export interface ICreateNotification {
  id: string;
  message: string;
  type?: INotificationType;
  duration?: number; // in milliseconds, optional
  showDefaultIcon?: boolean; // whether to show a default icon based on type
  icon?: React.ReactNode; // optional icon
  closable?: boolean; // whether the notification can be closed manually
  onClose?: () => void; // optional callback when the notification is closed
  onPress?: () => void; // optional callback when the notification is pressed
  _t?: boolean; // translation flag
  _params?: Record<string, string | number>; // translation parameters
}

export interface IRemoveNotification {
  id: string;
}
