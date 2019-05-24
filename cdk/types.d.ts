import * as iam from '@aws-cdk/aws-iam'

export interface IGlobalStackProps {
  /**
   * S3 bucket ARN for build artifacts
   */
  buildArtifactsBucketArn: string
}

export interface ICustomRoles {
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
}
