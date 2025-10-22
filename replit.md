# Mobile Mechanic Website Project

## Overview
A professional static website for a mobile mechanic business specializing in heavy equipment and semi truck services. The website is built with HTML, CSS, and vanilla JavaScript, and uses AWS CDK (TypeScript) for infrastructure deployment to S3 and CloudFront.

## Current State
✅ Project fully implemented and ready for deployment
- All HTML pages created with responsive design
- CSS styling with light/dark theme toggle
- JavaScript for interactive menu and theme persistence
- AWS CDK infrastructure code for S3 + CloudFront deployment
- Stock images integrated for all service pages

## Recent Changes (October 22, 2025)
- Initial project setup with AWS CDK TypeScript configuration
- Created 7 HTML pages: home, 5 service pages, and contact page
- Implemented responsive CSS with blue color scheme and theme toggle
- Added JavaScript for hamburger menu and localStorage theme persistence
- Created CDK stack for S3 static hosting and CloudFront distribution
- Added stock images for all pages
- **Updated CDK stack to use custom domain from Parameter Store**
- **Configured CloudFront with ACM certificate and Route53 A record**
- Created comprehensive deployment guide (DEPLOYMENT.md)

## Project Architecture

### Frontend
- **Technology**: Static HTML, CSS, JavaScript (Vanilla)
- **Design**: Blue color scheme with light/dark theme support
- **Features**: 
  - Responsive hamburger menu navigation
  - Light/dark theme toggle with localStorage persistence
  - Mobile-first responsive design
  - Service-specific pages with imagery

### Infrastructure (AWS CDK)
- **S3 Bucket**: Static website hosting with public read access
- **CloudFront Distribution**: CDN with custom domain and SSL certificate
- **ACM Certificate**: SSL/TLS certificate for HTTPS (must be in us-east-1)
- **Route53**: A record for custom domain pointing to CloudFront
- **Parameter Store**: Configuration management for domain settings
- **Deployment**: Automated bucket deployment with cache invalidation

### Pages Structure
1. **index.html** - Main landing page with business intro and service overview
2. **maintenance.html** - Standard maintenance service details
3. **diagnostics.html** - Advanced diagnostics service details
4. **hydraulic-cylinder.html** - Hydraulic cylinder repair details
5. **hydraulic-hose.html** - Hydraulic hose repair details
6. **welding.html** - Welding service details
7. **contact.html** - Contact information and service hours

## Services Offered
1. Standard Maintenance for semi trucks and heavy equipment
2. Advanced Diagnostics for semi trucks and heavy equipment
3. Hydraulic Cylinder Repair
4. Hydraulic Hose Repair
5. Welding

## User Preferences
- Color theme: Blue with complementary colors
- Design style: Simple and concise
- Each page includes relevant imagery and short service descriptions
- Hamburger menu for navigation
- Light/dark theme toggle button

## Local Development
Run `npm run preview` to start a local server on port 5000

## AWS Deployment with Custom Domain
1. Set up Parameter Store values (domain name, certificate ARN, hosted zone ID)
2. Bootstrap CDK: `npx cdk bootstrap` (first time only)
3. Build: `npm run build`
4. Deploy: `npm run deploy`

See DEPLOYMENT.md for complete setup instructions including ACM certificate creation and Route53 configuration.

## Dependencies
- aws-cdk-lib: AWS CDK framework
- constructs: CDK constructs library
- typescript: TypeScript compiler
- @types/node: Node.js type definitions
