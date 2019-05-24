import * as cdk from '@aws-cdk/cdk'

import Budget from './resources/budget'
import Permissions from './resources/permissions'

import BuildArtifactsBucketEUWest1 from '../core-eu-west-1/resources/storage'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props)

    Budget(this)
    Permissions(this, BuildArtifactsBucketEUWest1(this))
  }
}
