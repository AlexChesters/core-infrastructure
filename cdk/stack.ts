import * as cdk from '@aws-cdk/cdk'

import Budget from './resources/budget'
import Storage from './resources/storage'
import VPC from './resources/vpc'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props)

    Budget(this)
    Storage(this)
    VPC(this)
  }
}
