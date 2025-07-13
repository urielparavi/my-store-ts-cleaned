import { useNavigation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

function SubmitBtn({ text, className }: { text: string; className?: string }) {
  // Get the current navigation state from React Router
  // `useNavigation` returns info about the current navigation status:
  // "idle" (no action), "submitting" (form is being sent), or "loading" (page/data loading).
  // This lets the UI react by showing spinners or disabling buttons during these states.
  const navigation = useNavigation();

  // Determine if the form is currently submitting
  const isSubmitting = navigation.state === 'submitting';

  return (
    // Render the Button component
    // Disable the button while submitting to prevent multiple submits
    <Button type="submit" className={className} disabled={isSubmitting}>
      {
        // Show spinner and "Submitting..." text when submitting
        isSubmitting ? (
          <span className="flex">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{' '}
            {/* Animated loading icon */}
            Submitting...
          </span>
        ) : (
          // Otherwise, display the passed-in button text
          text
        )
      }
    </Button>
  );
}
export default SubmitBtn;
