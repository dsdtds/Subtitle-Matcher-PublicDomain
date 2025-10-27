
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
        Subtitle Matcher
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Recreate any speech using clips from classic public domain movies.
      </p>
    </header>
  );
};

export default Header;
