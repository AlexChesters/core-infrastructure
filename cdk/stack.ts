import * as cdk from '@aws-cdk/cdk'

import Budget from './resources/budget'
import Certificate from './resources/certificate'
import Router from './resources/router'
import Storage from './resources/storage'
import VPC from './resources/vpc'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props)

    Budget(this)
    const certificate = Certificate(this)
    Storage(this)
    const vpc = VPC(this)

    Router(this, vpc, certificate)
  }
}
