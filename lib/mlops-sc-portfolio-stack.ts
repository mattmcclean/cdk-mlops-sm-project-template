import * as cdk from '@aws-cdk/core';
import * as servicecatalog from '@aws-cdk/aws-servicecatalog';

import { Asset } from '@aws-cdk/aws-s3-assets';
import * as path from 'path';
import * as fs from 'fs';

export interface MLOpsServiceCataloguePortfolioStackProps extends cdk.StackProps {

  // the ARN of the constraint IAM role
  constraintRole: string;

  // the ARN of the access IAM role for SageMaker Studio 
  accessRole: string;
}

export class MLOpsServiceCataloguePortfolioStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: MLOpsServiceCataloguePortfolioStackProps) {
    super(scope, id, props);

    // use the generated template if exists else the default template in the src dir
    const templatePath = fs.existsSync("./out/product-template.json") ? path.join(__dirname, "../out/product-template.json") :
      path.join(__dirname, "../src/product-template.yaml");

    const cfnAsset = new Asset(this, "ScProductTemplate", {
      path: templatePath
    });

    // The Service Catalogue portfolio resource
    const portfolio = new servicecatalog.CfnPortfolio(this, 'MyMLOpsPortfolio', { 
      displayName: "My MLOps Portfolio of Solutions",
      providerName: "Matt McClean",
    });

    // The Service Catalogue product resource
    const product = new servicecatalog.CfnCloudFormationProduct(this, 'MyProduct', {
      name: "MLOps template for model building, training, and deployment",
      description: "This template enables you to easily build, train, and deploy machine learning models. You can adopt MLOps best practices and enable Continuous Integration/Continuous Deployment for building, training, and evaluating machine learning models using Amazon SageMaker Pipelines, registering models to the Model Registry, and automating model model deployment. Amazon SageMaker creates an AWS CodeCommit code repository for you to manage your code and uses AWS CodePipeline to build, train, and deploy your machine learning models on pre-production and production Amazon SageMaker endpoints for real-time inference.",
      owner: "Matt McClean",
      provisioningArtifactParameters: [
        {
          name: "v1.0",
          info: { LoadTemplateFromURL: cfnAsset.httpUrl },
        }
      ],
      tags: [
        {
          key: "sagemaker:studio-visibility",
          value: "true",
        }
      ]
    });

    new servicecatalog.CfnPortfolioProductAssociation(this, 'PortfolioProductAssociation', {
      productId: product.ref,
      portfolioId: portfolio.ref,
    });

    new servicecatalog.CfnPortfolioPrincipalAssociation(this, 'PortfolioPrincipalAssociation', {
      portfolioId: portfolio.ref,
      principalArn: props.accessRole,
      principalType: "IAM",
    });

    new servicecatalog.CfnLaunchRoleConstraint(this, 'LaunchRoleConstraint', {
      productId: product.ref,
      portfolioId: portfolio.ref,
      roleArn: props.constraintRole,
    });
  }
}
