# Mobile Mechanic Website

A professional static website for a mobile mechanic business specializing in heavy equipment and semi truck services. Built with AWS CDK (TypeScript) for deployment to S3 and CloudFront.

## Features

- **Responsive Design**: Mobile-friendly layout with hamburger menu navigation
- **Light/Dark Theme**: Toggle between light and dark modes with persistent preference
- **Service Pages**: Dedicated pages for each service offering
- **Blue Color Scheme**: Professional blue-themed design with complementary colors
- **AWS Infrastructure**: S3 static hosting with CloudFront CDN distribution

## Services Offered

1. **Standard Maintenance** - Routine maintenance for semi trucks and heavy equipment
2. **Advanced Diagnostics** - Computer diagnostics and troubleshooting
3. **Hydraulic Cylinder Repair** - Expert hydraulic cylinder rebuild and repair
4. **Hydraulic Hose Repair** - Custom hose fabrication and replacement
5. **Welding** - Professional welding and fabrication services

## Local Development

### Preview the Website Locally

```bash
npm run preview
```

This will start a local HTTP server on port 5000. Open your browser to `http://localhost:5000` to view the website.

## AWS Deployment

### Prerequisites

- AWS Account with appropriate credentials configured
- AWS CLI installed and configured
- Node.js and npm installed

### Bootstrap CDK (First Time Only)

```bash
npx cdk bootstrap
```

### Build the CDK App

```bash
npm run build
```

### Deploy to AWS

```bash
npm run deploy
```

This will:
1. Create an S3 bucket for static website hosting
2. Deploy all website files to the S3 bucket
3. Create a CloudFront distribution for CDN delivery
4. Output the CloudFront URL where your website is accessible

### View Deployment Details

After deployment, the CloudFront URL will be displayed in the output. You can also view it in the AWS Console.

### Destroy Infrastructure

To remove all AWS resources:

```bash
npx cdk destroy
```

## Project Structure

```
.
├── bin/
│   └── cdk-app.ts              # CDK app entry point
├── lib/
│   └── static-website-stack.ts # CDK infrastructure stack
├── website/
│   ├── index.html              # Main landing page
│   ├── maintenance.html        # Standard maintenance service page
│   ├── diagnostics.html        # Advanced diagnostics service page
│   ├── hydraulic-cylinder.html # Hydraulic cylinder repair page
│   ├── hydraulic-hose.html     # Hydraulic hose repair page
│   ├── welding.html            # Welding service page
│   ├── contact.html            # Contact information page
│   ├── assets/
│   │   ├── styles.css          # All CSS styling
│   │   └── script.js           # JavaScript functionality
│   └── images/                 # Service images
├── package.json
├── tsconfig.json
└── cdk.json
```

## Customization

### Update Contact Information

Edit `website/contact.html` to update:
- Phone number
- Email address
- Service hours
- Service area

### Add Custom Domain

To use a custom domain with Route53, update `lib/static-website-stack.ts` to include:
- Certificate Manager certificate
- Route53 hosted zone
- CloudFront alias configuration

### Theme Colors

Edit CSS variables in `website/assets/styles.css` to customize colors:
- `--primary-blue`: Main brand color
- `--secondary-blue`: Secondary brand color
- `--accent-orange`: Accent color for highlights

## License

Copyright © 2025 Mobile Mechanic. All rights reserved.
