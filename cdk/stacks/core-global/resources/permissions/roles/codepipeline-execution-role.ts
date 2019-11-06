import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct): iam.Role => {
  return new iam.Role(parent, 'CodePipelineBaseRole', {
    assumedBy: new iam.ServicePrincipal('codepipeline.amazonaws.com')
  })
}
