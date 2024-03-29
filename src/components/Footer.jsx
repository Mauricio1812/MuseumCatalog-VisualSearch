import React from "react";

const Footer = () => {
  return (
    <footer class="shadow mt-4 bg-gray-900">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between bg-gray-900">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a
              href="https://github.com/yashowardhan992/product-list/tree/main"
              class="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;