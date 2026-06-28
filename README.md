#  ArtHub – Online Art Marketplace

# Description
Traditional art buying is often limited to galleries or physical exhibitions. An online marketplace democratizes access to art, enables emerging artists to reach global audiences, and provides a secure, streamlined purchase experience. The project demonstrates advanced MERN stack concepts including role-based access, payment integration, and interactive features like comments and analytics.

# How does the system work?
Users (Buyers) browse artworks, view details, purchase via Stripe, comment on purchased pieces, and track purchase history.

Artists: upload/manage their artworks. They can edit, delete, and see sales history.

Admin manages users (role changes), all artworks (delete), and all transactions.
Authentication uses JWT with email/password and Google login.
Dashboards are role-specific with CRUD operations, payment flows, and analytics.


## 🛠️ Technologies to Use

| Technology | Purpose |
| **Next.js** | Build the UI |
| **Tailwind CSS+heroui** | Styling and responsiveness |
| **BetterAuth** | Used for authentication |
| **MongoDB** | To store Data |
| **Stripe** | For payment|