import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dotenv from "dotenv";
import { DEFAULT_ACCOUNT_ENV } from 'aws-cdk-lib/cx-api';
// import * as sqs from 'aws-cdk-lib/aws-sqs';



dotenv.config()

export class BrangenInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes:[
        lambda.Runtime.PYTHON_3_7
      ],
    });

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_7,
      code: lambda.Code.fromAsset("../app/"),
      handler: "brangen_api.handler",
      layers : [layer],
      environment:{
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
      }
    });
  }
}
