import './globals.css';
import { GameProvider } from '../components/GameContext';

export const metadata = {
  title: 'Warhamster 4K dApp',
  description: 'Turn-based crypto war game!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}


