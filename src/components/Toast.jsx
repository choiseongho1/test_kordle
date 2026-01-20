import React, { useEffect } from 'react';

const Toast = ({ message, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(onRemove, 2000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className="toast">
      {message}
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div id="toast-container">
      {toasts.map((toast) => (
        <Toast 
          key={toast.id} 
          message={toast.message} 
          onRemove={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  );
};

export default ToastContainer;
