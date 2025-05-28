import React from "react";

function Footer() {
  return (
    <footer className="bg-zinc-900 text-white text-center py-6 mt-10">
      <p className="text-lg">
        &copy; 2025{" "}
        <a
          href="https://github.com/john-papani/"
          target="_blank"
          rel="noopener noreferrer"
          className="italic hover:text-blue-400 hover:underline"
        >
          john-papani
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
