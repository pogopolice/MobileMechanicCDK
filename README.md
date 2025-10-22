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

## AWS Deployment with Custom Domain

This website is configured to use a **custom domain** stored in AWS Systems Manager Parameter Store.

### Quick Start

**For detailed setup instructions including custom domain configuration, see [DEPLOYMENT.md](DEPLOYMENT.md).**

### Required Parameter Store Values

Before deploying, you must create three parameters in AWS Parameter Store:

```bash
# Your custom domain name
aws ssm put-parameter --name "/mobile-mechanic/domain-name" --value "yourdomain.com" --type "String"

# ACM certificate ARN (must be in us-east-1 for CloudFront)
aws ssm put-parameter --name "/mobile-mechanic/certificate-arn" --value "arn:aws:acm:us-east-1:..." --type "String"

# Route53 hosted zone ID
aws ssm put-parameter --name "/mobile-mechanic/hosted-zone-id" --value "Z1234..." --type "String"
```

### Deploy

```bash
# Bootstrap CDK (first time only)
npx cdk bootstrap

# Build and deploy
npm run build
npx cdk deploy
```

This will:
1. Read configuration from Parameter Store
2. Create an S3 bucket for static website hosting
3. Create a CloudFront distribution with your custom domain and SSL certificate
4. Create a Route53 A record pointing to CloudFront
5. Deploy all website files to S3

After deployment, your website will be available at `https://yourdomain.com`

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

### Configure Custom Domain

The website uses AWS Parameter Store for configuration. See [DEPLOYMENT.md](DEPLOYMENT.md) for complete setup instructions including:
- Creating and validating ACM certificates
- Setting up Route53 hosted zones
- Configuring Parameter Store values

### Theme Colors

Edit CSS variables in `website/assets/styles.css` to customize colors:
- `--primary-blue`: Main brand color
- `--secondary-blue`: Secondary brand color
- `--accent-orange`: Accent color for highlights

## License

Copyright © 2025 Mobile Mechanic. All rights reserved.
