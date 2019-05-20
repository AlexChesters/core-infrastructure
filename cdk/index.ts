import * as cdk from '@aws-cdk/cdk'

import Stack from './stack'
import CoreGlobalStack from './stacks/core-global'

class Application extends cdk.App {
  constructor () {
    super()

    new Stack(this, 'core-infrastructure')
    new CoreGlobalStack(this, 'core-infrastructure-global')
  }
}

new Application().run()
