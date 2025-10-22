#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StaticWebsiteStack } from '../lib/static-website-stack';

const app = new cdk.App();
new StaticWebsiteStack(app, 'MobileMechanicWebsiteStack',
  {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
    description: 'Static website for Mobile Mechanic business with S3 and CloudFront',
  });
