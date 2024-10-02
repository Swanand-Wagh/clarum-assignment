import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export const Footer: React.FunctionComponent = (): JSX.Element => {
  return (
    <footer className="border-t bg-white px-12 py-4">
      <p className="flex w-full items-center justify-center text-sm font-medium text-muted-foreground">
        Developed by &nbsp;
        <Link href="https://github.com/Swanand-Wagh" target="_blank" rel="noopener noreferrer" className="underline">
          Swanand Wagh
        </Link>{' '}
        . The source code is available on &nbsp;
        <Link
          href="https://github.com/Swanand-Wagh/clarum-assignment"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          <span className="underline">GitHub</span>
          <GitHubLogoIcon className="scale-150 text-foreground/85" />
        </Link>
        .
      </p>
    </footer>
  );
};
