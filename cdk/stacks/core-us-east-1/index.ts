import * as cdk from '@aws-cdk/cdk'

import Storage from './resources/storage'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props)

    const bucket = Storage(this)

    new cdk.Output(this, 'BuildArtifactsBucketOutput', {
      description: 'S3 bucket to use for CI artifacts',
      export: `${this.stackName}-build-artifacts-bucket`,
      value: bucket.bucketName
    })
  }
}
