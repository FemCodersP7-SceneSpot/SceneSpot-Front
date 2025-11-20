class ToastManager {
  constructor() {
    this.listeners = new Set();
    this.toasts = [];
    this.idCounter = 0;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  show(message, type = 'info') {
    const id = `toast-${this.idCounter++}`;
    const toast = { id, message, type };

    this.toasts.push(toast);
    this.notify();

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
      this.notify();
    }, 3000);
  }

  success(message) {
    this.show(message, 'success');
  }

  error(message) {
    this.show(message, 'error');
  }
}

export const toastManager = new ToastManager();

export const toast = {
  success: (message) => toastManager.success(message),
  error: (message) => toastManager.error(message),
  message: (message) => toastManager.show(message, 'info'),
};
