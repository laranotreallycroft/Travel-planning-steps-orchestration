import { notification } from "antd";

const notificationService = {
  success: (message: string, description: string) => {
    notification.success({
      message,
      description,
    });
  },
  error: (message: string, description: string) => {
    notification.error({
      message,
      description,
    });
  },
};

export default notificationService;
