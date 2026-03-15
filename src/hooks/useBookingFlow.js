import { useNavigate } from 'react-router-dom';

/**
 * Step navigation and validation hook.
 * Implementation to be completed in Session 2.
 */
export default function useBookingFlow() {
  const navigate = useNavigate();

  const goToStep = (step) => {
    navigate(`/step/${step}`);
  };

  const nextStep = (currentStep) => {
    goToStep(currentStep + 1);
  };

  const prevStep = (currentStep) => {
    goToStep(currentStep - 1);
  };

  return { goToStep, nextStep, prevStep };
}
