import * as cdk from '@aws-cdk/cdk'

import Storage from './resources/storage'
import VPC from './resources/vpc'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props)

    VPC(this)
    Storage(this)
  }
}
