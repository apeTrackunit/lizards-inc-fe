import { ReactNode, useEffect, useState } from 'react';
import Login from './Login';
import { useAuthContext } from '@lizards-inc-fe/auth';
import { LoginLoading } from './LoginLoading';

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { authenticated } = useAuthContext();
  const [displayedView, setDisplayedView] = useState<JSX.Element>(<div></div>);
  const [isAnimationPlaying, setAnimationPlaying] = useState(false);

  useEffect(() => {
    // if the user just landed on the page
    if (authenticated === undefined) {
      // if the loading animation was already played, then don't do nothing
      if (sessionStorage['loading'] == 'played') return;

      // if it wasn't played, play the animation
      setAnimationPlaying(true);
      setDisplayedView(<LoginLoading endOfLoadingCallback={() => setAnimationPlaying(false)} />);
      return;
    }

    // we only get to this point when the useAuthContext determined if the user is logged in or not,
    // so if the animation already played, just load the page content.
    if (sessionStorage['loading'] == 'played') {
      setDisplayedView(authenticated ? <div>{children}</div> : <Login />);
      return;
    }

    // on the other hand, if the animation is playing now for the first time
    // (and the if ensures it has been finished running), then we can load the content
    if (!isAnimationPlaying) {
      sessionStorage['loading'] = 'played';
      setDisplayedView(authenticated ? <div>{children}</div> : <Login />);
    }
  }, [authenticated, isAnimationPlaying]);

  return displayedView;
};
