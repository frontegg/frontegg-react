import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckoutDialog } from '@frontegg/admin-portal';
import { useCheckout } from '@frontegg/react-hooks';

interface CheckoutDialogState {
  open: boolean;
  error: string | null;
  success: boolean;
}

export interface CheckoutDialogHook {
  showDialog: () => void;
  hideDialog: () => void;
  open: boolean;
  error: string | null;
  success: boolean;
  loading: boolean;
}

export const useCheckoutDialog = (plan: string): CheckoutDialogHook => {
  const [{ open, error, success }, setState] = useState<CheckoutDialogState>({
    open: false,
    error: null,
    success: false,
  });
  const { loading } = useCheckout();

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

  const showDialog = useCallback(() => {
    setState({
      open: true,
      success: false,
      error: null,
    });
  }, []);

  const hideDialog = useCallback(() => {
    setState({
      open: false,
      error: null,
      success: false,
    });
  }, []);

  useEffect(() => {
    if (open) {
      CheckoutDialog.show({
        plan,
        onClose: hideDialog,
        onError: handleError,
        onSuccess: handleSuccess,
      });
    } else {
      CheckoutDialog.hide();
    }
  }, [open]);

  return useMemo(() => ({
    open,
    showDialog,
    hideDialog,
    error,
    success,
    loading,
  }), [
    open,
    showDialog,
    hideDialog,
    error,
    success,
    loading,
  ]);
};
