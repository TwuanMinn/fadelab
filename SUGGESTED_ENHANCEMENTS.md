# Suggested Enhancements for Furnza

Based on the current state of the application, here are key areas for improvement to elevate the user experience and functionality.

## 1. Core Functionality & Backend
- **Real Authentication**: Replace the mock `isSignedIn` state with a real auth provider like **NextAuth.js**, **Clerk**, or **Supabase Auth**. This enables secure user profiles, order history, and saved items.
- **Database Integration**: Move product data from hardcoded arrays to a database (PostgreSQL/Prisma or MongoDB). This allows for dynamic inventory management and CMS capabilities.
- **Payment Processing**: Integrate **Stripe** or **PayPal** for real checkout transactions instead of the current frontend-only flow.
- **State Management**: Implement global state management (e.g., **Zustand** or **Redux Toolkit**) for the Cart. Currently, the cart state is local to `cart/page.tsx`, meaning items added on the Home page do not persist when navigating to the Cart page.

## 2. User Experience (UX)
- **Persistent Cart**: Use `localStorage` or a database to save the user's cart so items aren't lost on refresh.
- **Skeleton Loaders**: Add skeleton loading states for products and images to improve perceived performance while data is fetching.
- **Search with Filters**: Enhance the search bar to support direct filtering (e.g., "Blue Sofa under $500") and real-time suggestions.
- **Toast Notifications**: Replace `window.alert` or simple state toggles with a global Toast system (e.g., `react-hot-toast`) for cleaner feedback on "Added to Cart" or "Review Submitted".

## 3. UI & Design
- **Dark Mode Polish**: Ensure all modal backgrounds and text contrast ratios are perfect in Dark Mode. Some borders might need tweaking.
- **Micro-interactions**: Add more subtle animations, such as a "fly-to-cart" animation when adding a product.
- **404 Page**: Design a custom 404 page that guides users back to the catalog or search.

## 4. Performance & SEO
- **Image Optimization**: Ensure all `next/image` components have proper `sizes` props to serve correctly sized images for mobile vs desktop.
- **Metadata**: Add dynamic `generateMetadata` for product pages to improve SEO ranking for individual items.
- **Sitemap**: Generate a `sitemap.xml` dynamically based on the product database.

## 5. Accessibility (a11y)
- **Keyboard Navigation**: Ensure all custom modals (Review, Settings) trap focus correctly and can be closed with `Esc`.
- **Screen Readers**: Audit ARIA labels on all icon-only buttons (like "Add to Cart" or "Wishlist") to ensure they are descriptive.
