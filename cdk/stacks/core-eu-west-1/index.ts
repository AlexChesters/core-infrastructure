import * as cdk from '@aws-cdk/core'

import Storage from './resources/storage'
import VPC from './resources/vpc'
import Certificates from './resources/certificates'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props)

    const bucket = Storage(this)
    const vpc = VPC(this)
    const certificates = Certificates(this)

    new cdk.CfnOutput(this, 'BuildArtifactsBucketOutput', {
      description: 'S3 bucket to use for CI artifacts',
      exportName: `${this.stackName}-build-artifacts-bucket`,
      value: bucket.bucketName
    })

    new cdk.CfnOutput(this, 'VPCIdOutput', {
      description: 'ID of the VPC',
      exportName: `${this.stackName}-vpc-id`,
      value: vpc.vpcId
    })

    new cdk.CfnOutput(this, 'PublicSubnetOneIdOutput', {
      description: 'ID of public subnet one',
      exportName: `${this.stackName}-public-subnet-one-id`,
      value: vpc.publicSubnets[0].subnetId
    })

    new cdk.CfnOutput(this, 'PublicSubnetTwoIdOutput', {
      description: 'ID of public subnet two',
      exportName: `${this.stackName}-public-subnet-two-id`,
      value: vpc.publicSubnets[1].subnetId
    })

    new cdk.CfnOutput(this, 'AlexChestersAPICertificateOutput', {
      description: 'ARN of the ACM certificate for *.api.alexchesters.com',
      exportName: `${this.stackName}-alexchesters-api-certificate-arn`,
      value: certificates.alexChestersApiCertificate.certificateArn
    })
  }
}
