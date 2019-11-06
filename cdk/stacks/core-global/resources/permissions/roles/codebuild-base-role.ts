import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct): iam.Role => {
  return new iam.Role(parent, 'CodeBuildBaseRole', {
    assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com')
  })
}
