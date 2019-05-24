import * as cdk from '@aws-cdk/cdk'

import CoreEUWest1Stack from './stacks/core-eu-west-1'
import CoreGlobalStack from './stacks/core-global'

class Application extends cdk.App {
  constructor () {
    super()

    new CoreEUWest1Stack(this, 'core-infrastructure-eu-west-1')
    new CoreGlobalStack(
      this,
      'core-infrastructure-global',
      {
        buildArtifactsBucketArn: 'arn:aws:s3:::core-infrastructure-eu-w-buildartifactsbucketeuwe-12d2acmozch84'
      }
    )
  }
}

new Application().run()
