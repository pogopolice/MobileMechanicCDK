# AWS Deployment Guide with Custom Domain

This guide walks you through deploying the Mobile Mechanic website to AWS with a custom domain using CloudFront, S3, and Route53.

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured with credentials
3. **Custom Domain** registered (either in Route53 or external registrar)
4. **Node.js and npm** installed

## Step 1: Set Up Route53 Hosted Zone

If your domain is not already in Route53:

```bash
# Create a hosted zone for your domain
aws route53 create-hosted-zone --name yourdomain.com --caller-reference $(date +%s)
```

Take note of the **Hosted Zone ID** from the output. You'll also see nameservers that you need to configure with your domain registrar.

If your domain is already in Route53, get the Hosted Zone ID:

```bash
aws route53 list-hosted-zones-by-name --dns-name yourdomain.com
```

## Step 2: Request ACM Certificate

**Important:** CloudFront requires certificates to be in the **us-east-1** region.

```bash
# Request a certificate in us-east-1
aws acm request-certificate \
  --domain-name yourdomain.com \
  --validation-method DNS \
  --region us-east-1
```

This returns a **Certificate ARN**. Save it for later.

### Validate the Certificate

1. Get the validation records:

```bash
aws acm describe-certificate \
  --certificate-arn arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID \
  --region us-east-1
```

2. Add the CNAME records to your Route53 hosted zone (or external DNS):

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id YOUR_HOSTED_ZONE_ID \
  --change-batch file://validation-record.json
```

Example `validation-record.json`:
```json
{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "_validationrecord.yourdomain.com",
      "Type": "CNAME",
      "TTL": 300,
      "ResourceRecords": [{"Value": "validation-value.acm-validations.aws."}]
    }
  }]
}
```

3. Wait for validation (can take up to 30 minutes):

```bash
aws acm wait certificate-validated \
  --certificate-arn arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID \
  --region us-east-1
```

## Step 3: Store Configuration in Parameter Store

Store the required configuration values in AWS Systems Manager Parameter Store.

**Note:** Use your apex domain (e.g., `yourdomain.com`) for the domain name. The stack will create a Route53 A record at the apex of your hosted zone pointing to CloudFront.

```bash
# Store domain name (use apex domain, e.g., yourdomain.com)
aws ssm put-parameter \
  --name "/mobile-mechanic/domain-name" \
  --value "yourdomain.com" \
  --type "String" \
  --description "Custom domain name for mobile mechanic website (apex domain)" \
  --overwrite

# Store certificate ARN
aws ssm put-parameter \
  --name "/mobile-mechanic/certificate-arn" \
  --value "arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID" \
  --type "String" \
  --description "ACM certificate ARN for CloudFront (must be in us-east-1)" \
  --overwrite

# Store hosted zone ID
aws ssm put-parameter \
  --name "/mobile-mechanic/hosted-zone-id" \
  --value "Z1234567890ABC" \
  --type "String" \
  --description "Route53 hosted zone ID for domain" \
  --overwrite
```

### Verify Parameters

```bash
# List all parameters
aws ssm get-parameters-by-path \
  --path "/mobile-mechanic" \
  --recursive

# Get specific parameter
aws ssm get-parameter --name "/mobile-mechanic/domain-name"
```

## Step 4: Bootstrap CDK (First Time Only)

If this is your first CDK deployment in this AWS account/region:

```bash
npx cdk bootstrap
```

## Step 5: Build and Deploy

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Preview CloudFormation changes
npx cdk diff

# Deploy the stack
npx cdk deploy
```

The deployment will:
1. Read configuration from Parameter Store
2. Create an S3 bucket for website content
3. Create a CloudFront distribution with your custom domain
4. Create a Route53 A record pointing to CloudFront
5. Upload all website files to S3
6. Invalidate CloudFront cache

## Step 6: Update Nameservers (If External Registrar)

If your domain is registered outside of AWS, update your domain's nameservers to point to the Route53 nameservers provided when you created the hosted zone.

Get your nameservers:

```bash
aws route53 get-hosted-zone --id YOUR_HOSTED_ZONE_ID
```

Update these at your domain registrar (e.g., GoDaddy, Namecheap, etc.)

## Step 7: Verify Deployment

After deployment completes:

1. **Check CloudFormation Stack:**
```bash
aws cloudformation describe-stacks --stack-name MobileMechanicWebsiteStack
```

2. **Test the Website:**
```bash
# Test CloudFront URL
curl -I https://d111111abcdef8.cloudfront.net

# Test custom domain (may take a few minutes for DNS propagation)
curl -I https://yourdomain.com
```

3. **Visit in Browser:**
- CloudFront URL: Check the stack outputs for `DistributionDomainName`
- Custom domain: https://yourdomain.com

## Updating the Website

To update the website content:

```bash
# Make changes to files in the website/ directory

# Build and deploy
npm run build
npx cdk deploy
```

The deployment will automatically:
- Upload changed files to S3
- Invalidate CloudFront cache
- Make changes live within minutes

## Troubleshooting

### Certificate Validation Stuck

- Ensure DNS records are correctly configured
- Check validation status: `aws acm describe-certificate --certificate-arn YOUR_ARN --region us-east-1`
- DNS propagation can take up to 30 minutes

### Domain Not Resolving

- Verify nameservers are updated at your registrar
- DNS propagation can take 24-48 hours
- Test with CloudFront URL first to verify the site works

### "Parameter not found" Error

- Ensure all three parameters are created in Parameter Store
- Verify parameter names match exactly: `/mobile-mechanic/domain-name`, `/mobile-mechanic/certificate-arn`, `/mobile-mechanic/hosted-zone-id`
- Run `aws ssm get-parameters-by-path --path "/mobile-mechanic" --recursive`

### CloudFront Distribution Shows Error

- Check S3 bucket permissions
- Verify certificate is in us-east-1 region
- Check CloudFront error logs in CloudWatch

## Cleanup

To remove all AWS resources:

```bash
npx cdk destroy
```

**Note:** This will delete:
- S3 bucket and all contents
- CloudFront distribution
- Route53 A record

It will NOT delete:
- Hosted zone
- ACM certificate
- Parameter Store values

To manually clean up these:

```bash
# Delete parameters
aws ssm delete-parameter --name "/mobile-mechanic/domain-name"
aws ssm delete-parameter --name "/mobile-mechanic/certificate-arn"
aws ssm delete-parameter --name "/mobile-mechanic/hosted-zone-id"

# Delete certificate (if no longer needed)
aws acm delete-certificate --certificate-arn YOUR_ARN --region us-east-1

# Delete hosted zone (if no longer needed)
aws route53 delete-hosted-zone --id YOUR_HOSTED_ZONE_ID
```

## Cost Considerations

- **Route53 Hosted Zone:** ~$0.50/month
- **CloudFront:** First 1TB transfer free tier, then $0.085/GB
- **S3 Storage:** First 50GB free tier, then $0.023/GB
- **ACM Certificates:** Free for AWS services
- **Parameter Store:** Free for standard parameters

Total estimated cost: **~$1-5/month** for a low-traffic website.
