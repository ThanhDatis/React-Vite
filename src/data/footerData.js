export const FOOTER_DATA = {
  mainPages: [
    { id: 1, title: "Sell with US", path: "/sell" },
    { id: 2, title: "About US", path: "/about" },
    { id: 3, title: "Contact US", path: "/contact" },
    { id: 4, title: "Promos", path: "/promos" },
    { id: 5, title: "Become an Ambassador", path: "/ambassador" },
  ],
  policy: [
    { id: 1, title: "Terms of Usage", path: "/terms" },
    { id: 2, title: "Privacy Policy", path: "/privacy" },
    { id: 3, title: "Return Policy", path: "/returns" },
  ],
  categories: [
    { id: 1, title: "Skincare", path: "/skincare" },
    { id: 2, title: "Makeup", path: "/makeup" },
    { id: 3, title: "Hair Care", path: "/haircare" },
    { id: 4, title: "Bath & Body", path: "/bath-body" },
    { id: 5, title: "Beauty Supplements", path: "/fragrance" },
  ],
  socialLinks: [
    {
      id: 1,
      name: "Facebook",
      iconType: "facebook",
      href: "https://www.facebook.com",
      color: "#1877F2",
    },
    {
      id: 2,
      name: "Twitter",
      iconType:"twitter",
      href: "https://www.twitter.com",
      color: "#1DA1F2",
    },
    {
      id: 3,
      name: "YouTube",
      iconType:"youtube",
      href: "https://www.youtube.com",
      color: "#FF0000",
    },
  ],
};

export const COMPANY_INFO = {
    name: 'Your Company',
    logo: 'YOUR LOGO',
    tagLine: 'Your trusted beauty destination',
    establishedYear: '2025',
};

export const NEWSLETTER_MESSAGES = {
    success: 'Successfully subscribed to our newsletter.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address (e.g., example@example.com)',
    subscriptionFailed: 'Failed to subscribe. Please try again letter',
    alreadySubscribed: 'This email is already subscribed.',
}

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;