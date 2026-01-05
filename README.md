# Atlan_Frontend_Task

Vercel Link: https://raghavrawat-taupe.vercel.app/

Video walkthrough - https://drive.google.com/file/d/1E7g0GcKtd1b7HyvfjeYvfHLKwD1QIX4Y/view?usp=drive_link

This project is an SQL Query Builder designed as part of the Atlan assignment, providing a tab-like interface for managing and executing database queries efficiently. It allows users to:

  - Create and manage multiple queries within a single tab.

  - Add new queries dynamically, enabling flexible query construction.
    
  - Use WHERE clauses for filtering data according to specific conditions.

  - Run queries from tables associated with the current tab, ensuring context-aware query execution.

  - Search for table names easily, making it faster to locate and query relevant tables.

The interface is designed to be intuitive and user-friendly, providing a streamlined workflow for building, organizing, and executing multiple SQL queries within a single environment.

# Javascript Framework/Libraries used

This project was built using Vue.js. Major plugins and packages used include:

 - Vue.js – JavaScript framework for building interactive UIs

 - Lodash – Utility functions for data manipulation

 - Typescript

 - vue-class-components

# Performance 

 Page speed Insights -

    First Contentful Paint - 0.2s
    Largest Contentful Paint - 0.3s
    Total Blocking Time - 0ms
    Speed Index - 0.7s
    Cumulative Layout Shift - 0
    Performance - 100
    Accessibility - 97
    Best Practices - 100

 GT Metrix - 

    First Contentful Paint - 684ms
    Largest Contentful Paint - 684ms
    Time to Interactive - 684ms
    Speed Index - 686ms
    Total Blocking Time  - 0ms
    Cumulative Layout Shift  - 0
    Time to First Byte (TTFB) - 221ms
    Onload Time - 715ms
    DOM Content Loaded Time - 582ms
    Fully Loaded Time - 849ms
    GTmetrix Grade - A

 Went to the incoginito tab and then Chrome devtools -> lighthouse

 Lighthouse - 
 
    First Contentful Paint - 0.2s
    Largest Contentful Paint - 0.3s
    Total Blocking Time - 0ms
    Cumulative Layout Shift - 0
    Speed Index - 0.2s

# Optimisations
    
**Intelligent use of the lodash library** - 
Let's suppose we want to import a debounce function. There are two ways to do that:
import { deounce } from "lodash";
import debounce from "lodash/debounce";
The first option imports the entire library, whereas the second, more optimised, way imports just the debounce function, and nothing else. This too, saves a lot of the load time, and this is what this project uses.

**Reduced the number of API calls** - I have reduced the number of API calls, by using debounce, which saved off almost 2 seconds after each click.
Also, if the tab data is already there and no new api requests is been called and the data is taken from the cache. Thus reducing the number of unneccesary network calls.

**Lazy loading** - Query container is been lazy loaded and hence not all the components are required on the initial rendering of the page.

**Disabled source maps in production** – reduces bundle size and speeds up page load.

**Minification enabled using Terser** – JavaScript code is compressed to reduce size.

**Comments removed from production code**

**Code splitting via Webpack’s splitChunks** – separates vendor and common code into separate bundles for faster loading.

**Selective transpilation of dependencies** – only transpiles what’s necessary to reduce build size.

Effect: These optimizations reduce JavaScript bundle size, improve initial load time, and make the application more responsive for users.









    

    
