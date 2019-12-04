import * as cdk from '@aws-cdk/core'

import Budget from './resources/budget'
import Permissions from './resources/permissions'

import { IGlobalStackProps } from '../../types'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, globalStackProps: IGlobalStackProps, props?: cdk.StackProps) {
    super(parent, name, props)

    Budget(this)
    const permissions = Permissions(
      this,
      globalStackProps.buildArtifactsBucketArns
    )

    new cdk.CfnOutput(this, 'CodeBuildBaseRoleOutput', {
      description: 'ARN of an IAM Role that provides basic permissions necessary for AWS CodeBuild to function',
      exportName: `${this.stackName}-codebuild-base-role-arn`,
      value: permissions.codeBuildBaseRole.roleArn
    })

    new cdk.CfnOutput(this, 'CodeBuildBasePolicyOutput', {
      description: 'ARN of an IAM Policy that provides basic permissions necessary for AWS CodeBuild to function',
      exportName: `${this.stackName}-codebuild-base-policy-arn`,
      value: permissions.codeBuildBasePolicy.ref
    })

    new cdk.CfnOutput(this, 'CodePipelineBaseRoleOutput', {
      description: 'ARN of an IAM Role that provides basic permissions necessary for AWS CodePipeline to function',
      exportName: `${this.stackName}-codepipeline-base-role-arn`,
      value: permissions.codePipelineBaseRole.roleArn
    })

    new cdk.CfnOutput(this, 'CodePipelineBasePolicyOutput', {
      description: 'ARN of an IAM Policy that provides basic permissions necessary for AWS CodePipeline to function',
      exportName: `${this.stackName}-codepipeline-base-policy-arn`,
      value: permissions.codePipelineBasePolicy.ref
    })

    new cdk.CfnOutput(this, 'CodePipelineCloudFormationRoleOutput', {
      description: 'ARN of an IAM Role that provides the permissions CloudFormation has when running as part of a CodePipeline',
      exportName: `${this.stackName}-codepipeline-cloudformation-role-arn`,
      value: permissions.codePipelineCloudFormationRole.roleArn
    })
  }
}
