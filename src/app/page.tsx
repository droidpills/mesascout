import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect( '/seasons/season24' ); 
  return (
    <div>
      {}
    </div>
  );
}