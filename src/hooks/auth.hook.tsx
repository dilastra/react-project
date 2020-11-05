import { useState, useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const storageName = 'tokenInformation';

interface IUseAuth {
  login(token: string, expiresIn: number, deadToken: string): void;
  logout(): void;
  token: string;
  ready: boolean;
}

export default function useAuth(): IUseAuth {
  const [ready, setReady] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const intervalId = useRef<ReturnType<typeof setInterval>>();
  const history = useHistory();

  function getTimeDeadToken(expiresIn = 0, deadToken = ''): string | Date {
    const dateNow = new Date();
    return deadToken.length ? deadToken : new Date(dateNow.setSeconds(expiresIn));
  }

  function getTimeRefreshToken(deadToken: string | Date): number {
    const dateNow = new Date();
    const diffTime = new Date(deadToken).getTime() - dateNow.getTime();
    return diffTime < 0 ? 0 : new Date(diffTime).getMinutes() * 60000;
  }

  const logout = useCallback(() => {
    setToken('');
    history.push('/login');
    localStorage.removeItem(storageName);
    clearInterval(intervalId.current);
  }, []);

  const login = useCallback((token: string, expiresIn: number, deadToken: string): void => {
    setToken(token);
    const timeDeadToken = getTimeDeadToken(expiresIn, deadToken);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        token,
        expiresIn,
        deadToken: timeDeadToken,
      })
    );
    intervalId.current = setInterval(() => {
      logout();
    }, getTimeRefreshToken(timeDeadToken));
  }, []);

  useEffect(() => {
    const authInformation: { token: string; expiresIn: number; deadToken: string } = JSON.parse(
      localStorage.getItem(storageName) as string
    );

    if (authInformation) {
      login(authInformation.token, authInformation.expiresIn, authInformation.deadToken);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, ready };
}
