import * as cdk from '@aws-cdk/cdk'

import Budget from '../resources/budget'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props)

    Budget(this)
  }
}
