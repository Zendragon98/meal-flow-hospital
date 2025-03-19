import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the layout directory exists
const layoutDir = path.resolve('./src/components/layout');
if (!fs.existsSync(layoutDir)) {
  fs.mkdirSync(layoutDir, { recursive: true });
  console.log('Created layout directory');
}

// Create PageLayout component if it doesn't exist
const pageLayoutPath = path.resolve(layoutDir, 'PageLayout.tsx');
if (!fs.existsSync(pageLayoutPath)) {
  const pageLayoutContent = `import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, fullWidth = false }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={\`flex-1 \${fullWidth ? 'w-full' : 'container mx-auto px-4 py-8'}\`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;`;

  fs.writeFileSync(pageLayoutPath, pageLayoutContent);
  console.log('Created PageLayout component');
}

// Ensure Header component exists
const headerPath = path.resolve(layoutDir, 'Header.tsx');
if (!fs.existsSync(headerPath)) {
  const headerContent = `import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Hospital Meal Delivery</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/menu" className="hover:text-primary">Menu</Link></li>
            <li><Link to="/checkout" className="hover:text-primary">Checkout</Link></li>
            <li><Link to="/profile" className="hover:text-primary">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;`;

  fs.writeFileSync(headerPath, headerContent);
  console.log('Created Header component');
}

// Ensure Footer component exists
const footerPath = path.resolve(layoutDir, 'Footer.tsx');
if (!fs.existsSync(footerPath)) {
  const footerContent = `import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600">
          <p>© {new Date().getFullYear()} Hospital Meal Delivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;`;

  fs.writeFileSync(footerPath, footerContent);
  console.log('Created Footer component');
}

console.log('Setup complete!'); 