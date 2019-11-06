import * as cdk from '@aws-cdk/core'

import Storage from './resources/storage'

export default class Stack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props)

    const bucket = Storage(this)

    new cdk.CfnOutput(this, 'BuildArtifactsBucketOutput', {
      description: 'S3 bucket to use for CI artifacts',
      exportName: `${this.stackName}-build-artifacts-bucket`,
      value: bucket.bucketName
    })
  }
}
