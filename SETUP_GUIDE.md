# Ghani Constructions - Setup Guide

## Prerequisites

- Node.js 18+ installed
- Firebase account
- Calendly account (optional)

## Quick Start

1. **Clone and Install Dependencies**

   ```bash
   npm install
   ```

2. **Firebase Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Get your project configuration

3. **Environment Variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

   # Calendly Configuration (optional)
   NEXT_PUBLIC_CALENDLY_LINK=https://calendly.com/your-calendly-link
   ```

4. **Firestore Collections Setup**
   Create the following collections in Firestore:

   **products** collection:

   ```json
   {
     "id": "auto-generated",
     "name": "Product Name",
     "description": "Product description",
     "price": 99.99,
     "discount": 10,
     "imageUrl": "https://example.com/image.jpg"
   }
   ```

   **services** collection:

   ```json
   {
     "id": "auto-generated",
     "name": "Service Name",
     "description": "Service description",
     "basePrice": 199.99
   }
   ```

   **orders** collection:

   ```json
   {
     "id": "auto-generated",
     "customerName": "John Doe",
     "phone": "1234567890",
     "address": "123 Main St",
     "productId": "product_id",
     "productName": "Product Name",
     "quantity": 2,
     "totalPrice": 179.98,
     "status": "pending",
     "createdAt": "timestamp"
   }
   ```

5. **Admin User Setup**
   - Go to Firebase Console > Authentication
   - Add a new user with email/password
   - This user will be able to access the admin dashboard

6. **Run Development Server**

   ```bash
   npm run dev
   ```

7. **Access the Application**
   - Public site: <http://localhost:3000>
   - Admin dashboard: <http://localhost:3000/admin>
   - Admin login: <http://localhost:3000/admin/login>

## Features

### Public Site

- **Homepage**: Hero section, services preview, featured products, Calendly integration
- **Services Page**: List all services with booking buttons
- **Products Page**: List all products with order buttons
- **Checkout Page**: COD form for product orders

### Admin Dashboard

- **Authentication**: Email/password login
- **Dashboard**: Overview statistics
- **Products Management**: CRUD operations
- **Services Management**: CRUD operations
- **Orders Management**: View and update order status

## File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── checkout/          # Checkout page
│   ├── products/          # Products listing page
│   ├── services/          # Services listing page
│   ├── globals.css        # Global styles
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── AdminSidebar.jsx  # Admin navigation
│   ├── CheckoutForm.jsx  # Order form
│   ├── DashboardTable.jsx # Admin table component
│   ├── Footer.jsx        # Site footer
│   ├── Hero.jsx          # Homepage hero
│   ├── Navigation.jsx    # Site navigation
│   ├── ProductCard.jsx   # Product display card
│   └── ServiceCard.jsx   # Service display card
└── lib/                  # Utility functions
    ├── firebase.js       # Firebase configuration
    └── firebase-utils.js # Firestore CRUD operations
```

## Customization

### Styling

- The project uses Tailwind CSS v4 for styling
- shadcn/ui components are used for consistent UI
- Colors and branding can be customized in `tailwind.config.js`

### Content

- Update company information in components
- Replace placeholder images with actual product images
- Update contact information in Footer component
- Replace Calendly placeholder with actual booking link

### Firebase Rules

Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to products and services
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /services/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow public write to orders, admin read/write
    match /orders/{document} {
      allow read, write: if request.auth != null;
      allow create: if true;
    }
  }
}
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

- Set environment variables
- Build: `npm run build`
- Start: `npm start`

## Troubleshooting

### Common Issues

1. **Firebase connection errors**: Check environment variables
2. **Authentication issues**: Verify Firebase Auth is enabled
3. **Build errors**: Ensure all dependencies are installed
4. **Image loading**: Check image URLs and Next.js Image configuration

### Support

For issues related to:

- Next.js: Check [Next.js documentation](https://nextjs.org/docs)
- Tailwind CSS: Check [Tailwind documentation](https://tailwindcss.com/docs)
- Firebase: Check [Firebase documentation](https://firebase.google.com/docs)
- shadcn/ui: Check [shadcn/ui documentation](https://ui.shadcn.com/)
