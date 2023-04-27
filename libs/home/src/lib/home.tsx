import { TestComponent } from '@lizards-inc-fe/shared-components';
import { useGetRequest } from '@lizards-inc-fe/fetcher';

export function Home() {
  const { data } = useGetRequest<object>({ url: '/pokemon' });

  return (
    <div>
      <h1>Welcome to Home!</h1>
      {JSON.stringify(data)}
      <TestComponent />
    </div>
  );
}
