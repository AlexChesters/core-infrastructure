import * as cdk from '@aws-cdk/cdk'

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

    new cdk.Output(this, 'CodeBuildBaseRoleOutput', {
      description: 'ARN of an IAM Role that provides basic permissions necessary for AWS CodeBuild to function',
      export: `${this.stackName}-codebuild-base-role-arn`,
      value: permissions.codeBuildBaseRole.roleArn
    })

    new cdk.Output(this, 'CodeBuildBasePolicyOutput', {
      description: 'ARN of an IAM Policy that provides basic permissions necessary for AWS CodeBuild to function',
      export: `${this.stackName}-codebuild-base-policy-arn`,
      value: permissions.codeBuildBasePolicy.managedPolicyArn
    })

    new cdk.Output(this, 'CodePipelineBaseRoleOutput', {
      description: 'ARN of an IAM Role that provides basic permissions necessary for AWS CodePipeline to function',
      export: `${this.stackName}-codepipeline-base-role-arn`,
      value: permissions.codePipelineBaseRole.roleArn
    })

    new cdk.Output(this, 'CodePipelineBasePolicyOutput', {
      description: 'ARN of an IAM Policy that provides basic permissions necessary for AWS CodePipeline to function',
      export: `${this.stackName}-codepipeline-base-policy-arn`,
      value: permissions.codePipelineBasePolicy.managedPolicyArn
    })

    new cdk.Output(this, 'CodePipelineCloudFormationRoleOutput', {
      description: 'ARN of an IAM Role that provides the permissions CloudFormation has when running as part of a CodePipeline',
      export: `${this.stackName}-codepipeline-cloudformation-role-arn`,
      value: permissions.codePipelineCloudFormationRole.roleArn
    })
  }
}
