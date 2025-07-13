import { useNavigation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

function SubmitBtn({ text, className }: { text: string; className?: string }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className={`${
        className ?? ''
      } flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold transition
        disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {isSubmitting ? (
        <>
          <ReloadIcon className="h-5 w-5 animate-spin text-primary" />
          <span>Submitting...</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export default SubmitBtn;
