import { useCallback, useMemo, useState } from 'react';
import { CheckoutDialog } from '@frontegg/admin-portal';

interface CheckoutDialogState {
  open: boolean;
  error: string | null;
  success: boolean;
}

export interface CheckoutDialogHook {
  showDialog: (plan: string) => void;
  hideDialog: () => void;
  open: boolean;
  error: string | null;
  success: boolean;
}

export const useCheckoutDialog = (appName = 'default'): CheckoutDialogHook => {
  const [{ open, error, success }, setState] = useState<CheckoutDialogState>({
    open: false,
    error: null,
    success: false,
  });

  const handleError = useCallback((error: string) => {
    setState({
      open: true,
      success: false,
      error,
    });
  }, []);

  const handleSuccess = useCallback(() => {
    setState({
      open: false,
      success: true,
      error: null,
    });
  }, []);

  const showDialog = useCallback(
    (plan: string) => {
      CheckoutDialog.show(
        {
          plan,
          onClose: hideDialog,
          onError: handleError,
          onSuccess: handleSuccess,
        },
        appName
      );
      setState({
        open: true,
        success: false,
        error: null,
      });
    },
    [appName]
  );

  const hideDialog = useCallback(() => {
    CheckoutDialog.hide(appName);
    setState({
      open: false,
      error: null,
      success: false,
    });
  }, [appName]);

  return useMemo(
    () => ({
      open,
      showDialog,
      hideDialog,
      error,
      success,
    }),
    [open, showDialog, hideDialog, error, success]
  );
};
