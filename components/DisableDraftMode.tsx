'use client';

import { useRouter } from 'next/navigation';
import { useDraftModeEnvironment } from 'next-sanity/hooks';
import { useTransition } from 'react';
import { disableDraftMode } from '@/app/actions/disableDraftMode';
import { Button } from './ui/button';

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div className="fixed top-2 left-2 z-50">
      {pending ? (
        'Disabling draft mode...'
      ) : (
        <Button type="button" variant="destructive" onClick={disable}>
          Disable draft mode
        </Button>
      )}
    </div>
  );
}
