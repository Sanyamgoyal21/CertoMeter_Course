import { useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function useRazorpay() {
  const initiatePayment = useCallback(async ({ name, email, phone, onSuccess, onFailure }) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error('Payment gateway failed to load. Please refresh and try again.');
      return;
    }

    const toastId = toast.loading('Preparing your order...');

    try {
      const { data } = await axios.post(`${API_URL}/api/payment/create-order`, {
        name, email, phone,
      });

      toast.dismiss(toastId);

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'AI Career Accelerator',
        description: '15 hrs · 100+ AI Tools · Lifetime Access',
        image: '/favicon.svg',
        order_id: data.orderId,
        prefill: data.prefill,
        theme: { color: '#ff6b35' },
        modal: {
          ondismiss: () => toast('Payment cancelled.', { icon: '⚠️' }),
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay via UPI',
                instruments: [
                  { method: 'upi', flows: ['collect', 'intent', 'qr'] },
                ],
              },
              other: { name: 'Other Payment Methods' },
            },
            sequence: ['block.upi', 'block.other'],
            preferences: { show_default_blocks: false },
          },
        },
        handler: async (response) => {
          const verifyToast = toast.loading('Verifying payment...');
          try {
            const { data: verifyData } = await axios.post(`${API_URL}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.dismiss(verifyToast);
            toast.success('🎉 Payment successful! Welcome to the course!');
            onSuccess?.(verifyData);
          } catch {
            toast.dismiss(verifyToast);
            toast.error('Payment verification failed. Please contact support.');
            onFailure?.();
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp) => {
        toast.error(`Payment failed: ${resp.error.description}`);
        onFailure?.();
      });
      rzp.open();
    } catch (error) {
      toast.dismiss(toastId);
      const msg = error.response?.data?.error || 'Failed to initiate payment.';
      toast.error(msg);
    }
  }, []);

  return { initiatePayment };
}
