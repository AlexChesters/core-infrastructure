import * as cdk from '@aws-cdk/cdk'

import Budget from './resources/budget'
import Certificate from './resources/certificate'
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
    const vpc = VPC(this)

    if (!opts.disableRouter) {
      Router(this, vpc, certificate)
    }

    new cdk.Output(this, 'BuildArtifactsBucketOutput', {
      description: 'S3 bucket to use for CI artifacts',
      export: `${this.stackName}-build-artifacts-bucket`,
      value: bucket.bucketName
    })
  }
}
