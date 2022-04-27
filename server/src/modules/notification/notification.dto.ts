export class NotificationDto<T = any> {
  type: NotificationType;
  payload: T;
}

export class TelegramNotificationDto<T = any> extends NotificationDto<T> {
  chat_id: number;
}

export type NotificationType =
  | 'TRANSACTION_CONFIRMED'
  | 'TRANSACTION_CANCELED'
  | 'WITHDRAWAL_CONFIRMED'
  | 'WITHDRAWAL_CANCELED';
