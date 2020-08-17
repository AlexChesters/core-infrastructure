import * as cdk from '@aws-cdk/core'

import CoreEUWest1Stack from './stacks/core-eu-west-1'
import CoreGlobalStack from './stacks/core-global'
import CoreUSEast1Stack from './stacks/core-us-east-1'

class Application extends cdk.App {
  constructor () {
    super()

    new CoreEUWest1Stack(this, 'core-infrastructure-eu-west-1',
      {
        env: {
          region: 'eu-west-1'
        }
      }
    )
    new CoreUSEast1Stack(this, 'core-infrastructure-us-east-1',
      {
        env: {
          region: 'us-east-1'
        }
      }
    )

    new CoreGlobalStack(
      this,
      'core-infrastructure-global',
      {
        buildArtifactsBucketArns: [
          'arn:aws:s3:::core-infrastructure-eu-w-buildartifactsbucketeuwe-12d2acmozch84',
          'arn:aws:s3:::core-infrastructure-us-e-buildartifactsbucketusea-cmkndmg3ty11'
        ]
      },
      {
        env: {
          region: 'eu-west-1'
        }
      }
    )
  }
}

new Application().synth()
