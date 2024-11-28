import { notification } from 'antd';

const notificationService = {
  success: (message: string, description?: string) => {
    notification.success({
      message,
      description,
      placement: 'top',
      duration: 0,
    });
  },
  error: (message: string, description?: string) => {
    notification.error({
      message,
      description,
      placement: 'top',
    });
  },
};

export default notificationService;
