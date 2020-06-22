import * as iam from '@aws-cdk/aws-iam'
import * as acm from '@aws-cdk/aws-certificatemanager'

export interface IGlobalStackProps {
  /**
   * S3 bucket ARNs for build artifacts
   */
  buildArtifactsBucketArns: string[]
}

export interface ICustomPermissions {
  /**
   * IAM Role that provides basic permissions necessary for AWS CodeBuild to
   * function
   */
  codeBuildBaseRole: iam.Role
  /**
   * IAM Policy that provides basic permissions necessary for AWS CodeBuild to
   * function
   */
  codeBuildBasePolicy: iam.CfnManagedPolicy
  /**
   * IAM Role that provides basic permissions necessary for AWS CodePipeline to
   * function
   */
  codePipelineBaseRole: iam.Role
  /**
   * IAM Policy that provides basic permissions necessary for AWS CodePipeline to
   * function
   */
  codePipelineBasePolicy: iam.CfnManagedPolicy
  /**
   * IAM Role that provides the permissions CloudFormation has when running as
   * part of a CodePipeline
   */
  codePipelineCloudFormationRole: iam.Role
  /**
   * IAM Policy that provides the permissions necessary for Packer to be able
   * to build an AMI
   */
  packerPolicy: iam.CfnManagedPolicy
  /**
   * IAM User that is used in GitHub Actions workflows
   */
  githubActionsUser: iam.User
}

export interface ICertificates {
  /**
   * ACM certificate for *.api.alexchesters.com
   */
  alexChestersApiCertificate: acm.Certificate
}
