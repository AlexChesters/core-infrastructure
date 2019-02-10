import * as cdk from '@aws-cdk/cdk'

import Budget from './resources/budget'
import Certificate from './resources/certificate'
import Permissions from './resources/permissions'
import Router from './resources/router'
import Storage from './resources/storage'
import VPC from './resources/vpc'

import { ICoreInfrastructureOptions } from './types'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, props?: cdk.StackProps, opts: ICoreInfrastructureOptions = {}) {
    super(parent, name, props)

    Budget(this)
    const certificate = Certificate(this)
    const bucket = Storage(this)
    const { codeBuildBaseRole } = Permissions(this, bucket)
    const vpc = VPC(this)

    if (!opts.disableRouter) {
      Router(this, vpc, certificate)
    }

    new cdk.Output(this, 'BuildArtifactsBucketOutput', {
      description: 'S3 bucket to use for CI artifacts',
      export: `${this.stackName}-build-artifacts-bucket`,
      value: bucket.bucketName
    })

    new cdk.Output(this, 'CodeBuildBaseRoleOutput', {
      description: 'ARN of an IAM Role that provides basic permissions necessary for AWS CodeBuild to function',
      export: `${this.stackName}-codebuild-base-role-arn`,
      value: codeBuildBaseRole.roleArn
    })
  }
}
