import * as cdk from '@aws-cdk/cdk'

import Stack from './stack'
import CoreEUWest1Stack from './stacks/core-eu-west-1'
import CoreGlobalStack from './stacks/core-global'

class Application extends cdk.App {
  constructor () {
    super()

    new Stack(this, 'core-infrastructure')
    new CoreEUWest1Stack(this, 'core-infrastructure-eu-west-1')
    new CoreGlobalStack(this, 'core-infrastructure-global')
  }
}

new Application().run()
